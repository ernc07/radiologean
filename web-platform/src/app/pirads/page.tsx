'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PiRadsPage() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Animated Construction Icon */}
        <div className="mb-8 relative">
          <img src="/logo3.png" alt="PI-RADS Logo" className="w-28 h-28 mx-auto rounded-2xl shadow-lg object-contain" />
          {/* Construction Hat */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-6 bg-yellow-400 rounded-t-full"></div>
            <div className="w-12 h-2 bg-yellow-500 rounded-full -mt-1"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          PI-RADS Modülü
        </h1>
        
        {/* Construction Message */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">
              Yapım Aşamasında{dots}
            </h2>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            PI-RADS (Prostate Imaging Reporting and Data System) modülümüz şu anda geliştirilme aşamasında. 
            Prostat MR görüntüleme için kapsamlı skorlama sistemi yakında hazır olacak!
          </p>
        </div>

        {/* What's Coming */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🚀 Yakında Gelecek Özellikler:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">PI-RADS v2.1 skorlama sistemi</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Anatomik zon değerlendirmesi</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">DWI, T2W, DCE analizi</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Biyopsi önerileri</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Risk stratifikasyonu</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Klinik karar desteği</span>
            </div>
          </div>
        </div>

        {/* Fun fact */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-blue-800 dark:text-blue-200">Biliyormusunuz?</span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            PI-RADS sistemi, prostat kanserinin erken tanısında %90&apos;a varan doğruluk oranı sağlayabilir! 
            Bu nedenle modülümüzü en ince detayına kadar hazırlıyoruz.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Gelişim Durumu</span>
            <span>%30</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '30%' }}></div>
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
          <a 
            href="http://localhost:8501"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            BI-RADS&apos;ı Dene →
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            💡 Önerileriniz var mı? Hangi özellikleri öncelikli görmek istersiniz?
          </p>
        </div>
      </div>
    </div>
  );
}
