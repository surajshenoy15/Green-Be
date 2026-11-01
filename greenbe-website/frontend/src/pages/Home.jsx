import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Calculator, Check, ChevronRight, Footprints, Leaf, Recycle, Smartphone, Sprout, TreePine, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import SectionHeading from '../components/SectionHeading'
import PhonePreview from '../components/PhonePreview'
import { publicRequest } from '../api/client'

const pillars = [
  { icon: BookOpen, n: '01', title: 'Learn', subtitle: 'Knowledge that inspires', copy: 'Practical education, eco-clubs and community experiences that make sustainability easier to understand.' },
  { icon: Calculator, n: '02', title: 'Measure', subtitle: 'Understand your impact', copy: 'Tools that help you see the environmental impact of everyday choices, with clear next steps.' },
  { icon: Footprints, n: '03', title: 'Act', subtitle: 'Small changes, repeated', copy: 'From greener journeys to less waste, turn intention into positive habits you can keep.' },
  { icon: Users, n: '04', title: 'Together', subtitle: 'Progress as a community', copy: 'Bring people, campuses and organisations together around useful local environmental action.' },
]

const mission = [
  { icon: TreePine, title: 'Plantation & biodiversity', copy: 'A more thoughtful approach to tree planting, care and thriving local ecosystems.' },
  { icon: Recycle, title: 'Waste & circular living', copy: 'Make reuse, recycling and reduced single-use consumption part of daily life.' },
  { icon: Users, title: 'Community education', copy: 'Bring practical sustainability learning to schools, campuses and neighbourhoods.' },
]

