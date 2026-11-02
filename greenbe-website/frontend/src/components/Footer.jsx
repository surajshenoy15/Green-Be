import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="container-shell pt-16 sm:pt-5">
        {/* <div className="flex flex-col justify-between gap-7 border-b border-white/15 pb-12 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.22em] text-lime">Better choices, bigger change</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">A brighter planet begins with what we do today.</h2>
          </div>
          <Link to="/calculator" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-full bg-lime px-6 text-sm font-extrabold text-brand-950 transition hover:bg-white lg:self-end">Explore your footprint <ArrowUpRight size={18} /></Link>
        </div> */}
        <div className="grid gap-12 py-12 sm:py-14 md:grid-cols-[1.4fr_.7fr_.9fr]">
          <div>
            <Link to="/" className="inline-flex rounded-2xl  px-1 py-1" aria-label="GreenBe home"><img src="/images/logo-1.png" alt="GreenBe" className="h-14 w-auto" /></Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">Your partner in clean living. Bringing environmental awareness, useful digital tools and everyday action closer together.</p>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[.2em] text-lime">Explore</h3>
            <nav className="mt-5 flex flex-col gap-3.5 text-sm font-semibold text-white/70" aria-label="Footer navigation">
              <Link className="transition hover:text-white" to="/about">About GreenBe</Link>
              <Link className="transition hover:text-white" to="/blogs">Stories & insights</Link>
              <Link className="transition hover:text-white" to="/calculator">Carbon calculator</Link>
              {/* <Link className="transition hover:text-white" to="/greenbe-app">GreenBe app</Link> */}
            </nav>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[.2em] text-lime">Get in touch</h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/70">
              <a href="mailto:hello@greenbe.org" className="flex items-start gap-3 transition hover:text-white"><Mail size={18} className="mt-0.5 shrink-0 text-lime" /> hello@greenbe.org</a>
              <p className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-lime" /> Bengaluru, Karnataka, India</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} GreenBe. All rights reserved.</span><span>Walk. Act. Earn. Go Green.</span></div>
      </div>
    </footer>
  )
}
