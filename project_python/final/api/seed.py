from django.contrib.auth.models import User
from .models import Article, Comment, UserProfile


def initial_data():

    Comment.objects.all().delete()
    Article.objects.all().delete()
    UserProfile.objects.all().delete()

    User.objects.filter(username__in=["mor", "dana"]).delete()

    mor = User.objects.create_user(username="mor", password="mor1234")
    dana = User.objects.create_user(username="dana", password="1234dana")

    mor_profile = UserProfile.objects.create(user=mor)
    dana_profile = UserProfile.objects.create(user=dana)

    article1 = Article.objects.create(
        title="5 tips for healthier life",
        text="Getting enough sleep, regular exercise, and eating right are the key to a healthy lifestyle. Drink plenty of water, reduce sugar, and stay active for at least 30 minutes a day.",
        content=("Living a healthy life requires a balance of physical activity, proper nutrition, "
                 "and mental well-being. Regular exercise helps maintain cardiovascular health and "
                 "builds muscle strength. Prioritize a diet rich in vegetables, fruits, lean proteins, "
                 "and whole grains while minimizing processed foods and sugars. Adequate sleep "
                 "is essential for recovery and cognitive function. Additionally, managing stress "
                 "through mindfulness or hobbies can greatly enhance quality of life."),
        image="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        author=mor_profile,
        status="published"
    )

    article2 = Article.objects.create(
        title="Summer 2025 Fashion Trends",
        text="Bold colors, oversized button-down shirts, and flat shoes are taking over this summer. The balance between comfort and style is the main trend.",
        content=(
            "The summer of 2025 is all about embracing bold colors and relaxed silhouettes. Oversized button-down shirts paired with tailored shorts or flowing skirts "
            "create a chic yet comfortable look. Flat shoes remain popular, emphasizing ease of movement without sacrificing style. Sustainability continues to influence "
            "design choices, with many brands opting for eco-friendly materials. Accessorize with statement jewelry and vintage sunglasses to complete the trendy ensemble."
        ),
        image="https://mypointof.com/wp-content/uploads/2016/04/20150121_SpringLifestyle_IG_0000s_0032_AEO_SP16_DAY_02_JENNA_01_JAKE-1004_V1.jpg",
        author=dana_profile,
        status="published"
    )

    article3 = Article.objects.create(
        title="What Should You Eat for Breakfast?",
        text="A nutritious breakfast helps boost focus and energy. A combination of complex carbs, protein, and healthy fats like avocado toast with egg is a great choice.",
        content=(
            "Breakfast is often called the most important meal of the day because it breaks the overnight fast and replenishes your body's glucose supply. A balanced breakfast "
            "should include complex carbohydrates such as whole-grain bread or oats, proteins like eggs or yogurt, and healthy fats found in avocado or nuts. Avoid high-sugar "
            "breakfast cereals or pastries as they can cause energy crashes. Drinking water or herbal tea along with your meal helps with hydration and digestion."
        ),
        image="https://www.masa.co.il/wp-content/uploads/2018/07/breakfast.jpg",
        author=mor_profile,
        status="published"
    )

    article4 = Article.objects.create(
        title="The Future of Artificial Intelligence in Tech",
        text="Following the technological revolution, we are witnessing unprecedented advances in AI development that are reshaping industries worldwide.",
        content=(
             "Artificial Intelligence (AI) continues to evolve rapidly, transforming sectors such as healthcare, finance, transportation, and entertainment. Machine learning "
            "algorithms enable computers to learn from data and improve their performance without explicit programming. Ethical considerations, including privacy, bias, and "
            "job displacement, remain significant challenges. Future AI developments promise greater automation, improved decision-making capabilities, and enhanced human-machine "
            "collaboration."
        ),
        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        author=mor_profile,
        status="published"
    )

    article5 = Article.objects.create(
        title="Advanced React Application Development Guide",
        text="Advanced techniques and methodologies for developing efficient and maintainable React applications that scale.",
        content=(
            "This guide explores advanced React concepts including hooks, context API, performance optimization, and component design patterns. State management with Redux or "
            "MobX helps handle complex application states. Testing with tools like Jest and React Testing Library ensures robustness. Emphasizing modular and reusable components "
            "improves maintainability. Following best practices in code organization and documentation facilitates scalable React development."
        ),
        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
        author=mor_profile,
        status="published"
    )

    Comment.objects.create(
        article=article5, author=mor_profile, text="Great article!.")
    Comment.objects.create(
        article=article4, author=mor_profile, text="Great article!.")
    Comment.objects.create(article=article1, author=mor_profile,
                           text="Great article! Just what I needed.")
    Comment.objects.create(
        article=article1, author=dana_profile, text="Really helpful tips, thanks!")

    # Comments for Article 2
    Comment.objects.create(article=article2, author=mor_profile,
                           text="Perfect inspiration for summer.")
    Comment.objects.create(article=article1, author=dana_profile,
                           text="Can’t wait to try these looks.")

    # Comments for Article 3
    Comment.objects.create(article=article3, author=mor_profile,
                           text="Started eating this way—it helps a lot.")
    Comment.objects.create(
        article=article3, author=dana_profile, text="I recommend adding nuts too.")
