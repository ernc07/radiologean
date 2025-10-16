// --- Kitle formu için alanlar ve seçenekler (exhaustive için) ---
export const massFields = {
	shape: ["oval", "round", "irregular"],
	margin: ["circumscribed", "indistinct", "microlobulated", "spiculated", "obscured"],
	density: ["high", "iso", "low", "fat-containing"],
	hasCalcification: [true, false],
	calcType: [
		undefined,
		"fine_linear", "fine_pleomorphic", "amorphous", "coarse_heterogeneous",
		"round_punctate", "rim_eggshell", "milk_of_calcium", "dystrophic", "popcorn", "other"
	],
	extension: [undefined, "none", "indeterminate", "definite"],
	distribution: [undefined, "grouped", "linear", "segmental", "regional", "diffuse"],
	isStable24m: [true, false],
	isNewOrIncreased: [true, false],
	hasDistortion: [true, false],
	hasNippleRetraction: [true, false],
	hasTrabecularThickening: [true, false],
};
// Helper: type-safe category equality
const isCat = (c: BiradsCat, t: BiradsCat) =>
	BIRADS_ORDER.indexOf(c) === BIRADS_ORDER.indexOf(t);
// ===== Temporal helpers =====
// up, down, maxCat fonksiyonları aşağıda tanımlı ve kullanılacak

// ----- MASS (mevcudun üstüne sadece temporal ek çağrısı zaten yaptın) -----
// Zaman modülatörü sadece applyTemporalModifiers ile uygulanacak
export function computeMassBiradsWithTime(l: any): BiradsCat {
	return applyTemporalModifiers(l, computeMassBirads(l));
}

// ----- CALCIFICATION (free) -----
export function computeCalcBirads(l: any): BiradsCat {
	// l.calcType, l.distribution (linear/segmental?), l.isStable24m, l.isNewOrIncreased
	const t = l.calcType;
	if (!t) return '0';

	const benign = new Set(['round_punctate','rim_eggshell','milk_of_calcium','dystrophic','popcorn','skin','vascular']);
	const high   = new Set(['fine_linear','fine_pleomorphic']);
	const mid    = new Set(['amorphous','coarse_heterogeneous']);

	let cat: BiradsCat = '0';

	if (benign.has(t)) {
		cat = '2'; // emin değilsen 3 verilebilir; stabil ise 2
		if (l.isStable24m === true && isCat(cat, '3')) cat = '2';
		return cat;
	}

	if (high.has(t)) {
		cat = '4C';
		if (l.isNewOrIncreased === true) cat = maxCat(cat, '5');
	} else if (mid.has(t)) {
		cat = '4B';
	} else {
		// tanımsız/other
		cat = '4A';
	}

	// distribution etkisi (linear/segmental benign set dışında ↑1)
	if ((l.distribution === 'linear' || l.distribution === 'segmental') && !benign.has(t)) {
		cat = up(cat, 1);
	}

	// zamansal: stabilite sadece 3→2 indirir; 4’leri indirme
	if (l.isStable24m === true && isCat(cat, '3')) cat = '2';
	if (l.isNewOrIncreased === true) cat = up(cat, 1);

	return cat;
}

// ----- ASYMMETRY -----
export function computeAsymmetryBirads(l: any): BiradsCat {
	// l.isStable24m, l.isNewOrIncreased, l.hasSuspiciousAssoc (AD / şüpheli kalsifikasyon eşlik ediyor mu?)
	let cat: BiradsCat = '3'; // baseline asimetri
	if (l.isStable24m === true) return '2';

	if (l.isNewOrIncreased === true) {
		cat = '4B'; // developing asymmetry
		if (l.hasSuspiciousAssoc) cat = '4C';
	}
	return cat;
}

// ----- ARCHITECTURAL DISTORTION (isolated) -----
export function computeDistortionBirads(l: any): BiradsCat {
	// l.isPostopScarLikely, l.isStable24m, l.isNewOrIncreased
	if (l.isPostopScarLikely && l.isStable24m === true) return '2';
	let cat: BiradsCat = '4C';
	if (l.isNewOrIncreased === true) cat = maxCat(cat, '5');
	return cat;
}

// ----- NIPPLE/SKIN RETRACTION (isolated) -----
export function computeRetractionBirads(l: any): BiradsCat {
	// l.isBilateralChronic, l.isNewOrIncreased, l.hasSuspiciousAssoc
	if (l.isBilateralChronic === true) return '2';
	let cat: BiradsCat = l.isNewOrIncreased ? '4B' : '3';
	if (l.hasSuspiciousAssoc) cat = '4C';
	return cat;
}

