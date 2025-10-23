import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Info, Zap } from 'lucide-react';

export default function MagicAngleGuide() {
  const [selectedTE, setSelectedTE] = useState<number | null>(null);
  const [selectedAngle, setSelectedAngle] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const teValues = [
    { value: 25, label: "TE: 25ms (T1)", risk: "high", color: "bg-red-100 border-red-500" },
    { value: 35, label: "TE: 35ms (PD)", risk: "high", color: "bg-orange-100 border-orange-500" },
    { value: 50, label: "TE: 50ms (Long PD)", risk: "medium", color: "bg-yellow-100 border-yellow-500" },
    { value: 70, label: "TE: 70ms (T2)", risk: "low", color: "bg-green-100 border-green-500" },
    { value: 90, label: "TE: 90ms (STIR)", risk: "none", color: "bg-blue-100 border-blue-500" }
  ];

  const angles = [
    { value: 0, label: "0°", hasArtifact: false },
    { value: 30, label: "30°", hasArtifact: false },
    { value: 55, label: "55° (Magic Angle)", hasArtifact: true },
    { value: 70, label: "70°", hasArtifact: false },
    { value: 90, label: "90°", hasArtifact: false }
  ];

  const getResult = () => {
    if (!selectedTE || selectedAngle === null) return null;
    
    const teData = teValues.find(t => t.value === selectedTE);
    const angleData = angles.find(a => a.value === selectedAngle);
    
    if (!teData || !angleData) return null;
    
    if (angleData.hasArtifact && (teData.risk === "high" || teData.risk === "medium")) {
      return {
        type: "artifact",
        message: "⚠️ MAGIC ANGLE ARTEFAKTI OLUŞUR!",
        detail: "ACL normalde hipointens olmalıyken hiperintens (parlak) görünür ve YALANCI SPRAIN izlenimi verir.",
        color: "bg-red-50 border-red-500 text-red-800"
      };
    } else if (angleData.hasArtifact && teData.risk === "low") {
      return {
        type: "minimal",
        message: "✓ Minimal artefakt - Kabul edilebilir",
        detail: "T2 ağırlıklı sekansda artefakt minimal seviyede.",
        color: "bg-yellow-50 border-yellow-500 text-yellow-800"
      };
    } else if (angleData.hasArtifact && teData.risk === "none") {
      return {
        type: "safe",
        message: "✓✓ ARTEFAKT YOK - Güvenli görüntüleme",
        detail: "Uzun TE değeri magic angle artefaktını tamamen ortadan kaldırır.",
        color: "bg-green-50 border-green-500 text-green-800"
      };
    } else {
      return {
        type: "normal",
        message: "✓ Normal görüntüleme",
        detail: "Bu açıda magic angle artefaktı oluşmaz.",
        color: "bg-blue-50 border-blue-500 text-blue-800"
      };
    }
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Magic Angle Artefaktı
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kas-İskelet Sistemi MRG</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Diz MR&apos;da ACL&apos;nin pseudo-sprain gibi görünmesini önlemek için interaktif kılavuz
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* TE Selection */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              TE (Echo Time) Seçimi
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">MR sekansınızın TE değerini seçin:</p>
            <div className="space-y-3">
              {teValues.map((te) => (
                <button
                  key={te.value}
                  onClick={() => setSelectedTE(te.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedTE === te.value
                      ? te.color + " scale-105 shadow-lg ring-2 ring-offset-2 ring-blue-400"
                      : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{te.label}</span>
                    {te.risk === "high" && <XCircle className="w-5 h-5 text-red-600" />}
                    {te.risk === "medium" && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                    {te.risk === "low" && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {te.risk === "none" && <CheckCircle className="w-5 h-5 text-blue-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Angle Selection */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              Tendon/Ligament Açısı
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">ACL&apos;nin manyetik alana göre açısı:</p>
            <div className="space-y-3">
              {angles.map((angle) => (
                <button
                  key={angle.value}
                  onClick={() => setSelectedAngle(angle.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedAngle === angle.value
                      ? angle.hasArtifact
                        ? "bg-red-100 dark:bg-red-900/30 border-red-500 scale-105 shadow-lg ring-2 ring-offset-2 ring-red-400"
                        : "bg-green-100 dark:bg-green-900/30 border-green-500 scale-105 shadow-lg ring-2 ring-offset-2 ring-green-400"
                      : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{angle.label}</span>
                    {angle.hasArtifact && (
                      <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full font-bold shadow-md">
                        MAGIC ANGLE
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`rounded-2xl shadow-xl p-8 border-2 ${result.color} animate-in fade-in duration-500 backdrop-blur-sm`}>
            <h3 className="text-3xl font-bold mb-3">{result.message}</h3>
            <p className="text-lg mb-6">{result.detail}</p>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-6 py-2 bg-white/50 hover:bg-white/80 dark:bg-gray-700/50 dark:hover:bg-gray-700/80 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {showExplanation ? "Açıklamayı gizle ▲" : "Detaylı açıklama göster ▼"}
            </button>
          </div>
        )}

        {/* Detailed Explanation */}
        {showExplanation && result && (
          <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              Neden Bu Sonuç?
            </h3>
            
            {result.type === "artifact" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-red-500 shadow-md">
                  <h4 className="font-bold text-red-800 dark:text-red-400 mb-3 text-lg">⚠️ Artefakt Mekanizması:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>ACL 55° açıda manyetik alana göre seyrediyor</li>
                    <li>Bu açıda dipolar etkileşimler minimize oluyor</li>
                    <li>T2 relaksasyon zamanı uzuyor</li>
                    <li>Kısa TE değeri bu etkiyi gösteriyor</li>
                    <li><strong>Sonuç: Normal ACL hiperintens (parlak) görünüyor</strong></li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border-l-4 border-yellow-500 shadow-md">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-3 text-lg">🔍 Klinik Sorun:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Bu bulgu <strong>ACL sprain veya parsiyel yırtık</strong> olarak yanlış yorumlanabilir.
                    Bu durum yanlış tanıya ve gereksiz cerrahi planlama riskine yol açabilir.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-500 shadow-md">
                  <h4 className="font-bold text-green-800 dark:text-green-400 mb-3 text-lg">✅ Çözüm:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>T2 ağırlıklı sekans çekin</strong> (TE &gt; 60 ms)</li>
                    <li>STIR veya Fat-Sat T2 kullanın</li>
                    <li>Multiplanar değerlendirme yapın</li>
                    <li>Klinik korelasyon isteyin</li>
                  </ul>
                </div>
              </div>
            )}

            {result.type === "safe" && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-500 shadow-md">
                <h4 className="font-bold text-green-800 dark:text-green-400 mb-3 text-lg">✅ Güvenli Görüntüleme:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Uzun TE değeri (TE &gt; 60 ms) kullanıldığında, magic angle artefaktı ortadan kalkar.
                  ACL&apos;nin gerçek patolojisi varsa T2&apos;de de hiperintens olarak görünecektir.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-300 dark:border-blue-600">
                  <strong className="text-blue-800 dark:text-blue-400">Karar Kuralı:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>T2&apos;de hipointens → Normal (magic angle yoktur)</li>
                    <li>T2&apos;de hiperintens → Gerçek patoloji (sprain/yırtık)</li>
                  </ul>
                </div>
              </div>
            )}

            {result.type === "normal" && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">ℹ️ Normal Görüntüleme:</h4>
                <p className="text-gray-700">
                  Bu açıda ACL manyetik alana paralel veya dik konumda olduğu için magic angle artefaktı oluşmaz.
                  Tendon/ligament normal hipointens sinyalini korur.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Comprehensive Educational Content */}
        <div className="mt-8 space-y-8">
          {/* What is Magic Angle */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-blue-800">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
              Magic Angle Nedir?
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                <strong>Magic angle artefaktı</strong>, MR fiziğinin en önemli ve klinik pratikte sıkça karşılaşılan artefaktlarından biridir. 
                Bu artefakt, tendon, ligament ve menisküs gibi <strong>düzenli kollajen yapıların</strong> ana manyetik alana göre 
                <strong className="text-indigo-600 dark:text-indigo-400"> yaklaşık 54.7° (55°)</strong> açı yaptığında ortaya çıkar.
              </p>
              <p>
                Normal koşullarda, tendon ve ligamentler MR görüntülerinde <strong>hipointens (karanlık)</strong> görünürler. 
                Ancak bu kritik açıda, kollajen moleküllerinin dipolar etkileşimleri minimize olur ve T2 relaksasyon zamanı uzar. 
                Sonuç olarak, <strong>tamamen normal olan bir yapı patolojik görünüm kazanır</strong> ve hiperintens (parlak) sinyaller verir.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-l-4 border-red-500 p-6 rounded-xl shadow-md">
                <p className="font-semibold text-red-800 dark:text-red-400 text-lg">⚠️ Klinik Önemi:</p>
                <p className="text-red-700 dark:text-red-300 mt-2">
                  Diz MR'da ACL değerlendirilirken, magic angle artefaktı <strong>yalancı sprain veya parsiyel yırtık</strong> 
                  izlenimi verebilir. Bu durum yanlış tanıya, gereksiz endişeye ve hatta gereksiz cerrahi planlama riskine yol açabilir.
                </p>
              </div>
            </div>
          </div>

          {/* Why Does It Happen */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100 dark:border-purple-800">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
              Neden Oluşur?
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Magic angle artefaktının oluşumu, <strong>dipolar etkileşim</strong> ve <strong>T2 relaksasyon</strong> mekanizmaları ile ilgilidir:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Normal durumda (0° veya 90°):</strong> Kollajen liflerindeki protonlar arasındaki dipolar etkileşimler maksimum 
                  seviyededir. Bu nedenle T2 relaksasyon zamanı kısa kalır ve yapı hipointens (karanlık) görünür.
                </li>
                <li>
                  <strong>55° açıda:</strong> Dipolar etkileşimler matematiksel olarak minimize olur (3cos²θ - 1 = 0 formülüne göre). 
                  T2 relaksasyon zamanı uzar ve sinyal artışı oluşur.
                </li>
                <li>
                  <strong>Sonuç:</strong> Normal yapı patolojik gibi parlak görünür, ancak bu sadece fiziksel bir artefakttır, 
                  gerçek bir hastalık değildir.
                </li>
              </ol>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                <p className="font-semibold text-blue-800">💡 Fizik Notu:</p>
                <p className="text-blue-700 mt-2">
                  Formül: 3cos²θ - 1 = 0 → θ = 54.7° (Magic angle)
                  <br />
                  Bu açıda dipolar coupling terimi sıfırlanır ve T2 değeri artar.
                </p>
              </div>
            </div>
          </div>

          {/* Which Sequences Are Affected */}
          <div className="bg-gradient-to-br from-white/70 to-blue-50/70 dark:from-gray-800/70 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-blue-800">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📡</span>
              </div>
              Hangi Sekanslar Etkilenir?
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Magic angle artefaktı <strong>tüm MR sekanslarını eşit şekilde etkilemez</strong>. En kritik faktör <strong>TE (Echo Time)</strong> değeridir:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700 rounded-xl p-5 shadow-md">
                  <h4 className="font-bold text-red-800 dark:text-red-400 mb-3 text-lg">🔴 Yüksek Risk - Kısa TE (&lt;50ms)</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    T1 ağırlıklı ve Proton Density sekanslarında magic angle artefaktı <strong>çok belirgindir</strong>. 
                    Bu sekanslar anatomik detay için kullanılır, ancak patoloji tarama için güvenilir değildir.
                  </p>
                  <ul className="text-sm space-y-1 text-red-600 dark:text-red-400">
                    <li>• T1: TE 20-30 ms → Çok yüksek risk</li>
                    <li>• PD: TE 30-40 ms → Yüksek risk</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-5 shadow-md">
                  <h4 className="font-bold text-green-800 dark:text-green-400 mb-3 text-lg">🟢 Düşük Risk - Uzun TE (&gt;60ms)</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                    T2 ağırlıklı, STIR ve Fat-Sat sekanslarında artefakt <strong>minimal veya yoktur</strong>. 
                    Bu sekanslar patoloji değerlendirmesi için güvenlidir ve tercih edilmelidir.
                  </p>
                  <ul className="text-sm space-y-1 text-green-600 dark:text-green-400">
                    <li>• T2: TE 60-100 ms → Minimal risk</li>
                    <li>• STIR: TE &gt;80 ms → Risk yok</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-l-4 border-yellow-500 p-5 rounded-xl mt-4 shadow-md">
                <p className="font-semibold text-yellow-800 dark:text-yellow-400 text-lg">⚠️ Önemli Not:</p>
                <p className="text-yellow-700 dark:text-yellow-300 mt-2">
                  Uzun TE değerlerinde dipolar etkileşimin sinyal üzerindeki etkisi azalır. Bu nedenle T2 ağırlıklı sekanslar 
                  magic angle artefaktından etkilenmez ve <strong>gerçek patolojiyi gösterir</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* How to Identify */}
          <div className="bg-gradient-to-br from-white/70 to-purple-50/70 dark:from-gray-800/70 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100 dark:border-purple-800">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              Nasıl Ayırt Edilir?
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Magic angle artefaktını <strong>gerçek patolojiden ayırt etmek</strong> için şu adımları izleyin:
              </p>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-300 dark:border-indigo-600 rounded-xl p-6 mt-4 shadow-lg">
                <h4 className="font-bold text-indigo-800 dark:text-indigo-300 text-xl mb-4">📋 Karar Algoritması</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold shadow-md">1</div>
                    <div>
                      <p className="font-semibold text-indigo-900 dark:text-indigo-200">PD veya T1&apos;de ACL parlak mı?</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Evet ise → Adım 2&apos;ye geç</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold shadow-md">2</div>
                    <div>
                      <p className="font-semibold text-indigo-900 dark:text-indigo-200">T2 ağırlıklı sekansı kontrol et (TE &gt;60ms)</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">T2&apos;de nasıl görünüyor?</p>
                    </div>
                  </div>
                  
                  <div className="ml-11 space-y-3">
                    <div className="bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-600 rounded-lg p-4 shadow-md">
                      <p className="font-semibold text-green-800 dark:text-green-300 text-base">✅ T2&apos;de HİPOİNTENS (Karanlık)</p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                        → <strong>MAGIC ANGLE ARTEFAKTI</strong> → ACL normal, patoloji yok
                      </p>
                    </div>
                    
                    <div className="bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-600 rounded-lg p-4 shadow-md">
                      <p className="font-semibold text-red-800 dark:text-red-300 text-base">❌ T2&apos;de HİPERİNTENS (Parlak)</p>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                        → <strong>GERÇEK PATOLOJİ</strong> → ACL sprain, parsiyel veya tam yırtık
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold shadow-md">3</div>
                    <div>
                      <p className="font-semibold text-indigo-900 dark:text-indigo-200">Multiplanar değerlendirme yap</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Farklı planlarda tutarlı mı?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold shadow-md">4</div>
                    <div>
                      <p className="font-semibold text-indigo-900 dark:text-indigo-200">Klinik korelasyon iste</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Travma öyküsü var mı? Ağrı, instabilite?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACL Specific */}
          <div className="bg-gradient-to-br from-white/70 to-green-50/70 dark:from-gray-800/70 dark:to-green-900/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-100 dark:border-green-800">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🦵</span>
              </div>
              Diz MR&apos;da ACL Değerlendirmesi
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                ACL (Anterior Cruciate Ligament) diz MR&apos;da en sık magic angle artefaktı gösteren yapılardan biridir çünkü 
                <strong> anatomik olarak yaklaşık 50-60° açıyla seyreder</strong>.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">🎯 ACL&apos;nin Kritik Bölgeleri:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Proksimal kısım:</strong> Femoral tutulum yeri, 55° açıya en yakın</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>Distal kısım:</strong> Tibial tutulum yeri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span><strong>Orta kısım:</strong> Nispeten daha az etkilenir</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">📏 Optimal Protokol:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>Sagittal PD (anatomi için, TE 30-40ms)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span><strong>Sagittal T2 Fat-Sat (patoloji için, TE &gt;60ms)</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>Koronal STIR (ödem değerlendirmesi)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>Aksiyel T2 (multiplanar kontrol)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-l-4 border-purple-500 p-5 rounded-xl mt-4 shadow-md">
                <p className="font-semibold text-purple-800 dark:text-purple-400 text-lg">💡 Pro Tip:</p>
                <p className="text-purple-700 dark:text-purple-300 mt-2">
                  ACL&apos;de şüpheli sinyal gördüğünüzde, <strong>mutlaka T2 Fat-Sat&apos;a bakın</strong>. Bu sekans hem magic angle 
                  artefaktını elimine eder hem de gerçek ödemi/yaralanmayı en iyi gösterir. Eğer T2 Fat-Sat&apos;ta sinyal artışı 
                  yoksa, PD&apos;deki parlak görünüm büyük olasılıkla magic angle artefaktıdır.
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Pearls */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">📚</span>
              Klinik Öneriler
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <h4 className="font-bold mb-3 text-yellow-300 text-lg">✓ YAPILMASI GEREKENLER:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Her zaman T2 ağırlıklı sekans çekin</li>
                  <li>• TE &gt; 60 ms kullanın</li>
                  <li>• STIR/Fat-Sat T2 tercih edin</li>
                  <li>• Multiplanar değerlendirme yapın</li>
                  <li>• Klinik korelasyon isteyin</li>
                  <li>• Şüpheli bulgularda kontralateral karşılaştırma yapın</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <h4 className="font-bold mb-3 text-red-300 text-lg">✗ YAPILMAMASI GEREKENLER:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Sadece PD/T1&apos;e güvenmeyin</li>
                  <li>• Kısa TE&apos;yi patoloji değerlendirmesinde kullanmayın</li>
                  <li>• T2 kontrol etmeden tanı koymayın</li>
                  <li>• Simetri kontrolü yapmadan karar vermeyin</li>
                  <li>• Magic angle&apos;ı unutmayın!</li>
                  <li>• Anatomik varyasyonları patoloji sanmayın</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Table */}
        <div className="mt-8 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-blue-800">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            Hızlı Referans Tablosu
          </h3>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-indigo-600">
                  <th className="border border-blue-400 p-4 text-left text-white font-semibold">TE Aralığı</th>
                  <th className="border border-blue-400 p-4 text-left text-white font-semibold">Sekans Tipi</th>
                  <th className="border border-blue-400 p-4 text-left text-white font-semibold">Magic Angle Riski</th>
                  <th className="border border-blue-400 p-4 text-left text-white font-semibold">Kullanım Amacı</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200 font-medium">&lt; 30 ms</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">T1 ağırlıklı</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 bg-red-50 dark:bg-red-900/30 text-gray-800 dark:text-gray-200 font-semibold">🔴 Çok Yüksek</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">Anatomik detay</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200 font-medium">30-50 ms</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">Proton Density</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 bg-orange-50 dark:bg-orange-900/30 text-gray-800 dark:text-gray-200 font-semibold">🟠 Yüksek</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">Genel değerlendirme</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200 font-medium">50-60 ms</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">Long TE PD</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 bg-yellow-50 dark:bg-yellow-900/30 text-gray-800 dark:text-gray-200 font-semibold">🟡 Orta</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">Transisyon</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200 font-medium">&gt; 60 ms</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">T2 ağırlıklı</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 bg-green-50 dark:bg-green-900/30 text-gray-800 dark:text-gray-200 font-semibold">🟢 Düşük</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">Patoloji tarama</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200 font-medium">&gt; 80 ms</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">STIR / Fat-Sat T2</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 font-semibold">🔵 Yok</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-800 dark:text-gray-200">Ödem/inflamasyon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            Magic Angle = 54.7° (yaklaşık 55°) | Kaynak: Erickson SJ et al. Radiology 1991
          </p>
        </div>
      </div>
    </div>
  );
}