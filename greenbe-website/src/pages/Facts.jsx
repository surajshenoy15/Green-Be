import { useMemo, useState } from 'react'
import {
  Apple,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BadgeMinus,
  Beef,
  Bike,
  Brush,
  CarFront,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  CircleStop,
  CloudRain,
  Coffee,
  Droplets,
  Fan,
  FileText,
  Flame,
  Flower2,
  Gauge,
  GlassWater,
  Handshake,
  LandPlot,
  Laptop,
  LeafyGreen,
  Lightbulb,
  MapPin,
  MonitorPlay,
  Package,
  PlugZap,
  Rabbit,
  Recycle,
  Route,
  Search,
  Shell,
  Shirt,
  ShoppingBag,
  ShowerHead,
  Shuffle,
  Smartphone,
  Snowflake,
  Sprout,
  Sun,
  ThermometerSun,
  TrainFront,
  Trash2,
  TreePine,
  Trees,
  Users,
  Utensils,
  WashingMachine,
  Waves,
  Wind,
  Wine,
  Wrench,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { factCategories, facts } from '../data/facts'

const iconMap = {
  Apple,
  BadgeCheck,
  BadgeMinus,
  Beef,
  Bike,
  Brush,
  CarFront,
  CircleAlert,
  CircleStop,
  CloudRain,
  Coffee,
  Droplets,
  Fan,
  FileText,
  Flame,
  Flower2,
  Gauge,
  GlassWater,
  Handshake,
  LandPlot,
  Laptop,
  LeafyGreen,
  Lightbulb,
  MapPin,
  MonitorPlay,
  Package,
  PlugZap,
  Rabbit,
  Recycle,
  Route,
  Shell,
  Shirt,
  ShoppingBag,
  ShowerHead,
  Smartphone,
  Snowflake,
  Sprout,
  Sun,
  ThermometerSun,
  TrainFront,
  Trash2,
  TreePine,
  Trees,
  Users,
  Utensils,
  WashingMachine,
  Waves,
  Wind,
  Wine,
  Wrench,
}

const categoryDescriptions = {
  All: 'All 50 climate facts',
  Energy: 'Home energy and electricity',
  Travel: 'Smarter ways to move',
  Food: 'Meals, farming and food waste',
  Waste: 'Repair, reuse and recycling',
  Water: 'Water-saving habits',
  Nature: 'Natural climate solutions',
  Lifestyle: 'Better everyday choices',
}

export default function Facts() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)
  const [expandedIds, setExpandedIds] = useState([])
  const [featuredFact, setFeaturedFact] = useState(facts[0])

  const filteredFacts = useMemo(() => {
    const term = search.trim().toLowerCase()

    return facts.filter((fact) => {
      const matchesCategory =
        activeCategory === 'All' ||
        fact.category === activeCategory

      const matchesSearch =
        !term ||
        fact.title.toLowerCase().includes(term) ||
        fact.summary.toLowerCase().includes(term) ||
        fact.detail.toLowerCase().includes(term) ||
        fact.action.toLowerCase().includes(term) ||
        fact.category.toLowerCase().includes(term)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  const visibleFacts = filteredFacts.slice(0, visibleCount)
  const FeaturedIcon =
    iconMap[featuredFact.icon] || Lightbulb

  function selectCategory(category) {
    setActiveCategory(category)
    setVisibleCount(12)
    setExpandedIds([])
  }

  function toggleFact(id) {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  function showRandomFact() {
    let nextFact = featuredFact

    while (
      nextFact.id === featuredFact.id &&
      facts.length > 1
    ) {
      nextFact =
        facts[Math.floor(Math.random() * facts.length)]
    }

    setFeaturedFact(nextFact)
  }

  function clearSearch() {
    setSearch('')
    setVisibleCount(12)
  }

  return (
    <>
      <PageHero
        eyebrow="Did you know?"
        title="50 surprising facts that make climate action easier to understand."
        copy="Explore quick facts about energy, travel, food, waste, water and nature. Open any card to discover why it matters and one action you can try today."
        image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1800&q=85"
      />

      {/* Featured fact */}
      <section className="py-20 sm:py-28">
  <div className="container-shell">
    <div className="group relative overflow-hidden rounded-[2rem] border border-forest-100 bg-white shadow-soft sm:rounded-[3rem]">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-limeleaf/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-forest-200/20 blur-3xl" />

      <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left visual panel */}
        <div className="relative isolate min-h-[390px] overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-forest-700 p-7 text-white sm:p-10 lg:min-h-[610px] lg:p-12">
          {/* Decorative pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '26px 26px',
            }}
          />

          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[45px] border-limeleaf/10" />

          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-limeleaf/10 blur-3xl" />

          <div className="relative flex h-full flex-col">
            {/* Top label */}
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-limeleaf backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-limeleaf opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-limeleaf" />
                </span>

                Fact spotlight
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-white/60 backdrop-blur-md">
                {String(featuredFact.id).padStart(2, '0')} / 50
              </span>
            </div>

            {/* Icon */}
            <div className="mt-10">
              <div className="relative inline-flex">
                <div className="absolute inset-0 rounded-[1.75rem] bg-limeleaf/30 blur-xl" />

                <div className="relative grid h-20 w-20 place-items-center rounded-[1.75rem] border border-white/20 bg-white/10 text-limeleaf shadow-2xl backdrop-blur-xl">
                  <FeaturedIcon
                    size={36}
                    strokeWidth={1.9}
                  />
                </div>
              </div>
            </div>

            {/* Main value */}
            <div className="mt-auto pt-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                The surprising number
              </p>

              <p className="mt-3 break-words font-display text-5xl font-extrabold leading-none tracking-tight text-limeleaf sm:text-6xl lg:text-7xl">
                {featuredFact.value}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-limeleaf px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-forest-950">
                  {featuredFact.category}
                </span>

                <span className="text-sm font-medium text-white/50">
                  Climate fact #{featuredFact.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right content panel */}
        <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-14 xl:p-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-forest-300" />

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-forest-700">
                Today’s climate insight
              </p>
            </div>

            <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-forest-950 sm:text-4xl lg:text-[2.75rem]">
              {featuredFact.title}
            </h2>

            <p className="mt-6 text-lg font-medium leading-8 text-forest-800">
              {featuredFact.summary}
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {featuredFact.detail}
            </p>

            {/* Action card */}
            <div className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-forest-100 bg-forest-50 p-5 sm:p-6">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-limeleaf/20 blur-2xl" />

              <div className="relative flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-700 text-white shadow-lg shadow-forest-900/10">
                  <ArrowRight size={20} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-forest-700">
                    Try this today
                  </p>

                  <p className="mt-2 font-display text-lg font-bold leading-7 text-forest-950">
                    {featuredFact.action}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={showRandomFact}
                className="btn-primary justify-center sm:justify-start"
              >
                <Shuffle size={17} />
                Show another fact
              </button>

              <a
                href={featuredFact.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary justify-center border-forest-200 text-forest-800 hover:border-forest-700 hover:bg-forest-700 hover:text-white sm:justify-start"
              >
                View official source
                <ArrowUpRight size={17} />
              </a>
            </div>

            {/* Source */}
            <div className="mt-8 flex items-start gap-3 border-t border-forest-100 pt-6">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-limeleaf ring-4 ring-limeleaf/20" />

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Verified information
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Source: {featuredFact.source}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Facts section */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Explore all facts"
            title="Find the climate topic that interests you."
            copy="The short version is visible first. Tap “Read more” when a fact catches your attention to reveal the explanation, action and source."
            align="center"
          />

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setVisibleCount(12)
                }}
                placeholder="Search facts, topics or actions..."
                className="w-full rounded-full border border-forest-100 bg-white py-4 pl-12 pr-12 text-sm text-forest-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-forest-400 focus:ring-4 focus:ring-forest-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-forest-50 hover:text-forest-800"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {factCategories.map((category) => {
              const count =
                category === 'All'
                  ? facts.length
                  : facts.filter(
                      (fact) =>
                        fact.category === category
                    ).length

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    selectCategory(category)
                  }
                  className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                    activeCategory === category
                      ? 'border-forest-700 bg-forest-700 text-white shadow-lg shadow-forest-900/10'
                      : 'border-forest-100 bg-white text-slate-600 hover:border-forest-300 hover:text-forest-700'
                  }`}
                >
                  {category}

                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      activeCategory === category
                        ? 'bg-white/15 text-white'
                        : 'bg-forest-50 text-forest-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Progress */}
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-forest-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="font-display text-lg font-extrabold text-forest-950">
                {activeCategory}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {categoryDescriptions[activeCategory]}
              </p>
            </div>

            <div className="w-full sm:max-w-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Facts explored</span>

                <span>
                  {Math.min(
                    visibleCount,
                    filteredFacts.length
                  )}{' '}
                  of {filteredFacts.length}
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-forest-50">
                <div
                  className="h-full rounded-full bg-forest-700 transition-all duration-500"
                  style={{
                    width: filteredFacts.length
                      ? `${Math.min(
                          100,
                          (Math.min(
                            visibleCount,
                            filteredFacts.length
                          ) /
                            filteredFacts.length) *
                            100
                        )}%`
                      : '0%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Cards */}
          {visibleFacts.length > 0 ? (
            <div className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visibleFacts.map((fact, index) => {
                const Icon =
                  iconMap[fact.icon] || Lightbulb

                const expanded =
                  expandedIds.includes(fact.id)

                const highlighted =
                  index === 0 &&
                  !search &&
                  activeCategory === 'All'

                return (
                  <article
                    key={fact.id}
                    className={`group overflow-hidden rounded-[1.75rem] border transition duration-300 hover:-translate-y-1 hover:shadow-soft ${
                      highlighted
                        ? 'border-forest-800 bg-forest-800 text-white'
                        : 'border-forest-100 bg-white text-forest-950'
                    }`}
                  >
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition ${
                            highlighted
                              ? 'bg-white/10 text-limeleaf'
                              : 'bg-forest-50 text-forest-700 group-hover:bg-forest-700 group-hover:text-white'
                          }`}
                        >
                          <Icon size={23} />
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            highlighted
                              ? 'bg-white/10 text-limeleaf'
                              : 'bg-forest-50 text-forest-700'
                          }`}
                        >
                          {fact.category}
                        </span>
                      </div>

                      <p
                        className={`mt-7 font-display text-2xl font-extrabold ${
                          highlighted
                            ? 'text-limeleaf'
                            : 'text-forest-700'
                        }`}
                      >
                        {fact.value}
                      </p>

                      <h3 className="mt-2 font-display text-xl font-extrabold leading-snug">
                        {fact.title}
                      </h3>

                      <p
                        className={`mt-3 text-sm leading-6 ${
                          highlighted
                            ? 'text-white/65'
                            : 'text-slate-600'
                        }`}
                      >
                        {fact.summary}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          toggleFact(fact.id)
                        }
                        aria-expanded={expanded}
                        className={`mt-5 inline-flex items-center gap-2 text-sm font-bold transition ${
                          highlighted
                            ? 'text-limeleaf hover:text-white'
                            : 'text-forest-700 hover:text-forest-950'
                        }`}
                      >
                        {expanded
                          ? 'Show less'
                          : 'Read more'}

                        {expanded ? (
                          <ChevronUp size={17} />
                        ) : (
                          <ChevronDown size={17} />
                        )}
                      </button>

                      {expanded && (
                        <div
                          className={`mt-5 border-t pt-5 ${
                            highlighted
                              ? 'border-white/10'
                              : 'border-forest-100'
                          }`}
                        >
                          <p
                            className={`text-sm leading-6 ${
                              highlighted
                                ? 'text-white/65'
                                : 'text-slate-600'
                            }`}
                          >
                            {fact.detail}
                          </p>

                          <div
                            className={`mt-5 rounded-2xl p-4 ${
                              highlighted
                                ? 'bg-white/[.08]'
                                : 'bg-forest-50'
                            }`}
                          >
                            <p
                              className={`text-xs font-bold uppercase tracking-[0.14em] ${
                                highlighted
                                  ? 'text-limeleaf'
                                  : 'text-forest-700'
                              }`}
                            >
                              Try this
                            </p>

                            <p className="mt-2 text-sm font-semibold leading-6">
                              {fact.action}
                            </p>
                          </div>

                          <a
                            href={fact.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold ${
                              highlighted
                                ? 'text-white/55 hover:text-white'
                                : 'text-slate-500 hover:text-forest-700'
                            }`}
                          >
                            Source: {fact.source}
                            <ArrowUpRight size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.75rem] border border-forest-100 bg-white px-6 py-16 text-center">
              <Search
                className="mx-auto text-forest-300"
                size={42}
              />

              <h3 className="mt-5 font-display text-2xl font-extrabold text-forest-950">
                No facts found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-slate-600">
                Try a different word or clear the search
                to continue exploring all 50 facts.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="btn-primary mt-6"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Load more */}
          {visibleCount < filteredFacts.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount(
                    (count) => count + 12
                  )
                }
                className="btn-primary"
              >
                Show 12 more facts
                <ArrowRight size={17} />
              </button>

              <p className="mt-3 text-sm text-slate-500">
                {filteredFacts.length - visibleCount}{' '}
                more waiting to be discovered
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="container-shell">
          <div className="overflow-hidden rounded-[2.5rem] bg-forest-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <Recycle
              className="mx-auto text-limeleaf"
              size={44}
            />

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-limeleaf">
              Facts become powerful through action
            </p>

            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-extrabold sm:text-5xl">
              Which part of your footprint should you
              improve first?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65">
              Use the GreenBe calculator to understand
              your current habits, then return to these
              facts for practical ideas you can apply.
            </p>

            <Link
              to="/calculator"
              className="btn-primary mt-8 bg-limeleaf text-forest-950 hover:bg-white"
            >
              Measure your impact
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}