// ----- OVERALL -----
export function computeOverallBirads(lesions: any[]): BiradsCat {
	const rank = (c: BiradsCat) => BIRADS_ORDER.indexOf(c);
	let best: BiradsCat = '0';
	for (const l of lesions) {
		let c: BiradsCat = '0';
		if (l.lesionType === 'mass')              c = computeMassBiradsWithTime(l);
		else if (l.lesionType === 'calcification')c = computeCalcBirads(l);
		else if (l.lesionType === 'asymmetry')    c = computeAsymmetryBirads(l);
		else if (l.lesionType === 'distortion')   c = computeDistortionBirads(l);
		else if (l.lesionType === 'nipple_skin_retraction') c = computeRetractionBirads(l);
		if (rank(c) > rank(best)) best = c;
	}
	return best;
}
// Zamansal modülatör: ≥24 ay stabil ve yeni/büyüme etkisi
function applyTemporalModifiers(l: any, cat: BiradsCat): BiradsCat {
	// 2: tanısal benign → zaman etkilenmez
	if (cat === '2') return '2';
	// 5: yeni/büyüme ile 6 OLMAZ (6 sadece biyopsi ile)
	if (cat === '5') return '5';
	// ≥24 ay stabil → yalnız 3→2
	if (l.isStable24m === true && isCat(cat, '3')) return '2';
	// yeni/büyüme → +1 (4A→4B, 4B→4C, 4C→5)
	if (l.isNewOrIncreased === true) return up(cat, 1);
	return cat;
}

// lib/birads-rules.ts
// BI-RADS pure helpers/constants (no hooks, no "use client")

// --- Kitleye eşlik eden kalsifikasyon alanları (BI-RADS uyumlu) ---
export const massCalcificationFields = [
	{
		key: 'calcType',
		title: 'Kalsifikasyon Morfolojisi',
		options: [
			{ label: 'Fine linear/branching (casting)', value: 'fine_linear', img: '' },
			{ label: 'Fine pleomorphic',                 value: 'fine_pleomorphic', img: '' },
			{ label: 'Amorphous',                        value: 'amorphous', img: '' },
			{ label: 'Coarse heterogeneous',             value: 'coarse_heterogeneous', img: '' },
			{ label: 'Round/punctate',                   value: 'round_punctate', img: '' },
			{ label: 'Rim/eggshell',                     value: 'rim_eggshell', img: '' },
			{ label: 'Milk of calcium',                  value: 'milk_of_calcium', img: '' },
			{ label: 'Dystrophic',                       value: 'dystrophic', img: '' },
			{ label: 'Popcorn',                          value: 'popcorn', img: '' },
			{ label: 'Diğer',                             value: 'other', img: '' },
		]
	},
	{
		key: 'intraPattern', // resmi lexicon değil; yalnızca betimleyici (opsiyonel)
		title: 'Kitle İçi Patern (opsiyonel)',
		options: [
			{ label: 'Peripheral/rim',     value: 'peripheral', img: '' },
			{ label: 'Central',            value: 'central', img: '' },
			{ label: 'Diffuse within mass',value: 'diffuse_within', img: '' },
			{ label: 'Eccentric cluster',  value: 'eccentric_cluster', img: '' },
			{ label: 'Multiple clusters',  value: 'multiple_clusters', img: '' },
		]
	},
	{
		key: 'extension',
		title: 'Kitle Dışına Uzanım',
		options: [
			{ label: 'Yok',        value: 'none', img: '' },
			{ label: 'Belirsiz',   value: 'indeterminate', img: '' }, // eşdeğeri: 'suspicious'
			{ label: 'Belirgin',   value: 'definite', img: '' },
		]
	},
	{
		key: 'distribution',
		title: 'Kalsifikasyon Dağılımı (yalnızca belirgin uzanımda)',
		options: [
			{ label: 'Gruplu (grouped)', value: 'grouped', img: '' },
			{ label: 'Lineer',           value: 'linear', img: '' },
			{ label: 'Segmental',        value: 'segmental', img: '' },
			{ label: 'Regional',         value: 'regional', img: '' },
			{ label: 'Diffuse',          value: 'diffuse', img: '' },
		]
	}
] as const;

