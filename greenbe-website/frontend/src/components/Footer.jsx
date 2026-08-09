import { Link } from 'react-router-dom'
import { ArrowRight, Instagram, Leaf, Linkedin, Mail, MapPin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white">
      <div className="container-shell py-14 sm:py-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_.75fr_.75fr]">
          <div>
            <div className="flex items-center gap-3 font-display text-2xl font-extrabold">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-limeleaf text-forest-950"><Leaf /></span>
              GreenBe
            </div>
            <p className="mt-5 max-w-md text-base leading-7 text-white/[.65]">Your partner in clean living. We turn environmental awareness into practical, measurable action for people, schools and communities.</p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Linkedin, Youtube].map((Icon, index) => <a key={index} href="#" aria-label="Social channel" className="grid h-10 w-10 place-items-center rounded-full border border-white/[.15] text-white/70 transition hover:border-limeleaf hover:text-limeleaf"><Icon size={18} /></a>)}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-limeleaf">Explore</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/70">
              <Link to="/about" className="hover:text-white">About GreenBe</Link>
              <Link to="/blogs" className="hover:text-white">Stories & insights</Link>
              <Link to="/calculator" className="hover:text-white">Carbon calculator</Link>
              <Link to="/greenbe-app" className="hover:text-white">GreenBe app</Link>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-limeleaf">Connect</h3>
            <div className="mt-5 space-y-4 text-sm text-white/70">
              <p className="flex items-start gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-limeleaf" /> hello@greenbe.org</p>
              <p className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-limeleaf" /> Bengaluru, Karnataka, India</p>
            </div>
            <Link to="/calculator" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-limeleaf">Start with your footprint <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-white/[.45] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GreenBe. All rights reserved.</p>
          <p>Prototype website · Photography sourced from Unsplash</p>
        </div>
      </div>
    </footer>
  )
}
