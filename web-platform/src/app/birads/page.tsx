"use client";

import Link from "next/link";
import { useState } from "react";
import {
  massCalcificationFields,
  freeCalcificationFields,
  computeMassBiradsWithTime,
  computeCalcBirads,
  computeOverallBirads,
} from "@/lib/birads-rules";

// Kitleye eşlik eden zorunlu/opsiyonel bulgular (UI)
const massFindings = [
  { key: "hasDistortion", label: "Architectural distortion", img: "/modules/birads-app/images/birads4c_architectural_distortion.jpg" },
  { key: "hasNippleRetraction", label: "Kitle ilişkili meme başı/cilt çekintisi", img: "" },
];
const massExtras = [
  { key: "hasCalcification", label: "Kitleye eşlik eden kalsifikasyon", img: "/modules/birads-app/images/birads4a_calcification.jpg" },
  { key: "hasTrabecularThickening", label: "Trabeküler kalınlaşma", img: "/modules/birads-app/images/birads3_asymmetry.jpg" },
];

// Hesaplama alanları (lib'deki readonly dizilerden güvenli okuma)
type CalcField = (typeof massCalcificationFields)[number];
const getCalcField = (key: string) =>
  (massCalcificationFields as readonly CalcField[]).find(f => f.key === key);
const calcMorphOptions = getCalcField("calcType")?.options ?? [];
const calcExtOptions   = getCalcField("extension")?.options ?? [];
const calcDistOptions  = getCalcField("distribution")?.options ?? [];

// Tek adımlık "lesionType" seçimi için
const lesionTypes = [
  { label: "Kitle", value: "mass", img: "/modules/birads-app/images/birads2.jpg" },
  { label: "Kalsifikasyon", value: "calcification", img: "/modules/birads-app/images/birads4a_calcification.jpg" },
  { label: "Asimetri", value: "asymmetry", img: "/modules/birads-app/images/birads3_asymmetry.jpg" },
  { label: "Sadece Architectural Distortion", value: "distortion", img: "/modules/birads-app/images/birads4c_architectural_distortion.jpg" },
  { label: "Sadece Meme Başı/Cilt Çekintisi", value: "nipple_skin_retraction", img: "" },
];

// Kitle form alanları
const massFields = [
  {
    key: "shape",
    title: "Kitle Şekli",
    options: [
      { label: "Oval", value: "oval", img: "/modules/birads-app/images/birads2.jpg" },
      { label: "Yuvarlak", value: "round", img: "/modules/birads-app/images/birads3_asymmetry.jpg" },
      { label: "Düzensiz", value: "irregular", img: "/modules/birads-app/images/birads4c.jpg" },
    ],
  },
  {
    key: "margin",
    title: "Kenar Özelliği",
    options: [
      { label: "Circumscribed", value: "circumscribed", img: "/modules/birads-app/images/birads2.jpg" },
      { label: "Microlobulated", value: "microlobulated", img: "/modules/birads-app/images/birads4a.jpg" },
      { label: "Obscured", value: "obscured", img: "" },
      { label: "Indistinct", value: "indistinct", img: "" },
      { label: "Spiculated", value: "spiculated", img: "/modules/birads-app/images/birads5.jpg" },
    ],
  },
  {
    key: "density",
    title: "Kitle Dansitesi (opsiyonel)",
    options: [
      { label: "Düşük (Low)", value: "low", img: "" },
      { label: "Eşdeğer (Equal)", value: "equal", img: "" },
      { label: "Yüksek (High)", value: "high", img: "" },
      { label: "Yağ İçerikli (Fat-containing)", value: "fat-containing", img: "" },
    ],
  },
  {
    key: "location",
    title: "Lokalizasyon",
    options: [
      { label: "Üst Dış", value: "upper_outer", img: "" },
      { label: "Üst İç", value: "upper_inner", img: "" },
      { label: "Alt Dış", value: "lower_outer", img: "" },
      { label: "Alt İç", value: "lower_inner", img: "" },
      { label: "Retroareolar", value: "retroareolar", img: "" },
    ],
  },
  { key: "size1", title: "Kitle Boyutu A (mm)", type: "input" as const },
  { key: "size2", title: "Kitle Boyutu B (mm)", type: "input" as const },
];

