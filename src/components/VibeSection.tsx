import { fmt } from '../content/pricing.ts'
import { openForm } from '../lib/formBus'
import { useCopy, SECTION_LABEL } from '../lib/useCopy'

export function VibeSection() {
  const { c } = useCopy()
  const v = c.vibe
  return (
    <section id="vibe" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border" aria-labelledby="vibe-title">
      <div className="mb-10 md:mb-14 max-w-3xl">
        <span className={SECTION_LABEL}>{v.label}</span>
        <h2 id="vibe-title" className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{v.title}</h2>
        <p className="text-muted-foreground text-base md:text-lg">{v.msg}</p>
      </div>

      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">{v.stepsTitle}</div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {v.steps.map((s, i) => (
            <li key={i} className="bg-secondary border border-border rounded-xl p-5 flex gap-4 items-start">
              <span className="w-10 h-10 shrink-0 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg">{i + 1}</span>
              <div>
                <h3 className="font-bold text-base mb-1">{s.t}</h3>
                <p className="text-muted-foreground text-sm">{fmt(s.d)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-secondary shadow-sm dark:shadow-none border-2 border-primary rounded-2xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h3 className="font-bold text-xl">{v.checkName}</h3>
              <span className="text-2xl md:text-3xl font-bold text-primary font-mono">{fmt('{vibe}')}</span>
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">{v.checkIncludesTitle}</div>
            <ul className="space-y-3 mb-8 text-sm">
              {v.checkIncludes.map((it, i) => (
                <li key={i} className="flex items-start gap-2.5 text-foreground"><span className="text-primary mt-0.5" aria-hidden="true">✓</span> {fmt(it)}</li>
              ))}
            </ul>
          </div>
          <button
            id="vibe-cta-check"
            onClick={() => openForm({ packageId: 'vibe-check', projectType: 'vibe', source: 'vibe' })}
            className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-bold hover:brightness-110 transition-all active:scale-[0.98] shadow-sm"
          >
            {v.checkCta}
          </button>
        </div>

        <div className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div>
            <h3 className="font-bold text-xl mb-1">{v.netName}</h3>
            <p className="text-xs font-mono text-muted-foreground mb-5">{v.netTag}</p>
            <ul className="space-y-3 mb-8 text-sm">
              {v.netIncludes.map((it, i) => (
                <li key={i} className="flex items-start gap-2.5 text-muted-foreground"><span className="text-primary mt-0.5" aria-hidden="true">✓</span> {fmt(it)}</li>
              ))}
            </ul>
          </div>
          <button
            id="vibe-cta-net"
            onClick={() => openForm({ packageId: 'indie', projectType: 'vibe', source: 'vibe' })}
            className="w-full py-3 px-4 rounded-lg bg-background border border-border text-foreground hover:border-primary hover:text-primary font-mono text-sm font-semibold transition-all active:scale-[0.98]"
          >
            {v.netCta}
          </button>
        </div>
      </div>

      <div className="mt-6 bg-background border border-border rounded-xl p-4 md:p-5" role="note">
        <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">{v.scopeTitle}</div>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
          {v.scopeItems.map((it, i) => <li key={i} className="flex gap-2"><span aria-hidden="true">×</span> {it}</li>)}
        </ul>
      </div>

      <p className="mt-4 text-xs md:text-sm text-muted-foreground">{v.tools}</p>
      <p className="mt-2 text-xs md:text-sm text-foreground font-medium">{v.consent}</p>
    </section>
  )
}
