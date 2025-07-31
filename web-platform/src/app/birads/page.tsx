'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BiRadsResult {
  category: string;
  description: string;
  recommendation: string;
  risk: string;
  cssClass: string;
}

interface FormData {
  examComplete: string;
  findingType: string[];
  shape?: string;
  margin?: string;
  stable2yr?: boolean;
  kalsifikasyonType?: string;
  distribution?: string;
  archDistortionType?: string;
  asymmetryType?: string;
}

export default function BiRadsPage() {
  const [formData, setFormData] = useState<FormData>({
    examComplete: '',
    findingType: []
  });
  const [result, setResult] = useState<BiRadsResult | null>(null);

  const calculateBiRads = (): BiRadsResult => {
    // BI-RADS 0 - Yetersiz tetkik
    if (formData.examComplete === 'no') {
      return {
        category: 'BI-RADS 0',
        description: 'Tetkik yeterli değil. Ek görüntüleme gereklidir.',
        recommendation: 'Ek tetkik yapılmadan kesin değerlendirme yapılamaz.',
        risk: 'Değerlendirme tamamlanamadı',
        cssClass: 'birads-0'
      };
    }

    // Hiç bulgu yok - BI-RADS 1
    if (formData.findingType.length === 0) {
      return {
        category: 'BI-RADS 1',
        description: 'Negatif mamografi - bulgu yok.',
        recommendation: 'Rutin tarama mamografisi (1 yıl)',
        risk: 'Malignite riski yok',
        cssClass: 'birads-1'
      };
    }

    // Kitle değerlendirmesi
    if (formData.findingType.includes('kitle')) {
      if (formData.shape && formData.margin) {
        if (['yuvarlak', 'oval'].includes(formData.shape) && formData.margin === 'düzgün') {
          if (formData.stable2yr) {
            return {
              category: 'BI-RADS 2',
              description: 'Benign bulgu - 2 yıldır stabil kitle.',
              recommendation: 'Rutin tarama mamografisi (1 yıl)',
              risk: 'Malignite riski %0',
              cssClass: 'birads-2'
            };
          } else {
            return {
              category: 'BI-RADS 3',
              description: 'Muhtemelen benign bulgu.',
              recommendation: '6 aylık takip önerilir',
              risk: 'Malignite riski <%2',
              cssClass: 'birads-3'
            };
          }
        } else if (formData.margin === 'mikrolobüle') {
          return {
            category: 'BI-RADS 4A',
            description: 'Düşük şüpheli bulgu.',
            recommendation: 'Doku örneklemesi (biyopsi) önerilir',
            risk: 'Malignite riski %2-10',
            cssClass: 'birads-4a'
          };
        } else if (formData.margin === 'düzensiz') {
          return {
            category: 'BI-RADS 4B',
            description: 'Orta şüpheli bulgu.',
            recommendation: 'Doku örneklemesi (biyopsi) önerilir',
            risk: 'Malignite riski %10-50',
            cssClass: 'birads-4b'
          };
        } else if (formData.margin === 'spiküle') {
          return {
            category: 'BI-RADS 5',
            description: 'Yüksek şüpheli bulgu.',
            recommendation: 'Doku örneklemesi (biyopsi) önerilir',
            risk: 'Malignite riski >%95',
            cssClass: 'birads-5'
          };
        }
      }
    }

    // Kalsifikasyon değerlendirmesi
    if (formData.findingType.includes('kalsifikasyon')) {
      if (formData.kalsifikasyonType === 'benign') {
        return {
          category: 'BI-RADS 2',
          description: 'Benign kalsifikasyonlar.',
          recommendation: 'Rutin tarama mamografisi (1 yıl)',
          risk: 'Malignite riski %0',
          cssClass: 'birads-2'
        };
      } else if (formData.kalsifikasyonType === 'şüpheli') {
        return {
          category: 'BI-RADS 4C',
          description: 'Şüpheli kalsifikasyonlar.',
          recommendation: 'Doku örneklemesi (biyopsi) önerilir',
          risk: 'Malignite riski %50-95',
          cssClass: 'birads-4c'
        };
      }
    }

    // Default BI-RADS 4A
    return {
      category: 'BI-RADS 4A',
      description: 'Değerlendirme gerektiren bulgu.',
      recommendation: 'Doku örneklemesi (biyopsi) önerilir',
      risk: 'Malignite riski %2-10',
      cssClass: 'birads-4a'
    };
  };

  const handleSubmit = () => {
    const biRadsResult = calculateBiRads();
    setResult(biRadsResult);
  };

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleFindingType = (finding: string) => {
    setFormData(prev => ({
      ...prev,
      findingType: prev.findingType.includes(finding)
        ? prev.findingType.filter(f => f !== finding)
        : [...prev.findingType, finding]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                ⚠️ Bu sistem yalnızca mamografik bulgular üzerinden BI-RADS kategorizasyonu yapar. 
                US/MRI/klinik değerlendirme içermez.
              </p>
            </div>
          </div>
        </div>

        {!result ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              BI-RADS Değerlendirme Formu
            </h2>

            {/* Tetkik Yeterli mi */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tetkik yeterli mi?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="examComplete"
                    value="yes"
                    checked={formData.examComplete === 'yes'}
                    onChange={(e) => updateFormData('examComplete', e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Evet</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="examComplete"
                    value="no"
                    checked={formData.examComplete === 'no'}
                    onChange={(e) => updateFormData('examComplete', e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Hayır</span>
                </label>
              </div>
            </div>

            {formData.examComplete === 'yes' && (
              <>
                {/* Bulgu Tipi */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Bulgu Tipi (Çoklu seçim yapabilirsiniz)
                  </label>
                  <div className="space-y-2">
                    {['kitle', 'kalsifikasyon', 'architectural-distortion', 'asimetri'].map((finding) => (
                      <label key={finding} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.findingType.includes(finding)}
                          onChange={() => toggleFindingType(finding)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                          {finding.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Kitle Özellikleri */}
                {formData.findingType.includes('kitle') && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Kitle Özellikleri</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Lezyon Şekli
                        </label>
                        <select
                          value={formData.shape || ''}
                          onChange={(e) => updateFormData('shape', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option value="">Seçiniz</option>
                          <option value="yuvarlak">Yuvarlak</option>
                          <option value="oval">Oval</option>
                          <option value="düzensiz">Düzensiz</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Kenar Özelliği
                        </label>
                        <select
                          value={formData.margin || ''}
                          onChange={(e) => updateFormData('margin', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option value="">Seçiniz</option>
                          <option value="düzgün">Düzgün</option>
                          <option value="mikrolobüle">Mikrolobüle</option>
                          <option value="düzensiz">Düzensiz</option>
                          <option value="spiküle">Spiküle</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.stable2yr || false}
                          onChange={(e) => updateFormData('stable2yr', e.target.checked)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          Kitle 2 yıldır takipte stabil mi?
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Kalsifikasyon Özellikleri */}
                {formData.findingType.includes('kalsifikasyon') && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Kalsifikasyon Özellikleri</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kalsifikasyon Tipi
                      </label>
                      <select
                        value={formData.kalsifikasyonType || ''}
                        onChange={(e) => updateFormData('kalsifikasyonType', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Seçiniz</option>
                        <option value="benign">Benign (Periferal rim, popcorn, vb.)</option>
                        <option value="şüpheli">Şüpheli (İnce pleomorfik, segmental, vb.)</option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!formData.examComplete}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                BI-RADS Değerlendirmesi Yap
              </button>
            </div>
          </div>
        ) : (
          /* Result Display */
          <div className="space-y-6">
            <div className={`p-6 rounded-lg text-center ${
              result.cssClass === 'birads-0' ? 'bg-gray-100 text-gray-800' :
              result.cssClass === 'birads-1' ? 'bg-gray-100 text-gray-800' :
              result.cssClass === 'birads-2' ? 'bg-green-100 text-green-800' :
              result.cssClass === 'birads-3' ? 'bg-blue-100 text-blue-800' :
              result.cssClass === 'birads-4a' ? 'bg-yellow-100 text-yellow-800' :
              result.cssClass === 'birads-4b' ? 'bg-orange-100 text-orange-800' :
              result.cssClass === 'birads-4c' ? 'bg-red-100 text-red-800' :
              result.cssClass === 'birads-5' ? 'bg-red-200 text-red-900' :
              'bg-gray-100 text-gray-800'
            }`}>
              <h2 className="text-3xl font-bold mb-2">{result.category}</h2>
              <p className="text-lg mb-4">{result.description}</p>
              <p className="text-sm font-medium mb-2">{result.recommendation}</p>
              <p className="text-sm">{result.risk}</p>
            </div>

            {/* Reference Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📖 Referans Bilgisi</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                American College of Radiology. BI-RADS® Atlas, 5th Edition. 
                Bu değerlendirme standart BI-RADS kriterlerine göre yapılmıştır.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setResult(null);
                  setFormData({ examComplete: '', findingType: [] });
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Yeni Değerlendirme
              </button>
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
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
