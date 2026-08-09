import asyncio
from datetime import datetime, timezone

from sqlalchemy import select

from app.database import SessionLocal
from app.models import BlogPost
from app.utils import estimate_read_time

POSTS = [
    {
        "slug": "small-habits-lower-carbon-footprint",
        "title": "Seven small habits that can quietly lower your carbon footprint",
        "category": "Clean living",
        "excerpt": "Sustainability becomes easier when it is built into normal routines. Begin with decisions you already make every day.",
        "thumbnail_url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=85",
        "content_html": """<p>A lower-carbon lifestyle does not have to begin with a perfect home, an expensive electric vehicle, or a complete change in the way you live. It can begin with a few repeatable choices that reduce waste and energy without making daily life harder.</p><h2>1. Measure before you change</h2><p>Use a simple footprint calculator to understand which parts of your routine create the most emissions. For many households, electricity and private transport are larger sources than people expect.</p><h2>2. Make low-carbon travel the default</h2><p>Combine errands, share rides, walk shorter distances and choose public transport when practical. The most sustainable routine is usually the one that is easy enough to repeat.</p><h2>3. Buy less, choose longer-lasting products</h2><p>Minimalism is not about owning nothing. It is about buying intentionally, repairing before replacing and avoiding products that become waste after a few uses.</p><h2>4. Reduce food waste</h2><p>Plan meals, store food correctly and serve smaller first portions. Food that is never eaten still carries the environmental impact of farming, processing, packaging and transport.</p><h2>5. Build a household eco-check</h2><p>Once each month, review your electricity use, transport kilometres, waste and a single improvement goal. Small measurements make progress visible and keep motivation practical.</p>""",
        "published_at": datetime(2026, 7, 10, 8, 0, tzinfo=timezone.utc),
        "featured": True,
    },
    {
        "slug": "why-biodiversity-matters-to-cities",
        "title": "Why biodiversity matters even in the middle of a busy city",
        "category": "Biodiversity",
        "excerpt": "Urban nature supports cooler neighbourhoods, cleaner air, pollination and a stronger connection between communities and place.",
        "thumbnail_url": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=85",
        "content_html": """<p>Biodiversity is often imagined as something far away: forests, oceans or protected landscapes. Yet cities also depend on a living network of trees, insects, birds, soil organisms and water systems.</p><h2>A city is still an ecosystem</h2><p>Roadside trees provide shade, wetlands hold storm water, insects pollinate gardens and healthy soil helps plants survive heat. When these systems are weakened, cities become hotter and less resilient.</p><h2>Education changes what people notice</h2><p>Nature walks, school eco-clubs and neighbourhood mapping help people identify the biodiversity around them. What people can recognise, they are more likely to protect.</p><h2>Designing with nature</h2><p>Biophilic infrastructure brings vegetation, natural light, rainwater systems and renewable energy into built spaces. It can improve environmental performance while making places healthier and more welcoming.</p>""",
        "published_at": datetime(2026, 7, 4, 8, 0, tzinfo=timezone.utc),
    },
    {
        "slug": "planting-trees-is-only-the-beginning",
        "title": "Planting a tree is only the beginning: why survival must be measured",
        "category": "Plantation",
        "excerpt": "Meaningful plantation work continues after the event photograph, through species selection, watering, monitoring and community care.",
        "thumbnail_url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
        "content_html": """<p>Tree-planting drives can create awareness and bring communities together. Their long-term value, however, depends on what happens after the saplings are placed in the ground.</p><h2>Choose for the location, not only for the count</h2><p>Native or locally suitable species are more likely to support local biodiversity and withstand the soil, rainfall and temperature conditions of a site.</p><h2>Track survival over time</h2><p>A plantation programme should record the planting date, species, location, caretaker and survival checks. This moves the focus from how many trees were planted to how many are thriving.</p><h2>Build community ownership</h2><p>Schools, resident groups and local organisations can adopt plantation zones. Shared responsibility makes maintenance visible and keeps the work active beyond a single campaign.</p>""",
        "published_at": datetime(2026, 6, 28, 8, 0, tzinfo=timezone.utc),
    },
    {
        "slug": "plastic-free-community-events",
        "title": "A practical guide to planning lower-plastic community events",
        "category": "Plastic action",
        "excerpt": "Good planning can replace single-use items without making events inconvenient for organisers, vendors or visitors.",
        "thumbnail_url": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1400&q=85",
        "content_html": """<p>Community events can generate large volumes of cups, bottles, packaging and banners in only a few hours. A lower-plastic event begins with procurement decisions made before the venue opens.</p><h2>Create a reusable-first checklist</h2><p>Prioritise water refill points, reusable service ware, returnable vendor crates, digital registration and durable signage. Compostable products should be chosen only when the local waste system can actually process them.</p><h2>Make sorting obvious</h2><p>Place clearly labelled waste stations where people naturally pause. Volunteers should be trained to help visitors separate materials correctly.</p><h2>Publish what was learned</h2><p>Record the waste generated, materials avoided and improvements needed. Transparent reporting helps the next event perform better.</p>""",
        "published_at": datetime(2026, 6, 20, 8, 0, tzinfo=timezone.utc),
    },
    {
        "slug": "minimalism-for-planet-and-peace-of-mind",
        "title": "Minimalism for the planet and for peace of mind",
        "category": "Minimalism",
        "excerpt": "A more intentional relationship with products can reduce waste, save money and create space for what matters.",
        "thumbnail_url": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
        "content_html": """<p>Minimalism is sometimes presented as an aesthetic. Its deeper environmental value is that it reduces unnecessary demand for extraction, manufacturing, packaging and transport.</p><h2>Use what you already own</h2><p>The most sustainable product is often the one already available to you. Maintain it, repair it and find a new use before replacing it.</p><h2>Pause before purchasing</h2><p>A simple waiting period helps separate genuine needs from impulse. Ask whether the product will be used regularly, can be repaired and has a responsible end-of-life option.</p><h2>Share and circulate</h2><p>Libraries of things, rentals, swaps and second-hand markets keep useful products in circulation and make sustainable choices more affordable.</p>""",
        "published_at": datetime(2026, 6, 13, 8, 0, tzinfo=timezone.utc),
    },
    {
        "slug": "students-can-lead-climate-action",
        "title": "How students can turn climate learning into visible local action",
        "category": "Education",
        "excerpt": "Eco-clubs become powerful when students can investigate problems, test solutions and communicate measurable outcomes.",
        "thumbnail_url": "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=1400&q=85",
        "content_html": """<p>Environmental education becomes memorable when students move from reading about sustainability to observing and improving the systems around them.</p><h2>Begin with a campus audit</h2><p>Students can measure electricity use, water leakage, transport patterns, waste segregation and green cover. The audit creates a baseline for action.</p><h2>Choose one project with a clear metric</h2><p>A project may aim to reduce disposable cups, improve tree survival or increase public transport participation. A clear metric helps students understand whether the intervention worked.</p><h2>Share the process, not only the result</h2><p>Documenting challenges, failed ideas and improvements makes climate action more credible. It also gives other schools a practical model they can adapt.</p>""",
        "published_at": datetime(2026, 6, 5, 8, 0, tzinfo=timezone.utc),
    },
]


async def main() -> None:
    async with SessionLocal() as db:
        added = 0
        for item in POSTS:
            exists = await db.scalar(select(BlogPost).where(BlogPost.slug == item["slug"]))
            if exists:
                continue
            post = BlogPost(
                **item,
                content_json={},
                tags=[item["category"]],
                status="published",
                author_name="GreenBe Team",
                read_time_minutes=estimate_read_time(item["content_html"]),
            )
            db.add(post)
            added += 1
        await db.commit()
        print(f"Seed complete: {added} post(s) added.")


if __name__ == "__main__":
    asyncio.run(main())
