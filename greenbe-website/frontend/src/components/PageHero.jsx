export default function PageHero({ eyebrow, title, copy, image }) {
  return (
    <section className="relative overflow-hidden border-b border-brand-100 bg-brand-50 pt-[76px] sm:pt-[86px]">
      <div className="container-shell grid min-h-[460px] items-center gap-9 py-14 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:py-24">
        <div className="relative z-10">
          <span className="eyebrow"><span className="h-2 w-2 rounded-full bg-lime" />{eyebrow}</span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.09] tracking-[-.045em] text-brand-950 sm:text-5xl lg:text-[3.6rem]">{title}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{copy}</p>
          <span className="mt-8 block h-1.5 w-20 rounded-full bg-lime" aria-hidden="true" />
        </div>
        {image && <div className="relative min-h-[280px] sm:min-h-[350px]">
          <div className="absolute -right-3 -top-3 h-[85%] w-[87%] rounded-[2rem] border-2 border-brand-200 sm:-right-5 sm:-top-5" />
          <img src={image} alt="" className="relative aspect-[1.35] h-full w-full rounded-[2rem] object-cover shadow-float sm:aspect-[1.25]" />
          <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-float sm:-bottom-6 sm:-left-6"><span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-brand-950">✦</span><span className="text-xs font-extrabold uppercase tracking-wider text-brand-900">Small actions. Real change.</span></div>
        </div>}
      </div>
    </section>
  )
}
