import {
  PACKAGE_NAME_TR,
  PROJECT_TYPE_LABEL_TR,
  packagePayload,
  type Lang,
  type PackageId,
  type ProjectTypeId,
  type SourceCta,
} from '../content/pricing.ts'

export type UrlCheck = { ok: true; value: string } | { ok: false; value: string }

/**
 * Normalises the optional project URL.
 * - empty -> ok, empty value (does not block submit)
 * - no scheme -> https:// is prepended
 * - only http/https accepted
 */
export function normalizeProjectUrl(raw: string): UrlCheck {
  const s = raw.trim()
  if (!s) return { ok: true, value: '' }
  let candidate = s
  if (/^https?:\/\//i.test(s)) {
    candidate = s
  } else if (s.includes('://') || /^[a-z][a-z0-9+.-]*:(?!\d)/i.test(s)) {
    return { ok: false, value: s } // javascript:, ftp://, mailto: ...
  } else {
    candidate = `https://${s}`
  }
  try {
    const u = new URL(candidate)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return { ok: false, value: s }
    if (!u.hostname.includes('.') && u.hostname !== 'localhost') return { ok: false, value: s }
    return { ok: true, value: candidate }
  } catch {
    return { ok: false, value: s }
  }
}

export interface PayloadInput {
  name: string
  email: string
  message: string
  projectUrl: string
  projectType: ProjectTypeId
  packageId: PackageId
  lang: Lang
  source: SourceCta
  honeypot?: string
}

/**
 * Builds the exact set of fields sent to the form endpoint.
 * Independent of UI language: project_type and package are always Turkish.
 * No tracking data (IP, fingerprint) is added.
 */
export function buildPayload(i: PayloadInput): Record<string, string> {
  const url = normalizeProjectUrl(i.projectUrl)
  const pkg = packagePayload(i.packageId)
  return {
    name: i.name.trim(),
    email: i.email.trim(),
    project_type: PROJECT_TYPE_LABEL_TR[i.projectType],
    package: pkg,
    package_id: i.packageId,
    project_url: url.ok ? url.value : '',
    message: i.message.trim(),
    lang: i.lang,
    source_cta: i.source,
    // Formspree: documented honeypot field name `_gotcha`, documented subject field name `subject`.
    _gotcha: i.honeypot ?? '',
    subject: `Yeni proje talebi: ${PACKAGE_NAME_TR[i.packageId]}`,
  }
}
