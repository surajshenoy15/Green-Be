import { ArrowUpRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}

export default function BlogCard({ post, featured = false }) {
  const image = post.thumbnail_url || post.image || 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80'
  const readTime = post.read_time_minutes ? `${post.read_time_minutes} min read` : post.readTime
  return (
    <article className={`group overflow-hidden rounded-[1.6rem] border border-forest-100 bg-white transition hover:-translate-y-1 hover:shadow-soft ${featured ? 'grid md:grid-cols-[1.1fr_.9fr]' : ''}`}>
      <div className={`overflow-hidden bg-forest-50 ${featured ? 'min-h-72' : 'h-56'}`}>
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-forest-600">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-forest-300" />
          <span className="flex items-center gap-1.5 normal-case tracking-normal text-slate-400"><Clock size={14} /> {readTime}</span>
        </div>
        <h3 className={`${featured ? 'text-2xl sm:text-3xl' : 'text-xl'} mt-4 font-display font-extrabold leading-tight text-forest-950`}>{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 sm:text-base">{post.excerpt}</p>
        {featured && post.published_at && <p className="mt-4 text-xs font-semibold text-slate-400">{formatDate(post.published_at)}</p>}
        <Link to={`/blogs/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest-700 hover:text-forest-900">Read more <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  )
}
