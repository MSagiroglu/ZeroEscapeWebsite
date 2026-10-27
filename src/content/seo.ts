import type { Lang } from './pricing.ts'

/** Per-language document title and descriptions, applied at runtime when the language changes. */
export const seo: Record<Lang, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: 'Zero Escapes | QA Test Automation for AI-Built Apps',
    description:
      'QA test automation for apps built with AI: Playwright E2E tests, CI/CD integration and a regression safety net in your repo. Mustafa Sağıroğlu, ISTQB Certified Tester, Foundation Level.',
    ogDescription: 'Test your AI-built app before launch. Playwright + TypeScript, GitHub Actions CI/CD. ISTQB Certified Tester, Foundation Level.',
  },
  tr: {
    title: 'Zero Escapes | AI ile Geliştirilen Uygulamalar için QA Test Otomasyonu',
    description:
      'AI ile geliştirilen uygulamalar için QA test otomasyonu: Playwright E2E testleri, CI/CD entegrasyonu ve deponuzda regresyon güvenlik ağı. Mustafa Sağıroğlu, ISTQB Certified Tester, Foundation Level.',
    ogDescription: 'AI ile geliştirdiğin uygulamayı yayına çıkmadan test et. Playwright + TypeScript, GitHub Actions CI/CD. ISTQB Certified Tester, Foundation Level.',
  },
  ar: {
    title: 'Zero Escapes | أتمتة اختبارات الجودة للتطبيقات المبنية بالذكاء الاصطناعي',
    description:
      'أتمتة اختبارات الجودة للتطبيقات المبنية بالذكاء الاصطناعي: اختبارات Playwright وتكامل CI/CD وشبكة أمان للانحدار داخل مستودعك. مصطفى صاغيروغلو، ISTQB Certified Tester, Foundation Level.',
    ogDescription: 'اختبر تطبيقك المبني بالذكاء الاصطناعي قبل الإطلاق. Playwright + TypeScript وGitHub Actions CI/CD. ISTQB Certified Tester, Foundation Level.',
  },
}
