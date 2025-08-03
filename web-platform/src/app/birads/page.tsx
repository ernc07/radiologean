'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BiRadsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Reduced from 2000ms
    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo2.png" alt="BI-RADS Logo" className="w-16 h-16 rounded-2xl shadow-lg object-contain" />
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
            
            <iframe
              src="https://radiologean-birads.onrender.com"
              className="w-full h-screen border-0"
              title="BI-RADS Streamlit App"
              style={{ minHeight: '800px' }}
              onLoad={handleIframeLoad}
              loading="lazy"
            />
            
            {!iframeLoaded && (
              <div className="absolute inset-0 bg-white dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Streamlit yükleniyor...</p>
                </div>
              </div>
            )}
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
