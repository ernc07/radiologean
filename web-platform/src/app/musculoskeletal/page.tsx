'use client';

import Link from 'next/link';
import { Zap, ArrowLeft, BookOpen, FileText } from 'lucide-react';

export default function MusculoskeletalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/home" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🦴 Kas-İskelet Sistemi Radyolojisi
          </h1>
          <p className="text-lg text-gray-600">
            MSK görüntüleme için klinik araçlar ve eğitim içerikleri
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* MR Artifacts Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-indigo-600" />
            MR Artefaktları
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Magic Angle Card */}
            <Link href="/magic-angle" className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-indigo-400 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      Magic Angle Artefaktı
                    </h3>
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                      İnteraktif Kılavuz
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Diz MR&apos;da ACL&apos;nin pseudo-sprain gibi görünmesini önlemek için kapsamlı eğitim kılavuzu. 
                  TE değeri ve tendon açısına göre artefakt risk değerlendirmesi.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>İnteraktif TE/Açı seçimi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>Detaylı fizik açıklaması</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>Klinik karar algoritması</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    📚 Kapsamlı Eğitim İçeriği
                  </span>
                  <svg className="w-5 h-5 text-indigo-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Coming Soon Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 opacity-75">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Diğer MR Artefaktları
                  </h3>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                    Yakında
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Metal artefaktı, kimyasal shift, susceptibility artefaktı ve diğer yaygın MR artefaktları için eğitim içerikleri yakında eklenecek.
              </p>

              <div className="text-sm text-gray-500 pt-4 border-t border-gray-100">
                🚧 Geliştirme aşamasında
              </div>
            </div>
          </div>
        </div>

        {/* Future Sections Placeholder */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 opacity-60">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🦴 Kemik/Eklem Değerlendirme
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Kırık sınıflandırmaları, eklem dejenerasyonu skorlama sistemleri
            </p>
            <span className="text-xs text-gray-500">Yakında</span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 opacity-60">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              💪 Yumuşak Doku Lezyonları
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Tendon, ligament ve kas yaralanmaları değerlendirme rehberleri
            </p>
            <span className="text-xs text-gray-500">Yakında</span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 opacity-60">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📏 Ölçüm Araçları
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Açı ölçümleri, hizalama değerlendirmeleri ve normogram hesaplayıcıları
            </p>
            <span className="text-xs text-gray-500">Yakında</span>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Musculoskeletal Radyoloji Platformu
          </h3>
          <p className="text-indigo-800">
            Bu bölüm, kas-iskelet sistemi görüntüleme için klinik karar destek araçları, 
            eğitim içerikleri ve pratik rehberler içerir. İçerik sürekli güncellenmekte ve genişletilmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}
