from django.contrib.auth.models import User
from .models import Article,Comment,UserProfile

def initial_data():
    
    Comment.objects.all().delete()
    Article.objects.all().delete()
    UserProfile.objects.all().delete()
   
    User.objects.filter(username__in=["mor", "dana"]).delete()
    
    
    mor = User.objects.create_user(username="mor",password="mor1234")
    dana = User.objects.create_user(username="dana",password="1234dana")
    
    mor_profile = UserProfile.objects.create(user=mor)
    dana_profile = UserProfile.objects.create(user=dana)
    
    article1 = Article.objects.create(
        title="5 tips for healthier life",
        text="Getting enough sleep, regular exercise, and eating right are the key to a healthy lifestyle. Drink plenty of water, reduce sugar, and stay active for at least 30 minutes a day.",
        image="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        author=mor_profile
    )
    
    article2 = Article.objects.create(
        title="Summer 2025 Fashion Trends",
        text="Bold colors, oversized button-down shirts, and flat shoes are taking over this summer. The balance between comfort and style is the main trend.",
        image="https://mypointof.com/wp-content/uploads/2016/04/20150121_SpringLifestyle_IG_0000s_0032_AEO_SP16_DAY_02_JENNA_01_JAKE-1004_V1.jpg",
        author=dana_profile
    )
    
    article3 = Article.objects.create(
        title="What Should You Eat for Breakfast?",
        text="A nutritious breakfast helps boost focus and energy. A combination of complex carbs, protein, and healthy fats like avocado toast with egg is a great choice.",
        image="https://www.masa.co.il/wp-content/uploads/2018/07/breakfast.jpg",
        author=mor_profile
    )
    
    article4 = Article.objects.create(
        title="The Future of Artificial Intelligence in Tech",
        text="Following the technological revolution, we are witnessing unprecedented advances in AI development that are reshaping industries worldwide.",
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        author=mor_profile
    )
    
    article5 = Article.objects.create(
        title="Advanced React Application Development Guide",
        text="Advanced techniques and methodologies for developing efficient and maintainable React applications that scale.",
        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
        author=mor_profile
    )
    
    Comment.objects.create(article=article5, author=mor_profile, text="Great article!.")
    Comment.objects.create(article=article4, author=mor_profile, text="Great article!.")
    Comment.objects.create(article=article1, author=mor_profile, text="Great article! Just what I needed.")
    Comment.objects.create(article=article1, author=dana_profile, text="Really helpful tips, thanks!")

    # Comments for Article 2
    Comment.objects.create(article=article2, author=mor_profile, text="Perfect inspiration for summer.")
    Comment.objects.create(article=article1, author=dana_profile, text="Can’t wait to try these looks.")

    # Comments for Article 3
    Comment.objects.create(article=article3, author=mor_profile, text="Started eating this way—it helps a lot.")
    Comment.objects.create(article=article3, author=dana_profile, text="I recommend adding nuts too.")