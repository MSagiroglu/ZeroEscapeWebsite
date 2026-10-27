# Zero Escapes — QA Test Automation for AI-Built Apps

Zero Escapes, Mustafa Sağıroğlu'nun QA test otomasyonu markasıdır. Bu depo, ana web sitesinin kaynak kodlarını içerir (Vite + React 19 + TypeScript + Tailwind CSS).

## 🚀 Geliştirme ve Build Komutları

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat (HMR ile)
npm run dev

# Tip kontrolü ve prodüksiyon bundle'ı oluştur
npm run build

# Prodüksiyon derlemesini yerelde önizle
npm run preview
```

---

## ⚙️ Veri Odaklı Yapılar ve İçerik Yönetimi

### 1. Fiyatlar ve Hizmet Politikası (Tek Kaynak)
Tüm paket fiyatları, saatlik oranlar, süreler ve yanıt süreleri **`src/content/pricing.ts`** dosyasında tanımlıdır.
- Kartlar, dropdown seçenekleri, mobil sabit çubuk, SSS metinleri ve form payload'u bu yapıdan beslenir.
- Bir rakam değiştiğinde yalnızca bu dosyayı güncellemeniz yeterlidir; sayfanın geri kalanında otomatik güncellenir.

### 2. Örnek QA ve Otomasyon Raporu (`src/content/sample-report.json`)
Sayfadaki interaktif önizleme bileşeni (`src/components/SampleReport.tsx`) ve bağımsız yazdırılabilir statik sayfa (`public/sample-qa-audit-report.html`), rapor verilerini bu dosyadan okur.
- **Gerçek bir raporla değiştirmek için:** Tek yapmanız gereken `src/content/sample-report.json` dosyasındaki uygulama adını, akış durumlarını (`PASS`/`WARN`/`FAIL`), hata kayıtlarını ve Playwright kod örneğini güncellemektir.
- Dürüstlük kuralı gereği, kurgusal demo raporları her zaman dürüstlük rozeti (`badge`) ile sunulur.

### 3. Doğrulanmış Müşteri Yorumları (`src/content/testimonials.ts`)
Müşteri yorumları yapay veya sahte olarak sayfaya eklenmez. Yalnızca gerçek ve doğrulanmış müşteriler gösterilir.
- `src/content/testimonials.ts` dosyasında `testimonials` dizisi bulunur.
- Yeni bir yorum eklerken şu yapıyı doldurun:
  ```ts
  {
    name: "Müşteri Adı",
    role: "Ünvan / Proje",
    text: {
      en: "English quote...",
      tr: "Türkçe yorum...",
      ar: "تعليق بالعربية..."
    },
    photo: "https://... veya boş", // Boşsa isim baş harfleri avatar olur
    sourceUrl: "https://linkedin.com/in/...", // Opsiyonel referans linki
    verified: true // SADECE true ise sitede görünür
  }
  ```
- Dizide `verified: true` olan hiçbir giriş yoksa bu alt bölüm sayfada hiç render edilmez (boş alan veya yer tutucu kalmaz).

### 4. Açık Kaynak Playwright Şablonu Bağlantısı (`src/content/testimonials.ts`)
- `src/content/testimonials.ts` içinde `github.starterRepoUrl` alanı yer alır.
- Boş bırakılırsa (`''`) bağlantı sayfada hiç gösterilmez.
- Bir açık kaynak GitHub deposu adresi girildiğinde Otorite bölümünde otomatik olarak bağlantı görünür.

---

## 🔒 Form Mekanizması ve Payload Sözleşmesi
- Form başvuruları `https://formspree.io/f/mzdwlovz` endpoint'ine AJAX (`Accept: application/json`) ile gönderilir.
- Honeypot alanı (`_gotcha`) botlara karşı gizlidir.
- Arayüz dili ne olursa olsun, form arka planda e-posta gelen kutusunda net anlaşılması için Türkçe standart etiketler (`project_type`, `package`, `package_id`, `project_url`, `source_cta`, `lang`, `subject`) üretir.
- Doğrulama scriptini çalıştırmak için:
  ```bash
  npx tsx scripts/validate-payloads.mjs
  ```
