from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from api.models import UserProfile


class BlogTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['isAdmin'] = user.is_superuser
        # ...

        return token


# a function that takes a user object and return dict/json with jwt
def get_token_for_user(user):
    token = BlogTokenObtainPairSerializer.get_token(user)

    return {
        'jwt': str(token.access_token)
    }


class CurrentUserDefault:
    """
    May be applied as a `default=...` value on a serializer field.
    Returns the current user.
    """
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user


class CurrentProfileDefault:
    """
    May be applied as a `default=...` value on a serializer field.
    Returns the current user.
    """
    requires_context = True

    def __call__(self, serializer_field):
        user = serializer_field.context['request'].user.userprofile
        # profile, created = UserProfile.objects.get_or_create(user=user)
        # return profile
