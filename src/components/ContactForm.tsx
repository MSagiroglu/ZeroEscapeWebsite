import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  PACKAGE_IDS,
  PROJECT_TYPE_IDS,
  fmt,
  priceText,
  type PackageId,
  type ProjectTypeId,
  type SourceCta,
} from '../content/pricing.ts'
import { onOpenForm, track } from '../lib/formBus'
import { buildPayload, normalizeProjectUrl } from '../lib/payload'
import { useCopy } from '../lib/useCopy'
import { useAppContext } from '../lib/Context'

const ENDPOINT = 'https://formspree.io/f/mzdwlovz' // existing Formspree endpoint, unchanged
const FIELD =
  'bg-background border border-border rounded-lg p-3.5 focus:outline-none focus:border-primary transition-colors text-sm text-foreground'
const LABEL = 'text-xs font-mono text-primary uppercase tracking-widest'

export function ContactForm() {
  const { t } = useAppContext()
  const { lang, c } = useCopy()
  const f = c.form
  const formRef = useRef<HTMLFormElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [packageId, setPackageId] = useState<PackageId>('vibe-check')
  const [projectType, setProjectType] = useState<ProjectTypeId>('vibe')
  const [source, setSource] = useState<SourceCta>('footer')
  const [consent, setConsent] = useState(false)
  const [urlError, setUrlError] = useState(false)

  useEffect(
    () =>
      onOpenForm((d) => {
        setPackageId(d.packageId)
        setProjectType(d.projectType)
        setSource(d.source)
        setStatus((s) => (s === 'success' ? 'idle' : s))
      }),
    [],
  )

  const pkgName = (id: PackageId) => {
    const p = c.packages
    switch (id) {
      case 'vibe-check': return c.vibe.checkName
      case 'indie': return p.indie.name
      case 'startup': return p.startup.name
      case 'monthly': return p.monthly.name
      case 'hourly': return p.hourly.name
      case 'enterprise': return p.enterprise.name
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!consent || status === 'sending') return
    const fd = new FormData(e.currentTarget)
    const rawUrl = String(fd.get('project_url') ?? '')
    if (!normalizeProjectUrl(rawUrl).ok) {
      setUrlError(true)
      urlRef.current?.focus()
      return
    }
    setUrlError(false)
    const payload = buildPayload({
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      projectUrl: rawUrl,
      projectType,
      packageId,
      lang,
      source,
      honeypot: String(fd.get('_gotcha') ?? ''),
    })
    const body = new FormData()
    Object.entries(payload).forEach(([k, v]) => body.append(k, v))
    setStatus('sending')
    try {
      const resp = await fetch(ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } })
      if (!resp.ok) throw new Error('Server error')
      setStatus('success')
      track('form_submit_success', { package_id: packageId })
    } catch {
      setStatus('error')
      track('form_submit_error', { package_id: packageId })
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
      <div className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-2xl md:rounded-3xl p-6 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              {t('cta_title')} <span className="text-primary">{t('cta_title_em')}</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">{fmt(t('cta_p'))}</p>
            <div className="bg-background/60 border border-border rounded-xl p-5 mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">{f.nextTitle}</div>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal ps-5">
                {f.next.map((n, i) => <li key={i}>{fmt(n)}</li>)}
              </ol>
              <p className="text-xs text-foreground font-medium mt-4">{f.warn}</p>
            </div>
            <div className="flex flex-col gap-4 text-sm font-mono text-muted-foreground">
              <div className="flex items-center gap-3 pt-2 text-primary font-medium">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center" aria-hidden="true">✉</span>
                <a href="mailto:hello@zeroescapes.dev" className="hover:underline">{f.contactLine}</a>
              </div>
            </div>
          </div>

          <div aria-live="polite">
            {status === 'success' ? (
              <div role="status" className="flex flex-col items-center justify-center py-12 text-center bg-background/50 rounded-xl border border-primary/30 p-8">
                <span className="text-4xl mb-4" aria-hidden="true">✅</span>
                <div className="text-xl font-bold text-primary mb-2">{f.okTitle}</div>
                <p className="text-muted-foreground text-sm max-w-sm mb-4">{fmt(f.okBody)}</p>
                <p className="text-xs font-mono text-muted-foreground">{fmt(c.packages.response)}</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
                {/* Honeypot (Formspree documented name: _gotcha) */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-type" className={LABEL}>{f.projectType}</label>
                  <select id="form-type" name="project_type" value={projectType} onChange={(e) => setProjectType(e.target.value as ProjectTypeId)} className={FIELD}>
                    {PROJECT_TYPE_IDS.map((id) => <option key={id} value={id}>{f.projectTypes[id]}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-package" className={LABEL}>{f.package}</label>
                  <select id="form-package" name="package" value={packageId} onChange={(e) => setPackageId(e.target.value as PackageId)} className={FIELD}>
                    {PACKAGE_IDS.map((id) => <option key={id} value={id}>{pkgName(id)} — {priceText(id, lang)}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className={LABEL}>{f.name}</label>
                    <input id="form-name" required type="text" name="name" autoComplete="name" className={FIELD} placeholder={t('form_name_ph')} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className={LABEL}>{f.email}</label>
                    <input id="form-email" required type="email" name="email" autoComplete="email" className={FIELD} placeholder={t('form_email_ph')} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-url" className={LABEL}>{f.url}</label>
                  <input
                    id="form-url"
                    ref={urlRef}
                    type="text"
                    inputMode="url"
                    name="project_url"
                    autoComplete="url"
                    autoCapitalize="none"
                    spellCheck={false}
                    className={FIELD}
                    placeholder={f.urlPh}
                    aria-invalid={urlError}
                    aria-describedby={urlError ? 'form-url-error' : undefined}
                    onChange={() => urlError && setUrlError(false)}
                  />
                  {urlError && <p id="form-url-error" role="alert" className="text-destructive text-xs">{f.urlInvalid}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className={LABEL}>{f.message}</label>
                  <textarea id="form-message" required name="message" rows={4} className={`${FIELD} resize-y`} placeholder={f.messagePh}></textarea>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input id="form-consent" required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer" />
                  <label htmlFor="form-consent" className="text-xs text-muted-foreground cursor-pointer">
                    {f.consentPrefix}{' '}
                    <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="text-primary underline">{f.consentLink}</a>.
                  </label>
                </div>

                {status === 'error' && <p role="alert" className="text-destructive text-sm">{f.err}</p>}

                <button
                  id="form-submit"
                  type="submit"
                  disabled={status === 'sending' || !consent}
                  className="bg-primary text-primary-foreground font-bold py-3.5 px-8 rounded-lg hover:brightness-110 transition-all w-full md:w-auto self-start flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                >
                  {status === 'sending' ? f.sending : f.submit}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 rtl:rotate-180" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
