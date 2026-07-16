import { ArrowUpRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BlogCard({ post, featured = false }) {
  return (
    <article className={`group overflow-hidden rounded-[1.6rem] border border-forest-100 bg-white transition hover:-translate-y-1 hover:shadow-soft ${featured ? 'grid md:grid-cols-[1.1fr_.9fr]' : ''}`}>
      <div className={`overflow-hidden ${featured ? 'min-h-72' : 'h-56'}`}>
        <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-forest-600">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-forest-300" />
          <span className="flex items-center gap-1.5 normal-case tracking-normal text-slate-400"><Clock size={14} /> {post.readTime}</span>
        </div>
        <h3 className={`${featured ? 'text-2xl sm:text-3xl' : 'text-xl'} mt-4 font-display font-extrabold leading-tight text-forest-950`}>{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 sm:text-base">{post.excerpt}</p>
        <Link to={`/blogs/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest-700 hover:text-forest-900">Read the story <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  )
}
