import { useState } from 'react'
import { BarChart3, FileText, LogOut, Menu, Plus, X } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const links = [
  { to: '/admin', label: 'Overview', icon: BarChart3, end: true },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
]

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-cream text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-[70] w-72 border-r border-brand-100 bg-white transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center justify-between border-b border-brand-100 px-6">
          <Link to="/admin" className="inline-flex items-center" aria-label="GreenBe admin dashboard"><img src="/images/logo-1.png" alt="GreenBe" className="h-14 w-auto" /></Link>
          <button className="grid h-10 w-10 place-items-center rounded-xl hover:bg-brand-50 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <div className="flex h-[calc(100%-5rem)] flex-col p-4">
          <Link to="/admin/blogs/new" className="btn-primary w-full" onClick={() => setMobileOpen(false)}><Plus size={17} /> New story</Link>
          <nav className="mt-6 space-y-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-brand-50 text-brand-800' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <Icon size={19} /> {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl bg-brand-950 p-4 text-white">
            <p className="text-xs uppercase tracking-[.14em] text-lime">Signed in</p>
            <p className="mt-2 truncate text-sm font-bold">{admin?.full_name}</p>
            <p className="truncate text-xs text-white/55">{admin?.email}</p>
            <button onClick={signOut} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white/75 hover:text-white"><LogOut size={15} /> Sign out</button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-brand-100 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-900 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/" target="_blank" className="rounded-full border border-brand-200 px-4 py-2 text-xs font-bold text-brand-700 hover:bg-brand-50">View website</Link>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{admin?.full_name?.charAt(0)?.toUpperCase() || 'A'}</span>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
      {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[60] bg-brand-950/30 backdrop-blur-sm lg:hidden" />}
    </div>
  )
}
