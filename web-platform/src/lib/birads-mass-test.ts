import { computeMassBiradsWithTime } from "@/lib/birads-rules";

const cases = [
  { name: 'Fat-containing benign', l: { shape:'oval', margin:'circumscribed', density:'fat-containing' }, expect:'2' },
  { name: 'Circumscribed stable',  l: { shape:'oval', margin:'circumscribed', isStable24m:true }, expect:'2' },
  { name: 'Circumscribed new',     l: { shape:'oval', margin:'circumscribed', isNewOrIncreased:true }, expect:'4A' },
  { name: 'Spiculated',            l: { margin:'spiculated' }, expect:'5' },
  { name: 'Round+indistinct',      l: { shape:'round', margin:'indistinct' }, expect:'4B' },
  { name: 'Irregular+indistinct',  l: { shape:'irregular', margin:'indistinct' }, expect:'4C' },
  { name: 'Irregular+microlob',    l: { shape:'irregular', margin:'microlobulated' }, expect:'4C' },
  { name: 'Oval+microlob',         l: { shape:'oval', margin:'microlobulated' }, expect:'4B' },
  { name: 'Obscured',              l: { margin:'obscured' }, expect:'0' },
  { name: 'Fine linear',           l: { margin:'circumscribed', hasCalcification:true, calcType:'fine_linear' }, expect:'5' },
  { name: 'Fine pleomorphic seg',  l: { margin:'circumscribed', hasCalcification:true, calcType:'fine_pleomorphic', extension:'definite', distribution:'segmental' }, expect:'5' },
  { name: 'Coarse hetero',         l: { margin:'circumscribed', hasCalcification:true, calcType:'coarse_heterogeneous' }, expect:'4A' },
  { name: 'Coarse + seg',          l: { margin:'circumscribed', hasCalcification:true, calcType:'coarse_heterogeneous', extension:'definite', distribution:'linear' }, expect:'4B' },
  { name: 'Round punctate',        l: { margin:'circumscribed', hasCalcification:true, calcType:'round_punctate' }, expect:'2' },
  { name: 'AD present',            l: { margin:'circumscribed', hasDistortion:true }, expect:'4C' },
  { name: 'AD + nipple retr',      l: { margin:'circumscribed', hasDistortion:true, hasNippleRetraction:true }, expect:'5' },
];

cases.forEach(c => {
  const got = computeMassBiradsWithTime(c.l);
  console.log(c.name, '→', got, got === c.expect ? '✓' : `✗ (beklenen ${c.expect})`);
});
