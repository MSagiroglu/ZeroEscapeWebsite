import { useRef, useState, type KeyboardEvent } from 'react'
import report from '../content/sample-report.json'
import { openForm } from '../lib/formBus'
import { useCopy, SECTION_LABEL } from '../lib/useCopy'
import type { Lang } from '../content/pricing.ts'

type L10n = Record<Lang, string>
type L10nList = Record<Lang, string[]>
const T = (o: L10n, lang: Lang) => o[lang] || o.en

const statusClass: Record<string, string> = {
  PASS: 'text-primary border-primary/40 bg-primary/10',
  WARN: 'text-foreground border-border bg-background',
  FAIL: 'text-destructive border-destructive/50 bg-destructive/10',
}

export function SampleReport() {
  const { lang, c } = useCopy()
  const r = c.report
  const [tab, setTab] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = r.tabs.length - 1
    let next = tab
    if (e.key === 'ArrowRight') next = tab === last ? 0 : tab + 1
    else if (e.key === 'ArrowLeft') next = tab === 0 ? last : tab - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setTab(next)
    tabRefs.current[next]?.focus()
  }

  const PanelTag = () => (
    <span className="inline-block mb-4 px-2 py-1 text-xs font-mono border border-border rounded bg-background text-muted-foreground">{r.panelTag}</span>
  )

  return (
    <div id="sample-report" className="pt-16 mt-16 border-t border-border/60 scroll-mt-20">
      <div className="mb-8">
        <span className={SECTION_LABEL}>{r.label}</span>
        <h3 id="sample-report-title" className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">{r.title}</h3>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">{r.sub}</p>
      </div>

      {/* Honesty badge: outside the tabs, always visible, not dismissible. */}
      <div
        id="sample-report-badge"
        role="note"
        data-honesty-badge
        className="w-full mb-6 flex items-start gap-3 bg-secondary border-2 border-primary/60 rounded-xl p-4 text-base text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 shrink-0 text-primary mt-0.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16.5v.01" strokeLinecap="round" />
        </svg>
        <p className="font-medium">{r.badge}</p>
      </div>

      <div className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-2xl overflow-hidden">
        <div role="tablist" aria-label={r.tablist} className="flex overflow-x-auto border-b border-border bg-background/50">
          {r.tabs.map((label, i) => (
            <button
              key={i}
              ref={(el) => { tabRefs.current[i] = el }}
              role="tab"
              id={`report-tab-${i}`}
              aria-selected={tab === i}
              aria-controls={`report-panel-${i}`}
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
              onKeyDown={onKey}
              className={`px-4 py-3 text-xs md:text-sm font-mono whitespace-nowrap border-b-2 transition-colors ${
                tab === i ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab 1 */}
        <div role="tabpanel" id="report-panel-0" aria-labelledby="report-tab-0" hidden={tab !== 0} className="p-5 md:p-8">
          <PanelTag />
          <dl className="grid gap-4 mb-6 text-sm">
            <div><dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{r.app}</dt><dd className="font-semibold">{T(report.appName as L10n, lang)}</dd></div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{r.verdictLabel}</dt>
              <dd className="font-bold text-lg text-primary">{T(report.verdict as L10n, lang)}</dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{r.envLabel}</dt>
              <dd><ul className="flex flex-wrap gap-2 mt-1">{(report.environments as L10nList)[lang].map((e) => <li key={e} className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">{e}</li>)}</ul></dd>
            </div>
          </dl>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-start border border-border rounded-lg">
              <thead className="bg-background text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <tr><th scope="col" className="p-3 text-start">{r.flowCol}</th><th scope="col" className="p-3 text-start">{r.statusCol}</th></tr>
              </thead>
              <tbody>
                {report.flows.map((f, i) => {
                  const note = T(f.note as L10n, lang)
                  const sev = 'severity' in f ? T(f.severity as L10n, lang) : ''
                  return (
                    <tr key={i} className="border-t border-border align-top">
                      <td className="p-3">
                        <div className="font-medium">{T(f.name as L10n, lang)}</div>
                        {note && <div className="text-xs text-muted-foreground mt-1">{note}</div>}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 rounded border text-xs font-mono font-bold ${statusClass[f.status]}`}>
                          {r.status[f.status as 'PASS' | 'WARN' | 'FAIL']}{sev ? `, ${sev}` : ''}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tab 2 */}
        <div role="tabpanel" id="report-panel-1" aria-labelledby="report-tab-1" hidden={tab !== 1} className="p-5 md:p-8">
          <PanelTag />
          <div className="grid gap-5">
            {report.bugs.map((b) => (
              <article key={b.id} className="bg-background border border-border rounded-xl p-5">
                <header className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono font-bold text-primary">{b.id}</span>
                  <span className="px-2 py-0.5 border border-destructive/50 text-destructive rounded text-xs font-mono font-bold">{T(b.severity as L10n, lang)}</span>
                </header>
                <h4 className="font-bold mb-3">{T(b.title as L10n, lang)}</h4>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">{r.steps}</div>
                <ol className="list-decimal ps-5 text-sm text-muted-foreground space-y-1 mb-3">{(b.steps as L10nList)[lang].map((s) => <li key={s}>{s}</li>)}</ol>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                  <div><div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">{r.expected}</div><p className="text-muted-foreground">{T(b.expected as L10n, lang)}</p></div>
                  <div><div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">{r.actual}</div><p className="text-muted-foreground">{T(b.actual as L10n, lang)}</p></div>
                </div>
                <div className="text-xs font-mono text-muted-foreground"><span className="uppercase tracking-widest">{r.evidence}:</span> {T(b.evidence as L10n, lang)}</div>
              </article>
            ))}
          </div>
        </div>

        {/* Tab 3: code and CI output are never translated */}
        <div role="tabpanel" id="report-panel-2" aria-labelledby="report-tab-2" hidden={tab !== 2} className="p-5 md:p-8">
          <PanelTag />
          <div className="text-xs font-mono text-muted-foreground mb-2" dir="ltr">{report.code.file}</div>
          <pre dir="ltr" className="bg-background border border-border rounded-xl p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed text-start"><code>{report.code.source}</code></pre>
          <div className="mt-5">
            <span className="inline-block mb-2 px-2 py-1 text-xs font-mono border border-border rounded bg-background text-muted-foreground">{r.ciLabel}</span>
            <pre dir="ltr" className="bg-background border border-border rounded-xl p-4 overflow-x-auto text-xs font-mono leading-relaxed text-start"><code>{report.code.ci.join('\n')}</code></pre>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          id="sample-report-open"
          href={`/sample-qa-audit-report.html?lang=${lang}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-background border border-border px-6 py-3 text-sm font-mono font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
        >
          {r.open}
        </a>
        <button
          id="sample-report-want"
          onClick={() => openForm({ packageId: 'vibe-check', projectType: 'vibe', source: 'sample-report' })}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-mono font-bold text-primary-foreground hover:brightness-110 transition-all active:scale-[0.98]"
        >
          {r.want}
        </button>
      </div>
    </div>
  )
}
