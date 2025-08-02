import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TI-RADS Tiroid Değerlendirme | Radiologean',
  description: 'Tiroid nodüllerinin ultrasonografik değerlendirmesi için TI-RADS sınıflandırma sistemi ve interaktif hesaplama aracı.',
  keywords: 'TI-RADS, tiroid, ultrasonografi, nodül, radyoloji, ACR TI-RADS'
};

export default function TiRadsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  TI-RADS Değerlendirme
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tiroid Nodül Sınıflandırması</p>
              </div>
            </div>
            <a
              href="/"
              className="text-sm text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
            >
              ← Ana Sayfa
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            TI-RADS Tiroid Değerlendirme Sistemi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            American College of Radiology (ACR) TI-RADS sistemi kullanılarak tiroid nodüllerinin 
            ultrasonografik özelliklerine göre malignite riskinin değerlendirilmesi.
          </p>
        </div>

        {/* TI-RADS Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
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
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Yakında Eklenecek
            </button>
          </div>
        </div>

        {/* Clinical Guidelines */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
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
    </div>
  );
}