/**
 * VERIFIED CLIENT TESTIMONIALS (data-driven, intentionally empty).
 *
 * Add an entry only for a REAL client who has agreed to be quoted. The component
 * renders only entries with `verified: true`; with no verified entries the whole
 * sub-section is not rendered. Never add sample or placeholder testimonials.
 * See README section "Verified testimonials".
 */
import type { Lang } from './pricing.ts'

export interface Testimonial {
  name: string
  role: string // title and/or project
  text: Record<Lang, string>
  photo?: string // optional image URL; initials avatar is used when missing
  sourceUrl?: string // e.g. LinkedIn recommendation link
  verified: boolean
}

export const testimonials: Testimonial[] = []

/** Optional link to an open-source Playwright starter template (Phase B). Leave empty to hide. */
export const github = { starterRepoUrl: '' }
