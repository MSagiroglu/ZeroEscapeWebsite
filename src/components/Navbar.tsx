import { useState } from "react"
import { Button } from "./ui/button"
import { useAppContext } from "../lib/Context"

export function Navbar() {
  const { t, lang, setLang, theme, toggleTheme } = useAppContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: t('nav_why'), href: "#about" },
    { name: t('nav_exp'), href: "#experience" },
    { name: t('nav_svc'), href: "#services" },
    { name: t('nav_port'), href: "#portfolio" },
    { name: t('nav_skills'), href: "#skills" },
    { name: t('nav_faq'), href: "#faq" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-nowrap items-center justify-between px-3 py-3 md:px-6 lg:px-10 xl:px-16 bg-background/80 backdrop-blur-md border-b border-border">
      <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-1.5 lg:gap-2 shrink-0 hover:opacity-80 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-7 h-7 lg:w-8 lg:h-8" aria-hidden="true">
          <path d="M20 2.5L35.5 11.5V28.5L20 37.5L4.5 28.5V11.5L20 2.5Z" className="stroke-foreground" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M12 14H28L12 26H28" className="stroke-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm lg:text-lg xl:text-xl font-semibold tracking-tight text-foreground whitespace-nowrap">
          Zero Escapes <span className="text-primary text-[0.6em] align-middle inline-block -translate-y-1">●</span>
        </span>
      </a>

      <div className="hidden gap-1 lg:gap-3 xl:gap-6 lg:flex overflow-hidden">
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="text-[9px] lg:text-[11px] xl:text-sm tracking-widest text-muted-foreground transition-colors hover:text-foreground uppercase whitespace-nowrap"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-1.5 lg:gap-3 shrink-0">
        <div className="flex bg-secondary/30 rounded-lg p-[3px] border border-border">
          {(['en', 'tr', 'ar'] as const).map(l => (
            <button 
              key={l} 
              onClick={() => setLang(l)}
              className={`px-1.5 py-0.5 lg:px-2.5 text-[9px] lg:text-[11px] font-mono uppercase rounded-md transition-colors whitespace-nowrap ${lang === l ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <button onClick={toggleTheme} className="text-base lg:text-xl p-1 rounded-full hover:bg-secondary/30 transition-colors shrink-0" title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <Button variant="navCta" size="sm" asChild className="hidden lg:inline-flex text-[9px] lg:text-[11px] px-2 lg:px-4 whitespace-nowrap">
          <a href="#contact" className="inline-flex items-center justify-center gap-1.5 leading-none">
            <span>{t('nav_hire')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </Button>
        <button 
          className="lg:hidden p-1 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border p-4 flex flex-col gap-4 lg:hidden shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm tracking-widest text-muted-foreground transition-colors hover:text-foreground uppercase p-2 border-b border-border/50"
            >
              {link.name}
            </a>
          ))}
          <Button variant="navCta" size="sm" asChild className="mt-2 text-xs self-start">
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_hire')}</a>
          </Button>
        </div>
      )}
    </nav>
  )
}

