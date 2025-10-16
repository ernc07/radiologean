# BI‑RADS Rules & Rationale (Mammography) — Evidence‑Backed README

This README teaches **why** each default BI‑RADS assessment in our app is assigned, using **peer‑reviewed English sources** (AJR, Radiology, KJR, Insights Imaging, Clinical Imaging, StatPearls). It excludes Radiology Assistant and Radiopaedia.

> **Scope:** Mammography-centric logic (BI‑RADS 5th ed., 2013) with contemporary evidence through 2025.  
> **Principle:** Assign a **default** category from lexicon descriptors, then **upgrade** with associated features or **downgrade** with classic benign patterns. The **most suspicious** finding governs the final category.

---

## 0) Category Probability Targets (BI‑RADS 5th ed.)

- **4A:** >2% to ≤10% malignancy risk  
- **4B:** >10% to ≤50%  
- **4C:** >50% to <95%  
- **5:** ≥95% (classic malignancy appearance)

**Why we use these thresholds:** Widely cited in the 5th‑edition literature summaries and subsequent validation papers; keep our default + upgrade logic anchored to these numeric targets.

**Key sources:** Elezaby *et al* 2018; Noonpradej *et al* 2021; institutional summaries of BI‑RADS 5th ed.

---

## 1) Masses — Shape × Margin → Default Category

**Shape:** `Round`, `Oval`, `Irregular`  
**Margin:** `Circumscribed`, `Obscured`, `Indistinct`, `Microlobulated`, `Spiculated`

> **Terminology note:** “Irregular” is a **shape**, not a margin term. “Obscured” implies **incomplete characterization** (often summation), not inherently suspicious.

### Default matrix (before upgrades)
| **Shape \ Margin** | **Circumscribed** | **Obscured** | **Indistinct** | **Microlobulated** | **Spiculated** |
|---|---|---|---|---|---|
| **Round** | **BI‑RADS 2** (new/discordant → 3) | **BI‑RADS 0** | **BI‑RADS 4B** | **BI‑RADS 4B** | **BI‑RADS 4C** |
| **Oval** | **BI‑RADS 2** (new/discordant → 3) | **BI‑RADS 0** | **BI‑RADS 4B** | **BI‑RADS 4B** | **BI‑RADS 4C** |
| **Irregular** | **BI‑RADS 4A** (rare, context‑dependent) | **BI‑RADS 0** | **BI‑RADS 4B** | **BI‑RADS 4B** | **BI‑RADS 4C** |

**Why these defaults?**  
- **Margins drive risk**: Large mammography series show **spiculated margin** has the **highest PPV** for carcinoma; **irregular shape** is also strongly predictive but secondary to margin.  
- **Obscured** margins commonly reflect **summation/overlap** → require additional views (BI‑RADS 0) before assigning suspicion.  
- **Indistinct/Microlobulated** margins signal infiltrative or lobulated edge characteristics → **suspicious** (4A–4B).  
- **Round/Oval + Circumscribed** masses are usually benign; in absence of discordance, **2** (or **3** if new/short‑interval follow‑up is preferred).

---

## 2) Calcifications — Morphology × Distribution → Default Category

**Suspicious morphologies:** `Amorphous`, `Coarse Heterogeneous`, `Fine Pleomorphic`, `Fine Linear/Linear Branching`  
**Benign morphologies:** `Skin`, `Vascular`, `Popcorn/Dystrophic`, `Eggshell/Rim`, `Large Rod‑like/Secretory`, `Milk of Calcium`  
**Distributions:** `Grouped`, `Regional`, `Linear`, `Segmental`, `Diffuse`

> **Critical distinction:** **Coarse Heterogeneous ≠ Popcorn/Dystrophic**.  
> ‑ *Coarse Heterogeneous* → **suspicious** (default **4B**)  
> ‑ *Popcorn/Dystrophic* → **benign** (**2**)

### 2.1 Default by morphology & distribution

**Amorphous**
| **Distribution** | Grouped | Regional | Linear | Segmental | Diffuse |
|---|---:|---:|---:|---:|---:|
| **Default** | **4B** | **4B** | **4C** | **4C** | **4A*** |

**Coarse Heterogeneous**
| **Distribution** | Grouped | Regional | Linear | Segmental | Diffuse |
|---|---:|---:|---:|---:|---:|
| **Default** | **4B** | **4B** | **4C** | **4C** | **4A*** |

**Fine Pleomorphic**
| **Distribution** | Grouped | Regional | Linear | Segmental | Diffuse |
|---|---:|---:|---:|---:|---:|
| **Default** | **4B** | **4B** | **4C** | **4C** | **4A*** |

**Fine Linear / Linear Branching**
| **Distribution** | Grouped | Regional | Linear | Segmental | Diffuse |
|---|---:|---:|---:|---:|---:|
| **Default** | **4C** | **4C** | **4C** | **4C** | **4B** |

\* **Diffuse** distributions are uncommon in suspicious morphologies; if **bilateral & symmetric**, consider **downgrade** (see §4).

**Why these defaults?**  
- **Morphology PPVs (5th‑ed alignment):** amorphous (≈16%), **coarse heterogeneous (≈32%)**, **fine pleomorphic (≈58%)**, **fine linear/branching (≈91%)**.  
- **Distribution PPVs:** **segmental (~78%) > linear (~50%) > grouped (~31%) ≈ regional (~32%)**.  
Thus **grouped/regional** map to **4B**, **linear/segmental** escalate to **4C**, and **fine linear/branching** is high‑suspicion regardless of distribution.

