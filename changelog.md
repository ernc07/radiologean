# Radiologean Web Platform - Değişiklik Günlüğü

## 2025-08-04

- Next.js 15 ile statik export için `next.config.js` dosyasına `output: 'export'` eklendi.
- `package.json` içinde `"build": "next build"` olarak güncellendi.
- `tailwindcss`, `postcss`, `autoprefixer` paketleri yüklendi; `lightningcss` kaldırıldı.
- `globals.css` dosyasının başına `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;` eklendi.
- Sadece `web-platform/package-lock.json` kullanıldı, ana dizindeki lockfile silindi.
- Metadata ayarları `layout.tsx` dosyasına taşındı.
- Render deploy ayarları: Build Command → `npm run build`, Publish Directory → `out`
- Tüm değişiklikler başarıyla deploy edildi ve test edildi.

---

> Bu dosya, kritik yapılandırma ve deploy adımlarını hatırlamak için tutulmaktadır.

# Radiologean Web Platform - Değişiklik Günlüğü

## 2025-08-06

- Ana dizindeki bozuk package.json dosyası silindi.
- Sadece web-platform/package.json dosyası kullanılıyor.
- Tailwind v4 uyumlu globals.css düzenlendi: @import "tailwindcss/preflight"; ve @tailwind utilities; kullanıldı.
- Elle yazılan utility class’lar globals.css’den kaldırıldı.
- Ayar dosyaları (settings.json) tek blokta ve doğru formatta düzenlendi.
- Tüm gereksiz veya bozuk config dosyaları temizlendi.
- VS Code ve Tailwind uzantısı hataları giderildi.

---

> Bu dosya, kritik yapılandırma ve deploy adımlarını hatırlamak için tutulmaktadır.