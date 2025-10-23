'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

// Masaüstü için animasyonlu arka plan bileşeni
function AnimatedBackground({
  colors, mousePos, mouseVelocity, themeTransition, timeOffset, screenSize, waveCount
}: any) {
  // SVG dalga üretimi JSX ile
  return (
    <div className="absolute inset-0 transition-all duration-1000 ease-out overflow-hidden">
      {/* Base gradient that shifts with themes */}
      <div 
        className="absolute inset-0 transition-all duration-2000"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}10 25%, ${colors.tertiary}12 50%, ${colors.accent}08 75%, ${colors.primary}05 100%)`
        }}
      />
      {/* Animated liquid texture displacement */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x + 10}% ${mousePos.y + 10}%, ${colors.velocity1}25, transparent 50%),
            radial-gradient(circle at ${mousePos.x - 10}% ${mousePos.y - 10}%, ${colors.velocity2}20, transparent 45%),
            radial-gradient(circle at ${mousePos.x + 20}% ${mousePos.y - 15}%, ${colors.accent1}15, transparent 40%),
            radial-gradient(circle at ${mousePos.x - 15}% ${mousePos.y + 20}%, ${colors.accent2}18, transparent 55%)
          `,
          transform: `scale(${1 + themeTransition * 0.1}) rotate(${themeTransition * 5}deg)`,
          filter: `blur(${themeTransition * 2}px)`
        }}
      />
      {/* SVG dalga animasyonu */}
      <svg
        width={screenSize.width}
        height={screenSize.height}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.6 + themeTransition * 0.3,
          animation: 'wave-distort 25s ease-in-out infinite',
          transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 0.8}px) rotate(${mousePos.x * 0.03 + timeOffset * 0.5}deg) scale(${1 + themeTransition * 0.2})`,
        }}
      >
        <defs>
          <filter id="liquid">
            <feTurbulence baseFrequency="0.01 0.02" numOctaves="2" result="turb" />
            <feDisplacementMap in2="turb" in="SourceGraphic" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        {Array.from({ length: waveCount }).map((_, i) => {
          const points = Array.from({ length: 16 }).map((_, j) => {
            const x = (j / 15) * screenSize.width;
            const y =
              screenSize.height / 2 +
              Math.sin(
                (j / 2) +
                  timeOffset * 4 +
                  i * 0.7 +
                  Math.sin(timeOffset + i) * 0.5
              ) * (30 + 12 * Math.sin(timeOffset + i));
            return `${x},${y}`;
          }).join(' ');
          const colorArr = [
            colors.primary, colors.secondary, colors.accent, colors.tertiary,
            colors.accent1, colors.accent2, colors.accent3
          ];
          const color = colorArr[i % 7];
          const opacity = 0.16 + (i % 5) * 0.07 + Math.abs(Math.sin(timeOffset + i)) * 0.07;
          const strokeWidth = 2 + (i % 3);
          return (
            <polyline
              key={i}
              points={points}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              opacity={opacity}
              filter="url(#liquid)"
            />
          );
        })}
      </svg>
      {/* Theme-based particle system */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2 + timeOffset * 0.5;
          const radius = 100 + mousePos.x * 2 + mousePos.y * 1.5;
          const x = 50 + Math.cos(angle) * (radius / (typeof window !== 'undefined' ? window.innerWidth : 1000) * 100 || 10);
          const y = 50 + Math.sin(angle) * (radius / (typeof window !== 'undefined' ? window.innerHeight : 1000) * 100 || 10);
          return (
            <div
              key={i}
              className="absolute transition-all duration-700 ease-out"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${8 + i * 2 + themeTransition * 10}px`,
                height: `${8 + i * 2 + themeTransition * 10}px`,
                background: i % 4 === 0 ? colors.primary : i % 4 === 1 ? colors.secondary : i % 4 === 2 ? colors.accent : colors.tertiary,
                borderRadius: '50%',
                opacity: 0.15 + themeTransition * 0.2,
                transform: `translate(-50%, -50%) scale(${1 + Math.sin(timeOffset * 3 + i) * 0.5 + themeTransition * 0.8}) rotate(${timeOffset * 20 + i * 30}deg)`,
                filter: `blur(${1 + themeTransition * 2}px) hue-rotate(${timeOffset * 40 + i * 15}deg)`,
                mixBlendMode: 'multiply'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Basit cihaz/mobil tespiti
