import type { PackageId, ProjectTypeId, SourceCta } from '../content/pricing.ts'

export interface OpenFormDetail {
  packageId: PackageId
  projectType: ProjectTypeId
  source: SourceCta
}

const EVENT = 'zeroescapes:open-form'

/** Scrolls to the contact form and preselects package + project type. */
export function openForm(detail: OpenFormDetail) {
  window.dispatchEvent(new CustomEvent<OpenFormDetail>(EVENT, { detail }))
  document.getElementById('contact')?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

export function onOpenForm(handler: (d: OpenFormDetail) => void) {
  const fn = (e: Event) => handler((e as CustomEvent<OpenFormDetail>).detail)
  window.addEventListener(EVENT, fn)
  return () => window.removeEventListener(EVENT, fn)
}

/** Analytics hook. No provider is installed yet (decision pending). No personal data may be passed. */
export function track(event: string, props?: Record<string, string>) {
  void event
  void props
}
