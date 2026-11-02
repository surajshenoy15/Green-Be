import { useMemo, useState } from 'react'
import { AlertCircle, Bus, Car, ChevronDown, Flame, Leaf, Lightbulb, Plane, Recycle, RotateCcw, Sprout, Train, Utensils, Zap } from 'lucide-react'
import PageHero from '../components/PageHero'

const defaults = {
  people: 4,
  electricity: 180,
  lpg: 1,
  carKm: 80,
  carType: 'petrol',
  twoWheelerKm: 40,
  busKm: 25,
  trainKm: 10,
  flightKm: 0,
  redMeatMeals: 1,
  otherMeatMeals: 4,
  dairyServings: 7,
  wasteKg: 8,
  recycling: 30,
}

const carFactors = { petrol: 0.192, diesel: 0.171, hybrid: 0.105, electric: 0.071 }

function Field({ label, suffix, hint, children }) {
  return <label className="block"><span className="text-sm font-bold text-slate-800">{label}</span>{children}{hint && <span className="mt-1.5 block text-xs leading-5 text-slate-500">{hint}</span>}{suffix && <span className="sr-only">{suffix}</span>}</label>
}

function NumberInput({ value, onChange, min = 0, max, step = 1, suffix }) {
  return <div className="relative"><input className="input-field pr-20" type="number" min={min} max={max} step={step} value={value} onChange={e => onChange(Math.max(0, Number(e.target.value) || 0))} /><span className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-xs font-semibold text-slate-400">{suffix}</span></div>
}

