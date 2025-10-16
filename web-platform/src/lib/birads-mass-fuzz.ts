import { computeMassBiradsWithTime } from "@/lib/birads-rules";

// Tüm olası değerler (UI ile uyumlu)
const shapes = ["oval", "round", "irregular"];
const margins = ["circumscribed", "microlobulated", "obscured", "indistinct", "spiculated"];
const densities = [undefined, "low", "equal", "high", "fat-containing"];
const calcTypes = [undefined, "fine_linear", "fine_pleomorphic", "amorphous", "coarse_heterogeneous", "round_punctate", "rim_eggshell", "milk_of_calcium", "dystrophic", "popcorn"];
const extensions = [undefined, "none", "indeterminate", "definite"];
const distributions = [undefined, "grouped", "linear", "segmental", "regional", "diffuse"];
const bools = [undefined, false, true];

// Rastgele vaka üretici (her kombinasyonun tamamı için kartesyen çarpım çok büyük olur)
function randomCase() {
  return {
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    margin: margins[Math.floor(Math.random() * margins.length)],
    density: densities[Math.floor(Math.random() * densities.length)],
    hasCalcification: Math.random() < 0.5,
    calcType: calcTypes[Math.floor(Math.random() * calcTypes.length)],
    extension: extensions[Math.floor(Math.random() * extensions.length)],
    distribution: distributions[Math.floor(Math.random() * distributions.length)],
    isStable24m: Math.random() < 0.2 ? true : false,
    isNewOrIncreased: Math.random() < 0.2 ? true : false,
    hasDistortion: Math.random() < 0.2 ? true : false,
    hasNippleRetraction: Math.random() < 0.2 ? true : false,
    hasTrabecularThickening: Math.random() < 0.2 ? true : false,
  };
}

const N = 100;
type BiradsCat = "0" | "2" | "3" | "4A" | "4B" | "4C" | "5" | "6";
const results: Record<BiradsCat, number> = {
  "0": 0, "2": 0, "3": 0, "4A": 0, "4B": 0, "4C": 0, "5": 0, "6": 0
};

for (let i = 0; i < N; ++i) {
  const l = randomCase();
  const cat = computeMassBiradsWithTime(l);
  results[cat] = (results[cat] || 0) + 1;
  console.log(`#${i+1}`, JSON.stringify(l), "→", cat);
}

console.log("\nKategori dağılımı:", results);