// Tek adımlık sihirbaz datası
const simpleSteps = [
  {
    key: "lesionType",
    title: "Lezyon Tipi",
    description: "Lezyonun tipini seçiniz.",
    options: lesionTypes,
  },
];



export default function BiRadsPage() {
  // STATE (tek set)
  // --- derived UI fields (safe) ---
  const shapeField    = massFields.find(f => f.key === "shape");
  const shapeOptions  = shapeField?.options ?? [];
  const marginField   = massFields.find(f => f.key === "margin");
  const marginOptions = marginField?.options ?? [];
  const locationField = massFields.find(f => f.key === "location");
  const locationOptions = locationField?.options ?? [];
  const [lesions, setLesions] = useState<any[]>([]);
  const [currentLesion, setCurrentLesion] = useState<any>({
    isStable24m: false,
    isNewOrIncreased: false,
  });
  const [step, setStep] = useState(0);
  const [addingLesion, setAddingLesion] = useState(false);
  const [isMass, setIsMass] = useState(false);
  const [isCalcification, setIsCalcification] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const isEditing = editingIndex !== null;
  const current = simpleSteps[step];

  // VALIDATION
  const validateMass = (lesion: any) => {
    if (!lesion.shape) return "Kitle şekli seçiniz.";
    if (!lesion.margin) return "Kenar özelliği seçiniz.";
    if (typeof lesion.hasDistortion !== "boolean") return "Architectural distortion var/yok seçiniz.";
    if (typeof lesion.hasNippleRetraction !== "boolean") return "Kitle ilişkili meme başı/cilt çekintisi var/yok seçiniz.";
    if (lesion.hasCalcification) {
      if (!lesion.calcType) return "Kitleye eşlik eden kalsifikasyonda morfoloji seçiniz.";
      if (lesion.extension === "definite" && !lesion.distribution) {
        return "Belirgin uzanımda dağılım (grouped/linear/segmental/regional/diffuse) zorunludur.";
      }
      if (lesion.extension !== "definite" && lesion.distribution) {
        return "Dağılım sadece kitle dışına belirgin uzanımda seçilebilir.";
      }
    }
    if (lesion.isStable24m && lesion.isNewOrIncreased) {
      return "“≥24 ay stabil” ile “Yeni/büyüme” aynı anda seçilemez.";
    }
    return null;
  };

  // FIELD HANDLERS
  const handleMassField = (key: string, value: any) => {
    setCurrentLesion((prev: any) => {
      const next = { ...prev, [key]: value };
      // zamansal bayrakları çakıştırma
      if (key === "isStable24m" && value === true) next.isNewOrIncreased = false;
      if (key === "isNewOrIncreased" && value === true) next.isStable24m = false;
      // obscured kenarda zaman bayraklarını kapat
      if (key === "margin" && value === "obscured") {
        next.isStable24m = false;
        next.isNewOrIncreased = false;
      }
      // extension definite değilse distribution'ı temizle
      if (key === "extension" && value !== "definite") next.distribution = "";
      return next;
    });
  };

  const handleSelect = (value: string) => {
    if (value === "mass") {
      // zorunlu iki bulguyu default false yap
      const seeded = { ...currentLesion };
      massFindings.forEach(f => (seeded[f.key] = false));
      setCurrentLesion(seeded);
      setIsMass(true);
      setIsCalcification(false);
      setAddingLesion(true);
    } else if (value === "calcification") {
      setIsCalcification(true);
      setIsMass(false);
      setAddingLesion(true);
    } else {
      // diğer tipler için direkt kaydet
      setLesions(prev => [...prev, { lesionType: value }]);
      setCurrentLesion({ isStable24m: false, isNewOrIncreased: false });
      setStep(0);
      setAddingLesion(false);
      setIsMass(false);
      setIsCalcification(false);
    }
  };

  const handleSaveMass = (e?: React.FormEvent) => {
    e?.preventDefault();
    const err = validateMass(currentLesion);
    if (err) { alert(err); return; }

    if (isEditing && editingIndex !== null) {
      setLesions(prev => prev.map((lz, i) => (i === editingIndex ? { ...lz, ...currentLesion, lesionType: "mass" } : lz)));
    } else {
      setLesions(prev => [...prev, { ...currentLesion, lesionType: "mass" }]);
    }
    // reset
    setCurrentLesion({ isStable24m: false, isNewOrIncreased: false });
    setEditingIndex(null);
    setAddingLesion(false);
    setIsMass(false);
    setIsCalcification(false);
    setStep(0);
  };

  const handleSaveCalcification = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isEditing && editingIndex !== null) {
      setLesions(prev => prev.map((lz, i) => (i === editingIndex ? { ...lz, ...currentLesion, lesionType: "calcification" } : lz)));
    } else {
      setLesions(prev => [...prev, { ...currentLesion, lesionType: "calcification" }]);
    }
    setCurrentLesion({ isStable24m: false, isNewOrIncreased: false });
    setEditingIndex(null);
    setAddingLesion(false);
    setIsMass(false);
    setIsCalcification(false);
    setStep(0);
  };

  const handleAddLesion = () => {
    setCurrentLesion({ isStable24m: false, isNewOrIncreased: false });
    setEditingIndex(null);
    setStep(0);
    setIsMass(false);
    setIsCalcification(false);
    setAddingLesion(true);
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
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">BI-RADS Değerlendirme Sistemi</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mamografi Tabanlı Karar Destek</p>
              </div>
            </div>
            <Link href="/" className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              ← Ana Sayfa
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full px-0 sm:px-2 lg:px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 sm:p-6 lg:p-8 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-300">
            BI-RADS Lezyon Tanımlama
          </h2>

          {/* Genel BI-RADS rozeti */}
          {lesions.length > 0 && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 font-semibold">
                Genel BI-RADS: {computeOverallBirads(lesions)}
              </span>
            </div>
          )}

          {/* Ekli lezyonlar listesi */}
          {lesions.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-3 text-blue-800 dark:text-blue-200">Eklenen Lezyonlar</h3>
              <ul className="space-y-2 text-base sm:text-lg lg:text-xl">
                {lesions.map((lz, i) => (
                  <li key={i} className="bg-blue-50 dark:bg-blue-900/30 rounded px-4 py-2 flex items-center justify-between">
                    <div>
                      <span className="font-semibold">Lezyon {i + 1}:</span>{" "}
                      {lesionTypes.find(t => t.value === lz.lesionType)?.label || "Tanımsız"}
                      {lz.lesionType === "mass" && (
                        <>
                          {lz.shape && `, Şekil: ${lz.shape}`}
                          {lz.margin && `, Kenar: ${lz.margin}`}
                          {lz.location && `, Lokalizasyon: ${lz.location}`}
                          {(lz.size1 || lz.size2) && `, Boyut: ${lz.size1 || "-"} x ${lz.size2 || "-"} mm`}
                          {lz.hasCalcification && lz.calcType && `, Kalsifikasyon: ${lz.calcType}`}
                          <span className="ml-2 inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 font-semibold">
                            BI-RADS: {computeMassBiradsWithTime(lz)}
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      className="ml-4 px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 rounded font-semibold text-sm"
                      onClick={() => {
                        setCurrentLesion(lesions[i]);
                        setEditingIndex(i);
                        setAddingLesion(true);
                        setIsMass(lesions[i].lesionType === "mass");
                        setIsCalcification(lesions[i].lesionType === "calcification");
                        setStep(0);
                      }}
                    >
                      Düzenle
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lezyon ekleme akışı */}
          {addingLesion ? (
            isMass ? (
              <div>
                <button
                  type="button"
                  onClick={() => setIsMass(false)}
                  className="mb-6 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  ← Lezyon tipine geri dön
                </button>

                <h3 className="text-2xl font-bold mb-6">Kitle Özellikleri</h3>

                <form onSubmit={handleSaveMass}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Sol panel: şekil/kenar + zorunlu bulgular */}
                    <div className="space-y-8">
                      {(["shape","margin"] as const).map((key) => {
                        const field   = key === "shape" ? shapeField : marginField;
                        const options = key === "shape" ? shapeOptions : marginOptions;
                        if (!field) return null; // typesafe guard

                        const selectedLabel = options.find(opt => opt.value === currentLesion[key])?.label;

                        return (
                          <div key={key}>
                            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 pb-2">
                              <span className="font-bold text-lg lg:text-xl text-blue-800 dark:text-blue-200 tracking-wide">
                                {field.title}
                              </span>
                              {selectedLabel && (
                                <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded text-xs font-semibold align-middle">
                                  {selectedLabel}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {options.map(opt => (
                                <button
                                  type="button"
                                  key={opt.value}
                                  onClick={() => handleMassField(field.key, opt.value)}
                                  className={`flex flex-col items-center p-2 sm:p-3 border-2 rounded-2xl shadow-md h-24 sm:h-28 justify-between text-base sm:text-lg font-semibold transition-all duration-150 ${
                                    currentLesion[field.key] === opt.value
                                      ? "bg-blue-600 text-white border-blue-700 shadow-lg scale-105"
                                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                                  } hover:bg-blue-50 dark:hover:bg-blue-800`}
                                >
                                  {opt.img && <img src={opt.img} alt={opt.label} className="w-10 sm:w-14 h-8 sm:h-12 object-cover rounded mb-1" />}
                                  <span className="font-bold text-center text-sm sm:text-base">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      {/* Zorunlu iki bulgu (Var/Yok) */}
                      <section>
                        <h4 className="font-bold text-lg lg:text-xl text-blue-800 dark:text-blue-200 tracking-wide">
                          Kitleye Eşlik Eden Bulgular <span className="text-red-500">*</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {massFindings.map(extra => (
                            <div key={extra.key} className="flex flex-col items-center">
                              {extra.img && <img src={extra.img} alt={extra.label} className="w-8 h-8 object-cover rounded mb-1" />}
                              <span className="font-bold text-center text-xs sm:text-sm mb-1">{extra.label}</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  className={`px-3 py-1 rounded-l-lg border-2 font-semibold text-xs sm:text-sm transition-all duration-150 ${
                                    currentLesion[extra.key] === true
                                      ? "bg-blue-600 text-white border-blue-700 scale-105"
                                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                                  }`}
                                  onClick={() => handleMassField(extra.key, true)}
                                >
                                  Var
                                </button>
                                <button
                                  type="button"
                                  className={`px-3 py-1 rounded-r-lg border-2 font-semibold text-xs sm:text-sm transition-all duration-150 ${
                                    currentLesion[extra.key] === false
                                      ? "bg-blue-600 text-white border-blue-700 scale-105"
                                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                                  }`}
                                  onClick={() => handleMassField(extra.key, false)}
                                >
                                  Yok
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Sağ panel: lokalizasyon/boyut/zamansal + opsiyoneller */}
                    <div className="flex flex-col gap-8 h-full">
                      {/* Lokalizasyon */}
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl shadow-md p-6">
                        <span className="font-bold text-base sm:text-lg lg:text-xl mb-2 text-blue-900 dark:text-blue-100">Lokalizasyon</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                          {locationOptions.map(opt => (
                            <button
                              type="button"
                              key={opt.value}
                              onClick={() => handleMassField("location", opt.value)}
                              className={`flex flex-col items-center p-2 border-2 rounded-2xl shadow h-16 justify-between text-base font-semibold transition-all duration-150 ${
                                currentLesion["location"] === opt.value
                                  ? "bg-blue-600 text-white border-blue-700 shadow-lg scale-105"
                                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                              } hover:bg-blue-50 dark:hover:bg-blue-800`}
                            >
                              <span className="font-bold text-center text-xs sm:text-sm">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Boyutlar */}
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl shadow-md p-6 flex flex-col gap-6">
                        <div>
                          <label className="block font-bold text-base sm:text-lg lg:text-xl mb-2 text-blue-900 dark:text-blue-100">Kitle Boyutu A (mm)</label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            className="w-full px-4 py-3 border rounded-lg text-base sm:text-lg focus:outline-none focus:ring"
                            value={currentLesion["size1"] || ""}
                            onChange={e => handleMassField("size1", e.target.value)}
                            placeholder="Kitle Boyutu A (mm)"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-base sm:text-lg lg:text-xl mb-2 text-blue-900 dark:text-blue-100">Kitle Boyutu B (mm)</label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            className="w-full px-4 py-3 border rounded-lg text-base sm:text-lg focus:outline-none focus:ring"
                            value={currentLesion["size2"] || ""}
                            onChange={e => handleMassField("size2", e.target.value)}
                            placeholder="Kitle Boyutu B (mm)"
                          />
                        </div>
                      </div>

                      {/* Zamansal Bilgi */}
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl shadow-md p-6">
                        <span className="font-bold text-base sm:text-lg lg:text-xl mb-2 text-blue-900 dark:text-blue-100">Zamansal Bilgi</span>
                        {currentLesion.margin === "obscured" && (
                          <p className="mt-2 text-xs text-orange-700">
                            Obscured kenarda BI-RADS 0: tamamlayıcı görüntüleme gerekir. Zaman bilgisi uygulanmaz.
                          </p>
                        )}
                        {/* ≥24 ay stabil */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">≥ 24 ay stabil</span>
                          </div>
                          <div className="mt-2 inline-flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-500">
                            <button
                              type="button"
                              disabled={currentLesion.margin === "obscured"}
                              onClick={() => handleMassField("isStable24m", true)}
                              className={`px-4 py-1.5 text-sm font-semibold ${
                                currentLesion.margin === "obscured"
                                  ? "opacity-50 cursor-not-allowed"
                                  : currentLesion.isStable24m === true
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              Var
                            </button>
                            <button
                              type="button"
                              disabled={currentLesion.margin === "obscured"}
                              onClick={() => handleMassField("isStable24m", false)}
                              className={`px-4 py-1.5 text-sm font-semibold ${
                                currentLesion.margin === "obscured"
                                  ? "opacity-50 cursor-not-allowed"
                                  : currentLesion.isStable24m === false
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              Yok
                            </button>
                          </div>
                        </div>

                        {/* Yeni/belirgin büyüme */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">Yeni veya belirgin büyüme</span>
                          </div>
                          <div className="mt-2 inline-flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-500">
                            <button
                              type="button"
                              disabled={currentLesion.margin === "obscured"}
                              onClick={() => handleMassField("isNewOrIncreased", true)}
                              className={`px-4 py-1.5 text-sm font-semibold ${
                                currentLesion.margin === "obscured"
                                  ? "opacity-50 cursor-not-allowed"
                                  : currentLesion.isNewOrIncreased === true
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              Var
                            </button>
                            <button
                              type="button"
                              disabled={currentLesion.margin === "obscured"}
                              onClick={() => handleMassField("isNewOrIncreased", false)}
                              className={`px-4 py-1.5 text-sm font-semibold ${
                                currentLesion.margin === "obscured"
                                  ? "opacity-50 cursor-not-allowed"
                                  : currentLesion.isNewOrIncreased === false
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              Yok
                            </button>
                          </div>
                        </div>

                        {/* Çakışma uyarısı */}
                        {currentLesion.isStable24m === true && currentLesion.isNewOrIncreased === true && (
                          <div className="mt-3 text-xs text-red-600">“≥24 ay stabil” ve “Yeni/büyüme” aynı anda seçilemez.</div>
                        )}
                      </div>

                      {/* Opsiyonel ek bulgular */}
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl shadow-md p-6">
                        <label className="block font-bold text-base sm:text-lg lg:text-xl mb-2 text-blue-900 dark:text-blue-100">
                          Kitleye Eşlik Eden Bulgular
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {massExtras.map(extra => (
                            <button
                              type="button"
                              key={extra.key}
                              onClick={() => handleMassField(extra.key, !currentLesion[extra.key])}
                              className={`flex flex-col items-center p-2 border-2 rounded-2xl shadow h-20 justify-between text-base font-semibold transition-all duration-150 ${
                                !!currentLesion[extra.key]
                                  ? "bg-blue-600 text-white border-blue-700 shadow-lg scale-105"
                                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                              } hover:bg-blue-50 dark:hover:bg-blue-800`}
                            >
                              {extra.img && <img src={extra.img} alt={extra.label} className="w-8 h-8 object-cover rounded mb-1" />}
                              <span className="font-bold text-center text-xs sm:text-sm">{extra.label}</span>
                              <input type="checkbox" checked={!!currentLesion[extra.key]} readOnly className="mt-1 scale-110" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kitleye eşlik eden kalsifikasyon detayları */}
                  {currentLesion.hasCalcification && (
                    <div className="mt-6 mb-6 p-4 border-2 border-blue-400 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                      <h4 className="font-bold mb-3 text-blue-800 dark:text-blue-100 text-lg flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Kitleye Eşlik Eden Kalsifikasyon Detayları
                      </h4>

                      {/* Morfoloji */}
                      <details className="mb-2" open>
                        <summary className="cursor-pointer font-semibold text-blue-700 dark:text-blue-200">
                          Kalsifikasyon Morfolojisi <span className="text-red-500">*</span>
                        </summary>
                        <div className="mt-2 flex flex-wrap gap-6">
                          {calcMorphOptions.map((opt: any) => (
                            <button
                              type="button"
                              key={opt.value}
                              onClick={() => handleMassField("calcType", opt.value)}
                              className={`flex flex-col items-center p-3 border-2 rounded-xl w-32 h-32 justify-between text-base font-semibold ${
                                currentLesion["calcType"] === opt.value
                                  ? "bg-blue-600 text-white border-blue-700"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                              } hover:bg-blue-100 dark:hover:bg-blue-800`}
                            >
                              {opt.img && <img src={opt.img} alt={opt.label} className="w-20 h-16 object-cover rounded mb-2" />}
                              <span className="font-bold text-base text-center">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </details>

                      {/* Uzanım */}
                      <details className="mb-2" open>
                        <summary className="cursor-pointer font-semibold text-blue-700 dark:text-blue-200">
                          Kitle Dışına Uzanım <span className="text-red-500">*</span>
                        </summary>
                        <div className="mt-2 flex flex-wrap gap-6">
                          {calcExtOptions.map((opt: any) => (
                            <button
                              type="button"
                              key={opt.value}
                              onClick={() => handleMassField("extension", opt.value)}
                              className={`flex flex-col items-center p-3 border-2 rounded-xl w-32 h-16 justify-between text-base font-semibold ${
                                currentLesion["extension"] === opt.value
                                  ? "bg-blue-600 text-white border-blue-700"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                              } hover:bg-blue-100 dark:hover:bg-blue-800`}
                            >
                              <span className="font-bold text-base text-center">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </details>

                      {/* Dağılım (yalnızca definite) */}
                      {currentLesion["extension"] === "definite" && (
                        <details className="mb-2" open>
                          <summary className="cursor-pointer font-semibold text-blue-700 dark:text-blue-200">
                            Kalsifikasyon Dağılımı <span className="text-red-500">*</span>
                          </summary>
                          <div className="mt-2 flex flex-wrap gap-6">
                            {calcDistOptions.map((opt: any) => (
                              <button
                                type="button"
                                key={opt.value}
                                onClick={() => handleMassField("distribution", opt.value)}
                                className={`flex flex-col items-center p-3 border-2 rounded-xl w-32 h-16 justify-between text-base font-semibold ${
                                  currentLesion["distribution"] === opt.value
                                    ? "bg-blue-600 text-white border-blue-700"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                } hover:bg-blue-100 dark:hover:bg-blue-800`}
                              >
                                <span className="font-bold text-base text-center">{opt.label}</span>
                              </button>
                            ))}
                          </div>
                        </details>
                      )}

                      {/* Geçersiz kombinasyon uyarıları */}
                      {currentLesion["extension"] !== "definite" && currentLesion["distribution"] && (
                        <div className="mb-2 text-red-600 font-semibold">
                          Dağılım sadece kitle dışına belirgin uzanımda seçilebilir.
                        </div>
                      )}
                      {currentLesion["extension"] === "definite" && !currentLesion["distribution"] && (
                        <div className="mb-2 text-red-600 font-semibold">Belirgin uzanımda dağılım seçimi zorunlu.</div>
                      )}
                    </div>
                  )}

                  <button type="submit" className="w-full mt-8 px-8 py-4 bg-blue-600 text-white rounded-full text-xl font-bold hover:bg-blue-700">
                    {isEditing ? "Güncelle" : "Kaydet ve Bitir"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingIndex(null);
                        setAddingLesion(false);
                        setIsMass(false);
                        setIsCalcification(false);
                        setCurrentLesion({ isStable24m: false, isNewOrIncreased: false });
                      }}
                      className="mt-3 w-full px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                    >
                      İptal
                    </button>
                  )}
                </form>
              </div>
            ) : isCalcification ? (
              <div>
                <button
                  type="button"
                  onClick={() => setIsCalcification(false)}
                  className="mb-6 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  ← Lezyon tipine geri dön
                </button>

                <h3 className="text-2xl font-bold mb-6">Kalsifikasyon Özellikleri</h3>

                <form onSubmit={handleSaveCalcification}>
                  {freeCalcificationFields.map((field: any) => (
                    <div key={field.key} className="mb-4">
                      <label className="block font-bold text-lg mb-3">{field.title}</label>
                      <div className="flex flex-wrap gap-4">
                        {field.options.map((opt: any) => (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => handleMassField(field.key, opt.value)}
                            className={`flex flex-col items-center p-2 sm:p-3 lg:p-4 border-2 rounded-xl w-28 sm:w-32 lg:w-40 h-28 sm:h-32 lg:h-40 justify-between text-base sm:text-lg lg:text-xl font-semibold ${
                              currentLesion[field.key] === opt.value
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            } hover:bg-blue-100 dark:hover:bg-blue-800`}
                          >
                            {opt.img && <img src={opt.img} alt={opt.label} className="w-16 sm:w-20 lg:w-28 h-12 sm:h-16 lg:h-24 object-cover rounded mb-2" />}
                            <span className="font-bold text-base sm:text-lg lg:text-xl text-center">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                    <button type="submit" className="w-full mt-8 px-8 py-4 bg-blue-600 text-white rounded-full text-xl font-bold hover:bg-blue-700">
                      {isEditing ? "Güncelle" : "Kaydet ve Bitir"}
                    </button>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingIndex(null);
                          setAddingLesion(false);
                          setIsMass(false);
                          setIsCalcification(false);
                          setCurrentLesion({ isStable24m: false, isNewOrIncreased: false });
                        }}
                        className="mt-3 w-full px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                      >
                        İptal
                      </button>
                    )}
                </form>
              </div>
            ) : (
              // Lezyon tipi seçimi
              step < simpleSteps.length && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">{current.title}</h3>
                  <p className="mb-6 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">{current.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {current.options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="flex flex-col items-center p-2 sm:p-4 lg:p-6 border-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900 transition text-base sm:text-lg lg:text-xl font-semibold"
                      >
                        {opt.img && <img src={opt.img} alt={opt.label} className="w-20 sm:w-28 lg:w-36 h-20 sm:h-28 lg:h-36 object-cover rounded mb-3" />}
                        <span className="font-bold text-base sm:text-lg lg:text-xl text-center">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )
            )
          ) : (
            // Başlangıç: Lezyon ekle / sıfırla
            <div className="text-center">
              <button
                onClick={handleAddLesion}
                className="px-4 sm:px-8 lg:px-12 py-2 sm:py-4 lg:py-6 bg-blue-600 text-white rounded-full font-bold text-lg sm:text-xl lg:text-2xl hover:bg-blue-700"
              >
                + Lezyon Ekle
              </button>
              {lesions.length > 0 && (
                <div className="mt-6">
                  <button
                    onClick={() => setLesions([])}
                    className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-base sm:text-lg lg:text-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Tümünü Sıfırla
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📖 BI-RADS Hakkında</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Bu sistem <strong>American College of Radiology BI-RADS® Atlas 5. Baskı</strong> kriterlerine göre mamografik bulguları
                değerlendirerek standart BI-RADS kategorilerini belirler. Klinik pratikte karar verme sürecini destekler ve standart raporlama sağlar.
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


