
import { massFields, computeMassBiradsWithTime } from "./birads-rules";
type MassForm = Record<string, any>;
const fields = Object.keys(massFields) as (keyof typeof massFields)[];

// Klasik satır-sütunlu, Excel uyumlu CSV çıktısı (noktalı virgül ayraclı)
const header = [...fields, "BI-RADS"].join(";");
console.log(header);

function generateCombinations(fields: (keyof typeof massFields)[], index: number, current: MassForm) {
  if (index === fields.length) {
    const birads = computeMassBiradsWithTime(current);
    const row = fields.map((f) => String(current[f] ?? "")).join(";") + ";" + birads;
    console.log(row);
    return;
  }
  const fieldKey = fields[index];
  const options = massFields[fieldKey];
  for (const option of options) {
    current[fieldKey] = option;
    generateCombinations(fields, index + 1, current);
  }
}

generateCombinations(fields, 0, {});
