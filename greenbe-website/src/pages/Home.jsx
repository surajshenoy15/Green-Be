import { ArrowRight, Calculator, Check, Leaf, Recycle, Smartphone, Sparkles, Sprout, TreePine, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import SectionHeading from '../components/SectionHeading'
import { blogs } from '../data/blogs'

const pillars = [
  { icon: Users, title: 'Sustainability education', copy: 'Workshops, eco-clubs and practical learning for students, schools and communities.' },
  { icon: Calculator, title: 'Carbon awareness tools', copy: 'Simple digital tools that help people measure emissions and choose practical next steps.' },
  { icon: TreePine, title: 'Plantation management', copy: 'Tree planting supported by long-term care, survival tracking and ecosystem restoration.' },
  { icon: Recycle, title: 'Plastic and waste action', copy: 'Community campaigns that make reusable, repairable and circular choices easier.' },
]

export default function Home() {
  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden bg-hero-pattern bg-cover bg-center text-white sm:min-h-[820px]">
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
        <div className="container-shell relative flex min-h-[760px] items-end pb-16 pt-28 sm:min-h-[820px] sm:pb-24 lg:items-center lg:pb-12">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur"><Sparkles size={14} className="text-limeleaf" /> Your partner in clean living</span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Small actions. Clear impact. A healthier planet.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/[.78] sm:text-xl sm:leading-8">GreenBe helps individuals, students and communities understand their environmental impact and turn awareness into measurable everyday action.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/calculator" className="btn-primary bg-limeleaf text-forest-950 hover:bg-white">Calculate your footprint <ArrowRight size={18} /></Link>
              <Link to="/about" className="btn-secondary">Discover our mission</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden w-[42%] max-w-2xl rounded-tl-[4rem] border-l border-t border-white/[.15] bg-white/10 p-7 backdrop-blur-xl lg:block">
          <div className="grid grid-cols-3 gap-5">
            {[['Education', 'Learn why change matters'], ['Measurement', 'Know your real impact'], ['Action', 'Build habits that last']].map(([title, copy], i) => (
              <div key={title}>
                <span className="font-display text-2xl font-extrabold text-limeleaf">0{i + 1}</span>
                <h3 className="mt-2 font-bold">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-white/60">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=85" alt="Sunlight entering a green forest" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-soft" />
            <div className="absolute -bottom-6 -right-2 max-w-xs rounded-3xl border border-forest-100 bg-white p-6 shadow-soft sm:right-8">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-50 text-forest-700"><Leaf /></span><p className="font-display text-lg font-extrabold">Clean living, made practical.</p></div>
              <p className="mt-3 text-sm leading-6 text-slate-600">Not perfection. Better choices, measured consistently.</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Who we are" title="Environmental action should feel understandable, useful and achievable." copy="GreenBe is an NGO working to educate and promote clean living with a reduced carbon footprint. We connect planetary health with everyday well-being through education, community programmes and action-based digital tools." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Learn through real-world experiences', 'Measure the impact of daily choices', 'Build low-carbon community habits', 'Protect biodiversity for the long term'].map(item => <div key={item} className="flex gap-3 rounded-2xl bg-forest-50 p-4 text-sm font-semibold text-forest-900"><Check size={19} className="shrink-0 text-forest-600" />{item}</div>)}
            </div>
            <Link to="/about" className="btn-primary mt-8">Read our full story <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeading eyebrow="What we do" title="From awareness to action, across every part of clean living." copy="Our work brings environmental education, practical measurement and community-led solutions into one connected approach." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, copy }, index) => (
              <article key={title} className="group rounded-[1.75rem] border border-forest-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft sm:p-7">
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-50 text-forest-700 transition group-hover:bg-forest-700 group-hover:text-white"><Icon /></span><span className="font-display text-sm font-extrabold text-forest-200">0{index + 1}</span></div>
                <h3 className="mt-7 font-display text-xl font-extrabold text-forest-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[['Minimalism', 'Promoting intentional consumption, repair, sharing and a circular economy.'], ['Biodiversity', 'Nature walks, learning campaigns and public understanding of interconnected ecosystems.'], ['Green infrastructure', 'Biophilic spaces, renewable energy, natural light and rainwater-conscious design.']].map(([title, copy]) => <div key={title} className="rounded-3xl border border-forest-200 bg-forest-100/60 p-6"><h3 className="font-display text-lg font-extrabold text-forest-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell overflow-hidden rounded-[2.25rem] bg-forest-950 text-white">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-7 sm:p-12 lg:p-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-limeleaf"><Calculator size={14} /> Know your impact</span>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">A carbon calculator designed to make numbers meaningful.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/[.65] sm:text-lg">Estimate emissions from electricity, cooking gas, travel, food choices and household waste. See a clear category breakdown and practical ways to reduce your measured footprint.</p>
              <Link to="/calculator" className="btn-primary mt-8 bg-limeleaf text-forest-950 hover:bg-white">Try the calculator <ArrowRight size={18} /></Link>
            </div>
            <div className="relative min-h-[420px] bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-forest-950/40" />
              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/[.15] bg-white/10 p-5 backdrop-blur-md sm:inset-x-10 sm:bottom-10">
                <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-limeleaf">Your estimate</p><p className="mt-1 font-display text-3xl font-extrabold">3.8 tCO₂e</p></div><Sprout size={42} className="text-limeleaf" /></div>
                <div className="mt-4 h-2 rounded-full bg-white/[.15]"><div className="h-full w-[58%] rounded-full bg-limeleaf" /></div>
                <p className="mt-3 text-xs text-white/60">Educational estimate based on the activities entered.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-50 py-20 sm:py-28">
        <div className="container-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Stories for change" title="Ideas that help clean living become everyday living." copy="Explore practical guides, community perspectives and stories about climate-conscious choices." />
            <Link to="/blogs" className="inline-flex shrink-0 items-center gap-2 font-bold text-forest-700">View all stories <ArrowRight size={17} /></Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {blogs.slice(0, 3).map(post => <BlogCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow"><Smartphone size={14} /> Our main product</span>
            <h2 className="section-title mt-4">The GreenBe app will help sustainable habits move from intention to action.</h2>
            <p className="section-copy">Our upcoming mobile platform is being designed as a personal carbon companion: calculate daily impact, follow eco-challenges, discover reduction tips and participate in community progress.</p>
            <div className="mt-7 space-y-4">
              {['Personal carbon tracking across travel, food and utilities', 'Daily eco-challenges and practical reduction suggestions', 'Community goals, progress and sustainability learning'].map(item => <div key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-700 sm:text-base"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest-100 text-forest-700"><Check size={14} /></span>{item}</div>)}
            </div>
            <Link to="/greenbe-app" className="btn-primary mt-8">Explore the app vision <ArrowRight size={17} /></Link>
          </div>
          <div className="relative mx-auto w-full max-w-lg rounded-[3rem] bg-forest-900 p-5 shadow-soft sm:p-8">
            <div className="absolute -left-8 top-16 h-40 w-40 rounded-full bg-limeleaf/20 blur-3xl" />
            <div className="relative mx-auto max-w-[310px] rounded-[2.5rem] border-[8px] border-forest-950 bg-white p-4 shadow-2xl">
              <div className="mx-auto h-5 w-24 rounded-full bg-forest-950" />
              <div className="mt-5 rounded-3xl bg-forest-700 p-5 text-white"><p className="text-xs text-white/60">Good morning</p><p className="mt-1 font-display text-2xl font-extrabold">Your impact today</p><div className="mt-5 flex items-end justify-between"><div><span className="font-display text-4xl font-extrabold">4.2</span><span className="ml-1 text-xs">kg CO₂e</span></div><Leaf className="text-limeleaf" /></div></div>
              <div className="mt-4 grid grid-cols-2 gap-3">{[['Travel', '1.5 kg'], ['Home', '2.1 kg'], ['Food', '0.6 kg'], ['Streak', '8 days']].map(([a,b]) => <div key={a} className="rounded-2xl bg-forest-50 p-3"><p className="text-[11px] text-slate-500">{a}</p><p className="mt-1 text-sm font-bold text-forest-900">{b}</p></div>)}</div>
              <div className="mt-4 rounded-2xl border border-forest-100 p-4"><p className="text-xs font-bold text-forest-700">Today’s challenge</p><p className="mt-1 text-sm font-semibold text-slate-700">Carry a reusable water bottle</p><div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-full w-2/3 rounded-full bg-limeleaf" /></div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
