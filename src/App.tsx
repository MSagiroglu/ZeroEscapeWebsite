import { useState, useRef } from "react"
import { Navbar } from "./components/Navbar"
import { HeroSection } from "./components/HeroSection"
import { CustomCursor } from "./components/CustomCursor"
import { ExperienceLogo } from "./components/ExperienceLogo"
import { useAppContext } from "./lib/Context"

function App() {
  const { t } = useAppContext();
  const [activeSkillTab, setActiveSkillTab] = useState("All");

  const skillsData = [
    { name: "Playwright", category: "Automation" },
    { name: "TypeScript", category: "Programming" },
    { name: "Cypress", category: "Automation" },
    { name: "Selenium", category: "Automation" },
    { name: "Appium", category: "Automation" },
    { name: "Robot Framework", category: "Automation" },
    { name: "WebDriverIO", category: "Automation" },
    { name: "Java", category: "Programming" },
    { name: "JavaScript", category: "Programming" },
    { name: "Python", category: "Programming" },
    { name: "SQL", category: "Programming" },
    { name: "Postman", category: "Tools" },
    { name: "Newman", category: "Tools" },
    { name: "JMeter", category: "Tools" },
    { name: "Rest Assured", category: "Tools" },
    { name: "JUnit", category: "Automation" },
    { name: "TestNG", category: "Automation" },
    { name: "Cucumber", category: "Automation" },
    { name: "Gherkin", category: "Concepts" },
    { name: "GitHub Actions", category: "Tools" },
    { name: "GitLab CI", category: "Tools" },
    { name: "Jenkins", category: "Tools" },
    { name: "Git", category: "Tools" },
    { name: "Allure", category: "Tools" },
    { name: "TestRail", category: "Tools" },
    { name: "JIRA", category: "Tools" },
    { name: "JIRA XRay", category: "Tools" },
    { name: "Claude Code", category: "AI" },
    { name: "OpenAI Codex", category: "AI" },
    { name: "Gemini", category: "AI" },
    { name: "ISTQB", category: "Concepts" },
    { name: "Scrum", category: "Concepts" },
    { name: "Agile", category: "Concepts" },
    { name: "BDD", category: "Concepts" },
    { name: "TDD", category: "Concepts" },
    { name: "POM", category: "Concepts" },
    { name: "SDLC", category: "Concepts" },
    { name: "STLC", category: "Concepts" },
    { name: "CI/CD", category: "Concepts" },
    { name: "Root Cause Analysis", category: "Concepts" }
  ];

  const filteredSkills = activeSkillTab === "All" ? skillsData : skillsData.filter(s => s.category === activeSkillTab);
  
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const form = e.currentTarget as HTMLFormElement;
      const resp = await fetch("https://formspree.io/f/mzdwlovz", {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });
      if (resp.ok) {
        setFormStatus('success');
      } else {
        throw new Error('Server error');
      }
    } catch {
      setFormStatus('error');
    }
  };
  
  return (
    <div className="min-h-screen bg-hero-bg text-foreground overflow-x-hidden">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
      <HeroSection />
      
      {/* Rest of the sections */}
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
            <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">GitHub Actions · Jenkins</span>
          </div>
          {/* Box 3 */}
          <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">03</div>
            <h3 className="font-bold text-base md:text-lg mb-2">{t('w3_t')}</h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w3_d')}</p>
            <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">E2E · API · Mobile</span>
          </div>
          {/* Box 4 */}
          <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">04</div>
            <h3 className="font-bold text-base md:text-lg mb-2">{t('w4_t')}</h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w4_d')}</p>
            <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">ISTQB · AI-Assisted</span>
          </div>
          {/* Box 5 */}
          <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">05</div>
            <h3 className="font-bold text-base md:text-lg mb-2">{t('w5_t')}</h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w5_d')}</p>
            <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">BDD · Scrum</span>
          </div>
          {/* Box 6 */}
          <div className="bg-secondary p-5 md:p-8 hover:bg-secondary/80 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold font-mono rounded-lg mb-4 md:mb-6">06</div>
            <h3 className="font-bold text-base md:text-lg mb-2">{t('w6_t')}</h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">{t('w6_d')}</p>
            <span className="inline-block px-2 py-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded">Allure · TestRail</span>
          </div>
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

      {/* Services Section */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "🔬", title: t('svc1_t'), desc: t('svc1_d'), tags: ["Playwright", "TypeScript", "CI/CD"] },
            { icon: "🔧", title: t('svc2_t'), desc: t('svc2_d'), tags: ["Selenium→PW", "Refactor"] },
            { icon: "📱", title: t('svc3_t'), desc: t('svc3_d'), tags: ["Appium", "iOS", "Android"] },
            { icon: "🚀", title: t('svc4_t'), desc: t('svc4_d'), tags: ["Postman", "Newman", "JMeter"] }
          ].map((svc, i) => (
            <div key={i} className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-xl hover:-translate-y-1 md:hover:-translate-y-2 hover:border-primary/30 transition-all p-5 md:p-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-background border border-border flex items-center justify-center text-xl md:text-2xl rounded-lg mb-4 md:mb-6">{svc.icon}</div>
              <h3 className="font-bold text-xl mb-3">{svc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{svc.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {svc.tags.map(t => <span key={t} className="px-2 py-1 bg-background border border-border rounded text-xs font-mono text-muted-foreground">{t}</span>)}
              </div>
              <div className="pt-4 border-t border-border flex justify-between items-center text-sm font-mono">
                <span className="text-primary font-bold">Custom Quote</span>
                <span className="text-muted-foreground">Let's Talk</span>
              </div>
            </div>
          ))}
        </div>
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

      {/* Skills Section */}
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

        <div className="flex flex-wrap gap-4 mb-8">
          {["All", "Automation", "Programming", "Tools", "Concepts", "AI"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSkillTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${activeSkillTab === tab ? 'bg-primary text-primary-foreground font-bold' : 'bg-background border border-border text-muted-foreground hover:border-primary/50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {filteredSkills.map((skill, idx) => (
            <span key={idx} className="px-4 py-2 bg-secondary shadow-sm dark:shadow-none border border-border rounded-lg text-sm font-mono text-foreground hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-default animate-fade-in">
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ & Testimonials */}
      <section id="faq" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
        <div className="grid md:grid-cols-2 gap-16">
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
              {[
                {q: t('faq1_q'), a: t('faq1_a')},
                {q: t('faq2_q'), a: t('faq2_a')},
                {q: t('faq3_q'), a: t('faq3_a')},
                {q: t('faq4_q'), a: t('faq4_a')}
              ].map((faq, i) => (
                <div key={i} className="bg-background border border-border p-4 md:p-6 rounded-xl">
                  <h4 className="font-bold text-xs md:text-sm mb-2 text-foreground">{faq.q}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-border">
          <div className="bg-secondary shadow-sm dark:shadow-none border border-border rounded-2xl md:rounded-3xl p-6 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
                {t('cta_title')} <span className="text-primary">{t('cta_title_em')}</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
                {t('cta_p')}
              </p>
              <div className="flex flex-col gap-4 text-sm font-mono text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">⚡</span>
                  {t('guar_1')}
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">🌍</span>
                  {t('guar_2')}
                </div>
              </div>
            </div>
            
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-4xl mb-4">✅</span>
                <div className="text-xl font-bold text-primary mb-2">{t('btn_submit')}</div>
                <p className="text-muted-foreground">{t('guar_1')}</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-xs font-mono text-primary uppercase tracking-widest">{t('form_name')}</label>
                  <input id="form-name" required type="text" name="name" className="bg-background border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-sm" placeholder={t('form_name_ph')} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-xs font-mono text-primary uppercase tracking-widest">{t('form_email')}</label>
                  <input id="form-email" required type="email" name="email" className="bg-background border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-sm" placeholder={t('form_email_ph')} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-company" className="text-xs font-mono text-primary uppercase tracking-widest">{t('form_company')}</label>
                  <input id="form-company" type="text" name="company" className="bg-background border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-sm" placeholder={t('form_company')} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-message" className="text-xs font-mono text-primary uppercase tracking-widest">{t('form_message')}</label>
                  <textarea id="form-message" required name="message" rows={4} className="bg-background border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-sm resize-y" placeholder={t('form_message_ph')}></textarea>
                </div>
                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please email directly: contact@zeroescapes.dev</p>
                )}
                <button type="submit" disabled={formStatus === 'sending'} className="bg-primary text-primary-foreground font-bold py-4 px-8 rounded-lg hover:brightness-110 transition-all w-full md:w-auto self-start flex items-center justify-center gap-3 disabled:opacity-50">
                  {formStatus === 'sending' ? 'Sending...' : t('btn_submit')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      </main>
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
          <a href="mailto:contact@zeroescapes.dev" className="touch-manipulation block px-3 py-2 md:p-0 hover:text-primary transition-colors">Email</a>
        </div>
      </footer>
    </div>
  )
}

export default App
