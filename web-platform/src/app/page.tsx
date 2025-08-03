"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function SplashScreen() {
  const router = useRouter();
  const [gradient, setGradient] = useState('linear-gradient(120deg, #1e3a8a 0%, #2563eb 30%, #22d3ee 60%, #f59e42 100%)');
  const [fracture, setFracture] = useState<{x:number, y:number, seed:number} | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // seed'i sadece mouse hareketiyle oluştur
    setFracture({x: e.clientX, y: e.clientY, seed: Date.now()});
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const centerX = Math.round(x * 100);
    const centerY = Math.round(y * 100);
    const color1 = '#1e3a8a';
    const color2 = '#22d3ee';
    const color3 = '#f59e42';
    const color4 = '#fbbf24';
    setGradient(`radial-gradient(circle at ${centerX}% ${centerY}%, ${color1} 0%, ${color2} 35%, ${color3} 70%, ${color4} 100%)`);
  };

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <>
      <Head>
        <title>Radiologean | Radyoloji Destek Sistemi</title>
        <meta name="description" content="Radyoloji için akademik, referans ve bilimsel destek platformu. BI-RADS, PI-RADS, Bosniak, Adrenal, Ti-RADS değerlendirme araçları." />
        <meta name="keywords" content="radyoloji, BI-RADS, PI-RADS, Bosniak, Adrenal, Ti-RADS, tıbbi, klinik, destek, rehber" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx global>{`
          .animate-fade-in {
            animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-pulse {
            animation: pulse 6s infinite cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          @keyframes radiologean-fade {
            0% { opacity: 0; transform: scale(0.8); letter-spacing: 0.3em; }
            60% { opacity: 1; transform: scale(1.05); letter-spacing: 0.18em; }
            100% { opacity: 1; transform: scale(1); letter-spacing: 0.12em; }
          }
        `}</style>
      </Head>
      <div
        className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
        aria-label="Ana sayfa splash ekranı"
        role="main"
        style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 -z-10" id="splash-bg-snapshot">
          <div className="absolute inset-0 w-full h-full" style={{background: gradient, transition: 'background 0.5s cubic-bezier(0.4,0,0.2,1)'}}></div>
          {fracture && (
            <svg
              style={{
                position: 'absolute',
                left: fracture.x - 1800,
                top: fracture.y - 1800,
                width: 3600,
                height: 3600,
                pointerEvents: 'none',
                zIndex: 2,
                transition: 'left 0.08s, top 0.08s',
                mixBlendMode: 'overlay',
              }}
              viewBox="0 0 3600 3600"
            >
              <defs>
                <radialGradient id="fractureGrad" cx="50%" cy="50%" r="95%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
                  <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.28" />
                  <stop offset="60%" stopColor="#f59e42" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.18" />
                </radialGradient>
                <filter id="fractureBlur" x="-2%" y="-2%" width="104%" height="104%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <polygon
                points="1080,1800 1800,1080 2520,1800 1800,2520 1260,2280 2340,1260"
                fill="url(#fractureGrad)"
                filter="url(#fractureBlur)"
                opacity="0.75"
              />
              <polygon
                points="1500,1800 1800,1500 2100,1800 1800,2100"
                fill="#fff"
                filter="url(#fractureBlur)"
                opacity="0.22"
              />
              {Array.from({length:120}).map((_,i)=>{
                function seededRandom(seed:number) {
                  let x = Math.sin((fracture?.seed ?? 0) + i) * 10000;
                  return x - Math.floor(x);
                }
                const angle = (i/120)*2*Math.PI + Math.sin((fracture?.x ?? 0)/100+i)*0.2;
                const x1 = 1800;
                const y1 = 1800;
                const len = 1800 + Math.sin((fracture?.y ?? 0)/120+i)*320 + seededRandom(fracture?.seed ?? 0)*1200;
                const x2 = 1800 + Math.cos(angle)*len;
                const y2 = 1800 + Math.sin(angle)*len;
                const baseColors = ['#22d3ee','#f59e42','#fbbf24','#1e3a8a','#fff'];
                let color = baseColors[i%baseColors.length];
                const opacity = 0.18+Math.abs(Math.sin(angle*(fracture?.x ?? 0)/800+i*(fracture?.y ?? 0)/900))*0.28;
                const strokeWidth = seededRandom((fracture?.seed ?? 0)+i)*5+2;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                    filter="url(#fractureBlur)"
                  />
                );
              })}
              {[0,Math.PI/2,Math.PI,3*Math.PI/2].map((cornerAngle,ci)=>
                Array.from({length:20}).map((_,i)=>{
                  function seededRandom(seed:number) {
                    let x = Math.sin((fracture?.seed ?? 0) + i + ci*100) * 10000;
                    return x - Math.floor(x);
                  }
                  const angle = cornerAngle + (i/20-0.5)*Math.PI/2 + Math.sin((fracture?.x ?? 0)/200+i*2)*0.1;
                  const x1 = Math.cos(cornerAngle)*1800+1800;
                  const y1 = Math.sin(cornerAngle)*1800+1800;
                  const len = 1200 + Math.sin((fracture?.y ?? 0)/80+i*2)*180 + seededRandom(fracture?.seed ?? 0)*900;
                  const x2 = x1 + Math.cos(angle)*len;
                  const y2 = y1 + Math.sin(angle)*len;
                  const color = ci%2===0 ? '#22d3ee' : '#f59e42';
                  const opacity = 0.14+Math.abs(Math.sin(angle*(fracture?.x ?? 0)/1200+i*(fracture?.y ?? 0)/1300))*0.22;
                  const strokeWidth = seededRandom((fracture?.seed ?? 0)+i+ci*100)*4+1.5;
                  return (
                    <line
                      key={"corner"+ci+"-"+i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={color}
                      strokeWidth={strokeWidth}
                      opacity={opacity}
                      filter="url(#fractureBlur)"
                    />
                  );
                })
              )}
            </svg>
          )}
          <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#22d3ee] via-[#2563eb] to-[#f59e42] opacity-30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#f59e42] via-[#2563eb] to-[#1e3a8a] opacity-20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-gradient-to-r from-[#2563eb] via-[#22d3ee] to-[#f59e42] opacity-10 rounded-full blur-2xl animate-pulse" style={{animationDuration: '10s'}}></div>
        </div>
        <div className="relative z-10 text-center px-8 py-12 rounded-3xl backdrop-blur-2xl bg-white/10 shadow-xl max-w-xl mx-auto border border-white/20 animate-fade-in flex flex-col items-center justify-center" style={{minHeight: '400px'}}>
          <div className="flex flex-col items-center justify-center mb-8">
            <span
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: "2.8rem",
                color: "#fff",
                letterSpacing: "0.12em",
                textShadow: "0 2px 16px #2563eb88",
                animation: "radiologean-fade 2.2s cubic-bezier(0.4,0,0.2,1) forwards",
                opacity: 0,
                display: "inline-block",
              }}
              className="radiologean-logo"
            >
              Radiologean
            </span>
          </div>
          <style jsx global>{`
            @keyframes radiologean-fade {
              0% { opacity: 0; transform: scale(0.8); letter-spacing: 0.3em; }
              60% { opacity: 1; transform: scale(1.05); letter-spacing: 0.18em; }
              100% { opacity: 1; transform: scale(1); letter-spacing: 0.12em; }
            }
          `}</style>
          <img src="/logo.png" alt="Radiologean Amblem" className="w-32 h-32 md:w-40 md:h-40 mb-6 object-contain" />
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight drop-shadow-2xl" tabIndex={0} aria-label="Radyoloji Destek Sistemi">
            Radyoloji Karar Destek Sistemi
          </h1>
          <p className="text-base md:text-xl text-white/80 mb-5 font-medium" tabIndex={0} aria-label="Bilimsel ve referans platform">
            Bilimsel ve referans temelli, klinik karar desteği için modern bir platform.
          </p>
          <button
            onClick={handleClick}
            className="mt-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-fade-in"
            aria-label="Devam etmek için tıklayın"
          >
            Devam Et
          </button>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center mt-6 mb-2 w-full">
          <div className="inline-flex items-center gap-3 bg-white/40 dark:bg-gray-900/40 text-xs text-gray-900 dark:text-gray-100 px-6 py-3 rounded-2xl shadow-lg border border-white/30 backdrop-blur-xl max-w-md mx-auto">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m-4-5v9" /></svg>
            <div className="flex flex-col text-left">
              <span className="font-semibold">Son güncelleme:</span> <span className="ml-1">Ağustos 2025</span>
              <span className="font-semibold mt-2 mb-1">Referanslar:</span>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>
                  <a href="https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/TI-RADS" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">ACR TI-RADS: Thyroid Imaging Reporting and Data System</a>
                  <span className="block text-gray-700 dark:text-gray-300 text-[11px]">American College of Radiology, tiroid nodülleri için risk değerlendirme sistemi.</span>
                </li>
                <li>
                  <a href="https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/PI-RADS" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">ACR PI-RADS: Prostate Imaging Reporting and Data System</a>
                  <span className="block text-gray-700 dark:text-gray-300 text-[11px]">Prostat MR değerlendirmesi için uluslararası standart.</span>
                </li>
                <li>
                  <a href="https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/BI-RADS" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">ACR BI-RADS: Breast Imaging Reporting and Data System</a>
                  <span className="block text-gray-700 dark:text-gray-300 text-[11px]">Meme görüntülemede risk ve takip protokolleri için rehber.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}