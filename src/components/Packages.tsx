import { fmt, priceText, type PackageId, type ProjectTypeId } from '../content/pricing.ts'
import { openForm } from '../lib/formBus'
import { useCopy, SECTION_LABEL } from '../lib/useCopy'

const CHECK = <span className="text-primary mt-0.5" aria-hidden="true">✓</span>

interface CardProps {
  id: PackageId
  type: ProjectTypeId
  data: { name: string; who: string; time: string; model: string; items: string[] }
  recommended?: boolean
}

function MainCard({ id, type, data, recommended }: CardProps) {
  const { lang, c } = useCopy()
  const p = c.packages
  const isQuote = id === 'enterprise'
  return (
    <div
      id={`pkg-${id}`}
      className={`bg-secondary relative shadow-sm dark:shadow-none rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-colors ${
        recommended ? 'border-2 border-primary hover:border-primary' : 'border border-border hover:border-primary/40'
      }`}
    >
      {recommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm whitespace-nowrap">
          {p.recommended}
        </div>
      )}
      <div>
        <div className={recommended ? 'mt-1' : ''}>
          <h4 className="font-bold text-xl text-foreground">{data.name}</h4>
          <p className="text-xs text-muted-foreground mt-1"><span className="font-semibold">{p.forWhom}:</span> {data.who}</p>
        </div>
        <div className="flex items-baseline gap-2 my-6 pb-6 border-b border-border">
          <span className="text-2xl md:text-3xl font-bold text-primary font-mono">{priceText(id, lang)}</span>
        </div>
        <dl className="text-xs font-mono text-muted-foreground mb-5 space-y-1">
          <div><dt className="inline font-semibold">{p.duration}: </dt><dd className="inline">{fmt(data.time)}</dd></div>
          <div><dt className="inline font-semibold">{p.model}: </dt><dd className="inline">{fmt(data.model)}</dd></div>
        </dl>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">{p.includes}</div>
        <ul className="space-y-3 mb-8 text-sm">
          {data.items.map((it, i) => (
            <li key={i} className={`flex items-start gap-2.5 ${recommended ? 'text-foreground' : 'text-muted-foreground'}`}>{CHECK} {fmt(it)}</li>
          ))}
        </ul>
      </div>
      <div className="pt-4 border-t border-border/80">
        <button
          id={`pkg-cta-${id}`}
          onClick={() => openForm({ packageId: id, projectType: type, source: 'packages' })}
          className={`w-full py-3 px-4 rounded-lg font-mono text-sm font-bold transition-all active:scale-[0.98] ${
            recommended
              ? 'bg-primary text-primary-foreground hover:brightness-110 shadow-sm'
              : 'bg-background border border-border text-foreground hover:border-primary hover:text-primary font-semibold'
          }`}
        >
          {isQuote ? p.quote : p.start}
        </button>
      </div>
    </div>
  )
}

export function Packages() {
  const { lang, c } = useCopy()
  const p = c.packages
  return (
    <div id="packages" className="pt-10 border-t border-border/60">
      <div className="mb-12">
        <span className={SECTION_LABEL}>{p.label}</span>
        <h3 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">{p.title}</h3>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">{p.sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        <MainCard id="indie" type="individual" data={p.indie} />
        <MainCard id="startup" type="company" data={p.startup} recommended />
        <MainCard id="enterprise" type="company" data={p.enterprise} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
        {/* Hourly support */}
        <div id="pkg-hourly" className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div>
            <h4 className="font-bold text-xl text-foreground">{p.hourly.name}</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-5"><span className="font-semibold">{p.forWhom}:</span> {p.hourly.who}</p>
            <ul className="mb-5 divide-y divide-border border border-border rounded-lg bg-background">
              {p.hourly.rows.map((r, i) => (
                <li key={i} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">{fmt(r.l)}</span>
                  <span className="font-mono font-bold text-primary text-right">{fmt(r.v)}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mb-6">{fmt(p.hourly.note)}</p>
          </div>
          <button
            id="pkg-cta-hourly"
            onClick={() => openForm({ packageId: 'hourly', projectType: 'company', source: 'packages' })}
            className="w-full py-3 px-4 rounded-lg bg-background border border-border text-foreground hover:border-primary hover:text-primary font-mono text-sm font-semibold transition-all active:scale-[0.98]"
          >
            {p.hourly.cta}
          </button>
        </div>

        {/* Monthly regression maintenance */}
        <div id="pkg-monthly" className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div>
            <h4 className="font-bold text-xl text-foreground">{p.monthly.name}</h4>
            <p className="text-xs text-muted-foreground mt-1"><span className="font-semibold">{p.forWhom}:</span> {p.monthly.who}</p>
            <div className="flex items-baseline gap-3 my-5 pb-5 border-b border-border flex-wrap">
              <span className="text-2xl md:text-3xl font-bold text-primary font-mono">{priceText('monthly', lang)}</span>
              <span className="text-xs text-muted-foreground font-mono">{fmt(p.monthly.cap)}</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              {p.monthly.items.map((it, i) => (
                <li key={i} className="flex items-start gap-2.5 text-muted-foreground">{CHECK} {fmt(it)}</li>
              ))}
            </ul>
          </div>
          <button
            id="pkg-cta-monthly"
            onClick={() => openForm({ packageId: 'monthly', projectType: 'company', source: 'packages' })}
            className="w-full py-3 px-4 rounded-lg bg-background border border-border text-foreground hover:border-primary hover:text-primary font-mono text-sm font-semibold transition-all active:scale-[0.98]"
          >
            {p.monthly.cta}
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">{p.mobileNote}</p>
      <p className="text-[11px] font-mono text-muted-foreground/80 mt-2 text-center">{fmt(p.response)}</p>
    </div>
  )
}
