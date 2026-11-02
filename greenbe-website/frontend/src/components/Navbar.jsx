import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  ['About us', '/about'],
  ['Our stories', '/blogs'],
  ['Carbon calculator', '/calculator'],
  // ['GreenBe app', '/greenbe-app'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,box-shadow] duration-300 ${scrolled || open ? 'border-brand-100 bg-white/95 shadow-[0_7px_34px_-25px_rgba(0,74,128,.35)] backdrop-blur-xl' : 'border-brand-100/70 bg-white/95'}`}>
      <div className="container-shell flex h-[76px] items-center justify-between gap-6 sm:h-[86px]">
        <Link to="/" className="inline-flex shrink-0 items-center" aria-label="GreenBe home">
          <img src="/images/logo-1.png" alt="GreenBe" className="brand-mark h-[54px] w-auto sm:h-[62px]" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `relative py-3 text-[13px] font-bold tracking-[-.01em] transition-colors ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}>
              {({ isActive }) => <>{label}{isActive && <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-lime" />}</>}
            </NavLink>
          ))}
        </nav>
        <Link to="/calculator" className="hidden min-h-11 items-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-2 lg:inline-flex">
          Measure your impact <ArrowUpRight size={17} />
        </Link>
        <button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(v => !v)} className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-900 lg:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <div id="mobile-menu" className="border-t border-brand-100 bg-white lg:hidden">
        <nav className="container-shell flex flex-col gap-1 py-4" aria-label="Mobile navigation">
          {links.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-2xl px-4 py-3 text-sm font-bold ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-brand-50'}`}>{label}</NavLink>)}
          <Link to="/calculator" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-between rounded-2xl bg-brand-500 px-4 py-3 font-bold text-white">Measure your impact <ArrowUpRight size={17}/></Link>
        </nav>
      </div>}
    </header>
  )
}
