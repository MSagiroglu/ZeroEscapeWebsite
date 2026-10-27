import { Navbar } from "./components/Navbar"
import { HeroSection } from "./components/HeroSection"
import { CustomCursor } from "./components/CustomCursor"
import { ExperienceLogo } from "./components/ExperienceLogo"
import { useAppContext } from "./lib/Context"
import { useCopy } from "./lib/useCopy"
import { fmt } from "./content/pricing.ts"
import { VibeSection } from "./components/VibeSection"
import { Packages } from "./components/Packages"
import { SampleReport } from "./components/SampleReport"
import { ContactForm } from "./components/ContactForm"
import { StickyCta } from "./components/StickyCta"
import { VerifiedTestimonials } from "./components/VerifiedTestimonials"

function App() {
  const { t } = useAppContext();
  const { c } = useCopy();

  // Verified technology list. Core expertise first, additional experience visually separated.
  const coreExpertise = [
    { name: "Playwright", role: "Primary E2E Framework" },
    { name: "TypeScript", role: "OOP & Page Object Model" },
    { name: "GitHub Actions", role: "CI/CD Test Automation Gates" },
    { name: "API Testing", role: "REST & Contract Validation" }
  ];

  const additionalExperience: { name: string; note?: string }[] = [
    { name: "Cypress" },
    { name: "Selenium" },
    { name: "Appium", note: c.tech.appiumNote }
  ];

  return (
    <div className="min-h-screen bg-hero-bg text-foreground overflow-x-hidden">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <HeroSection />

        <VibeSection />

        {/* Authority & verified metrics */}
        <section className="border-y border-border bg-secondary/40 py-8 px-6 md:px-16" aria-label={c.authority.title}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-base shrink-0" aria-hidden="true">✓</div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">{c.authority.cert}</span>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5 max-w-3xl">{c.authority.text}</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {c.authority.metrics.map((m) => (
                <li key={m.v} className="bg-background border border-border rounded-xl px-4 py-3">
                  <div className="text-2xl font-bold font-mono text-primary">{m.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.d}</div>
                </li>
              ))}
            </ul>
            <VerifiedTestimonials />
          </div>
        </section>

        {/* Why Zero Escapes Section */}
        <section id="about" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="flex-1">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
                {t('why_lbl')}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                {t('why_title')} <br />
                <span className="text-muted-foreground font-normal">{t('why_sub')}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
                {t('why_desc')}
              </p>
            </div>
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-background/50 backdrop-blur-sm p-1">
              <img src="/profile.png" alt="Mustafa Sağıroğlu" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-border border border-border">
            {/* Box 1 */}
            <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">01</div>
              <h3 className="font-bold text-base md:text-lg mb-2">{t('w1_t')}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w1_d')}</p>
              <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">POM · OOP · TypeScript</span>
            </div>
            {/* Box 2 */}
            <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">02</div>
              <h3 className="font-bold text-base md:text-lg mb-2">{t('w2_t')}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w2_d')}</p>
              <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">GitHub Actions</span>
            </div>
            {/* Box 3 */}
            <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">03</div>
              <h3 className="font-bold text-base md:text-lg mb-2">{t('w3_t')}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w3_d')}</p>
              <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">E2E · API</span>
            </div>
            {/* Box 4 */}
            <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">04</div>
              <h3 className="font-bold text-base md:text-lg mb-2">{t('w4_t')}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w4_d')}</p>
              <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">ISTQB Foundation</span>
            </div>
            {/* Box 5 */}
            <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">05</div>
              <h3 className="font-bold text-base md:text-lg mb-2">{t('w5_t')}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w5_d')}</p>
              <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">Agile</span>
            </div>
            {/* Box 6 */}
            <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">06</div>
              <h3 className="font-bold text-base md:text-lg mb-2">{t('w6_t')}</h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w6_d')}</p>
              <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">Reports</span>
            </div>
          </div>
        </section>

        {/* Process Section (4 Steps) */}
        <section id="process" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
              {c.process.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {c.process.title} <br />
              <span className="text-muted-foreground font-normal">{c.process.sub}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.process.steps.map((s, i) => ({ step: String(i + 1).padStart(2, "0"), title: s.t, desc: s.d })).map((p, idx) => (
              <div key={idx} className="bg-secondary p-6 rounded-xl border border-border hover:border-primary/50 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
              {t('exp_lbl')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t('exp_title')} <br />
              <span className="text-muted-foreground font-normal">{t('exp_sub')}</span>
            </h2>
          </div>

          <div className="grid gap-6">
            {[
              {
                company: "Outlier.ai",
                logoUrl: "https://app.outlier.ai/assets/outlier-wordmark.svg",
                logoFallback: "/logos/outlier.svg",
                logoBg: "light" as const,
                url: "https://outlier.ai",
                date: t('exp_outlier_date'),
                role: t('exp_outlier_role'),
                bullets: [ t('exp_outlier_b1'), t('exp_outlier_b2') ],
              },
              {
                company: "F4E (Feedback4E)",
                logoUrl: "https://f4e.app/wp-content/uploads/new-f4e-logo-white.png",
                logoFallback: "/logos/f4e.png",
                logoBg: "dark" as const,
                url: "https://f4e.app/tr/",
                date: t('exp1_date'),
                role: t('exp1_role'),
                bullets: [ t('exp1_b1'), t('exp1_b2'), t('exp1_b3'), t('exp1_b4') ],
              },
              {
                company: "AutomatedPros — Orderific",
                logoUrl: "https://orderific.com/ord-website/assets/img/company-logo/logo-black-2.webp",
                logoFallback: "/logos/orderific.webp",
                logoBg: "light" as const,
                url: "https://orderific.com/",
                date: t('exp2_date'),
                role: t('exp2_role'),
                bullets: [ t('exp2_b1'), t('exp2_b2'), t('exp2_b3') ],
              },
              {
                company: "Abone Sepeti",
                logoUrl: "https://abonesepeti.com/assets/design/logo.svg",
                logoFallback: "/logos/abonesepeti.svg",
                logoBg: "light" as const,
                url: "https://abonesepeti.com/",
                date: t('exp3_date'),
                role: t('exp3_role'),
                bullets: [ t('exp3_b1'), t('exp3_b2') ],
              },
              {
                company: "Talenttech Solutions",
                url: "https://talentechsolutions.com/",
                date: t('exp4_date'),
                role: t('exp4_role'),
                bullets: [ t('exp4_b1'), t('exp4_b2') ],
              },
              {
                company: "Freelance & E-Commerce",
                url: "https://play.google.com/store/apps/details?id=com.letterbird.prod",
                date: t('exp5_date'),
                role: t('exp5_role'),
                bullets: [ t('exp5_b1'), t('exp5_b2') ],
              }
            ].map((job, i) => (
              <div key={i} className="bg-secondary shadow-sm dark:shadow-none border border-border p-8 rounded-xl hover:border-primary/50 transition-colors">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                  <div className="flex items-center gap-4 min-w-0">
                    {job.logoUrl && (
                      <ExperienceLogo
                        logoUrl={job.logoUrl}
                        company={job.company}
                        logoBg={"logoBg" in job ? job.logoBg : "light"}
                        fallbackUrl={"logoFallback" in job ? job.logoFallback : undefined}
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        {job.company}
                        {job.url && (
                          <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                          </a>
                        )}
                      </h3>
                      <div className="text-primary font-mono text-sm">{job.role}</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-background border border-border rounded-full text-xs font-mono text-muted-foreground mt-1">
                    {job.date}
                  </span>
                </div>
                <ul className="space-y-2 mt-6">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex gap-3">
                      <span className="text-primary">▸</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Services & Service Packages Section */}
        <section id="services" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
              {t('svc_lbl')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t('svc_title')} <br />
              <span className="text-muted-foreground font-normal">{t('svc_sub')}</span>
            </h2>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {[
              { icon: "🔬", title: t('svc1_t'), desc: t('svc1_d'), tags: ["Playwright", "TypeScript", "CI/CD"] },
              { icon: "🔧", title: t('svc2_t'), desc: t('svc2_d'), tags: ["Selenium→PW", "Refactor"] },
              { icon: "📱", title: t('svc3_t'), desc: t('svc3_d'), tags: ["Appium", c.tech.appiumNote] },
              { icon: "🚀", title: t('svc4_t'), desc: t('svc4_d'), tags: ["API testing", "Playwright", "CI/CD"] }
            ].map((svc, i) => (
              <div key={i} className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-xl hover:-translate-y-1 md:hover:-translate-y-2 hover:border-primary/30 transition-all p-5 md:p-8">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-background border border-border flex items-center justify-center text-xl md:text-2xl rounded-lg mb-4 md:mb-6">{svc.icon}</div>
                <h3 className="font-bold text-xl mb-3">{svc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{svc.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {svc.tags.map(t => <span key={t} className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">{t}</span>)}
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center text-sm font-mono">
                  <span className="text-primary font-bold">{t('pkg_quote')}</span>
                  <a href="#packages" className="text-muted-foreground hover:text-primary transition-colors">→ {t('btn_packages')}</a>
                </div>
              </div>
            ))}
          </div>

          <Packages />
          <SampleReport />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
              {t('port_lbl')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t('port_title')} <br />
              <span className="text-muted-foreground font-normal">{t('port_sub')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-xl p-5 md:p-8 hover:border-primary/30 transition-colors">
              <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-xl font-bold">{t('port_c1_t')}</h3>
                <span className="self-start px-3 py-1 bg-background border border-border rounded-full text-xs font-mono text-muted-foreground whitespace-nowrap">B2B · Angular + Node.js</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm text-muted-foreground flex gap-3"><span className="text-primary">▸</span> {t('port_l1_1')}</li>
                <li className="text-sm text-muted-foreground flex gap-3"><span className="text-primary">▸</span> {t('port_l1_2')}</li>
                <li className="text-sm text-muted-foreground flex gap-3"><span className="text-primary">▸</span> {t('port_l1_3')}</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">Playwright</span>
                <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">TypeScript</span>
                <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">GitHub Actions</span>
              </div>
            </div>

            <div className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-xl p-5 md:p-8 hover:border-primary/30 transition-colors flex flex-col">
              <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-lg md:text-xl font-bold">{t('port_c2_t')}</h3>
                <span className="self-start px-3 py-1 bg-background border border-border rounded-full text-xs font-mono text-muted-foreground whitespace-nowrap">B2C · Dubai</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm text-muted-foreground flex gap-3"><span className="text-primary">▸</span> {t('port_l2_1')}</li>
                <li className="text-sm text-muted-foreground flex gap-3"><span className="text-primary">▸</span> {t('port_l2_2')}</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">Automation</span>
                <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">Defect Tracking</span>
              </div>
            </div>

            <div className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-xl p-5 md:p-8 hover:border-primary/30 transition-colors flex flex-col">
              <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-xl font-bold">{t('port_c3_t')}</h3>
                <span className="self-start px-3 py-1 bg-background border border-border rounded-full text-xs font-mono text-muted-foreground whitespace-nowrap">B2B · React + Vercel</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-sm text-muted-foreground flex gap-3"><span className="text-primary">▸</span> {t('port_l3_1')}</li>
                <li className="text-sm text-muted-foreground flex gap-3"><span className="text-primary">▸</span> {t('port_l3_2')}</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">Manual Testing</span>
                <span className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">E2E Automation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies I Work With Section */}
        <section id="skills" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
              {t('sk_lbl')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t('sk_title')} <br />
              <span className="text-muted-foreground font-normal">{t('sk_sub')}</span>
            </h2>
          </div>

          {/* Tier 1: Core Expertise (Daily Stack) */}
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t('sk_core_title')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coreExpertise.map((c, i) => (
                <div key={i} className="bg-secondary/70 border-2 border-primary/40 rounded-xl p-5 hover:border-primary transition-all">
                  <div className="font-bold text-lg text-foreground font-mono">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2: Additional experience (visually separated from core) */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              {c.tech.extraLabel}
            </div>
            <div className="flex flex-wrap gap-3">
              {additionalExperience.map((skill) => (
                <span key={skill.name} className="px-4 py-2 bg-secondary shadow-sm dark:shadow-none border border-border rounded-lg text-sm font-mono text-foreground">
                  {skill.name}
                  {skill.note && <span className="block text-[11px] text-muted-foreground mt-0.5">{skill.note}</span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ & Testimonials */}
        <section id="faq" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Testimonials */}
            <div>
              <div className="mb-12">
                <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
                  {t('test_lbl')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                  {t('test_title')}
                </h2>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="bg-secondary/20 p-4 md:p-6 rounded-xl border border-border">
                  <div className="text-primary text-sm mb-4">★★★★★</div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic mb-4">"{t('test1_t')}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-border">
                      <img src="https://i.pravatar.cc/150?img=47" alt="Sarah K." className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Sarah K.</div>
                      <div className="text-xs font-mono text-muted-foreground">{t('test1_r')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                  <div className="text-primary text-sm mb-4">★★★★★</div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic mb-4">"{t('test2_t')}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-border">
                      <img src="https://i.pravatar.cc/150?img=11" alt="Ahmet Y." className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Ahmet Y.</div>
                      <div className="text-xs font-mono text-muted-foreground">{t('test2_r')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                  <div className="text-primary text-sm mb-4">★★★★★</div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic mb-4">"{t('test4_t')}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-border shrink-0">
                      <img src="https://i.pravatar.cc/150?img=12" alt="Semih Ö." className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Semih Ö.</div>
                      <div className="text-xs font-mono text-muted-foreground">{t('test4_r')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded 6 FAQ items */}
            <div>
              <div className="mb-12">
                <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4 before:content-[''] before:w-8 before:h-[1px] before:bg-primary">
                  {t('faq_lbl')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                  {t('faq_title')}
                </h2>
              </div>
              <div className="space-y-4">
                {c.faq.map((faq, i) => (
                  <div key={i} className="bg-background border border-border p-4 md:p-6 rounded-xl">
                    <h4 className="font-bold text-xs md:text-sm mb-2 text-foreground">{faq.q}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{fmt(faq.a)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground font-mono">
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
              <path d="M20 2.5L35.5 11.5V28.5L20 37.5L4.5 28.5V11.5L20 2.5Z" className="stroke-foreground" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M12 14H28L12 26H28" className="stroke-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Zero Escapes <span className="text-primary text-[0.6em] align-middle inline-block -translate-y-1">●</span>
            </span>
          </a>
          <div>© {new Date().getFullYear()} Zero Escapes · Mustafa Sağıroğlu</div>
        </div>
        <div className="flex gap-2 md:gap-6">
          <a href="https://linkedin.com/in/mustafa-sagiroglu-manual-automation-tester" target="_blank" rel="noopener noreferrer" className="touch-manipulation block px-3 py-2 md:p-0 hover:text-primary transition-colors">LinkedIn</a>
          <a href="https://github.com/MSagiroglu" target="_blank" rel="noopener noreferrer" className="touch-manipulation block px-3 py-2 md:p-0 hover:text-primary transition-colors">GitHub</a>
          <a href="mailto:hello@zeroescapes.dev" className="touch-manipulation block px-3 py-2 md:p-0 hover:text-primary transition-colors">Email</a>
        </div>
      </footer>
      <StickyCta />
    </div>
  )
}

export default App