### 2.2 Round/Punctate (low suspicion pattern)
- **Single, well‑evaluated cluster & stable** → **BI‑RADS 3**  
- **New/increasing** or **ductal path (linear/segmental)** → **BI‑RADS 4A/4B**

### 2.3 Benign calcifications → BI‑RADS 2
- **Skin**, **Vascular**, **Popcorn/Dystrophic**, **Eggshell/Rim**, **Large Rod‑like/Secretory**, **Milk of Calcium** (*layering/“teacup”* must be shown).

---

## 3) Associated Features — How We **Upgrade**

The following **raise** suspicion and can justify **BI‑RADS 5** when the overall appearance becomes *classic*:

- **Nipple or skin retraction/deformity**
- **Architectural distortion (AD)**
- **Segmental fine linear/branching or conspicuous fine pleomorphic calcifications**
- **Pathologic axillary nodes**, marked **skin thickening/edema**

**Rules of thumb:**  
- **Spiculated mass** → **4C by default**. **Spiculation + (retraction or AD or segmental fine linear/pleomorphic calcs)** → **usually BI‑RADS 5 (≥95%)**.  
- **Retraction alone is not automatically 5**; exclude benign explanations (congenital inversion, postsurgical scar). Escalate based on accompanying imaging findings.

---

## 4) Downgrades & “Incomplete”

- **Obscured** margins (summation) or **one‑view** findings → **BI‑RADS 0** until characterized on orthogonal/spot/DBT/US.  
- **Diffuse, bilateral symmetric** calcifications with subtle/low‑suspicion morphology → allow **3** (or **2** if classic benign pattern).  
- Classic benign morphologies (above) → **BI‑RADS 2** irrespective of distribution.

---

## 5) Implementation Checklist (for developers)

- Enforce the **Shape × Margin** matrix (Section 1) as defaults.  
- Map calcification **Morphology × Distribution** (Section 2) with the **coarse‑hetero ≠ dystrophic** separation.  
- Apply **Upgrade** logic when associated features are present; if **spiculation + associate(s)** ⇒ **BI‑RADS 5**.  
- Apply **Downgrade/Incomplete** guards for **obscured/one‑view** and **diffuse bilateral** patterns.  
- Unit‑tests for every table row plus upgrade/downgrade branches.

---

## 6) References (English, peer‑reviewed/authoritative)

1) **Liberman L.** *The Breast Imaging Reporting and Data System: Positive Predictive Value.* **AJR** 1998;171:35‑40. High PPVs for **spiculated margin (≈81%)**, **irregular shape (≈73%)**, **linear calc morphology (≈81%)**, **segmental/linear distributions (≈74/68%)**.

2) **Park GE** *et al.* *Comparison of Positive Predictive Values of Categorization of Suspicious Calcifications for Malignancy, BI‑RADS 5th vs 4th.* **AJR** 2019. Reports morphology PPVs (**amorphous ~15.9%**, **coarse‑hetero ~31.7%**, **fine pleomorphic ~58.2%**, **fine linear/branching ~90.6%**) and distribution PPVs (**segmental ~77.9%**, **linear ~50%**, **grouped ~31.3%**, **regional ~31.5%**).

3) **Oligane H** *et al.* *Grouped Amorphous Calcifications at Mammography.* **Radiology** 2018. Overall malignancy ~10.5% for grouped amorphous; supports **4B** default with careful context.

4) **Youk JH** *et al.* *Scoring System to Stratify Malignancy Risks for Grouped Amorphous Calcifications.* **Korean J Radiol** 2019. Confirms low PPVs for grouped amorphous; notes **diffuse** suspicious morphologies can be benign in prior series → supports **downgrade** when **bilateral/symmetric**.

5) **Spak DA** *et al.* *BI‑RADS® Fifth Edition: A Summary of Changes.* **(2017, summary article)**. Establishes 5th‑edition lexicon (associated features include **skin/nipple retraction**, **edema**, etc.) and clarifies **category 4 sub‑divisions**.

6) **Hatcher KM** *et al.* *Evaluating Acute Nipple Inversion: Imaging Findings and Malignancy Risk.* **Clinical Imaging** 2024. Diagnostic MMG/US has high sensitivity/NPV for acute inversion; **retraction** must be interpreted with imaging context.

7) **del Riego J** *et al.* *Multimodality Approach to the Nipple‑Areolar Complex.* **Insights Imaging** 2020. Practical algorithm for NAC; retraction as a significant associated sign when combined with suspicious imaging.

8) **Elezaby M** *et al.* *ACR BI‑RADS Assessment Category 4 Subdivisions in Diagnostic Mammography.* **AJR** 2018 (Open‑access on PMC). Provides the canonical **4A/4B/4C** probability bands used as targets in this README.

9) **Gaur S** *et al.* *Architectural Distortion of the Breast.* **AJR** 2013. Details AD behavior, including postoperative appearances and the need to consider context before final categorization.

10) **Noonpradej S** *et al.* *Prediction for Breast Cancer in BI‑RADS Category 4 Lesions.* **Journal of Breast Cancer** 2021. Restates the **4A/4B/4C** thresholds in contemporary practice.

> These sources justify each table and rule above. Keep them in your repo for clinical governance and audits.
