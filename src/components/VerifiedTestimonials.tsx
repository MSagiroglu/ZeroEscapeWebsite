import { testimonials, github } from '../content/testimonials.ts'
import { useCopy } from '../lib/useCopy'

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('')

/** Renders only verified testimonials and the optional starter-repo link. Renders nothing when both are empty. */
export function VerifiedTestimonials() {
  const { lang, c } = useCopy()
  const items = testimonials.filter((t) => t.verified)
  const repo = github.starterRepoUrl.trim()
  if (items.length === 0 && !repo) return null
  return (
    <div className="mt-6">
      {items.length > 0 && (
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((t) => (
            <li key={t.name} className="bg-background border border-border rounded-xl p-5">
              <p className="text-sm text-muted-foreground italic mb-4">“{t.text[lang] || t.text.en}”</p>
              <div className="flex items-center gap-3">
                {t.photo ? (
                  <img src={t.photo} alt={t.name} width={40} height={40} loading="lazy" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm" aria-hidden="true">{initials(t.name)}</span>
                )}
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs font-mono text-muted-foreground">{t.role}</div>
                </div>
                {t.sourceUrl && <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="ms-auto text-xs text-primary underline">↗</a>}
              </div>
            </li>
          ))}
        </ul>
      )}
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm font-mono text-primary underline">
          {c.authority.repoLink}
        </a>
      )}
    </div>
  )
}