// --- Serbest (kitle dışı) kalsifikasyon alanları ---
export const freeCalcificationFields = [
	{
		key: 'calcType',
		title: 'Kalsifikasyon Morfolojisi',
		options: [
			{ label: 'Fine linear/branching (casting)', value: 'fine_linear', img: '' },
			{ label: 'Fine pleomorphic',                 value: 'fine_pleomorphic', img: '' },
			{ label: 'Amorphous',                        value: 'amorphous', img: '' },
			{ label: 'Coarse heterogeneous',             value: 'coarse_heterogeneous', img: '' },
			{ label: 'Round/punctate',                   value: 'round_punctate', img: '' },
			{ label: 'Rim/eggshell',                     value: 'rim_eggshell', img: '' },
			{ label: 'Milk of calcium',                  value: 'milk_of_calcium', img: '' },
			{ label: 'Dystrophic',                       value: 'dystrophic', img: '' },
			{ label: 'Popcorn',                          value: 'popcorn', img: '' },
			{ label: 'Skin',                             value: 'skin', img: '' },
			{ label: 'Vascular',                         value: 'vascular', img: '' },
			{ label: 'Diğer',                             value: 'other', img: '' },
		]
	},
	{
		key: 'distribution',
		title: 'Kalsifikasyon Dağılımı',
		options: [
			{ label: 'Gruplu (grouped)', value: 'grouped', img: '' },
			{ label: 'Lineer',           value: 'linear', img: '' },
			{ label: 'Segmental',        value: 'segmental', img: '' },
			{ label: 'Regional',         value: 'regional', img: '' },
			{ label: 'Diffuse',          value: 'diffuse', img: '' },
		]
	}
] as const;

// ---- BI-RADS karar motoru (kitle) ----
export const BIRADS_ORDER = ['0','2','3','4A','4B','4C','5','6'] as const;
export type BiradsCat = typeof BIRADS_ORDER[number];

const up = (cat: BiradsCat, steps = 1): BiradsCat =>
	BIRADS_ORDER[Math.min(BIRADS_ORDER.indexOf(cat) + steps, BIRADS_ORDER.length - 1)];

const down = (cat: BiradsCat, steps = 1): BiradsCat =>
	BIRADS_ORDER[Math.max(BIRADS_ORDER.indexOf(cat) - steps, 0)];

const maxCat = (a: BiradsCat, b: BiradsCat): BiradsCat =>
	BIRADS_ORDER[Math.max(BIRADS_ORDER.indexOf(a), BIRADS_ORDER.indexOf(b))];

function baseFromShapeMargin(shape?: string, margin?: string, density?: string): BiradsCat {
	if (!margin) return '0';
	if (margin === 'spiculated') return '5';
	if (margin === 'obscured')   return '0'; // ek projeksiyon/DBT gerekebilir
	if (margin === 'indistinct') return (shape === 'round') ? '4B' : '4C';
	if (margin === 'microlobulated') return (shape === 'irregular') ? '4B' : '4A';
	if (margin === 'circumscribed') {
		if (density === 'fat-containing') return '2';
		return '3'; // yeni ise 3; ≥2y stabil ise 2'ye indirilebilir (UI tarafında)
	}
	return '0';
}

function applyCalcModifiers(l: any, cat: BiradsCat): BiradsCat {
	if (!l.hasCalcification || !l.calcType) return cat;

	const benignSet = new Set(['rim_eggshell','milk_of_calcium','dystrophic','popcorn','round_punctate']);

	// Ana morfoloji etkileri
	if (l.calcType === 'fine_linear') {
		return '5';
	}
	if (l.calcType === 'fine_pleomorphic') {
		// belirgin uzanım + lineer/segmental → ≥4C, gerekirse bir basamak daha
		if (l.extension === 'definite' && (l.distribution === 'linear' || l.distribution === 'segmental')) {
			const atLeast = maxCat(cat, '4C');
			return (atLeast === '4C') ? up(atLeast, 1) : atLeast;
		}
		return maxCat(cat, '4C');
	}
	if (l.calcType === 'coarse_heterogeneous' || l.calcType === 'amorphous') {
		cat = up(cat, 1);
	}

	// Kitle dışına belirgin uzanım + lineer/segmental (benign morfoloji değilse) → +1
	if (l.extension === 'definite' && (l.distribution === 'linear' || l.distribution === 'segmental') && !benignSet.has(l.calcType)) {
		cat = up(cat, 1);
	}

	// Benign lehine morfoloji: 4A/3 ise bir basamak düş
	if (benignSet.has(l.calcType)) {
		if (cat === '4A' || cat === '3') cat = down(cat, 1); // 4A→3, 3→2
	}

	return cat;
}

function applyAssociatedModifiers(l: any, cat: BiradsCat): BiradsCat {
	// AD (skar olmayan) → en az 4C
	if (l.hasDistortion) cat = maxCat(cat, '4C');

	// Nipple/skin retraction veya belirgin trabeküler kalınlaşma → +1
	if (l.hasNippleRetraction)      cat = up(cat, 1);
	if (l.hasTrabecularThickening)  cat = up(cat, 1);

	return cat;
}

export function computeMassBirads(l: any): BiradsCat {
	let cat = baseFromShapeMargin(l.shape, l.margin, l.density);
	cat = applyCalcModifiers(l, cat);
	cat = applyAssociatedModifiers(l, cat);
	return cat; // zaman burada YOK
}
