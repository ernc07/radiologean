/* eslint-disable */
// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const InvestmentDashboard = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('balanced');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  // Hisse verileri
  const stocks: any = {
    TSMC: {
      name: 'TSMC',
      fullName: 'Taiwan Semiconductor',
      price: 295,
      marketCap: '1.16T',
      perf52w: 46.12,
      pe: 31.51,
      forwardPE: 25.32,
      peg: 1.52,
      beta: 1.22,
      divYield: 1.13,
      profitMargin: 43.29,
      revenueGrowth: 30.30,
      earningsGrowth: 39.10,
      debtToEquity: 19.00,
      roe: 34.66,
      rating: 9.5,
      risk: 4,
      recommendation: 'AL',
      tier: 1,
      color: '#10b981',
      icon: '🏆',
      pros: ['En dengeli seçim', 'Mükemmel karlılık (43%)', 'AI + semiconductor lider', 'Düşük risk (4/10)', 'Temettü var (1.13%)'],
      cons: ['Çin-Tayvan jeopolitik risk', 'Yarıiletken döngüsü'],
      targetPrice: '330-350',
      potential: '+12-18%',
      buyPrice: '280-295',
      idealBuyPrice: '265-280',
      buyStatus: 'AL',
      buyReason: 'Şu anki fiyat ($295) zaten uygun! İdeal: $265-280'
    },
    MU: {
      name: 'Micron',
      fullName: 'Micron Technology',
      price: 202,
      marketCap: '205B',
      perf52w: 85.53,
      pe: 24.21,
      forwardPE: 12.33,
      peg: 0.18,
      beta: 1.57,
      divYield: 0.23,
      profitMargin: 22.85,
      revenueGrowth: 46.00,
      earningsGrowth: 260.90,
      debtToEquity: 28.34,
      roe: 17.20,
      rating: 8.5,
      risk: 6,
      recommendation: 'KÜÇÜK POZİSYON',
      tier: 2,
      color: '#3b82f6',
      icon: '💎',
      pros: ['PEG 0.18 (extreme ucuz!)', 'En yüksek performans (+85%)', 'HBM lideri (AI memory)', 'Kazanç patlaması (+260%)', 'Forward P/E 12.33'],
      cons: ['Zirvede (+85%)', 'Yüksek volatilite (Beta 1.57)', 'Döngüsel sektör', 'Düzeltme riski'],
      targetPrice: '220-245',
      potential: '+8-20%',
      buyPrice: '170-185',
      idealBuyPrice: '165-175',
      buyStatus: 'BEKLE',
      buyReason: 'Zirvede! $170-185\'e düşünce al'
    },
    QCOM: {
      name: 'Qualcomm',
      fullName: 'Qualcomm Inc.',
      price: 163,
      marketCap: '182B',
      perf52w: -3.29,
      pe: 16.30,
      forwardPE: 13.95,
      peg: 1.94,
      beta: 1.23,
      divYield: 2.18,
      profitMargin: 26.77,
      revenueGrowth: 10.30,
      earningsGrowth: 25.20,
      debtToEquity: 54.35,
      roe: 44.62,
      rating: 7.5,
      risk: 5,
      recommendation: 'AL',
      tier: 2,
      color: '#8b5cf6',
      icon: '📱',
      pros: ['En ucuz P/E (16.30)', 'İyi temettü (2.18%)', 'ROE 44.62% (güçlü)', '5G + AI PC büyümesi', 'Değer oyunu'],
      cons: ['Negatif performans (-3%)', 'Smartphone zayıf', 'Çin riski (%60 gelir)', 'PEG 1.94 (yüksek)'],
      targetPrice: '180-190',
      potential: '+10-15%',
      buyPrice: '155-170',
      idealBuyPrice: '150-160',
      buyStatus: 'AL',
      buyReason: 'Şimdi iyi değer! P/E 16.30 ucuz'
    },
    AAPL: {
      name: 'Apple',
      fullName: 'Apple Inc.',
      price: 252,
      marketCap: '3.82T',
      perf52w: 6.69,
      pe: 39.02,
      forwardPE: 32.05,
      peg: 2.47,
      beta: 1.09,
      divYield: 0.41,
      profitMargin: 24.30,
      revenueGrowth: 9.60,
      earningsGrowth: 9.30,
      debtToEquity: 154.49,
      roe: 149.51,
      rating: 7.0,
      risk: 5,
      recommendation: 'BEKLE',
      tier: 3,
      color: '#64748b',
      icon: '🛡️',
      pros: ['En büyük şirket (3.82T)', 'ROE 149.51% (muhteşem)', 'Güçlü marka', 'Ecosystem kilidi', 'Güvenli yatırım'],
      cons: ['Pahalı (P/E 39, PEG 2.47)', 'Yavaş büyüme (+9.6%)', 'Düşük performans (+6.7%)', 'Düşük potansiyel', 'Yüksek borç (154%)'],
      targetPrice: '270-280',
      potential: '+7-12%',
      buyPrice: '230-245',
      idealBuyPrice: '220-235',
      buyStatus: 'BEKLE',
      buyReason: '$230-245\'e düşünce al, şimdi pahalı'
    },
    AMD: {
      name: 'AMD',
      fullName: 'Advanced Micro Devices',
      price: 233,
      marketCap: '275B',
      perf52w: 47.61,
      pe: 101.63,
      forwardPE: 28.57,
      peg: 0.52,
      beta: 1.89,
      divYield: 0,
      profitMargin: 9.57,
      revenueGrowth: 31.70,
      earningsGrowth: 229.10,
      debtToEquity: 6.51,
      roe: 4.70,
      rating: 5.5,
      risk: 7,
      recommendation: 'ATLA',
      tier: 4,
      color: '#ef4444',
      icon: '⚡',
      pros: ['PEG 0.52 (undervalued)', 'Kazanç patlaması (+229%)', 'İyi performans (+47%)', 'Düşük borç (6.5%)', 'AI datacenter'],
      cons: ['P/E 101.63 (çılgın pahalı!)', 'Operating margin NEGATİF', 'Düşük karlılık (9.6%)', 'Çok volatil (Beta 1.89)', 'Nvidia gölgesi'],
      targetPrice: '255-270 veya 185',
      potential: '+10-15% veya -20%',
      buyPrice: '180-200',
      idealBuyPrice: '170-185',
      buyStatus: 'ATLA',
      buyReason: 'Çok pahalı! $180-200\'e düşerse düşün'
    },
    NVDA: {
      name: 'Nvidia',
      fullName: 'NVIDIA Corporation',
      price: 183,
      marketCap: '4.60T',
      perf52w: 27.49,
      pe: 53.81,
      forwardPE: 29.94,
      peg: 1.00,
      beta: 2.12,
      divYield: 0.02,
      profitMargin: 52.41,
      revenueGrowth: 55.60,
      earningsGrowth: 59.20,
      debtToEquity: 10.58,
      roe: 109.42,
      rating: 7.0,
      risk: 7,
      recommendation: 'ATLA',
      tier: 4,
      color: '#ef4444',
      icon: '🤖',
      pros: ['AI kralı (GPU %80)', 'En yüksek karlılık (52%!)', 'Tekel konumu', 'Hızlı büyüme (+55%)', 'Mükemmel bilanço'],
      cons: ['Çok pahalı (P/E 53!)', 'En kötü performans (+27%)', 'Extreme volatil (Beta 2.12)', 'Momentum kaybetti', 'PEG 1.00 (tam fiyat)'],
      targetPrice: '210-220 veya 130',
      potential: '+15-20% veya -30%',
      buyPrice: '130-150',
      idealBuyPrice: '120-140',
      buyStatus: 'ATLA',
      buyReason: 'Çok pahalı! $130-150\'ye düşerse al'
    },
    BABA: {
      name: 'Alibaba',
      fullName: 'Alibaba Group',
      price: 167,
      marketCap: '436B',
      perf52w: 65.54,
      pe: 21.86,
      forwardPE: 24.45,
      peg: 1.95,
      beta: 0.17,
      divYield: 0.63,
      profitMargin: 14.63,
      revenueGrowth: 1.80,
      earningsGrowth: 66.70,
      debtToEquity: 23.17,
      roe: 13.45,
      rating: 4.0,
      risk: 8,
      recommendation: 'ATLA',
      tier: 4,
      color: '#ef4444',
      icon: '🇨🇳',
      pros: ['Müthiş performans (+65%!)', 'En ucuz P/E (21.86)', 'Düşük volatilite (Beta 0.17)', 'Dev nakit ($416B)'],
      cons: ['ÇİN RİSKİ (deal breaker!)', 'CCP düzenlemeleri', 'Delisting riski', 'Sıfır büyüme (1.8%)', 'Jack Ma kayıp'],
      targetPrice: '192-200 veya 100',
      potential: '+15-20% veya -40%',
      buyPrice: '140-155',
      idealBuyPrice: '130-145',
      buyStatus: 'ATLA',
      buyReason: 'Çin riski çok yüksek! Alma!'
    },
    PYPL: {
      name: 'PayPal',
      fullName: 'PayPal Holdings',
      price: 67,
      marketCap: '65B',
      perf52w: -16.32,
      pe: 14.76,
      forwardPE: 11.89,
      peg: 0.76,
      beta: 1.45,
      divYield: 0,
      profitMargin: 14.49,
      revenueGrowth: 5.10,
      earningsGrowth: 11.80,
      debtToEquity: 60.25,
      roe: 22.92,
      rating: 6.5,
      risk: 6,
      recommendation: 'KÜÇÜK POZİSYON',
      tier: 3,
      color: '#f59e0b',
      icon: '💳',
      pros: ['PEG 0.76 (undervalued!)', 'Ucuz P/E (14.76)', 'ROE 22.92% (iyi)', 'Toparlanma potansiyeli'],
      cons: ['Negatif performans (-16%)', 'Rekabet (Apple Pay, Zelle)', 'Yavaş büyüme (5.1%)', 'Momentum yok'],
      targetPrice: '80-90',
      potential: '+15-30%',
      buyPrice: '60-70',
      idealBuyPrice: '58-65',
      buyStatus: 'BEKLE',
      buyReason: '$60-65\'e düşünce al, spekülatif'
    },
    KO: {
      name: 'Coca-Cola',
      fullName: 'The Coca-Cola Company',
      price: 68,
      marketCap: '284B',
      perf52w: -1.45,
      pe: 23.44,
      forwardPE: 20.53,
      peg: 2.21,
      beta: 0.42,
      divYield: 2.98,
      profitMargin: 25.89,
      revenueGrowth: 1.40,
      earningsGrowth: 58.00,
      debtToEquity: 166.37,
      roe: 42.37,
      rating: 5.0,
      risk: 3,
      recommendation: 'EMEKLİLER',
      tier: 4,
      color: '#64748b',
      icon: '🥤',
      pros: ['Yüksek temettü (2.98%)', 'Düşük volatilite (Beta 0.42)', 'Güçlü marka (130+ yıl)', 'Recession-proof'],
      cons: ['Sıfır büyüme (1.4%)', 'Negatif performans (-1.5%)', 'Yüksek borç (166%)', 'Düşük potansiyel'],
      targetPrice: '74-75',
      potential: '+4-7%',
      buyPrice: '62-68',
      idealBuyPrice: '60-65',
      buyStatus: 'EMEKLİLER',
      buyReason: 'Sadece emekliler için, gençler atla'
    },
    PFE: {
      name: 'Pfizer',
      fullName: 'Pfizer Inc.',
      price: 24,
      marketCap: '153B',
      perf52w: -16.28,
      pe: 14.33,
      forwardPE: 8.67,
      peg: 3.77,
      beta: 0.47,
      divYield: 7.02,
      profitMargin: 16.84,
      revenueGrowth: 10.30,
      earningsGrowth: 6997.60,
      debtToEquity: 69.70,
      roe: 12.17,
      rating: 5.5,
      risk: 4,
      recommendation: 'EMEKLİLER',
      tier: 4,
      color: '#64748b',
      icon: '💊',
      pros: ['Süper temettü (7.02%!)', 'Ucuz P/E (14.33)', 'Düşük volatilite (Beta 0.47)'],
      cons: ['Negatif performans (-16%)', 'COVID bitince düştü', 'Yüksek payout (89.9%)', 'Büyüme yok'],
      targetPrice: '26-28',
      potential: '+4-8%',
      buyPrice: '22-26',
      idealBuyPrice: '21-24',
      buyStatus: 'EMEKLİLER',
      buyReason: 'Sadece temettü için, emekliler için'
    },
    TTWO: {
      name: 'Take-Two',
      fullName: 'Take-Two Interactive',
      price: 261,
      marketCap: '47B',
      perf52w: 66.59,
      pe: 0,
      forwardPE: 102.04,
      peg: 10.20,
      beta: 1.02,
      divYield: 0,
      profitMargin: -72.92,
      revenueGrowth: 12.40,
      earningsGrowth: 0,
      debtToEquity: 100.75,
      roe: -59.29,
      rating: 2.0,
      risk: 8,
      recommendation: 'ATLA',
      tier: 4,
      color: '#ef4444',
      icon: '🎮',
      pros: ['İyi performans (+66%)', 'GTA 6 geliyor (2025)', 'Beta 1.02 (düşük volatilite)'],
      cons: ['ZARARDA! (EPS -$24)', 'Forward P/E 102 (çılgın!)', 'PEG 10.20 (extreme pahalı)', 'Profit margin -72%', 'ROE -59%'],
      targetPrice: 'N/A',
      potential: 'Çok riskli!',
      buyPrice: 'Hiç alma',
      idealBuyPrice: 'N/A',
      buyStatus: 'ATLA',
      buyReason: 'Zararda! Risk çok yüksek!'
    },
    AMZN: {
      name: 'Amazon',
      fullName: 'Amazon.com Inc.',
      price: 214,
      marketCap: '2.37T',
      perf52w: 12.68,
      pe: 33.90,
      forwardPE: 28.57,
      peg: 1.97,
      beta: 1.28,
      divYield: 0,
      profitMargin: 10.54,
      revenueGrowth: 13.30,
      earningsGrowth: 34.70,
      debtToEquity: 47.81,
      roe: 24.77,
      rating: 7.0,
      risk: 5,
      recommendation: 'BEKLE',
      tier: 3,
      color: '#f59e0b',
      icon: '📦',
      pros: ['En büyük 3. şirket (2.37T)', 'AWS cloud lideri', 'E-commerce dominant', 'Kazanç büyümesi (+34.7%)', 'Güçlü nakit ($93B)'],
      cons: ['P/E 33.90 (pahalı)', 'PEG 1.97 (yüksek)', 'Düşük karlılık (10.5%)', 'Orta performans (+12.7%)', 'Yüksek borç ($159B)'],
      targetPrice: '240-260',
      potential: '+10-20%',
      buyPrice: '195-210',
      idealBuyPrice: '185-200',
      buyStatus: 'BEKLE',
      buyReason: '$195-210\'a düşünce al, şimdi pahalı'
    }
  };

  // Portföy stratejileri
  const strategies: any = {
    balanced: {
      name: 'Güvenli & Dengeli',
      subtitle: '(TAVSİYE!)',
      risk: 5,
      expectedReturn: '12-18%',
      allocation: {
        TSMC: 50,
        MU: 15,
        QCOM: 15,
        AAPL: 10,
        PYPL: 5,
        CASH: 5
      },
      description: 'TSMC ana güç, Micron büyüme, Qualcomm değer, Apple güvenlik',
      forWho: 'Çoğu yatırımcı için ideal',
      color: '#10b981'
    },
    aggressive: {
      name: 'Agresif Büyüme',
      subtitle: '',
      risk: 6.5,
      expectedReturn: '15-25%',
      allocation: {
        TSMC: 40,
        MU: 20,
        QCOM: 20,
        AMD: 10,
        PYPL: 10
      },
      description: 'Yüksek büyüme hedefli, volatilite yüksek',
      forWho: 'Risk alabilen gençler',
      color: '#f59e0b'
    },
    conservative: {
      name: 'Muhafazakar',
      subtitle: '',
      risk: 4,
      expectedReturn: '8-12%',
      allocation: {
        TSMC: 50,
        AAPL: 20,
        QCOM: 15,
        KO: 10,
        CASH: 5
      },
      description: 'Düşük risk, istikrarlı gelir, temettü odaklı',
      forWho: 'Emekliler & yeni başlayanlar',
      color: '#64748b'
    },
    value: {
      name: 'Değer + Büyüme',
      subtitle: '',
      risk: 5.5,
      expectedReturn: '12-20%',
      allocation: {
        TSMC: 40,
        MU: 25,
        QCOM: 20,
        PYPL: 15
      },
      description: 'Undervalued hisseler, toparlanma oyunu',
      forWho: 'Değer yatırımcıları',
      color: '#8b5cf6'
    }
  };

  const calculatePortfolio = (strategyName, amount = 1000) => {
    const strategy = strategies[strategyName];
    const positions = {};
    
    Object.keys(strategy.allocation).forEach(symbol => {
      if (symbol === 'CASH') {
        positions[symbol] = {
          amount: amount * (strategy.allocation[symbol] / 100),
          percentage: strategy.allocation[symbol]
        };
      } else {
        const stock = stocks[symbol];
        const investmentAmount = amount * (strategy.allocation[symbol] / 100);
        positions[symbol] = {
          stock: stock,
          amount: investmentAmount,
          shares: investmentAmount / stock.price,
          percentage: strategy.allocation[symbol]
        };
      }
    });
    
    return positions;
  };

  const portfolio: any = useMemo(() => calculatePortfolio(selectedStrategy), [selectedStrategy]);

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#64748b', '#ec4899', '#06b6d4'];

  const comparisonData = Object.keys(stocks).map(key => ({
    name: stocks[key].name,
    'P/E': stocks[key].pe || 0,
    'Forward P/E': stocks[key].forwardPE,
    'PEG': stocks[key].peg,
    '52W Perf': stocks[key].perf52w,
    'Karlılık': stocks[key].profitMargin,
    'Risk': stocks[key].risk,
    'Rating': stocks[key].rating
  }));

  const getRadarData = (stockKey) => {
    const stock = stocks[stockKey];
    return [
      { metric: 'Değerleme', value: Math.max(0, 10 - (stock.pe / 10)), fullMark: 10 },
      { metric: 'Büyüme', value: Math.min(10, stock.revenueGrowth / 5), fullMark: 10 },
      { metric: 'Karlılık', value: stock.profitMargin / 5, fullMark: 10 },
      { metric: 'Güvenlik', value: 10 - stock.risk, fullMark: 10 },
      { metric: 'Performans', value: Math.max(0, Math.min(10, (stock.perf52w + 20) / 10)), fullMark: 10 },
    ];
  };

  const getTierStocks = (tier) => {
    return Object.keys(stocks).filter(key => stocks[key].tier === tier);
  };

  const getRiskColor = (risk) => {
    if (risk <= 4) return 'text-green-600 bg-green-100';
    if (risk <= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRecommendationColor = (rec) => {
    if (rec === 'AL') return 'bg-green-500 text-white';
    if (rec === 'BEKLE' || rec === 'KÜÇÜK POZİSYON') return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getBuyStatusColor = (status) => {
    if (status === 'AL') return 'bg-green-500 text-white';
    if (status === 'BEKLE') return 'bg-yellow-500 text-white';
    if (status === 'EMEKLİLER') return 'bg-blue-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-6 text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            📊 Ultimate Yatırım Portföy Analizi
          </h1>
          <p className="text-blue-100 text-lg">12 Hisse • 4 Strateji • $1,000 Optimal Dağılım • Alım Fiyat Aralıkları</p>
          <div className="mt-4 bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-sm mb-2">📅 Portföy Durumu - 20 Ekim 2025</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-white/70">Açık Pozisyon</div>
                <div className="text-xl font-bold">2 Hisse</div>
              </div>
              <div>
                <div className="text-white/70">Bekleyen Emir</div>
                <div className="text-xl font-bold">3 Emir</div>
              </div>
              <div>
                <div className="text-white/70">Toplam Yatırım</div>
                <div className="text-xl font-bold">$467.58</div>
              </div>
              <div>
                <div className="text-white/70">Günlük P/L</div>
                <div className="text-xl font-bold text-red-200">-$5 (-1.1%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-2 flex gap-2 overflow-x-auto">
          {[
            { id: 'myportfolio', label: '💼 Benim Portföyüm' },
            { id: 'overview', label: '📊 Genel Bakış' },
            { id: 'stocks', label: '💼 Hisse Detayları' },
            { id: 'strategies', label: '🎯 Stratejiler' },
            { id: 'comparison', label: '⚖️ Karşılaştırma' },
            { id: 'recommendations', label: '✅ Öneriler' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MY PORTFOLIO TAB */}
        {activeTab === 'myportfolio' && (
          <div className="space-y-6">
            {/* Açık Pozisyonlar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">✅</span>
                Açık Pozisyonlar (Traded)
              </h2>
              
              <div className="space-y-3">
                {/* TSMC */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-500">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🏆</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">TSMC - ADR</h3>
                        <p className="text-sm text-slate-600">Taiwan Semiconductor</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Order ID: 5335432600</div>
                      <div className="text-xs text-green-600 font-semibold">✅ Traded - 21 Oct 2025</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">Alım Fiyatı</div>
                      <div className="text-lg font-bold text-blue-600">$302.47</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">Şu Anki Fiyat</div>
                      <div className="text-lg font-bold">$301.82</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">Miktar</div>
                      <div className="text-lg font-bold">1 adet</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">P/L</div>
                      <div className="text-lg font-bold text-red-600">-$3 (-1%)</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid md:grid-cols-3 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-600 mb-1">🎯 Hedef (6 ay)</div>
                      <div className="font-bold text-green-600">$330-350 (+9-16%)</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-600 mb-1">🚀 Hedef (1-2 yıl)</div>
                      <div className="font-bold text-purple-600">$400-450 (+32-48%)</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-600 mb-1">🛡️ Stop-Loss</div>
                      <div className="font-bold text-red-600">$270 (-11%)</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-3 bg-green-100 rounded text-sm text-gray-800">
                    <strong className="text-gray-900">💡 Tavsiye:</strong> 1-2 yıl TUT! En iyi hisse (Rating 9.5/10), satmaya değmez. Stop-loss $270 koy.
                  </div>
                </div>

                {/* Qualcomm */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-5 border-2 border-purple-500">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">📱</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Qualcomm Inc.</h3>
                        <p className="text-sm text-slate-600">Qualcomm</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Order ID: 5335430370</div>
                      <div className="text-xs text-green-600 font-semibold">✅ Traded - 21 Oct 2025</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">Alım Fiyatı</div>
                      <div className="text-lg font-bold text-blue-600">$165.11</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">Şu Anki Fiyat</div>
                      <div className="text-lg font-bold">$164.76</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">Miktar</div>
                      <div className="text-lg font-bold">1 adet</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-500">P/L</div>
                      <div className="text-lg font-bold text-red-600">-$2 (-1%)</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid md:grid-cols-3 gap-3">
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-600 mb-1">🎯 Hedef (6 ay)</div>
                      <div className="font-bold text-green-600">$180-190 (+9-15%)</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-600 mb-1">🚀 Hedef (1-2 yıl)</div>
                      <div className="font-bold text-purple-600">$210-230 (+27-39%)</div>
                    </div>
                    <div className="bg-white rounded p-3">
                      <div className="text-xs text-slate-600 mb-1">🛡️ Stop-Loss</div>
                      <div className="font-bold text-red-600">$148 (-10%)</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-3 bg-purple-100 rounded text-sm">
                    <strong>💡 Tavsiye:</strong> 1-2 yıl TUT! P/E 16.30 (ucuz), temettü %2.18 var. Stop-loss $148 koy.
                  </div>
                </div>
              </div>

              {/* Toplam Özet */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-300">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-slate-600">Toplam Yatırım</div>
                    <div className="text-2xl font-bold text-blue-600">$467.58</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Şu Anki Değer</div>
                    <div className="text-2xl font-bold">$466.58</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">P/L Bugün</div>
                    <div className="text-2xl font-bold text-red-600">-$5.00</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">% Değişim</div>
                    <div className="text-2xl font-bold text-red-600">-1.1%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bekleyen Emirler */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">⏳</span>
                Bekleyen Emirler (Working)
              </h2>
              
              <div className="space-y-3">
                {/* PayPal */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">💳</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">PayPal Holdings Inc.</h3>
                        <p className="text-sm text-slate-600">Order ID: 5335454957</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-orange-600 font-semibold">⏳ Working</div>
                      <div className="text-xs text-slate-500">Day Order</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 mt-3">
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Limit Fiyat</div>
                      <div className="font-bold text-orange-600">$58.00</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Şu Anki Fiyat</div>
                      <div className="font-bold">$68.57</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Miktar</div>
                      <div className="font-bold">1 adet</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Durum</div>
                      <div className="font-bold text-yellow-600">Bekliyor</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    💡 Fiyat $58'e düşünce otomatik alınacak. İdeal alım: $58-65 arası.
                  </div>
                </div>

                {/* Apple */}
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border-2 border-slate-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🛡️</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Apple Inc.</h3>
                        <p className="text-sm text-slate-600">Order ID: 5335454940</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-600 font-semibold">⏳ Working</div>
                      <div className="text-xs text-slate-500">GTC</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 mt-3">
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Limit Fiyat</div>
                      <div className="font-bold text-blue-600">$230.00</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Şu Anki Fiyat</div>
                      <div className="font-bold">$260.12</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Miktar</div>
                      <div className="font-bold">1 adet</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Durum</div>
                      <div className="font-bold text-yellow-600">Bekliyor</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    💡 Fiyat $230'a düşünce otomatik alınacak. İdeal alım: $230-245 arası.
                  </div>
                </div>

                {/* Micron */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">💎</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Micron Technology Inc.</h3>
                        <p className="text-sm text-slate-600">Order ID: 5335454904</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-600 font-semibold">⏳ Working</div>
                      <div className="text-xs text-slate-500">GTC</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 mt-3">
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Limit Fiyat</div>
                      <div className="font-bold text-blue-600">$170.00</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Şu Anki Fiyat</div>
                      <div className="font-bold">$208.24</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Miktar</div>
                      <div className="font-bold">1 adet</div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-xs text-slate-500">Durum</div>
                      <div className="font-bold text-yellow-600">Bekliyor</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    💡 Fiyat $170'e düşünce otomatik alınacak (PEG 0.18!). İdeal alım: $170-185 arası.
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                <div className="text-sm text-gray-800">
                  <strong className="text-gray-900">⏰ Not:</strong> Bekleyen emirler GTC (Good Till Cancelled) tipinde. Fiyatlar hedefe ulaşana kadar bekleyecekler.
                  Day Order olanlar sadece bugün geçerli.
                </div>
              </div>
            </div>

            {/* Özet & Sonraki Adımlar */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border-2 border-green-500">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">📋</span>
                20 Ekim 2025 Özeti & Sonraki Adımlar
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-green-700">✅ Bugün Yapılanlar</h3>
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span><strong className="text-gray-900">TSMC</strong> $302.47'den alındı (1 adet)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span><strong className="text-gray-900">Qualcomm</strong> $165.11'den alındı (1 adet)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span><strong className="text-gray-900">Micron</strong> için $170 limit emir kuruldu (GTC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span><strong className="text-gray-900">Apple</strong> için $230 limit emir kuruldu (GTC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span><strong className="text-gray-900">PayPal</strong> için $58 limit emir kuruldu (Day)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-blue-700">🎯 Haftaya Yapılacaklar</h3>
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      <span><strong className="text-gray-900">Stop-Loss kur:</strong> TSMC $270, Qualcomm $148</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      <span><strong className="text-gray-900">PayPal emrini kontrol et</strong> (Day Order bugün iptal olur)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      <span><strong className="text-gray-900">Bekleyen emirleri kontrol et</strong> (hangisi doldu?)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      <span><strong className="text-gray-900">Limit Sell emirleri kur</strong> (uzun vade hedefler için)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      <span><strong className="text-gray-900">Portföy dengesi:</strong> Nakit ~$532, yeni fırsatları izle</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-2 text-gray-900">💰 Bütçe Durumu</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-slate-500">Kullanılan</div>
                    <div className="text-xl font-bold text-blue-600">$467.58</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Bekleyen</div>
                    <div className="text-xl font-bold text-yellow-600">$458.00</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Nakit</div>
                    <div className="text-xl font-bold text-green-600">$74.42</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 mt-2 text-center">
                  * Tüm emirler dolarsa toplam: $925.58, kalan nakit: $74.42
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-100 rounded-lg text-gray-800">
                <strong className="text-gray-900">🎉 Harika başlangıç!</strong> İlk adımları başarıyla attın. Şimdi sabırlı ol, emirlerin dolmasını bekle.
                Hafta içi piyasaları takip et ama günlük fiyat değişimlerine takılma. Uzun vade düşün! 💪
              </div>
            </div>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Tier Sistem */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-500 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <h3 className="font-bold text-green-800">TIER 1</h3>
                    <p className="text-sm text-green-600">Mutlaka Al</p>
                  </div>
                </div>
                {getTierStocks(1).map(key => (
                  <div key={key} className="bg-white rounded-lg p-3 mb-2 shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{stocks[key].name}</span>
                      <span className="text-2xl">{stocks[key].icon}</span>
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Rating: {stocks[key].rating}/10 ⭐
                    </div>
                    <div className="text-xs text-green-600 mt-1 font-semibold">
                      💰 Al: ${stocks[key].buyPrice}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-500 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">💎</span>
                  <div>
                    <h3 className="font-bold text-blue-800">TIER 2</h3>
                    <p className="text-sm text-blue-600">Güçlü Adaylar</p>
                  </div>
                </div>
                {getTierStocks(2).map(key => (
                  <div key={key} className="bg-white rounded-lg p-3 mb-2 shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{stocks[key].name}</span>
                      <span className="text-2xl">{stocks[key].icon}</span>
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Rating: {stocks[key].rating}/10 ⭐
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-500 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h3 className="font-bold text-yellow-800">TIER 3</h3>
                    <p className="text-sm text-yellow-600">Opsiyonel</p>
                  </div>
                </div>
                {getTierStocks(3).map(key => (
                  <div key={key} className="bg-white rounded-lg p-3 mb-2 shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{stocks[key].name}</span>
                      <span className="text-2xl">{stocks[key].icon}</span>
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Rating: {stocks[key].rating}/10 ⭐
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-500 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h3 className="font-bold text-red-800">TIER 4</h3>
                    <p className="text-sm text-red-600">Atla!</p>
                  </div>
                </div>
                <div className="text-sm text-red-700 space-y-1">
                  {getTierStocks(4).map(key => (
                    <div key={key} className="bg-white rounded-lg p-2 shadow">
                      {stocks[key].name} {stocks[key].icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-green-600">TSMC</div>
                <div className="text-sm text-slate-600">En İyi Seçim</div>
                <div className="text-xs text-green-600 mt-2">$280-295 Al</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-2xl font-bold text-blue-600">0.18</div>
                <div className="text-sm text-slate-600">En Düşük PEG</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-purple-600">+85%</div>
                <div className="text-sm text-slate-600">En Yüksek Perf</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-orange-600">7.02%</div>
                <div className="text-sm text-slate-600">En Yüksek Div</div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">📈 52 Hafta Performans Karşılaştırması</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="52W Perf" fill="#10b981" name="52W Performans (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk vs Return */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">⚖️ Risk vs Rating</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Risk" fill="#ef4444" name="Risk (10 üzerinden)" />
                  <Bar dataKey="Rating" fill="#10b981" name="Rating (10 üzerinden)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* STOCKS TAB */}
        {activeTab === 'stocks' && (
          <div className="space-y-4">
            {Object.keys(stocks).map(key => {
              const stock = stocks[key];
              return (
                <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setSelectedStock(selectedStock === key ? null : key)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{stock.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold">{stock.name}</h3>
                          <p className="text-slate-600">{stock.fullName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">${stock.price}</div>
                        <div className={`text-lg font-semibold ${stock.perf52w >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.perf52w >= 0 ? '+' : ''}{stock.perf52w.toFixed(2)}% (52W)
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRecommendationColor(stock.recommendation)}`}>
                        {stock.recommendation}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBuyStatusColor(stock.buyStatus)}`}>
                        💰 {stock.buyPrice}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(stock.risk)}`}>
                        Risk: {stock.risk}/10
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                        Rating: {stock.rating}/10 ⭐
                      </span>
                    </div>
                  </div>

                  {selectedStock === key && (
                    <div className="border-t border-slate-200 p-6 bg-slate-50">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-lg mb-3">📊 Temel Metrikler</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-white rounded">
                              <span className="text-slate-600">Market Cap:</span>
                              <span className="font-bold">{stock.marketCap}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-white rounded">
                              <span className="text-slate-600">P/E Ratio:</span>
                              <span className="font-bold">{stock.pe || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-white rounded">
                              <span className="text-slate-600">PEG Ratio:</span>
                              <span className="font-bold">{stock.peg}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-white rounded">
                              <span className="text-slate-600">Beta:</span>
                              <span className="font-bold">{stock.beta}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-white rounded">
                              <span className="text-slate-600">ROE:</span>
                              <span className="font-bold">{stock.roe}%</span>
                            </div>
                          </div>

                          <h4 className="font-bold text-lg mt-4 mb-3">💰 Alım Fiyatı</h4>
                          <div className="space-y-2 text-sm">
                            <div className={`p-4 rounded-lg border-2 ${
                              stock.buyStatus === 'AL' ? 'bg-green-50 border-green-500' :
                              stock.buyStatus === 'BEKLE' ? 'bg-yellow-50 border-yellow-500' :
                              stock.buyStatus === 'EMEKLİLER' ? 'bg-blue-50 border-blue-500' :
                              'bg-red-50 border-red-500'
                            }`}>
                              <div className="font-bold text-lg mb-1">{stock.buyStatus}</div>
                              <div className="space-y-1">
                                <div>
                                  <span className="text-slate-600">Uygun: </span>
                                  <span className="font-bold text-lg">${stock.buyPrice}</span>
                                </div>
                                {stock.idealBuyPrice && stock.idealBuyPrice !== 'N/A' && (
                                  <div>
                                    <span className="text-slate-600">İdeal: </span>
                                    <span className="font-bold text-green-600">${stock.idealBuyPrice}</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-slate-700 mt-2">{stock.buyReason}</div>
                              <div className="mt-2 pt-2 border-t text-xs">
                                Şu anki fiyat: <span className="font-bold">${stock.price}</span>
                                {stock.buyStatus === 'AL' && <span className="text-green-600"> ✅ İYİ FİYAT!</span>}
                                {stock.buyStatus === 'BEKLE' && <span className="text-yellow-600"> ⏸️ DÜŞÜŞÜ BEKLE</span>}
                                {stock.buyStatus === 'ATLA' && <span className="text-red-600"> ❌ ÇOK PAHALI!</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-4">
                            <h4 className="font-bold text-lg mb-2 text-green-700">✅ Güçlü Yanlar</h4>
                            <ul className="space-y-1 text-sm">
                              {stock.pros.map((pro: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-green-500 mt-1">✓</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-bold text-lg mb-2 text-red-700">❌ Zayıf Yanlar</h4>
                            <ul className="space-y-1 text-sm">
                              {stock.cons.map((con: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-red-500 mt-1">✗</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-bold text-center mb-2">Radar Analizi</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <RadarChart data={getRadarData(key)}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="metric" />
                                <PolarRadiusAxis angle={90} domain={[0, 10]} />
                                <Radar name={stock.name} dataKey="value" stroke={stock.color} fill={stock.color} fillOpacity={0.6} />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* STRATEGIES TAB */}
        {activeTab === 'strategies' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.keys(strategies).map(key => {
                const strategy = strategies[key];
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedStrategy(key)}
                    className={`cursor-pointer rounded-xl p-6 transition-all ${
                      selectedStrategy === key
                        ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                        : 'shadow-lg hover:shadow-xl'
                    }`}
                    style={{
                      background: selectedStrategy === key
                        ? `linear-gradient(135deg, ${strategy.color}15 0%, ${strategy.color}30 100%)`
                        : 'white'
                    }}
                  >
                    <h3 className="text-xl font-bold mb-1">{strategy.name}</h3>
                    {strategy.subtitle && (
                      <span className="text-sm font-semibold text-green-600">{strategy.subtitle}</span>
                    )}
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Risk:</span>
                        <span className="font-bold">{strategy.risk}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Getiri:</span>
                        <span className="font-bold text-green-600">{strategy.expectedReturn}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-3">{strategy.forWho}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                📊 {strategies[selectedStrategy].name} - Portföy Dağılımı
              </h3>
              <p className="text-slate-600 mb-6">{strategies[selectedStrategy].description}</p>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.keys(strategies[selectedStrategy].allocation).map((key, idx) => ({
                          name: key,
                          value: strategies[selectedStrategy].allocation[key],
                          color: COLORS[idx % COLORS.length]
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.keys(strategies[selectedStrategy].allocation).map((key, idx) => (
                          <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {Object.keys(portfolio).map(symbol => {
                    if (symbol === 'CASH') {
                      return (
                        <div key={symbol} className="bg-slate-100 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold text-lg">💵 CASH</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">${portfolio[symbol].amount.toFixed(2)}</div>
                              <div className="text-sm text-slate-600">{portfolio[symbol].percentage}%</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    const position = portfolio[symbol];
                    return (
                      <div key={symbol} className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{position.stock.icon}</span>
                              <span className="font-bold text-lg">{position.stock.name}</span>
                            </div>
                            <div className="text-sm text-slate-600 mt-1">
                              {position.shares.toFixed(3)} shares @ ${position.stock.price}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">${position.amount.toFixed(2)}</div>
                            <div className="text-sm text-slate-600">{position.percentage}%</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPARISON TAB */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">📊 P/E Ratio Karşılaştırması</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="P/E" fill="#8b5cf6" name="Trailing P/E" />
                  <Bar dataKey="Forward P/E" fill="#3b82f6" name="Forward P/E" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">💎 PEG Ratio Karşılaştırması</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData.sort((a, b) => a.PEG - b.PEG)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="PEG" fill="#10b981" name="PEG Ratio">
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.PEG < 1 ? '#10b981' : entry.PEG < 2 ? '#f59e0b' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS TAB */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-green-500">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <span className="text-4xl">🏆</span>
                EN İYİ 3 SEÇİM + ALIM FİYATLARI
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl mb-2">🥇</div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">TSMC</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Portföy:</span>
                      <span className="font-bold text-green-600">40-50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Uygun Alım:</span>
                      <span className="font-bold text-blue-600">$280-295</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">İdeal Alım:</span>
                      <span className="font-bold text-green-600">$265-280</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Potansiyel:</span>
                      <span className="font-bold text-purple-600">+12-18%</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 rounded text-xs text-gray-800">
                    <strong className="text-gray-900">✅ Şu anki fiyat ($295) zaten uygun!</strong>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl mb-2">🥈</div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">Micron</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Portföy:</span>
                      <span className="font-bold text-blue-600">15-20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Uygun Alım:</span>
                      <span className="font-bold text-blue-600">$170-185</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">İdeal Alım:</span>
                      <span className="font-bold text-green-600">$165-175</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Potansiyel:</span>
                      <span className="font-bold text-purple-600">+8-20%</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-gray-800">
                    <strong className="text-gray-900">⏸️ Şu an $202 - Düşüşü bekle!</strong>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl mb-2">🥉</div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">Qualcomm</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Portföy:</span>
                      <span className="font-bold text-purple-600">15-20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Uygun Alım:</span>
                      <span className="font-bold text-blue-600">$155-170</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">İdeal Alım:</span>
                      <span className="font-bold text-green-600">$150-160</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Potansiyel:</span>
                      <span className="font-bold text-purple-600">+10-15%</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-green-50 rounded text-xs text-gray-800">
                    <strong className="text-gray-900">✅ Şu an $163 - İyi fiyat!</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">
                🎯 FİNAL ÖNERİSİ - $1,000 PORTFÖY
              </h2>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between items-center">
                    <span>🏆 TSMC ($280-295)</span>
                    <span className="font-bold">$450-500 (45-50%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>💎 Micron ($170-185)</span>
                    <span className="font-bold">$150-200 (15-20%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>📱 Qualcomm ($155-170)</span>
                    <span className="font-bold">$150-200 (15-20%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🛡️ Apple/PayPal</span>
                    <span className="font-bold">$100-150 (10-15%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>💵 CASH</span>
                    <span className="font-bold">$50-100 (5-10%)</span>
                  </div>
                  <div className="border-t-2 border-white/30 pt-3 mt-3 flex justify-between items-center">
                    <span className="text-xl">TOPLAM</span>
                    <span className="font-bold text-2xl">$1,000</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">5/10</div>
                  <div className="text-sm">Risk (Orta)</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">12-18%</div>
                  <div className="text-sm">Hedef Getiri</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">~0.8%</div>
                  <div className="text-sm">Temettü</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl shadow-lg p-6 text-white text-center">
          <p className="text-lg font-semibold mb-2">
            🎉 Bu analiz senin için özel hazırlandı!
          </p>
          <p className="text-sm text-slate-300">
            Tüm veriler 20 Ekim 2025 tarihine göre güncellenmiştir. Yatırım kararlarınızı kendi araştırmanızla destekleyin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDashboard;