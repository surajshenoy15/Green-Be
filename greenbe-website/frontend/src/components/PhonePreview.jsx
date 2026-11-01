import { ArrowUpRight, Bike, Check, Footprints, Leaf, Recycle, Sparkles, TreePine } from 'lucide-react'

const actions = [
  { icon: Footprints, label: 'Walk more', color: 'bg-brand-50 text-brand-600' },
  { icon: Recycle, label: 'Recycle', color: 'bg-[#F2FCEB] text-[#347914]' },
  { icon: TreePine, label: 'Plant a tree', color: 'bg-brand-50 text-brand-600' },
  { icon: Bike, label: 'Travel smart', color: 'bg-[#F2FCEB] text-[#347914]' },
]

export default function PhonePreview({ className = '' }) {
  return (
    <div className={`relative mx-auto w-[274px] rounded-[43px] border-[9px] border-brand-950 bg-white p-[13px] shadow-[0_32px_75px_-30px_rgba(3,33,63,.48)] sm:w-[302px] ${className}`} aria-label="GreenBe mobile app concept preview">
      <div className="absolute left-1/2 top-[11px] z-10 h-5 w-[91px] -translate-x-1/2 rounded-full bg-brand-950" />
      <div className="relative overflow-hidden rounded-[28px] bg-white pb-3 pt-7">
        <div className="flex items-center justify-between px-3"><img src="/images/logo-1.png" alt="GreenBe" className="h-9 w-auto" /><span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-700"><Leaf size={17} /></span></div>
        <div className="mt-4 px-3"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-slate-400">Your green journey</p><h3 className="mt-1 font-display text-[22px] font-extrabold leading-tight text-brand-950">Every action counts.</h3></div>
        <div className="mx-3 mt-4 rounded-[22px] bg-brand-500 p-4 text-white">
          <div className="flex items-center justify-between"><p className="text-[10px] font-bold text-white/75">MAKE TODAY MATTER</p><Sparkles size={17} className="text-lime" /></div>
          <h4 className="mt-4 font-display text-[22px] font-extrabold leading-tight">A better day starts with you.</h4>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold text-brand-800">Explore actions <ArrowUpRight size={12} /></div>
        </div>
        <div className="mt-5 px-3"><div className="flex items-center justify-between"><h4 className="text-[12px] font-extrabold text-brand-950">Choose your action</h4><span className="text-[10px] font-bold text-brand-600">Explore <ArrowUpRight className="inline" size={11}/></span></div>
          <div className="mt-3 grid grid-cols-2 gap-2">{actions.map(({ icon: Icon, label, color }) => <div key={label} className="rounded-[13px] border border-brand-100 bg-white px-2 py-3 text-center"><span className={`mx-auto grid h-9 w-9 place-items-center rounded-xl ${color}`}><Icon size={18} /></span><p className="mt-2 text-[10px] font-extrabold text-brand-900">{label}</p></div>)}</div>
        </div>
        <div className="mx-3 mt-4 flex items-center gap-2 rounded-xl bg-[#F1FBEA] px-3 py-3"><Check size={15} className="shrink-0 text-[#3B831B]"/><p className="text-[10px] font-bold text-brand-900">Build habits that help the planet.</p></div>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-brand-950" />
      </div>
    </div>
  )
}
