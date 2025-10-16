'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdrenalPage() {
  const [calculating, setCalculating] = useState(false);
  // const [huValue, setHuValue] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculating(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Animated Adrenal Icon */}
        <div className="mb-8 relative">
          <img src="/logo4.png" alt="Adrenal Logo" className="w-28 h-28 mx-auto rounded-2xl shadow-lg object-contain" />
          {/* Calculator display */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-green-400 text-black px-2 py-1 rounded text-xs font-mono">
              {calculating ? 'HU...' : '< 10'}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Adrenal Bez Hesaplayıcısı
        </h1>
        
        {/* Construction Message */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
              Hesaplama Motoru Hazırlanıyor!
            </h2>
          </div>
          <p className="text-purple-700 dark:text-purple-300 mb-4">
            Adrenal bez lezyonları için HU değeri hesaplamaları, washout analizleri ve 
            karakterizasyon algoritmaları geliştiriliyor. Yakında tam otomatik hesaplama!
          </p>
        </div>

        {/* Preview Calculator Mock */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🧮 Hesaplayıcı Önizlemesi (Demo):
          </h3>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Native HU Değeri:
                </label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                  placeholder="örn: 15"
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Venöz Faz HU:
                </label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                  placeholder="örn: 85"
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Geç Faz HU:
                </label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                  placeholder="örn: 45"
                  disabled
                />
              </div>
            </div>
            
            <button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors opacity-50 cursor-not-allowed"
              disabled
            >
              Washout Hesapla (Yakında!)
            </button>
            
            {/* Mock Result */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-dashed border-2 border-gray-300 dark:border-gray-600">
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>• Absolute Washout: <span className="font-mono">%47 (&gt;60% = adenoma)</span></p>
                <p>• Relative Washout: <span className="font-mono">%57 (&gt;40% = adenoma)</span></p>
                <p>• Değerlendirme: <span className="font-semibold text-green-600">Adenoma ile uyumlu</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Coming */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔬 Gelecek Özellikler:
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-left">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Otomatik HU ölçümü</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Washout hesaplamaları</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Chemical shift MR analizi</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Diferansiyel tanı önerileri</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Boyut/morfoloji değerlendirmesi</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Takip protokolü önerileri</span>
            </div>
          </div>
        </div>

        {/* Clinical Reference */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-medium text-orange-800 dark:text-orange-200">Klinik İpucu</span>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            <strong>&lt;10 HU:</strong> Adenoma karakteristik • 
            <strong>&gt;60% Absolute Washout:</strong> Adenoma • 
            <strong>&gt;40% Relative Washout:</strong> Adenoma
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Modül Hazırlık</span>
            <span>%25</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            ← Ana Sayfaya Dön
          </Link>
          <Link 
            href="/pirads"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            PI-RADS&apos;ı İncele →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🩺 Hangi adrenal bez hesaplama özelliklerini öncelikli görmek istersiniz?
          </p>
        </div>
      </div>
    </div>
  );
}
