import { ArrowRight, BarChart3, BellRing, Check, Footprints, Leaf, MapPin, Medal, Recycle, Sparkles, Target, TreePine, Users } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import PhonePreview from '../components/PhonePreview'
import { Link } from 'react-router-dom'

const features = [
  { icon: Footprints, title: 'Green actions', text: 'Discover better everyday choices—from getting around to cutting down waste.' },
  { icon: Target, title: 'Meaningful challenges', text: 'Build new habits one achievable challenge at a time.' },
  { icon: BarChart3, title: 'Clear progress', text: 'Bring your actions and impact into one understandable view.' },
  { icon: Users, title: 'Community participation', text: 'Explore shared goals with communities, campuses and participating organisations.' },
  { icon: TreePine, title: 'On-the-ground initiatives', text: 'Make it easier to participate in activities such as planting and local clean-ups.' },
  { icon: BellRing, title: 'Helpful nudges', text: 'Stay engaged with gentle reminders and useful learning moments.' },
]

export default function AppPage() {
  return (
    <>
      <PageHero eyebrow="The GreenBe app" title="Make every green action part of your day." copy="We're designing a simpler, more motivating way to take action for our planet—right from your phone." image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1300&q=85" />
      <section className="overflow-hidden py-20 sm:py-28">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="A new kind of everyday companion" title="Less scrolling. More doing." copy="The GreenBe experience is about making sustainable living a natural part of the day. Find useful actions, discover what matters, and stay inspired to keep going." />
            <div className="mt-9 space-y-4">{['Easy to discover and use', 'Designed around practical, local actions', 'Progress that makes sense to real people', 'A brighter, more connected green community'].map(item => <div key={item} className="flex items-center gap-3 text-sm font-bold text-brand-900 sm:text-base"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#EFFBE7] text-[#347914]"><Check size={17}/></span>{item}</div>)}</div>
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-brand-50 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-500"><Sparkles size={20}/></span><p className="text-sm font-extrabold text-brand-800">Designed with GreenBe's bright, fresh identity.</p></div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[600px] items-center justify-center overflow-hidden rounded-[3rem] bg-brand-50 px-6 pb-14 pt-20 sm:pb-16 sm:pt-24">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border-[46px] border-brand-200/60"/>
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-lime/30" />
            <div className="relative z-10"><PhonePreview /></div>
            <span className="absolute bottom-6 right-6 rounded-full bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-brand-900 shadow-soft">Concept preview</span>
          </div>
        </div>
      </section>
      <section className="bg-cream py-20 sm:py-28"><div className="container-shell"><SectionHeading eyebrow="The experience we're building" title="Little actions. A lot of possibilities." copy="A connected home for sustainability actions, participation and progress." align="center" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, text }, index) => <article key={title} className="group rounded-[1.8rem] border border-brand-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-soft sm:p-8"><div className="flex items-start justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white"><Icon size={25}/></span><span className="font-display text-sm font-extrabold text-brand-200">0{index + 1}</span></div><h3 className="mt-7 font-display text-xl font-extrabold text-brand-950">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></article>)}</div></div></section>
      <section className="py-20 sm:py-28"><div className="container-shell overflow-hidden rounded-[2.5rem] bg-brand-950 px-7 py-14 text-center text-white sm:px-14 sm:py-20"><span className="mx-auto grid h-16 w-16 place-items-center rounded-[1.5rem] bg-lime text-brand-950"><Leaf size={30}/></span><p className="mt-7 text-xs font-extrabold uppercase tracking-[.18em] text-lime">The journey ahead</p><h2 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">A more sustainable future should feel within reach.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70">GreenBe is building digital experiences that connect education with positive environmental action. The screens shown here illustrate the product direction, not a live account.</p><Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-extrabold text-brand-950 transition hover:bg-white">Explore our mission <ArrowRight size={18}/></Link></div></section>
    </>
  )
}
