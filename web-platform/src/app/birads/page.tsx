'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BiRadsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  BI-RADS Değerlendirme Sistemi
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mamografi Tabanlı Karar Destek</p>
              </div>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              ← Ana Sayfa
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              BI-RADS Uygulaması Yükleniyor...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Streamlit tabanlı interaktif değerlendirme sistemi hazırlanıyor.
            </p>
          </div>
        )}

        {/* Streamlit App Iframe */}
        {!isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="ml-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                  🩻 BI-RADS Karar Destek Sistemi
                </span>
              </div>
            </div>
            
            {/* Production Message */}
            <div className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  BI-RADS Uygulaması Deploy Ediliyor
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Streamlit tabanlı interaktif BI-RADS değerlendirme sistemi production ortamına taşınıyor. 
                  Yakında tam fonksiyonel olarak erişilebilir olacak.
                </p>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-blue-200 dark:border-blue-600">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Şu an aktif özellikler:</strong>
                  </p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Kategori 0-6 sınıflandırması</li>
                    <li>• Mamografik bulgu analizi</li>
                    <li>• Risk stratifikasyonu</li>
                    <li>• ACR standardı uyumlu raporlama</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <div className="flex justify-center space-x-1 mb-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Deployment süreci devam ediyor...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📖 BI-RADS Hakkında
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Bu sistem <strong>American College of Radiology BI-RADS® Atlas 5. Baskı</strong> kriterlerine 
                göre mamografik bulguları değerlendirerek standart BI-RADS kategorilerini belirler. 
                Klinik pratikte karar verme sürecini destekler ve standart raporlama sağlar.
              </p>
              <div className="mt-3 text-xs text-blue-700 dark:text-blue-300">
                <p>• Kategori 0-6 sınıflandırması</p>
                <p>• Risk stratifikasyonu ve takip önerileri</p>
                <p>• Güncel ACR referansları</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🩻 Developed by <strong>ERNC</strong> | Antalya Eğitim ve Araştırma Hastanesi, 2025
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Assistant Radiologists: Erdinç Hakan İnan & ❤️ Heves Yaren Karakaş ❤️
          </p>
        </div>
      </main>
    </div>
  );
}
