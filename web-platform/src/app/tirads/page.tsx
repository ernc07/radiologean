'use client';

import Link from 'next/link';

export default function TiRadsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background & Particles */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-blue-200 via-purple-100 to-green-100 dark:from-blue-900 dark:via-purple-900 dark:to-green-900 transition-all duration-1000" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Simple moving particles */}
        <svg className="absolute left-1/4 top-1/3 animate-pulse" width="80" height="80" fill="none"><circle cx="40" cy="40" r="20" fill="#a5b4fc" fillOpacity="0.2" /></svg>
        <svg className="absolute right-1/4 bottom-1/4 animate-pulse" width="60" height="60" fill="none"><circle cx="30" cy="30" r="15" fill="#6ee7b7" fillOpacity="0.2" /></svg>
        <svg className="absolute left-1/2 top-1/5 animate-pulse" width="40" height="40" fill="none"><circle cx="20" cy="20" r="10" fill="#f472b6" fillOpacity="0.2" /></svg>
      </div>
      {/* Header */}
      {/* Splash Glassmorphism Card */}
      <header className="relative z-10 flex flex-col items-center justify-center pt-16 pb-8">
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center">
            <img src="/logo1.png" alt="TI-RADS Logo" className="w-16 h-16 mb-4 rounded-xl shadow-lg object-contain bg-white/60 dark:bg-gray-800/60 backdrop-blur-md" aria-label="TI-RADS Modül Logosu" />
            <div className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 transition-all duration-700 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight text-center">
                TI-RADS Tiroid Değerlendirme Sistemi
              </h1>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 text-center">
                American College of Radiology (ACR) TI-RADS sistemi kullanılarak tiroid nodüllerinin ultrasonografik özelliklerine göre malignite riski değerlendirilir.
              </p>
              <div className="mt-2 mx-auto max-w-xl">
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100 shadow">
                  <strong>Bilgilendirme:</strong> Bu araç, <span className="font-semibold">akademik ve bilimsel referanslara</span> dayalı olarak hazırlanmıştır. Klinik kararlar için mutlaka güncel rehberler ve uzman görüşü dikkate alınmalıdır.<br />
                  <span className="block mt-2">
                    <a href="https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/TI-RADS" target="_blank" rel="noopener" className="underline text-blue-700 dark:text-blue-300">ACR TI-RADS Kılavuzu</a>
                  </span>
                  <span className="block mt-2 text-xs text-gray-500 dark:text-gray-400">Son güncelleme: Ağustos 2025</span>
                </div>
              </div>
              <Link
                href="/"
                className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 animate-fade-in"
                aria-label="Ana sayfaya dön"
              >
                ← Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            TI-RADS Tiroid Değerlendirme Sistemi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            American College of Radiology (ACR) TI-RADS sistemi kullanılarak tiroid nodüllerinin ultrasonografik özelliklerine göre malignite riski değerlendirilir.
          </p>
          <div className="mt-4 mx-auto max-w-xl">
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100 shadow">
              <strong>Bilgilendirme:</strong> Bu araç, <span className="font-semibold">akademik ve bilimsel referanslara</span> dayalı olarak hazırlanmıştır. Klinik kararlar için mutlaka güncel rehberler ve uzman görüşü dikkate alınmalıdır.<br />
              <span className="block mt-2">
                <a href="https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/TI-RADS" target="_blank" rel="noopener" className="underline text-blue-700 dark:text-blue-300">ACR TI-RADS Kılavuzu</a>
              </span>
              <span className="block mt-2 text-xs text-gray-500 dark:text-gray-400">Son güncelleme: Ağustos 2025</span>
            </div>
          </div>
        </div>

        {/* TI-RADS Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fade-in">
          {/* TI-RADS 1 */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h3 className="ml-3 text-lg font-semibold text-green-800 dark:text-green-200">
                TI-RADS 1
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Normal Tiroid Dokusu</strong>
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Malignite Riski: 0%
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Takip: Gerekmiyor
              </p>
            </div>
          </div>

          {/* TI-RADS 2 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h3 className="ml-3 text-lg font-semibold text-blue-800 dark:text-blue-200">
                TI-RADS 2
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Benign Nodül</strong>
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Malignite Riski: &lt;1%
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Takip: Gerekmiyor
              </p>
            </div>
          </div>

          {/* TI-RADS 3 */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <h3 className="ml-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                TI-RADS 3
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>Muhtemelen Benign</strong>
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                Malignite Riski: &lt;5%
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                Takip: 1-2 yıl kontrol
              </p>
            </div>
          </div>

          {/* TI-RADS 4 */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <h3 className="ml-3 text-lg font-semibold text-orange-800 dark:text-orange-200">
                TI-RADS 4
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-orange-700 dark:text-orange-300">
                <strong>Şüpheli Nodül</strong>
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Malignite Riski: 5-80%
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                <strong>İİAB Endikasyonu</strong>
              </p>
            </div>
          </div>

          {/* TI-RADS 5 */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                5
              </div>
              <h3 className="ml-3 text-lg font-semibold text-red-800 dark:text-red-200">
                TI-RADS 5
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-red-700 dark:text-red-300">
                <strong>Yüksek Şüpheli</strong>
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                Malignite Riski: &gt;80%
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                <strong>İİAB Endikasyonu</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Calculator - Gelecekte eklenecek */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-8 backdrop-blur-md animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            TI-RADS Hesaplama Aracı
          </h2>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              İnteraktif Hesaplama Aracı
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Yakında: Ultrasonografik özelliklere göre TI-RADS skorunu otomatik hesaplayan araç
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors animate-fade-in" aria-label="Yakında eklenecek hesaplama aracı">
              Yakında Eklenecek
            </button>
          </div>
        </div>

        {/* Clinical Guidelines */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🎯 Biyopsi Kriterleri
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TI-RADS 5</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">≥1 cm nodüller için İİAB</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TI-RADS 4</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">≥1.5 cm nodüller için İİAB</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TI-RADS 3</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">≥2.5 cm nodüller için İİAB (isteğe bağlı)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📅 Takip Protokolü
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TI-RADS 1-2</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Takip gerekmiyor</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TI-RADS 3</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">1, 3, 5 yıl takip</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TI-RADS 4-5</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">İİAB sonrası yönetim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Kaynaklar Bölümü */}
      <footer className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="bg-gray-100 dark:bg-gray-900/60 rounded-xl shadow p-6 mt-12">
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">Kaynaklar</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
            <li>
              <a href="https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/TI-RADS" target="_blank" rel="noopener" className="underline">American College of Radiology (ACR) TI-RADS Guideline</a>
            </li>
            <li>
              Tessler FN, Middleton WD, et al. "ACR TI-RADS: An Ultrasound Risk Stratification System for Thyroid Nodules." Radiology. 2017; 287(1): 260-267.
            </li>
          </ul>
        </div>
      </footer>
/* Animations */
<style jsx global>{`
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 1s cubic-bezier(0.4,0,0.2,1) both;
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 8s ease-in-out infinite;
  }
`}</style>
    </div>
  );
}