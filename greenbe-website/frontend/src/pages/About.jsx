import { BookOpen, Building2, HeartHandshake, Leaf, Recycle, Smartphone, Sprout, Target, TreePine, Users } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'

const objectives = [
  { icon: BookOpen, title: 'Educate students on sustainability', text: 'Develop environmental literacy through curricula, workshops, eco-clubs and practical campus initiatives.' },
  { icon: Smartphone, title: 'Provide carbon-counting tools', text: 'Build a public sustainability app that helps people understand travel, diet and utility-related emissions.' },
  { icon: TreePine, title: 'Plant and manage trees responsibly', text: 'Move beyond one-day plantation drives through survival monitoring, care and ecosystem restoration.' },
  { icon: Recycle, title: 'Reduce plastic use', text: 'Support reusable systems, better procurement and partnerships that replace avoidable single-use plastic.' },
  { icon: Leaf, title: 'Promote minimalism', text: 'Encourage intentional buying, repair, reuse, sharing and participation in a circular economy.' },
  { icon: Sprout, title: 'Build biodiversity awareness', text: 'Use nature walks, webinars and content to explain the living systems that support food, water and climate resilience.' },
  { icon: Building2, title: 'Enable green infrastructure', text: 'Promote biophilic spaces, clean energy, natural light, rainwater harvesting and living green systems.' },
]

export default function About() {
  return (
    <>
      <PageHero
  eyebrow="About GreenBe"
  title="We make clean living easier to understand and easier to practise."
  copy="GreenBe is a purpose-driven NGO connecting environmental education with practical tools, healthier habits and community action."
  image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1800&q=85"
  centerEyebrow
/>

      <section className="py-20 sm:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex justify-center sm:justify-start">
  <span className="eyebrow">Our story</span>
</div>
            <h2 className="section-title mt-4">A long-term partner for a lower-carbon way of life.</h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-slate-600 sm:text-lg">
            <p>GreenBe was created around a simple belief: environmental change becomes stronger when people can connect knowledge with action. Climate information can often feel distant, technical or overwhelming. Our role is to translate it into clear choices that fit homes, schools, campuses and communities.</p>
            <p>Our tagline, <strong className="text-brand-900">“Your partner in clean living,”</strong> reflects an ongoing relationship rather than a one-time campaign. Clean living is not limited to personal health. It includes the energy we use, the journeys we make, the products we buy, the waste we create and the way our built spaces interact with nature.</p>
            <p>We combine education with tools people can actively use. That includes sustainability workshops, eco-clubs, plantation management, plastic-reduction campaigns, biodiversity learning and an upcoming public carbon-counting application.</p>
            <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6 sm:p-8">
              <p className="font-display text-xl font-extrabold leading-snug text-brand-950 sm:text-2xl">“Awareness is the beginning. Measured, repeatable action is how change becomes a way of life.”</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-brand-800 p-7 text-white sm:p-10"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-lime"><Target /></span><p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-lime">Our vision</p><h2 className="mt-3 font-display text-3xl font-extrabold">To educate and promote clean living with a reduced carbon footprint.</h2><p className="mt-5 leading-7 text-white/[.65]">We want sustainable choices to become familiar, accessible and normal—especially for the next generation.</p></article>
          <article className="rounded-[2rem] border border-brand-100 bg-white p-7 sm:p-10"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><HeartHandshake /></span><p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Our mission</p><h2 className="mt-3 font-display text-3xl font-extrabold text-brand-950">Design action-based tools that count impact and teach healthier, lower-emission living.</h2><p className="mt-5 leading-7 text-slate-600">We connect human well-being with planetary health through practical measurement, learning and community participation.</p></article>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeading eyebrow="Our objectives" title="Seven connected areas of work, one shared purpose." copy="Each objective supports the same long-term goal: make low-carbon living understandable, measurable and socially supported." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {objectives.map(({ icon: Icon, title, text }, index) => <article key={title} className={`rounded-[1.75rem] border p-6 sm:p-7 ${index === 6 ? 'border-brand-700 bg-brand-800 text-white md:col-span-2 lg:col-span-3' : 'border-brand-100 bg-white'}`}><div className="flex items-center justify-between"><span className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 6 ? 'bg-white/10 text-lime' : 'bg-brand-50 text-brand-700'}`}><Icon /></span><span className={`font-display text-sm font-extrabold ${index === 6 ? 'text-white/30' : 'text-brand-200'}`}>0{index + 1}</span></div><h3 className="mt-6 font-display text-xl font-extrabold">{title}</h3><p className={`mt-3 text-sm leading-6 ${index === 6 ? 'text-white/[.65]' : 'text-slate-600'}`}>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-20 sm:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1500&q=85" alt="Hands planting a young seedling" className="aspect-[4/3] rounded-[2.25rem] object-cover shadow-soft" />
          <div className="max-sm:[&_.eyebrow]:mx-auto max-sm:[&_.eyebrow]:flex max-sm:[&_.eyebrow]:w-fit">
  <SectionHeading
    eyebrow="How we work"
    title="Community participation is not an add-on. It is the method."
    copy="GreenBe programmes are designed to help people understand a problem, take part in a solution and observe progress over time."
  />
            <div className="mt-8 space-y-5">{[['Listen and understand', 'Begin with local habits, challenges and environmental context.'], ['Design practical interventions', 'Create tools, workshops or campaigns that are clear and easy to participate in.'], ['Measure and improve', 'Track outcomes, learn from the community and make the next cycle stronger.']].map(([title, copy], i) => <div key={title} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-sm font-extrabold text-white">{i + 1}</span><div><h3 className="font-display text-lg font-extrabold text-brand-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div></div>)}</div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell rounded-[2.5rem] bg-brand-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <Users className="mx-auto text-lime" size={44} />
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">Clean living grows faster when communities move together.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/[.65]">GreenBe welcomes collaboration with schools, colleges, resident communities, institutions and responsible businesses.</p>
        </div>
      </section>
    </>
  )
}
