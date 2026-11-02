import { useEffect, useMemo, useState } from 'react'
import { LoaderCircle, Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import BlogCard from '../components/BlogCard'
import { publicRequest } from '../api/client'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    let active = true
    publicRequest('/blogs?limit=50').then(result => {
      if (active) setPosts(result.items)
    }).catch(err => active && setError(err.message || 'Unable to load stories')).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.map(post => post.category).filter(Boolean)))], [posts])
  const filtered = useMemo(() => posts.filter(post => {
    const matchesCategory = category === 'All' || post.category === category
    const needle = query.trim().toLowerCase()
    const matchesQuery = !needle || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(needle)
    return matchesCategory && matchesQuery
  }), [posts, query, category])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
     <PageHero
  eyebrow="GreenBe journal"
  title="Stories, guides and ideas for cleaner everyday living."
  copy="Read practical, human-centred perspectives on sustainability, biodiversity, climate education and community action."
  image="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85"
  centerEyebrow
/>
      <section className="py-16 sm:py-24">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-4 rounded-[1.5rem] border border-brand-100 bg-brand-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search stories" className="w-full rounded-full border border-brand-100 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100" /></div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${category === item ? 'bg-brand-700 text-white' : 'bg-white text-slate-600 hover:text-brand-700'}`}>{item}</button>)}</div>
          </div>

          {loading ? <div className="grid min-h-80 place-items-center"><LoaderCircle className="animate-spin text-brand-700" size={30} /></div> : error ? <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-semibold text-red-700">{error}</div> : featured ? <><BlogCard post={featured} featured /><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rest.map(post => <BlogCard key={post.slug} post={post} />)}</div></> : <div className="rounded-[2rem] border border-brand-100 bg-brand-50 px-6 py-16 text-center"><h2 className="font-display text-2xl font-extrabold text-brand-950">No stories found</h2><p className="mt-2 text-slate-500">Try a different search or category.</p></div>}
        </div>
      </section>
    </>
  )
}
