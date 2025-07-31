import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Radiologean
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Radyoloji Destek Platformu</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="#tools" className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Araçlar
              </Link>
              <Link href="#references" className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Referanslar
              </Link>
              <Link href="#about" className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Hakkında
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Radyoloji Destek Sistemi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Klinik pratikte kullanım için geliştirilmiş standart radyolojik değerlendirme araçları. 
            BI-RADS, PI-RADS kategorizasyonları ve adrenal bez analizleri için referans rehberi.
          </p>
        </div>

        {/* Clinical Tools Section */}
        <div id="tools" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Klinik Değerlendirme Araçları
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* BI-RADS */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">BI</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">BI-RADS</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                Breast Imaging Reporting and Data System. Meme görüntüleme için standart kategorizasyon sistemi.
              </p>
              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Kategoriler:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">0-6</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">Risk değerlendirmesi</span>
                </div>
              </div>
              <Link 
                href="/birads"
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                BI-RADS Değerlendirme
              </Link>
            </div>

            {/* PI-RADS */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm">PI</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PI-RADS</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                Prostate Imaging Reporting and Data System. Prostat MR görüntüleme için skorlama sistemi.
              </p>
              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Skorlama:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">1-5 Skor</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">Malignite riski</span>
                </div>
              </div>
              <Link 
                href="/pirads"
                className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                PI-RADS Skorlama
              </Link>
            </div>

            {/* Adrenal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">AD</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Adrenal Bez</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                Adrenal bez lezyonları için HU değeri hesaplamaları ve washout analizleri.
              </p>
              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Hesaplamalar:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">HU değerleri</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">Washout %</span>
                </div>
              </div>
              <Link 
                href="/adrenal"
                className="inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                Adrenal Hesaplama
              </Link>
            </div>
          </div>
        </div>

        {/* References Section */}
        <div id="references" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Klinik Referanslar
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BI-RADS® Atlas (5th Edition)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                American College of Radiology tarafından yayınlanan standart meme görüntüleme rehberi.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>• Kategori 0-6 sınıflandırması</p>
                <p>• Malignite risk oranları</p>
                <p>• Takip önerileri</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PI-RADS v2.1</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Prostat MR görüntüleme için güncel skorlama sistemi rehberi.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>• 1-5 skorlama sistemi</p>
                <p>• Anatomik zon değerlendirmesi</p>
                <p>• Biyopsi önerileri</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Adrenal Imaging Guidelines</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Adrenal bez lezyonları için standart değerlendirme kriterleri.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>• HU eşik değerleri (&lt;10 HU benign)</p>
                <p>• Washout hesaplamaları</p>
                <p>• Chemical shift MR</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Radiopaedia.org</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Güncel radyoloji referans kaynağı ve eğitim platformu.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>• BI-RADS kategorileri</p>
                <p>• Olgu örnekleri</p>
                <p>• Güncel rehberler</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">European Society of Radiology</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Avrupa radyoloji derneği kılavuzları ve standartları.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>• ESR Guidelines</p>
                <p>• Quality assurance</p>
                <p>• Best practices</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Türk Radyoloji Derneği</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Ulusal radyoloji rehberleri ve konsensus raporları.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>• Türkiye kılavuzları</p>
                <p>• Konsensus raporları</p>
                <p>• Eğitim materyalleri</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Radiologean
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Klinik radyoloji pratiği için geliştirilen akademik destek platformu
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2025 Radiologean</span>
              <span>•</span>
              <span>Akademik kullanım</span>
              <span>•</span>
              <span>Referans amaçlı</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}