/**
 * SINGLE SOURCE OF TRUTH for every price, duration and hour value on the site.
 * Cards, the form dropdown, the sticky bar, FAQ answers and the form payload
 * all read from this file. Change a number here and it changes everywhere.
 * All prices are USD. No online payment: payment is arranged by e-mail after
 * the quote / scope is approved.
 */

export type Lang = 'en' | 'tr' | 'ar'

export type PackageId = 'vibe-check' | 'indie' | 'startup' | 'monthly' | 'hourly' | 'enterprise'
export type ProjectTypeId = 'individual' | 'company' | 'vibe'
export type SourceCta = 'hero' | 'vibe' | 'packages' | 'sample-report' | 'checklist' | 'footer' | 'sticky' | 'faq' | 'nav'

export const pricing = {
  currency: 'USD',
  vibeCheck: { price: 79, businessDays: 3, maxFlows: 5, retestDays: 7 },
  indie: { from: 349, businessDays: 5 },
  startup: { from: 1200, weeks: '2-3' },
  monthly: { price: 299, hours: 6 },
  hourly: {
    rate: 45,
    packs: [
      { hours: 10, price: 420 },
      { hours: 20, price: 800 },
    ],
    validityMonths: 3,
  },
  response: { businessDays: 1 },
} as const

/** Package order used by the form dropdown. */
export const PACKAGE_IDS: PackageId[] = ['vibe-check', 'indie', 'startup', 'monthly', 'hourly', 'enterprise']

export const PROJECT_TYPE_IDS: ProjectTypeId[] = ['individual', 'company', 'vibe']

/** Turkish readable labels. These are what lands in the e-mail, regardless of UI language. */
export const PROJECT_TYPE_LABEL_TR: Record<ProjectTypeId, string> = {
  individual: 'Bireysel Proje',
  company: 'Şirket Projesi',
  vibe: 'Vibe Coding Projesi',
}

export const PACKAGE_NAME_TR: Record<PackageId, string> = {
  'vibe-check': 'Hızlı Vibe Check',
  indie: 'Indie / Bireysel',
  startup: 'Startup / Ekip',
  monthly: 'Aylık Regresyon Bakımı',
  hourly: 'Saatlik Destek',
  enterprise: 'Kurumsal',
}

export const usd = (n: number) => `$${n.toLocaleString('en-US')}`

/** Price text per language (used on cards and in the dropdown). */
export function priceText(id: PackageId, lang: Lang): string {
  const p = pricing
  switch (id) {
    case 'vibe-check':
      return usd(p.vibeCheck.price)
    case 'indie':
      return lang === 'tr' ? `${usd(p.indie.from)}'dan başlar` : lang === 'ar' ? `يبدأ من ${usd(p.indie.from)}` : `from ${usd(p.indie.from)}`
    case 'startup':
      return lang === 'tr' ? `${usd(p.startup.from)}'den başlar` : lang === 'ar' ? `يبدأ من ${usd(p.startup.from)}` : `from ${usd(p.startup.from)}`
    case 'monthly':
      return lang === 'tr' ? `${usd(p.monthly.price)}/ay` : lang === 'ar' ? `${usd(p.monthly.price)}/شهر` : `${usd(p.monthly.price)}/mo`
    case 'hourly':
      return lang === 'tr' ? `${usd(p.hourly.rate)}/saat` : lang === 'ar' ? `${usd(p.hourly.rate)}/ساعة` : `${usd(p.hourly.rate)}/hour`
    case 'enterprise':
      return lang === 'tr' ? 'Teklif al' : lang === 'ar' ? 'اطلب عرضًا' : 'Get a quote'
  }
}

/** Value sent to the form as `package` (ALWAYS Turkish, independent of UI language). */
export function packagePayload(id: PackageId): string {
  return `${PACKAGE_NAME_TR[id]} — ${priceText(id, 'tr')}`
}

/** Replace {tokens} in copy strings with values from `pricing`. */
export function fmt(text: string): string {
  const p = pricing
  const [p10, p20] = p.hourly.packs
  const tokens: Record<string, string | number> = {
    vibe: usd(p.vibeCheck.price),
    vibeDays: p.vibeCheck.businessDays,
    flows: p.vibeCheck.maxFlows,
    retest: p.vibeCheck.retestDays,
    indie: usd(p.indie.from),
    indieDays: p.indie.businessDays,
    startup: usd(p.startup.from),
    startupWeeks: p.startup.weeks,
    monthly: usd(p.monthly.price),
    monthlyHours: p.monthly.hours,
    rate: usd(p.hourly.rate),
    pack10: usd(p10.price),
    pack10h: p10.hours,
    pack10rate: usd(p10.price / p10.hours),
    pack20: usd(p20.price),
    pack20h: p20.hours,
    pack20rate: usd(p20.price / p20.hours),
    validity: p.hourly.validityMonths,
    respDays: p.response.businessDays,
  }
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in tokens ? String(tokens[k]) : m))
}
