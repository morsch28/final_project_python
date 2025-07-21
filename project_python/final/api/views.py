from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ViewSet
from .serializers import UserSerializer, ArticleSerializer, ArticleUserLikesSerializer, CommentSerializer, TagSerializer, UserProfileSerializer
from .models import Tag, UserProfile, Article, Comment, ArticleUserLikes
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .permissions import CommentOwnerOrReadOnly, ArticlePermission, TagPermission, UserLikesPermission, UserProfilePermission, IsAdmin
from rest_framework.decorators import action
from rest_framework.response import Response
# checks the username and password against the database
from rest_framework.authtoken.serializers import AuthTokenSerializer
from core.auth import get_token_for_user


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [TagPermission]


class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [UserProfilePermission]

    @action(detail=False, methods=["get"])  # 'קוד שהתווסף
    def me(self, request):
        profile = UserProfile.objects.get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [ArticlePermission]

    # קוד שהתווסף לעבור עליו
    # @action(detail=True, methods=['GET'], url_path='comments')
    # def get_comments_for_article(self, request, pk=None):
    #     article = self.get_object()

    #     if article.status != "published":
    #         return Response({"details": "This article is not published"}, status=403)

    #     comments = Comment.objects.filter(
    #         article=article, reply_to=None)
    #     serializer = CommentSerializer(comments, many=True)
    #     return Response(serializer.data, status=200)

    @action(detail=True, methods=["GET", "POST"], url_path="comments", permission_classes=[IsAuthenticatedOrReadOnly])
    def comments(self, request, pk=None):
        article = self.get_object()

        if request.method == "GET":
            if article.status != "published":
                return Response({"details": "This article is not published"}, status=403)
            comments = Comment.objects.filter(article=article, reply_to=None)
            serializer = CommentSerializer(
                comments, many=True, context={"request": request})
            return Response(serializer.data)

        elif request.method == "POST":
            if not request.user.is_authenticated:
                return Response({"details": "Authentication required"}, status=403)
            profile, _ = UserProfile.objects.get_or_create(user=request.user)

            serializer = CommentSerializer(
                data=request.data, context={"request": request})
            if serializer.is_valid():
                serializer.save(author=profile, article=article)
                return Response(serializer.data, status=201)
            print(serializer.errors)
            return Response(serializer.errors, status=400)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [CommentOwnerOrReadOnly, IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):  # קוד שהתווסף
        user = self.request.user
        profile, create = UserProfile.objects.get_or_create(user=user)
        serializer.save(author=profile)


class ArticleUserLikesViewSet(ModelViewSet):
    queryset = ArticleUserLikes.objects.all()
    serializer_class = ArticleUserLikesSerializer
    permission_classes = [UserLikesPermission]


class AuthViewSet(ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        return Response({
            'login': 'http://127.0.0.1:8000/api/auth/login',
            'register': 'http://127.0.0.1:8000/api/auth/register'
        })

    @action(methods=["post", "get"], detail=False)
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        # validation  by  our rules in UserSerializer and in User
        # example check that password has at least 8 characters
        serializer.is_valid(raise_exception=True)

        user = serializer.save()  # calls the create method

        jwt = get_token_for_user(user)

        # יוצר פרופיל למשתמש בעת ההרשמה
        UserProfile.objects.get_or_create(user=user)

        return Response({"message": "Registered successfully", "user": serializer.data, **jwt}, 201)

    @action(methods=["post", "get"], detail=False)
    def login(self, request):
        # create the serializer object
        serializer = AuthTokenSerializer(
            data=request.data, context={'request': request}
        )

        # if password != password -> throw
        serializer.is_valid(raise_exception=True)

        # get the user from serializer
        user = serializer.validated_data['user']

        jwt = get_token_for_user(user)

        return Response(jwt, 200)
