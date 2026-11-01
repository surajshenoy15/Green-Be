import { useEffect, useState } from 'react'
import { FileText, Highlighter, LoaderCircle, PencilLine, Plus, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../api/client'

function Stat({ label, value, icon: Icon }) {
  return <div className="rounded-[1.5rem] border border-brand-100 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon size={20} /></span><span className="font-display text-3xl font-extrabold text-brand-950">{value}</span></div><p className="mt-5 text-sm font-bold text-slate-500">{label}</p></div>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([apiRequest('/admin/stats'), apiRequest('/admin/posts?limit=5')])
      .then(([s, p]) => { setStats(s); setPosts(p.items) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="grid min-h-[50vh] place-items-center"><LoaderCircle className="animate-spin text-brand-700" /></div>

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-600">Editorial overview</p><h1 className="mt-2 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl">GreenBe Journal</h1><p className="mt-2 text-slate-500">Draft, refine and publish stories from one place.</p></div><Link to="/admin/blogs/new" className="btn-primary"><Plus size={17} /> Write a story</Link></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="All stories" value={stats?.total || 0} icon={FileText} /><Stat label="Published" value={stats?.published || 0} icon={Sparkles} /><Stat label="Drafts" value={stats?.drafts || 0} icon={PencilLine} /><Stat label="Featured" value={stats?.featured || 0} icon={Highlighter} /></div>
      <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-brand-100 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-brand-100 px-6 py-5"><div><h2 className="font-display text-xl font-extrabold text-brand-950">Recently edited</h2><p className="mt-1 text-sm text-slate-500">Continue where you left off.</p></div><Link to="/admin/blogs" className="text-sm font-bold text-brand-700">View all</Link></div><div className="divide-y divide-slate-100">{posts.length ? posts.map(post => <Link key={post.id} to={`/admin/blogs/${post.id}/edit`} className="flex items-center gap-4 px-6 py-4 transition hover:bg-brand-50/50"><div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-50">{post.thumbnail_url ? <img src={post.thumbnail_url} alt="" className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center text-brand-300"><FileText /></span>}</div><div className="min-w-0 flex-1"><p className="truncate font-bold text-slate-800">{post.title}</p><p className="mt-1 text-xs text-slate-400">{post.category} · {post.status === 'published' ? 'Published' : 'Draft'} · Updated {new Date(post.updated_at).toLocaleDateString()}</p></div></Link>) : <div className="px-6 py-12 text-center text-sm text-slate-500">No stories yet. Create your first one.</div>}</div></section>
    </div>
  )
}
