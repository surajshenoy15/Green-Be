import { useCallback, useEffect, useState } from 'react'
import { Edit3, FileText, LoaderCircle, MoreHorizontal, Plus, Search, Star, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../api/client'

export default function AdminBlogs() {
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const params = new URLSearchParams({ limit: '100' })
      if (status !== 'all') params.set('status', status)
      if (query.trim()) params.set('q', query.trim())
      const result = await apiRequest(`/admin/posts?${params}`)
      setPosts(result.items); setTotal(result.total)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [status, query])

  useEffect(() => { const id = setTimeout(load, 250); return () => clearTimeout(id) }, [load])

  const remove = async (post) => {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return
    await apiRequest(`/admin/posts/${post.id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-forest-600">Content library</p><h1 className="mt-2 font-display text-3xl font-extrabold text-forest-950 sm:text-4xl">Blogs</h1><p className="mt-2 text-slate-500">{total} {total === 1 ? 'story' : 'stories'} in your workspace.</p></div><Link to="/admin/blogs/new" className="btn-primary"><Plus size={17} /> New story</Link></div>
      <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-forest-100 bg-white p-3 sm:flex-row sm:items-center"><div className="relative flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search title, category or slug" className="w-full rounded-xl border-0 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none ring-forest-100 focus:ring-4" /></div><div className="flex gap-1 rounded-xl bg-slate-50 p-1">{['all','published','draft'].map(item => <button key={item} onClick={() => setStatus(item)} className={`rounded-lg px-3 py-2 text-xs font-bold capitalize ${status === item ? 'bg-white text-forest-800 shadow-sm' : 'text-slate-500'}`}>{item}</button>)}</div></div>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
      <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-forest-100 bg-white shadow-sm">
        {loading ? <div className="grid min-h-64 place-items-center"><LoaderCircle className="animate-spin text-forest-700" /></div> : posts.length ? <div className="divide-y divide-slate-100">{posts.map(post => <article key={post.id} className="grid gap-4 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center sm:p-5"><div className="h-24 overflow-hidden rounded-2xl bg-forest-50 sm:h-20">{post.thumbnail_url ? <img src={post.thumbnail_url} alt="" className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center text-forest-300"><FileText /></span>}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${post.status === 'published' ? 'bg-forest-50 text-forest-700' : 'bg-amber-50 text-amber-700'}`}>{post.status}</span>{post.featured && <span className="inline-flex items-center gap-1 rounded-full bg-lime-50 px-2.5 py-1 text-[11px] font-bold text-lime-800"><Star size={12} /> Featured</span>}</div><h2 className="mt-2 truncate font-display text-lg font-extrabold text-forest-950">{post.title}</h2><p className="mt-1 truncate text-sm text-slate-500">{post.category} · {post.read_time_minutes} min read · Updated {new Date(post.updated_at).toLocaleDateString()}</p></div><div className="flex items-center gap-2"><Link to={`/admin/blogs/${post.id}/edit`} className="inline-flex h-10 items-center gap-2 rounded-full border border-forest-200 px-4 text-xs font-bold text-forest-700 hover:bg-forest-50"><Edit3 size={15} /> Edit</Link><button onClick={() => remove(post)} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${post.title}`}><Trash2 size={16} /></button></div></article>)}</div> : <div className="grid min-h-72 place-items-center px-6 text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-forest-50 text-forest-600"><MoreHorizontal /></span><h2 className="mt-4 font-display text-xl font-extrabold text-forest-950">No matching stories</h2><p className="mt-2 text-sm text-slate-500">Try another filter or create a new story.</p></div></div>}
      </div>
    </div>
  )
}
