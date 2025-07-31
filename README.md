# Radiologean - Radyoloji Destek Sistemi

🩺 Klinik pratikte kullanım için geliştirilmiş akademik radyoloji destek platformu.

## 🎯 Özellikler

- **BI-RADS Değerlendirme**: Meme görüntüleme için standart kategorizasyon sistemi
- **PI-RADS Skorlama**: Prostat MR görüntüleme skorlama sistemi
- **Adrenal Bez Hesaplamaları**: HU değeri ve washout analizleri
- **Klinik Referanslar**: Güncel radyoloji rehberleri ve kaynaklarına erişim

## 🚀 Teknoloji Stack

- **Frontend**: Next.js 15.4.5 + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Streamlit (Python app)
- **Deployment**: Render (Static Site)

## 📂 Proje Yapısı

```
radiologean/
├── web-platform/          # Next.js Web Uygulaması
│   ├── src/app/           # App Router Sayfaları
│   ├── public/            # Static Dosyalar
│   └── package.json       # Dependencies
└── modules/
    └── birads-app/        # Streamlit Python App
        ├── birads_app.py  # Ana Uygulama
        └── images/        # Görsel Kaynaklar
```

## 🛠️ Geliştirme

### Web Platform (Next.js)
```bash
cd web-platform
npm install
npm run dev        # Geliştirme sunucusu
npm run build      # Production build
```

### BI-RADS App (Streamlit)
```bash
cd modules/birads-app
pip install -r requirements.txt
streamlit run birads_app.py
```

## 🌐 Deploy

### Render ile Deploy
1. GitHub repository'sini Render'a bağla
2. Build Command: `npm run build`
3. Publish Directory: `out`
4. Root Directory: `web-platform`

## 📋 Özellikler

### ✅ Tamamlanan
- [x] Akademik ana sayfa tasarımı
- [x] BI-RADS Python app entegrasyonu
- [x] PI-RADS under construction sayfası
- [x] Adrenal under construction sayfası
- [x] Responsive tasarım
- [x] Dark mode desteği

### 🔄 Planlanan
- [ ] PI-RADS interaktif skorlama
- [ ] Adrenal hesaplama modülü
- [ ] CAD-RADS sistemi
- [ ] LI-RADS sistemi
- [ ] TIRADS sistemi

## 📚 Referanslar

- BI-RADS® Atlas (5th Edition) - American College of Radiology
- PI-RADS v2.1 Guidelines
- European Society of Radiology (ESR) Guidelines
- Türk Radyoloji Derneği Kılavuzları

## 📄 Lisans

Bu proje akademik kullanım için geliştirilmiştir.

---

**© 2025 Radiologean** | Akademik Kullanım | Referans Amaçlı