export default function Calculator() {
  const [values, setValues] = useState(defaults)
  const update = (key, value) => setValues(current => ({ ...current, [key]: value }))

  const result = useMemo(() => {
    const energy = values.electricity * 12 * 0.71 + values.lpg * 12 * 43
    const mobility = values.carKm * 52 * carFactors[values.carType] + values.twoWheelerKm * 52 * 0.08 + values.busKm * 52 * 0.104 + values.trainKm * 52 * 0.041 + values.flightKm * 0.125
    const food = values.redMeatMeals * 52 * 5 + values.otherMeatMeals * 52 * 2.5 + values.dairyServings * 52 * 0.4
    const recycleAdjustment = 1 - Math.min(values.recycling, 100) / 100 * 0.5
    const waste = values.wasteKg * 52 * 0.45 * recycleAdjustment
    const total = energy + mobility + food + waste
    return { energy, mobility, food, waste, total, perPerson: total / Math.max(1, values.people) }
  }, [values])

  const breakdown = [
    { key: 'energy', label: 'Home energy', icon: Zap, value: result.energy },
    { key: 'mobility', label: 'Mobility', icon: Car, value: result.mobility },
    { key: 'food', label: 'Food choices', icon: Utensils, value: result.food },
    { key: 'waste', label: 'Household waste', icon: Recycle, value: result.waste },
  ]
  const max = Math.max(...breakdown.map(item => item.value), 1)
  const totalTons = result.total / 1000
  const perPersonTons = result.perPerson / 1000
  const trees = Math.ceil(totalTons / 0.06)
  const biggest = [...breakdown].sort((a,b) => b.value - a.value)[0]

  return (
    <>
      <PageHero
  eyebrow="Carbon footprint calculator"
  title="See where your everyday emissions may be coming from."
  copy="Enter a few household and lifestyle details to receive a simple annual estimate, category breakdown and practical next steps."
  image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=85"
  centerEyebrow
/>
      <section className="bg-cream py-12 sm:py-20">
        <div className="container-shell grid gap-8 xl:grid-cols-[1.15fr_.85fr] xl:items-start">
          <div className="space-y-6">
            <div className="card p-5 sm:p-8"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Zap /></span><div><h2 className="font-display text-2xl font-extrabold text-brand-950">Home energy</h2><p className="mt-1 text-sm leading-6 text-slate-500">Monthly electricity and cooking-gas use.</p></div></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="People in household"><NumberInput value={values.people} onChange={v => update('people', v)} min={1} max={20} suffix="people" /></Field><Field label="Electricity used each month"><NumberInput value={values.electricity} onChange={v => update('electricity', v)} suffix="kWh" /></Field><Field label="LPG cylinders each month" hint="Assumes a standard 14.2 kg domestic cylinder."><NumberInput value={values.lpg} onChange={v => update('lpg', v)} step={0.5} suffix="cylinders" /></Field></div></div>

            <div className="card p-5 sm:p-8"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Car /></span><div><h2 className="font-display text-2xl font-extrabold text-brand-950">Travel and mobility</h2><p className="mt-1 text-sm leading-6 text-slate-500">Enter an average week, plus annual flight distance.</p></div></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Car fuel type"><div className="relative"><select className="input-field appearance-none pr-10" value={values.carType} onChange={e => update('carType', e.target.value)}><option value="petrol">Petrol car</option><option value="diesel">Diesel car</option><option value="hybrid">Hybrid car</option><option value="electric">Electric car</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-slate-400" size={18} /></div></Field><Field label="Car distance per week"><NumberInput value={values.carKm} onChange={v => update('carKm', v)} suffix="km" /></Field><Field label="Two-wheeler distance per week"><NumberInput value={values.twoWheelerKm} onChange={v => update('twoWheelerKm', v)} suffix="km" /></Field><Field label="Bus distance per week"><NumberInput value={values.busKm} onChange={v => update('busKm', v)} suffix="km" /></Field><Field label="Train or metro distance per week"><NumberInput value={values.trainKm} onChange={v => update('trainKm', v)} suffix="km" /></Field><Field label="Flight distance per year"><NumberInput value={values.flightKm} onChange={v => update('flightKm', v)} suffix="km" /></Field></div><div className="mt-6 grid grid-cols-4 gap-2 text-center text-xs text-slate-500"><div><Car className="mx-auto mb-1 text-brand-600" size={19}/>Car</div><div><Bus className="mx-auto mb-1 text-brand-600" size={19}/>Bus</div><div><Train className="mx-auto mb-1 text-brand-600" size={19}/>Rail</div><div><Plane className="mx-auto mb-1 text-brand-600" size={19}/>Flight</div></div></div>

            <div className="card p-5 sm:p-8"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Utensils /></span><div><h2 className="font-display text-2xl font-extrabold text-brand-950">Food choices</h2><p className="mt-1 text-sm leading-6 text-slate-500">A simplified weekly estimate for higher-impact meal choices.</p></div></div><div className="mt-7 grid gap-5 sm:grid-cols-3"><Field label="Red-meat meals"><NumberInput value={values.redMeatMeals} onChange={v => update('redMeatMeals', v)} suffix="per week" /></Field><Field label="Other meat meals"><NumberInput value={values.otherMeatMeals} onChange={v => update('otherMeatMeals', v)} suffix="per week" /></Field><Field label="Dairy servings"><NumberInput value={values.dairyServings} onChange={v => update('dairyServings', v)} suffix="per week" /></Field></div></div>

            <div className="card p-5 sm:p-8"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Recycle /></span><div><h2 className="font-display text-2xl font-extrabold text-brand-950">Waste</h2><p className="mt-1 text-sm leading-6 text-slate-500">Estimate mixed household waste and how much is recycled.</p></div></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Mixed waste per week"><NumberInput value={values.wasteKg} onChange={v => update('wasteKg', v)} suffix="kg" /></Field><Field label="Recycling rate"><NumberInput value={values.recycling} onChange={v => update('recycling', Math.min(100, v))} max={100} suffix="%" /></Field></div></div>
          </div>

          <aside className="xl:sticky xl:top-24">
            <div className="overflow-hidden rounded-[2rem] bg-brand-950 text-white shadow-soft">
              <div className="p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">Estimated annual footprint</p><div className="mt-3 flex items-end gap-2"><span className="font-display text-5xl font-extrabold sm:text-6xl">{totalTons.toFixed(1)}</span><span className="pb-2 text-sm text-white/60">tCO₂e / year</span></div></div><Leaf className="text-lime" size={40} /></div><p className="mt-4 text-sm leading-6 text-white/60">About <strong className="text-white">{perPersonTons.toFixed(1)} tCO₂e per person</strong> based only on the activities entered.</p></div>
              <div className="border-y border-white/10 bg-white/[.04] p-6 sm:p-8"><h3 className="font-display text-lg font-extrabold">Your breakdown</h3><div className="mt-5 space-y-5">{breakdown.map(({ label, icon: Icon, value }) => <div key={label}><div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 font-semibold"><Icon size={16} className="text-lime" />{label}</span><span className="text-white/60">{(value / 1000).toFixed(2)} t</span></div><div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-lime transition-all" style={{ width: `${Math.max(3, value / max * 100)}%` }} /></div></div>)}</div></div>
              <div className="p-6 sm:p-8"><div className="rounded-2xl bg-white/10 p-4"><div className="flex gap-3"><Lightbulb className="shrink-0 text-lime" size={20} /><p className="text-sm leading-6 text-white/75"><strong className="text-white">Your largest measured category is {biggest.label.toLowerCase()}.</strong> Start there for the most visible improvement.</p></div></div><div className="mt-4 rounded-2xl border border-white/10 p-4"><div className="flex gap-3"><Sprout className="shrink-0 text-lime" size={20} /><p className="text-sm leading-6 text-white/70">For scale, this estimate is similar to the annual sequestration of roughly <strong className="text-white">{trees} urban trees</strong>, using a broad EPA equivalency.</p></div></div><button onClick={() => setValues(defaults)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime hover:text-white"><RotateCcw size={16} /> Reset example values</button></div>
            </div>
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="flex gap-3"><AlertCircle className="mt-0.5 shrink-0 text-amber-700" size={19} /><p className="text-xs leading-5 text-amber-900">This is an educational estimate, not a certified carbon inventory. Food, vehicle and waste factors are simplified averages and can vary by location, technology, occupancy and supply chain.</p></div></div>
          </aside>
        </div>
      </section>

      <section className="py-20"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{[
        { icon: Flame, title: 'Use electricity intentionally', text: 'Track monthly consumption, improve cooling efficiency and choose high-efficiency appliances when replacement is necessary.' },
        { icon: Car, title: 'Reduce private kilometres', text: 'Combine trips, share rides and shift suitable journeys to walking, cycling or public transport.' },
        { icon: Recycle, title: 'Prevent waste first', text: 'Reuse and repair before recycling. Plan food purchases and avoid products designed for a single use.' },
      ].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-[1.75rem] bg-brand-50 p-6 sm:p-8"><Icon className="text-brand-700" /><h3 className="mt-5 font-display text-xl font-extrabold text-brand-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></div></section>
    </>
  )
}
