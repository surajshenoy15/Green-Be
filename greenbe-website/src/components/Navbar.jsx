import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Leaf, Menu, X } from 'lucide-react'

const links = [
  ['About us', '/about'],
  ['Our stories', '/blogs'],
  ['Carbon calculator', '/calculator'],
  ['GreenBe app', '/greenbe-app'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const solid = scrolled || !isHome || open

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${solid ? 'border-b border-forest-100 bg-white/95 shadow-sm backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="container-shell flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className={`flex items-center gap-2.5 font-display text-xl font-extrabold ${solid ? 'text-forest-900' : 'text-white'}`}>
          <span className={`grid h-10 w-10 place-items-center rounded-2xl ${solid ? 'bg-forest-700 text-white' : 'bg-white/[.15] text-white backdrop-blur'}`}>
            <Leaf size={21} strokeWidth={2.4} />
          </span>
          <span>GreenBe</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-semibold transition ${solid ? (isActive ? 'text-forest-700' : 'text-slate-600 hover:text-forest-700') : (isActive ? 'text-limeleaf' : 'text-white/[.85] hover:text-white')}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/calculator" className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${solid ? 'bg-forest-700 text-white hover:bg-forest-800' : 'bg-white text-forest-900 hover:bg-limeleaf'}`}>
            Measure impact <ArrowUpRight size={16} />
          </Link>
        </div>

        <button aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(v => !v)} className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${solid ? 'bg-forest-50 text-forest-900' : 'bg-white/[.15] text-white'}`}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-forest-100 bg-white lg:hidden">
          <nav className="container-shell flex flex-col gap-1 py-4">
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `rounded-xl px-4 py-3 text-base font-semibold ${isActive ? 'bg-forest-50 text-forest-800' : 'text-slate-700'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