function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const [currentTheme, setCurrentTheme] = useState(0);
  const [themeTransition, setThemeTransition] = useState(0);
  const [timeOffset, setTimeOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 });

  // Linkin Park style theme system - multiple themes that cycle
  const themes = [
    {
      name: 'Medical Blue',
      primary: { h: 210, s: 80, l: 55 },
      secondary: { h: 190, s: 75, l: 60 },
      accent: { h: 230, s: 85, l: 50 },
      texture: 'medical'
    },
    {
      name: 'Neural Purple',
      primary: { h: 280, s: 75, l: 60 },
      secondary: { h: 300, s: 80, l: 55 },
      accent: { h: 260, s: 85, l: 65 },
      texture: 'neural'
    },
    {
      name: 'Cyber Cyan',
      primary: { h: 180, s: 85, l: 60 },
      secondary: { h: 160, s: 80, l: 65 },
      accent: { h: 200, s: 90, l: 55 },
      texture: 'cyber'
    },
    {
      name: 'Radiology Green',
      primary: { h: 120, s: 70, l: 55 },
      secondary: { h: 140, s: 75, l: 60 },
      accent: { h: 100, s: 80, l: 50 },
      texture: 'radiology'
    },
    {
      name: 'X-Ray Orange',
      primary: { h: 30, s: 80, l: 60 },
      secondary: { h: 50, s: 75, l: 65 },
      accent: { h: 10, s: 85, l: 55 },
      texture: 'xray'
    }
  ];

  useEffect(() => {
    if (isMobile) return;
    let lastPos = { x: 0, y: 0 };
    let lastTime = Date.now();
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const newPos = {
        x: typeof window !== 'undefined' ? (e.clientX / window.innerWidth) * 100 : 50,
        y: typeof window !== 'undefined' ? (e.clientY / window.innerHeight) * 100 : 50
      };
      const velocity = {
        x: (newPos.x - lastPos.x) / (deltaTime || 1) * 1000,
        y: (newPos.y - lastPos.y) / (deltaTime || 1) * 1000
      };
      setMousePos(newPos);
      setMouseVelocity(velocity);
      const intensity = Math.abs(velocity.x) + Math.abs(velocity.y);
      if (intensity > 50) {
        setThemeTransition(Math.min(1, intensity / 200));
      }
      lastPos = newPos;
      lastTime = currentTime;
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  // Advanced theme blending system
  const getCurrentColors = () => {
    const currentThemeData = themes[currentTheme];
    const nextThemeData = themes[(currentTheme + 1) % themes.length];
    const t = themeTransition;
    
    // Mouse influence on colors
    const mouseInfluence = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y) / 100;
    const velocityInfluence = Math.min(Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y) / 50, 1);
    
    // Blend themes
    const blendColor = (color1: { h: number; s: number; l: number }, color2: { h: number; s: number; l: number }, blend: number, offset: number = 0) => {
      const h = (color1.h + (color2.h - color1.h) * blend + mousePos.x * 0.5 + timeOffset * 20 + offset) % 360;
      const s = Math.min(100, color1.s + (color2.s - color1.s) * blend + velocityInfluence * 20);
      const l = Math.min(90, color1.l + (color2.l - color1.l) * blend + mouseInfluence * 15);
      return `hsl(${h}, ${s}%, ${l}%)`;
    };

    return {
      primary: blendColor(currentThemeData.primary, nextThemeData.primary, t),
      secondary: blendColor(currentThemeData.secondary, nextThemeData.secondary, t),
      tertiary: blendColor(currentThemeData.accent, nextThemeData.accent, t),
      accent: blendColor(currentThemeData.accent, nextThemeData.accent, t, 60),
      accent1: blendColor(currentThemeData.primary, nextThemeData.secondary, t, 120),
      accent2: blendColor(currentThemeData.secondary, nextThemeData.primary, t, 180),
      accent3: blendColor(currentThemeData.accent, nextThemeData.primary, t, 240),
      velocity1: blendColor(currentThemeData.primary, nextThemeData.accent, t, velocityInfluence * 50),
      velocity2: blendColor(currentThemeData.secondary, nextThemeData.accent, t, velocityInfluence * 80),
      texture: currentThemeData.texture
    };
  };
  

  const colors = getCurrentColors();

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 2), 18);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [progress]);

  // Fallback: 3 saniye sonra yüklenme ekranını kapat
  useEffect(() => {
    if (!isLoaded) {
      const fallback = setTimeout(() => setIsLoaded(true), 3000);
      return () => clearTimeout(fallback);
    }
  }, [isLoaded]);

  useEffect(() => {
    const updateSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const waveCount = Math.round(screenSize.height / 40);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
  {/* Sade kurumsal arka plan */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" />




      {/* Header with Slide Animation */}
      <header className={`bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-1000 ${
        isLoaded ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                              <Link href="/home" className="text-xl font-bold text-gray-900 dark:text-white">
                Radiologean
              </Link>
                <p className="text-xs text-gray-600 dark:text-gray-400">Radyoloji Destek Platformu</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="#tools" className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Araçlar
              </Link>
              <Link href="#references" className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Referanslar
              </Link>
              <Link href="#about" className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Hakkında
              </Link>
              <a 
                href="/hevx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-semibold px-3 py-1.5 rounded-md bg-black text-green-500 border border-green-500/40 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center gap-1.5 group"
              >
                <svg className="w-3.5 h-3.5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                HevX AI
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Interactive Floating Liquid Elements */}
        <div 
          className="absolute top-20 right-10 w-20 h-20 rounded-full transition-all duration-700 ease-out" 
          style={{ 
            background: `radial-gradient(circle, ${colors.primary}25, transparent)`,
            animation: 'liquid-morph 18s ease-in-out infinite',
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.15}px) scale(${1 + Math.sin(mousePos.x * 0.02) * 0.3})`
          }}
        ></div>
        <div 
          className="absolute top-40 left-5 w-16 h-16 rounded-full transition-all duration-500 ease-out" 
          style={{ 
            background: `radial-gradient(circle, ${colors.secondary}20, transparent)`,
            animation: 'liquid-morph 14s ease-in-out infinite reverse',
            transform: `translate(${-mousePos.x * 0.1}px, ${mousePos.y * 0.2}px) scale(${1 + Math.cos(mousePos.y * 0.02) * 0.4})`
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full transition-all duration-600 ease-out" 
          style={{ 
            background: `radial-gradient(circle, ${colors.tertiary}18, transparent)`,
            animation: 'liquid-morph 16s ease-in-out infinite',
            transform: `translate(${mousePos.x * 0.12}px, ${-mousePos.y * 0.18}px) scale(${1 + Math.sin((mousePos.x + mousePos.y) * 0.015) * 0.35})`
          }}
        ></div>
        {/* Hero Section */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-300 relative ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'
        }`}>
          {/* Dynamic Liquid Morphing Background Elements */}
          <div 
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full transition-all duration-500 ease-out" 
            style={{ 
              background: `radial-gradient(circle, ${colors.primary}15, ${colors.secondary}10, transparent)`,
              animation: 'liquid-morph 15s ease-in-out infinite',
              transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px) scale(${1 + Math.sin(mousePos.x * 0.01) * 0.2})`
            }}
          ></div>
          <div 
            className="absolute -top-10 -right-20 w-32 h-32 rounded-full transition-all duration-700 ease-out" 
            style={{ 
              background: `radial-gradient(circle, ${colors.secondary}12, ${colors.tertiary}08, transparent)`,
              animation: 'liquid-morph 12s ease-in-out infinite reverse',
              transform: `translate(${-mousePos.x * 0.15}px, ${mousePos.y * 0.12}px) scale(${1 + Math.cos(mousePos.y * 0.01) * 0.25})`
            }}
          ></div>
          
          {/* Enhanced Spinning Logo Effect */}
          <div className="inline-block mb-6 transition-all duration-300" style={{ 
            animation: 'logo-spin 20s linear infinite',
            transform: `scale(${1 + (mousePos.x + mousePos.y) * 0.001})`
          }}>
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary})`,
                boxShadow: `0 10px 30px ${colors.primary}40`
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span 
              className="bg-clip-text text-transparent animate-pulse transition-all duration-500"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary})`,
                textShadow: `0 0 20px ${colors.primary}30`
              }}
            >
              Radyoloji Destek Sistemi
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Klinik pratikte kullanım için geliştirilmiş standart radyolojik değerlendirme araçları. 
            BI-RADS, PI-RADS kategorizasyonları ve adrenal bez analizleri için referans rehberi.
          </p>
        </div>

        {/* Clinical Tools Section */}
        <div id="tools" className={`mb-16 transition-all duration-1000 delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
        }`}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <span className="relative">
              Klinik Değerlendirme Araçları
              <div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  boxShadow: `0 0 10px ${colors.primary}50`
                }}
              ></div>
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mevcut BI-RADS Card */}
            <Link href="/birads" className={`group transition-all duration-700 delay-700 ${
              isLoaded ? 'transform scale-100 opacity-100 translate-y-0' : 'transform scale-90 opacity-0 translate-y-10'
            }`}>
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 relative overflow-hidden hover:scale-105 min-h-[280px]">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      Mammografi
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    BI-RADS Değerlendirme
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Meme radyolojisi için standart değerlendirme ve raporlama sistemi. Kategori 1-6 arası sınıflandırma.
                  </p>
                  <div className="flex items-center text-sm text-pink-600 dark:text-pink-400 font-medium mt-auto">
                    <span>Değerlendirmeye Başla</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Mevcut PI-RADS Card */}
            <Link href="/pirads" className={`group transition-all duration-700 delay-800 ${
              isLoaded ? 'transform scale-100 opacity-100 translate-y-0' : 'transform scale-90 opacity-0 translate-y-10'
            }`}>
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 relative overflow-hidden hover:scale-105 min-h-[280px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      Prostat MRI
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    PI-RADS Skorlama
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Prostat MRI için standardize edilmiş raporlama sistemi. 1-5 arası risk kategorilendirmesi.
                  </p>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium mt-auto">
                    <span>Değerlendirmeye Başla</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* YENİ TI-RADS Card */}
            <Link href="/tirads" className="group">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 min-h-[280px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Tiroid USG
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  TI-RADS Değerlendirme
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  Tiroid nodüllerinin ultrasonografik değerlendirmesi için standardize edilmiş sınıflandırma sistemi.
                </p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium mt-auto">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* YENİ Bosniak Card */}
            <Link href="/bosniak" className="group">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600 min-h-[280px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded-full font-medium">
                    YENİ
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Bosniak Klasifikasyonu
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  Böbrek kistik lezyonlarının BT/MR bulgularına göre malignite riski değerlendirmesi.
                </p>
                <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 font-medium mt-auto">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* YENİ Magic Angle / MSK Card */}
            <Link href="/musculoskeletal" className="group">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 min-h-[280px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full font-medium">
                    YENİ
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Kas-İskelet Radyolojisi
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  MSK görüntüleme araçları: Magic Angle artefaktı, MR protokolleri ve klinik karar destek sistemleri.
                </p>
                <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-auto">
                  <span>MSK Araçları</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Mevcut Adrenal Card */}
            <Link href="/adrenal" className="group">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 min-h-[280px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    Adrenal BT/MRI
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  Adrenal Karakterizasyonu
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  Adrenal kitle lezyonlarının BT ve MRI ile karakterizasyonu için rehber ve hesaplama araçları.
                </p>
                <div className="flex items-center text-sm text-yellow-600 dark:text-yellow-400 font-medium mt-auto">
                  <span>Değerlendirmeye Başla</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* References Section - Minimalist */}
        <div id="references" className="mb-16 opacity-70">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-6 text-center">
            Klinik Referanslar
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">BI-RADS® Atlas (5th Edition)</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ACR standart meme görüntüleme rehberi. Kategori 0-6 sınıflandırması.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PI-RADS v2.1</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Prostat MR görüntüleme için güncel skorlama sistemi. 1-5 risk kategorisi.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adrenal Imaging Guidelines</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Adrenal bez lezyonları için standart değerlendirme kriterleri.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">TI-RADS Classification</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tiroid nodüllerinin ultrasonografik değerlendirme sistemi.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bosniak Classification</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Böbrek kistik lezyonlarının malignite risk değerlendirmesi.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HevX AI System</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Nöroradyoloji için yapay zeka destekli asistan ve bilgi sistemi.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Radiologean
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Klinik radyoloji pratiği için geliştirilen akademik destek platformu
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2025 Radiologean</span>
              <span>•</span>
              <span>Akademik kullanım</span>
              <span>•</span>
              <span>Referans amaçlı</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}