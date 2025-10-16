"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function SplashScreen() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto mt-24 mb-12 p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col items-center">
        <img src="/logo.png" alt="Radiologean Amblem" className="w-24 h-24 mb-6 object-contain" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Radiologean</h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
          Klinik karar desteği ve bilimsel referanslar için sade, güvenilir bir platform.
        </p>
        <button
          onClick={handleClick}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label="Devam etmek için tıklayın"
        >
          Devam Et
        </button>
      </div>
      <div className="w-full max-w-md mx-auto mb-8 px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300">
        <div className="mb-1 font-semibold">Son güncelleme: Ağustos 2025</div>
        <div className="font-semibold mb-1">Referanslar:</div>
        <ul className="list-disc list-inside ml-3">
          <li>
            <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/BI-RADS" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">
              D’Orsi CJ, Sickles EA, Mendelson EB, Morris EA (eds.). ACR BI-RADS® Atlas, Breast Imaging Reporting and Data System. Reston, VA: American College of Radiology; 2013.
            </a>
          </li>
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/27138386/" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">
              Skaane P. Breast cancer screening with digital breast tomosynthesis. Breast Cancer. 2017 Jan;24(1):32-41. doi: 10.1007/s12282-016-0699-y. PMID: 27138386.
            </a>
          </li>
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/26756588/" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">
              Nelson HD, Fu R, Cantor A, Pappas M, Daeges M, Humphrey L. Effectiveness of Breast Cancer Screening: Systematic Review and Meta-analysis to Update the 2009 U.S. Preventive Services Task Force Recommendation. Ann Intern Med. 2016 Feb 16;164(4):244-55. doi: 10.7326/M15-0969. PMID: 26756588.
            </a>
          </li>
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/23117178/" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">
              Independent UK Panel on Breast Cancer Screening. The benefits and harms of breast cancer screening: an independent review. Lancet. 2012 Nov 17;380(9855):1778-86. doi: 10.1016/S0140-6736(12)61611-0. PMID: 23117178.
            </a>
          </li>
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/33538338/" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">
              Sung H, Ferlay J, Siegel RL, Laversanne M, Soerjomataram I, Jemal A, Bray F. Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwide for 36 Cancers in 185 Countries. CA Cancer J Clin. 2021 May;71(3):209-249. doi: 10.3322/caac.21660. PMID: 33538338.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}