export default function Home() {
  const [homeBlogs, setHomeBlogs] = useState([])
  useEffect(() => {
    let active = true
    publicRequest('/blogs/featured?limit=3').then(data => { if (active) setHomeBlogs(Array.isArray(data) ? data : (data?.items || [])) }).catch(() => {})
    return () => { active = false }
  }, [])

  return (
    <>
      

<section className="relative overflow-hidden bg-[#F8FBFD]">
  <div className="container-shell grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-28">

    {/* LEFT — CONTENT */}
    <div className="order-1 max-w-[610px]">

      {/* Small brand label */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#70E11F]" />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#31536C]">
          Small actions. Real change.
        </span>
      </div>

      {/* Heading */}
      <h1 className="font-display text-[clamp(2.75rem,4.45vw,4.75rem)] font-extrabold leading-[1.08] tracking-[-0.055em] text-[#081C36]">
        A better planet
        <span className="block">
          starts with{" "}
          <span className="text-[#0090E9]">us.</span>
        </span>
      </h1>

      {/* Supporting text */}
      <p className="mt-6 max-w-[490px] text-[15px] leading-[1.85] text-[#546779] sm:text-[17px]">
        A more sustainable world begins with the choices we
        make every day. Discover your impact, build better
        habits, and turn small actions into meaningful change.
      </p>

      {/* Buttons */}
      <div className="mt-9 flex flex-wrap items-center gap-3">

        <Link
          to="/calculator"
          className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#0090E9] px-7 text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007BC8] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0090E9] motion-reduce:transform-none"
        >
          Explore your impact
          <ArrowUpRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
          />
        </Link>

        <Link
          to="/about"
          className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#C9DBEA] bg-white px-7 text-[14px] font-bold text-[#081C36] transition-all duration-200 hover:border-[#0090E9] hover:bg-[#F0F8FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0090E9]"
        >
          Discover GreenBe
          <ArrowRight
            size={17}
            className="text-[#0090E9] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </Link>

      </div>

      {/* Minimal bottom detail */}
      <div className="mt-10 flex items-center gap-3">
        <div className="h-px w-9 bg-[#70E11F]" />
        <p className="text-[12px] font-medium tracking-wide text-[#64788A]">
          Walk. Act. Earn. Go Green.
        </p>
      </div>

    </div>

    {/* RIGHT — IMAGE */}
    <div className="order-2 w-full">

      <div className="relative overflow-hidden rounded-[24px] bg-[#DDEFE6] shadow-[0_24px_60px_-30px_rgba(8,28,54,0.25)] sm:rounded-[30px]">

        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85"
          alt="Hands holding a young green sapling"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="aspect-[5/4] w-full object-cover object-center sm:aspect-[6/5] lg:aspect-[5/4]"
        />

        {/* Single subtle photo label */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-sm sm:bottom-6 sm:left-6 sm:px-5 sm:py-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF9DE] text-[#277B15]">
            <Leaf size={19} strokeWidth={2} />
          </div>

          <div>
            <p className="text-[13px] font-bold text-[#081C36]">
              Every action matters.
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-[#64788A]">
              Together for a greener future.
            </p>
          </div>

        </div>
      </div>

    </div>

  </div>
</section>



      <section className="border-b border-brand-100 bg-white py-6">
        <div className="container-shell grid gap-4 sm:grid-cols-3 sm:gap-0">
          {[['01 / LEARN', 'Make sustainability simple'], ['02 / MEASURE', 'See the impact of your choices'], ['03 / ACT', 'Build a greener everyday']].map(([label, text], index) => <div key={label} className={`flex items-center gap-4 ${index > 0 ? 'sm:border-l sm:border-brand-100 sm:pl-7 lg:pl-10' : ''}`}><span className="font-display text-sm font-extrabold text-brand-500">{label}</span><span className="text-xs font-semibold text-slate-500 sm:max-w-[170px]">{text}</span></div>)}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85" alt="Sunlight in a thriving forest" loading="lazy" className="aspect-[1.08] w-full rounded-[2.5rem] object-cover shadow-soft lg:aspect-[.92]" />
            <div className="absolute -bottom-5 right-4 max-w-[235px] rounded-[1.75rem] border border-brand-100 bg-white p-5 shadow-float sm:right-8"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-lime text-brand-950"><Leaf size={20}/></span><p className="mt-3 font-display text-base font-extrabold leading-snug text-brand-950">The world changes when our habits do.</p></div>
          </div>
          <div>
            <SectionHeading eyebrow="Why GreenBe exists" title="Making greener living feel possible for everyone." copy="We believe environmental change becomes meaningful when people can connect knowledge with action. GreenBe brings together sustainability education, easy-to-understand impact tools and community initiatives." />
            <div className="mt-8 space-y-4">{['Less complexity. More clarity.', 'Everyday choices made visible.', 'Progress that grows with communities.'].map((item, index) => <div key={item} className="flex items-center gap-4 rounded-2xl bg-brand-50 px-5 py-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-600"><Check size={19}/></span><p className="text-sm font-extrabold text-brand-900">{item}</p></div>)}</div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-brand-600 hover:text-brand-900">Get to know us <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><SectionHeading eyebrow="The GreenBe approach" title="From good intentions to real-world actions." copy="An approachable journey designed to make change easier to start—and easier to sustain." /><span className="hidden h-14 w-14 place-items-center rounded-full border border-brand-200 text-brand-500 lg:grid"><ArrowDownRight size={26}/></span></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, n, title, subtitle, copy }) => <article key={title} className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-[1.9rem] border border-brand-100 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-float">
              <div className="flex items-start justify-between"><span className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white"><Icon size={26}/></span><span className="font-display text-lg font-extrabold text-brand-200">{n}</span></div>
              <h3 className="mt-9 font-display text-2xl font-extrabold text-brand-950">{title}<span className="text-brand-500">.</span></h3>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-wider text-brand-600">{subtitle}</p><p className="mt-4 text-sm leading-6 text-slate-600">{copy}</p><span className="absolute bottom-0 left-7 h-1 w-16 rounded-t-full bg-lime transition-all group-hover:w-28"/>
            </article>)}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeading eyebrow="Where we focus" title="One shared purpose. Many ways to make a difference." copy="Our initiatives connect the things we learn with the places we live, study and work." align="center" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">{mission.map(({ icon: Icon, title, copy }, index) => <article key={title} className="group rounded-[2rem] border border-brand-100 bg-white p-7 transition hover:shadow-soft sm:p-9"><div className="flex items-center justify-between"><span className={`grid h-14 w-14 place-items-center rounded-2xl ${index === 1 ? 'bg-[#EFFBE7] text-[#318014]' : 'bg-brand-50 text-brand-600'}`}><Icon size={26}/></span><span className="font-display text-sm font-extrabold text-brand-200">0{index + 1}</span></div><h3 className="mt-7 font-display text-xl font-extrabold leading-tight text-brand-950">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p><span className="mt-6 block h-1 w-12 rounded-full bg-lime"/></article>)}</div>
        </div>
      </section>

      <section className="py-4 sm:py-8">
        <div className="container-shell">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-brand-950 text-white lg:grid-cols-[1fr_.95fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[.17em] text-lime"><Calculator size={15}/> Measure what matters</span>
              <h2 className="mt-6 max-w-xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">Your footprint is the start of a better story.</h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/70">Use our carbon calculator to explore emissions from energy, travel, food and waste. Get a clearer picture of the everyday choices that can add up.</p>
              <Link to="/calculator" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-lime px-6 text-sm font-extrabold text-brand-950 transition hover:bg-white">Calculate your footprint <ArrowUpRight size={18}/></Link>
              <p className="mt-6 text-xs text-white/45">Educational estimates · No signup needed</p>
            </div>
            <div className="flex min-h-[380px] items-center justify-center bg-brand-800 px-6 py-12 sm:px-12">
              <div className="w-full max-w-sm rounded-[1.8rem] border border-white/15 bg-white p-6 text-brand-950 shadow-float sm:p-8"><div className="flex items-center justify-between"><div><p className="text-[11px] font-extrabold uppercase tracking-[.17em] text-brand-600">Footprint preview</p><h3 className="mt-1 font-display text-xl font-extrabold">Explore your impact</h3></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600"><Calculator/></span></div><div className="mt-8 space-y-4">{[['Home energy','w-[75%]'],['Travel','w-[51%]'],['Food choices','w-[38%]'],['Waste','w-[22%]']].map(([label, width], index) => <div key={label}><div className="flex justify-between text-xs font-bold text-slate-500"><span>{label}</span><span>0{index + 1}</span></div><div className="mt-2 h-2.5 rounded-full bg-brand-100"><div className={`h-full rounded-full ${index === 0 ? 'bg-lime' : 'bg-brand-500'} ${width}`}/></div></div>)}</div><p className="mt-6 text-[11px] text-slate-400">Illustrative interface · Your results depend on your inputs</p></div>
            </div>
          </div>
        </div>
      </section>

      {homeBlogs.length > 0 && <section className="bg-cream py-20 sm:py-28"><div className="container-shell"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="The GreenBe journal" title="Good ideas are worth sharing." copy="Insights and stories to make greener living a little easier." /><Link to="/blogs" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-brand-600 hover:text-brand-900">Browse stories <ArrowUpRight size={18}/></Link></div><div className="mt-11 grid gap-6 md:grid-cols-3">{homeBlogs.map(post => <BlogCard key={post.id || post.slug} post={post}/>)}</div></div></section>}

      <section className="overflow-hidden py-20 sm:py-28">
        <div className="container-shell grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <span className="eyebrow"><span className="h-2 w-2 rounded-full bg-lime"/> THE GREENBE APP</span>
            <h2 className="section-title mt-5">Good habits deserve a place in your pocket.</h2>
            <p className="section-copy">We're building a friendly mobile experience to help people explore green actions, grow sustainable habits and connect their own journey to a bigger purpose.</p>
            <div className="mt-8 space-y-4">{['Everyday green actions in one place', 'A simpler way to see your progress', 'A community that moves forward together'].map(item => <p key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EFFBE7] text-[#358616]"><Check size={16}/></span>{item}</p>)}</div>
            <Link to="/greenbe-app" className="btn-primary mt-9">Discover the app <ArrowRight size={18}/></Link>
          </div>
          <div className="relative mx-auto flex w-full max-w-[540px] items-center justify-center overflow-hidden rounded-[2.8rem] bg-brand-50 px-4 pb-10 pt-16 sm:px-12 sm:pb-14 sm:pt-20"><span className="absolute -right-12 -top-14 h-52 w-52 rounded-full border-[36px] border-brand-200/65"/><span className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-lime/30"/><div className="relative z-10"><PhonePreview/></div><span className="absolute bottom-5 right-5 rounded-full bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-brand-800 shadow-soft">App concept preview</span></div>
        </div>
      </section>
    </>
  )
}
