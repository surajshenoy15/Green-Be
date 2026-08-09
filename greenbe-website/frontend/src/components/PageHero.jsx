export default function PageHero({ eyebrow, title, copy, image }) {
  return (
    <section className="relative overflow-hidden bg-forest-950 pt-16 text-white sm:pt-20">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-900/30" />
      <div className="container-shell relative py-20 sm:py-28 lg:py-32">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-limeleaf backdrop-blur">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/[.72] sm:text-lg">{copy}</p>
      </div>
    </section>
  )
}
