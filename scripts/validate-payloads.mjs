import { buildPayload, normalizeProjectUrl } from '../src/lib/payload.ts';
import { PACKAGE_IDS, PROJECT_TYPE_IDS, pricing, packagePayload, PROJECT_TYPE_LABEL_TR } from '../src/content/pricing.ts';

const langs = ['en', 'tr', 'ar'];
const urls = [
  { name: 'boş', in: '', expected: '' },
  { name: 'şemasız', in: 'example.com', expected: 'https://example.com' },
  { name: 'geçerli', in: 'https://mysaas.app/demo', expected: 'https://mysaas.app/demo' }
];

console.log('=== FORM PAYLOAD DOĞRULAMASI ===\n');

// 1. URL Normalizasyon Testi
console.log('1. project_url normalizasyon testi:');
urls.forEach(u => {
  const norm = normalizeProjectUrl(u.in);
  const ok = norm.ok && norm.value === u.expected;
  console.log(`   [${ok ? 'OK' : 'FAIL'}] Input: "${u.in}" => Output: "${norm.value}" (Beklenen: "${u.expected}")`);
});

// 2. Her Paket x Her Dil için Payload Tablosu
console.log('\n2. Her Paket × Her Dil için Payload Tablosu:');
const rows = [];
for (const lang of langs) {
  for (const pkgId of PACKAGE_IDS) {
    const payload = buildPayload({
      name: 'Test Kullanıcı',
      email: 'test@example.com',
      message: 'Test mesajı',
      projectUrl: 'mytestapp.com',
      projectType: 'vibe',
      packageId: pkgId,
      lang: lang,
      source: 'hero',
      honeypot: ''
    });

    rows.push({
      Lang: lang,
      PackageId: payload.package_id,
      Package_Sent_In_Email: payload.package,
      ProjectType_Sent: payload.project_type,
      Normalized_URL: payload.project_url,
      Lang_Field: payload.lang,
      Source_CTA: payload.source_cta,
      Honeypot_Empty: payload._gotcha === '' ? 'EVET' : 'HAYIR',
      Subject: payload.subject
    });
  }
}

console.table(rows);
