import { useEffect, useState } from 'react'
import { usd, pricing } from '../content/pricing.ts'
import { openForm } from '../lib/formBus'
import { useCopy } from '../lib/useCopy'

/**
 * Mobile-only, dismissible bottom bar. Price comes from pricing.ts.
 * Hidden while the contact form is in view. Honors safe-area insets and reduced motion.
 */
export function StickyCta() {
  const { c } = useCopy()
  const [scrolled, setScrolled] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const show = scrolled && !formVisible && !dismissed
  return (
    <div
      id="sticky-cta"
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden px-3 pt-2 transition-transform duration-300 motion-reduce:transition-none ${
        show ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-2 bg-secondary border border-border rounded-xl shadow-lg p-2">
        <button
          id="sticky-cta-btn"
          tabIndex={show ? 0 : -1}
          onClick={() => openForm({ packageId: 'vibe-check', projectType: 'vibe', source: 'sticky' })}
          className="flex-1 flex items-center justify-between gap-3 bg-primary text-primary-foreground rounded-lg px-4 py-3 text-sm font-bold"
        >
          <span>{c.sticky.label}</span>
          <span className="font-mono">{usd(pricing.vibeCheck.price)}</span>
        </button>
        <button
          id="sticky-cta-close"
          tabIndex={show ? 0 : -1}
          onClick={() => setDismissed(true)}
          aria-label={c.sticky.close}
          className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  )
}
