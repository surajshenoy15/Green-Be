import PageHero from '../components/PageHero'
import BlogCard from '../components/BlogCard'
import { blogs } from '../data/blogs'

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="GreenBe journal" title="Stories, guides and ideas for cleaner everyday living." copy="Read practical, human-centred perspectives on sustainability, biodiversity, climate education and community action." image="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85" />
      <section className="py-20 sm:py-28">
        <div className="container-shell">
          <BlogCard post={blogs[0]} featured />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(1).map(post => <BlogCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>
    </>
  )
}
