import { ArrowLeft, CalendarDays, Clock, Share2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import { blogs } from '../data/blogs'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogs.find(item => item.slug === slug)
  if (!post) return <div className="container-shell min-h-[70vh] pt-32"><h1 className="section-title">Story not found</h1><Link to="/blogs" className="btn-primary mt-6">Back to blogs</Link></div>
  const related = blogs.filter(item => item.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="pt-16 sm:pt-20">
        <header className="bg-forest-50 py-14 sm:py-20">
          <div className="container-shell">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-forest-700"><ArrowLeft size={17} /> Back to all stories</Link>
            <div className="mt-8 max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-600">{post.category}</p><h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] text-forest-950 sm:text-5xl lg:text-6xl">{post.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{post.excerpt}</p><div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-slate-500"><span className="flex items-center gap-2"><CalendarDays size={17} /> {post.date}</span><span className="flex items-center gap-2"><Clock size={17} /> {post.readTime}</span><button className="flex items-center gap-2 font-semibold text-forest-700"><Share2 size={17} /> Share</button></div></div>
          </div>
        </header>
        <div className="container-shell py-10 sm:py-14"><img src={post.image} alt={post.title} className="max-h-[660px] w-full rounded-[2rem] object-cover shadow-soft" /></div>
        <div className="container-shell pb-20 sm:pb-28"><div className="article-content mx-auto max-w-3xl">{post.content.map((block, index) => { if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>; if (block.type === 'h3') return <h3 key={index}>{block.text}</h3>; return <p key={index}>{block.text}</p> })}</div></div>
      </article>
      <section className="bg-forest-50 py-20"><div className="container-shell"><h2 className="font-display text-3xl font-extrabold text-forest-950">Continue reading</h2><div className="mt-8 grid gap-6 lg:grid-cols-3">{related.map(item => <BlogCard key={item.slug} post={item} />)}</div></div></section>
    </>
  )
}
