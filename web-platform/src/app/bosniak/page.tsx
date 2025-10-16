import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bosniak Klasifikasyonu | Radiologean',
  description: 'Böbrek kistik lezyonlarının değerlendirmesi için Bosniak klasifikasyon sistemi ve malignite risk değerlendirmesi.',
  keywords: 'Bosniak, böbrek kisti, BT, MR, malignite riski, radyoloji'
};

export default function BosniakPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <img src="/logo1.png" alt="Bosniak Logo" className="w-20 h-20 rounded-2xl shadow-lg object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Bosniak Klasifikasyonu
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Böbrek Kist Değerlendirmesi</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-700 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
            >
              ← Ana Sayfa
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bosniak Klasifikasyon Sistemi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Böbrek kistik lezyonlarının BT ve MR görüntüleme bulgularına göre malignite riskinin 
            değerlendirilmesi için kullanılan standart klasifikasyon sistemi.
          </p>
        </div>

        {/* Bosniak Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Bosniak I */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                I
              </div>
              <h3 className="ml-3 text-lg font-semibold text-green-800 dark:text-green-200">
                Bosniak I
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Basit Kist</strong>
              </p>
              <div className="text-xs text-green-600 dark:text-green-400 space-y-1">
                <p>• Su dansitesi (0-20 HU)</p>
                <p>• İnce duvar (&lt;2mm)</p>
                <p>• Septasyon yok</p>
                <p>• Kalsifikasyon yok</p>
              </div>
              <div className="border-t border-green-200 dark:border-green-700 pt-2 mt-3">
                <p className="text-xs text-green-600 dark:text-green-400">
                  <strong>Malignite Riski: 0%</strong>
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Takip: Gerekmiyor
                </p>
              </div>
            </div>
          </div>

          {/* Bosniak II */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                II
              </div>
              <h3 className="ml-3 text-lg font-semibold text-blue-800 dark:text-blue-200">
                Bosniak II
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Minimal Kompleks Kist</strong>
              </p>
              <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <p>• İnce septasyon (&lt;1mm)</p>
                <p>• İnce duvar kalsifikasyonu</p>
                <p>• Yüksek attenüasyon (&lt;3cm)</p>
                <p>• Enhancement yok</p>
              </div>
              <div className="border-t border-blue-200 dark:border-blue-700 pt-2 mt-3">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  <strong>Malignite Riski: 0%</strong>
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Takip: Gerekmiyor
                </p>
              </div>
            </div>
          </div>

          {/* Bosniak IIF */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                IIF
              </div>
              <h3 className="ml-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Bosniak IIF
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>Takip Gereken Kist</strong>
              </p>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 space-y-1">
                <p>• Kalın septasyon</p>
                <p>• Kalın duvar kalsifikasyonu</p>
                <p>• Yüksek attenüasyon (&gt;3cm)</p>
                <p>• Minimal enhancement</p>
              </div>
              <div className="border-t border-yellow-200 dark:border-yellow-700 pt-2 mt-3">
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  <strong>Malignite Riski: 5-10%</strong>
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  Takip: 6-12 ay kontrol
                </p>
              </div>
            </div>
          </div>

          {/* Bosniak III */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                III
              </div>
              <h3 className="ml-3 text-lg font-semibold text-orange-800 dark:text-orange-200">
                Bosniak III
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-orange-700 dark:text-orange-300">
                <strong>Cerrahi Endikasyon</strong>
              </p>
              <div className="text-xs text-orange-600 dark:text-orange-400 space-y-1">
                <p>• Kalın irregular duvar</p>
                <p>• Kalın irregular septasyon</p>
                <p>• Enhancement (+)</p>
                <p>• Solid komponent</p>
              </div>
              <div className="border-t border-orange-200 dark:border-orange-700 pt-2 mt-3">
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  <strong>Malignite Riski: 50-60%</strong>
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  <strong>Cerrahi Ekspeksiye</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Bosniak IV */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                IV
              </div>
              <h3 className="ml-3 text-lg font-semibold text-red-800 dark:text-red-200">
                Bosniak IV
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-red-700 dark:text-red-300">
                <strong>Malign Kist</strong>
              </p>
              <div className="text-xs text-red-600 dark:text-red-400 space-y-1">
                <p>• Belirgin solid komponent</p>
                <p>• İrregular enhancement</p>
                <p>• Kistik ve solid alanlar</p>
                <p>• Nodüler enhancement</p>
              </div>
              <div className="border-t border-red-200 dark:border-red-700 pt-2 mt-3">
                <p className="text-xs text-red-600 dark:text-red-400">
                  <strong>Malignite Riski: 85-95%</strong>
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  <strong>Acil Cerrahi</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Imaging Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Görüntüleme Özellikleri
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded mr-2"></span>
                BT Kriterleri
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Attenüasyon</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Su: 0-20 HU, Yüksek: &gt;20 HU</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Enhancement</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">&gt;10-15 HU artış malignite için şüpheli</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Duvar Kalınlığı</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">&lt;2mm normal, &gt;2mm patolojik</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-500 rounded mr-2"></span>
                MR Kriterleri
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">T1 Ağırlıklı</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Hemorajik içerik için hipointens</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">T2 Ağırlıklı</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Kistik içerik için hiperintens</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Gadolinyum Enhancement</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Solid komponent ve septasyon değerlendirmesi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Guidelines */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📋 Yönetim Protokolü
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bosniak I-II</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Takip gerekmiyor</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bosniak IIF</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">6-12 ay BT/MR takip</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bosniak III</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Cerrahi ekspısiye</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bosniak IV</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Acil cerrahi müdahale</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ⚠️ Dikkat Edilecek Noktalar
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">İnfeksiyon</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Enhancement ve debris varlığı</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Hemorajik Kist</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Yüksek attenüasyon nedeni</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Kontrast Zamanlaması</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Nefrojenik faz önemli (2-3 dk)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
