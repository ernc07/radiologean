'use client';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/home');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '200ms'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '400ms'}}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Blinking Text */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-pulse">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            CANIM ANNEM
          </span>
        </h1>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white animate-pulse" style={{animationDelay: '500ms'}}>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            NÜKET
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mt-8" style={{animationDelay: '1000ms'}}>
          🐿️ 🌸 🌺 🌻 Radyoloji Destek Sistemi 🌷 🌹 🌼 🐿️
        </p>

        {/* Click indicator */}
        <div className="mt-12 animate-bounce" style={{animationDelay: '2000ms'}}>
          <p className="text-white/60 text-lg">
            🌻 🐿️ 🐾 Devam etmek için tıklayın 🐾 🐿️ 🌻
          </p>
          <svg className="w-8 h-8 text-white/60 mx-auto mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Floating Squirrels and Flowers - More Emojis */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl pointer-events-none animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 150}ms`,
            animationDuration: `${1.5 + Math.random() * 4}s`
          }}
        >
          {i % 10 === 0 ? '🐿️' : 
           i % 10 === 1 ? '🌸' : 
           i % 10 === 2 ? '🌺' : 
           i % 10 === 3 ? '🌻' :
           i % 10 === 4 ? '🌷' :
           i % 10 === 5 ? '🌹' :
           i % 10 === 6 ? '🐾' :
           i % 10 === 7 ? '🌼' :
           i % 10 === 8 ? '🌲' : '🍀'}
        </div>
      ))}

      {/* Real Images Theme - Floating Images */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`img-${i}`}
          className="absolute pointer-events-none animate-bounce opacity-40"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${i * 350}ms`,
            animationDuration: `${3 + Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 30 - 15}deg)`
          }}
        >
          {i % 6 === 0 ? (
            // Squirrel silhouette
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full relative shadow-lg">
              <div className="absolute top-2 left-4 w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full"></div>
              <div className="absolute top-1 right-2 w-3 h-6 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full transform rotate-45"></div>
              <div className="absolute bottom-1 left-2 w-12 h-4 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full"></div>
              <div className="absolute top-3 left-6 w-2 h-2 bg-black rounded-full"></div>
            </div>
          ) : i % 6 === 1 ? (
            // Rose flower
            <div className="w-14 h-14 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-90 shadow-lg"></div>
              <div className="absolute top-1 left-1 w-12 h-12 bg-gradient-to-br from-pink-300 to-red-400 rounded-full"></div>
              <div className="absolute top-2 left-2 w-10 h-10 bg-gradient-to-br from-pink-200 to-red-300 rounded-full"></div>
              <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
            </div>
          ) : i % 6 === 2 ? (
            // Sunflower design
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
              <div className="absolute top-2 left-2 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"></div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-orange-600 to-red-700 rounded-full"></div>
              <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-br from-amber-800 to-red-900 rounded-full"></div>
            </div>
          ) : i % 6 === 3 ? (
            // Cherry blossom design
            <div className="w-12 h-12 relative">
              <div className="absolute top-0 left-3 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full shadow-md"></div>
              <div className="absolute top-3 left-0 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full shadow-md"></div>
              <div className="absolute top-3 left-6 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full shadow-md"></div>
              <div className="absolute top-6 left-3 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full shadow-md"></div>
              <div className="absolute top-3 left-3 w-3 h-3 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
            </div>
          ) : i % 6 === 4 ? (
            // Tulip design
            <div className="w-10 h-14 relative">
              <div className="absolute top-0 left-2 w-6 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-t-full shadow-lg"></div>
              <div className="absolute top-8 left-3 w-4 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
              <div className="absolute top-2 left-3 w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
            </div>
          ) : (
            // Daisy design
            <div className="w-12 h-12 relative">
              <div className="absolute top-2 left-5 w-2 h-8 bg-white rounded-full transform -rotate-45 shadow-sm"></div>
              <div className="absolute top-2 left-5 w-2 h-8 bg-white rounded-full transform rotate-45 shadow-sm"></div>
              <div className="absolute top-5 left-2 w-8 h-2 bg-white rounded-full shadow-sm"></div>
              <div className="absolute top-2 left-5 w-2 h-8 bg-white rounded-full shadow-sm"></div>
              <div className="absolute top-4 left-4 w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-md"></div>
            </div>
          )}
        </div>
      ))}

      {/* Floating Hearts for Extra Magic */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-pink-300/50 text-2xl pointer-events-none animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 500}ms`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}
