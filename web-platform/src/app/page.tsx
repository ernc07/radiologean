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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mevcut BI-RADS Card */}
            <Link href="/birads" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Mammografi
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  BI-RADS Değerlendirme
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Meme radyolojisi için standart değerlendirme ve raporlama sistemi. Kategori 1-6 arası sınıflandırma.
                </p>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Mevcut PI-RADS Card */}
            <Link href="/pirads" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Prostat MRI
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  PI-RADS Skorlama
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Prostat MRI için standardize edilmiş raporlama sistemi. 1-5 arası risk kategorilendirmesi.
                </p>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* YENİ TI-RADS Card */}
            <Link href="/tirads" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Tiroid USG
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  TI-RADS Değerlendirme
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Tiroid nodüllerinin ultrasonografik değerlendirmesi için standardize edilmiş sınıflandırma sistemi.
                </p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* YENİ Bosniak Card */}
            <Link href="/bosniak" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded-full font-medium">
                    YENİ
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Bosniak Klasifikasyonu
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Böbrek kistik lezyonlarının BT/MR bulgularına göre malignite riski değerlendirmesi.
                </p>
                <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Mevcut Adrenal Card */}
            <Link href="/adrenal" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Adrenal BT/MRI
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  Adrenal Karakterizasyonu
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Adrenal kitle lezyonlarının BT ve MRI ile karakterizasyonu için rehber ve hesaplama araçları.
                </p>
                <div className="flex items-center text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
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