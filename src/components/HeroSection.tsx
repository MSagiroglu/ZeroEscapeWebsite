import { useRef } from "react"
import { useAppContext } from "../lib/Context"

export function HeroSection() {
  const { t, theme } = useAppContext()
  const heroRef = useRef<HTMLElement>(null)

  const isLight = theme === "light"

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg"
    >
      <div className="absolute inset-0 z-0 bg-hero-bg" aria-hidden />

      {/* Grid pattern — test matrix feel */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      {/* Floating particles — representing test cases */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
        <div className="absolute h-2 w-2 rounded-full bg-primary/20 dark:bg-primary/25" style={{ top: "12%", left: "8%", animation: "float 18s ease-in-out infinite" }} />
        <div className="absolute h-3 w-3 rounded-full bg-primary/15 dark:bg-primary/20" style={{ top: "28%", left: "72%", animation: "float 22s ease-in-out infinite 3s" }} />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-primary/25 dark:bg-primary/30" style={{ top: "55%", left: "85%", animation: "float 16s ease-in-out infinite 1s" }} />
        <div className="absolute h-2.5 w-2.5 rounded-full bg-primary/10 dark:bg-primary/15" style={{ top: "75%", left: "15%", animation: "float 20s ease-in-out infinite 5s" }} />
        <div className="absolute h-2 w-2 rounded-full bg-primary/20 dark:bg-primary/25" style={{ top: "40%", left: "45%", animation: "float 24s ease-in-out infinite 2s" }} />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-primary/15 dark:bg-primary/20" style={{ top: "18%", left: "60%", animation: "float 19s ease-in-out infinite 7s" }} />
        <div className="absolute h-3 w-3 rounded-full bg-primary/10 dark:bg-primary/15" style={{ top: "68%", left: "38%", animation: "float 21s ease-in-out infinite 4s" }} />
        <div className="absolute h-2 w-2 rounded-full bg-primary/25 dark:bg-primary/30" style={{ top: "85%", left: "70%", animation: "float 17s ease-in-out infinite 6s" }} />
      </div>

      {/* Dark vignette for dark mode */}
      <div
        className={`pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/35 via-transparent to-black/45 transition-opacity duration-300 ${isLight ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      />

      {/* Light vignette for light mode */}
      <div
        className={`pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-transparent via-transparent to-white/20 transition-opacity duration-300 ${isLight ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 w-full max-w-[90%] px-6 pb-10 pt-32 sm:max-w-md md:px-10 md:pb-10 lg:max-w-2xl">
        <h1
          className="mb-2 text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] text-foreground opacity-0 animate-fade-up drop-shadow-sm md:mb-4"
          style={{ animationDelay: "0.2s" }}
        >
          {t("h1_1")} <span className="text-primary">{t("h1_2")}</span>
        </h1>

        <p
          className="mb-3 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-foreground/90 opacity-0 animate-fade-up md:mb-6"
          style={{ animationDelay: "0.4s" }}
        >
          {t("hp_subtitle")}
        </p>

        <p
          className={`mb-4 text-[clamp(0.875rem,1.5vw,1.25rem)] font-light opacity-0 animate-fade-up md:mb-8 ${
            isLight ? "text-foreground/80" : "text-muted-foreground"
          }`}
          style={{ animationDelay: "0.55s" }}
        >
          {t("hp_desc")}
        </p>

        <div
          className="pointer-events-auto flex flex-wrap gap-3 font-bold opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#packages"
            className="inline-flex items-center justify-center cursor-pointer rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97] md:px-8 md:py-4"
          >
            {t("btn_packages")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center cursor-pointer rounded-sm bg-foreground px-6 py-3 text-sm text-background transition-all hover:brightness-125 active:scale-[0.97] dark:hover:brightness-90 md:px-8 md:py-4"
          >
            {t("btn_tell_project")}
          </a>
        </div>

        <div
          className="mt-4 flex flex-wrap items-center gap-3 opacity-0 animate-fade-up md:mt-6"
          style={{ animationDelay: "0.85s" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {t("istqb_badge")}
          </span>
          <p
            className={`text-xs font-light ${
              isLight ? "text-foreground/65" : "text-muted-foreground/60"
            }`}
          >
            {t("trust_line")}
          </p>
        </div>
      </div>
    </section>
  )
}
