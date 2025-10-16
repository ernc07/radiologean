# copilot-instructions.md
> **Amaç:** Bu depo için GitHub Copilot’a bağlamsal “proje bilgisi” ve kurallar öğretmek. Copilot Chat/Copilot Edits bu dosyayı okuyup daha doğru öneriler üretsin.

## 0) Proje Özeti (Context)
- **Uygulama:** BI-RADS temelli *mamografi* karar destek aracı (Streamlit).
- **Dil/Stack:** Python 3.10+, Streamlit, type hints, pytest.
- **Amaç:** Kitle, kalsifikasyon ve eşlik eden bulguları girildiğinde **doğru BI-RADS** kategorisini üretmek ve açıklama/metin önerisi vermek.
- **Dil:** Türkçe UI (EN terimler parantez içinde).

## 1) Terminoloji (BI-RADS 5th, 2013 – güncel pratikle uyumlu)
### 1.1 Kitle – Şekil (Shape) — tek seçim
- `Round (Yuvarlak)`
- `Oval`
- `Irregular (Düzensiz)`

### 1.2 Kitle – Sınır (Margin) — tek seçim
- `Circumscribed (Düzgün sınırlı)`
- `Obscured (Örtülü)` → **değerlendirme eksik**; genellikle **BI-RADS 0** (tamamlayıcı görüntü gerekir)
- `Indistinct (Belirsiz)` → **şüpheli** (4A–4B)
- `Microlobulated (Mikrolobüle)` → **şüpheli** (4A–4B)
- `Spiculated (Spiküle)` → **yüksek şüpheli** (varsayılan 4C; eşlikçilerle 5)

> **Not:** “Irregular” **şekli** anlatır; *“irregular margin”* terimi yoktur.

### 1.3 Kalsifikasyon – Morfoloji
- **Şüpheli:** `Amorphous`, `Coarse Heterogeneous (Kaba heterojen)`, `Fine Pleomorphic`, `Fine Linear/Linear Branching`
- **Tipik benign:** `Skin`, `Vascular`, `Popcorn/Dystrophic`, `Eggshell/Rim`, `Large Rod-like/Secretory`, `Milk of Calcium`

### 1.4 Kalsifikasyon – Dağılım
- `Grouped (Gruplu)` • `Regional (Bölgesel)` • `Linear (Lineer)` • `Segmental` • `Diffuse (Diffüz)`

### 1.5 Eşlik eden/ilişkili bulgular (Associated features)
- `Nipple/Skin retraction (Meme başı/deri çekintisi)`
- `Architectural Distortion (AD)`
- `Pathologic axillary lymph nodes`
- Cilt kalınlaşması/ödem vb.

---

## 2) Karar Kuralları (Default → Upgrade/Downgrade)
Copilot, **önce default kategori**yi atar, sonra **yükseltici/düşürücü** koşulları uygular.

### 2.1 Kitle: Şekil × Sınır → **Varsayılan** BI-RADS
| Şekil \ Sınır | Circumscribed | Obscured | Indistinct | Microlobulated | Spiculated |
|---|---|---|---|---|---|
| **Round** | **2** (yeni/uyumsuzsa 3) | **0** | **4B** | **4B** | **4C** |
| **Oval** | **2** (yeni/uyumsuzsa 3) | **0** | **4B** | **4B** | **4C** |
| **Irregular** | **4A** (nadir bağlam) | **0** | **4B** | **4B** | **4C** |

> **Açıklama:** Obscured → önce tamamlayıcı görüntü (spot-mag, lateral/rolled/DBT). Indistinct/Microlobulated → şüpheli. Spiculated → varsayılan 4C.

### 2.2 Eşlik eden bulgular → **Yükselt**
- Aşağıdakilerden **biri** varsa **+1 seviye**; **birkaçı birlikte** veya toplam görünüm “klasik malign” ise **5**:
  - **Meme başı/deri çekintisi (retraction)**
  - **Architectural Distortion (AD)**
  - **Segmental ince lineer/lineer dallanan** veya belirgin **ince pleomorfik** kalsifikasyonlar
  - **Patolojik LAP**, belirgin cilt deformitesi/ödem
- **Kural:** `Spiculated + (retraction | AD | segmental fine linear/pleomorphic | LAN)` ⇒ **BI-RADS 5**.

### 2.3 Kalsifikasyon Kuralları (Default)
- **Coarse Heterogeneous:** `Gruplu/Bölgesel → 4B`, `Segmental/Lineer → 4C`.
- **Amorphous:** `Gruplu/Bölgesel → 4B`, `Segmental/Lineer → 4B–4C` (kurum pratiğine göre 4C’ye çekilebilir).
- **Fine Pleomorphic:** `Gruplu/Bölgesel → 4B`, `Segmental/Lineer → 4C`.
- **Fine Linear/Linear Branching:** genelde **4C**.
- **Round/Punctate:** tek klaster, tam değerlendirme sonrası **3**; **yeni/artan** ise **4A**.
- **Benign paket:** skin/vascular/popcorn/dystrophic/eggshell/large rod-like/milk-of-calcium → **2**.
- **Vasküler** yanlış pozitiflerini önlemek için “vasküler yol” işaretleyicisi (iki paralel hat, damar trasesi) kullanılmalıdır.

### 2.4 Tek projeksiyon / eksik mamografi
- **One-view bulgu** veya sadece **MLO** ile karakterize edilemeyen bulgu → **BI-RADS 0** (tamamlayıcı projeksiyon/DBT/US).
- **Açık malign patern** (ör. spiculated + retraction/AD) varsa ek görüntüler **hedefleme** amaçlıdır → **4C/5** verilebilir.

### 2.5 Çekinti (Retraction) kuralı
- **Tek başına otomatik 5 değil.**
- **Şüpheli kitle/kalsifikasyon** ile birlikteyse **kategoriyi yükseltir**; **spiculated** ile birlikte **5**.
- Konjenital/bilateral inversiyon, post-op skar gibi benign açıklamalar dışlanmalıdır.

---

## 3) Kodlama Rehberi
- **Dil:** Python 3.10+, `typing` kullan (Literal/TypedDict/Enum).
- **UI:** Streamlit; tüm sabit listeleri *tek bir kaynak* dosyada tut (`constants.py`).  
- **Kural motoru:** 3 fazlı fonksiyonlar öner:
  1. `default_mass_category(shape, margin) -> Category`
  2. `calc_category(morphology, distribution) -> Category`
  3. `upgrade_with_associated_features(category, features) -> Category`
- **Test:** `pytest` ile unit test; her kural için örnek senaryolar (bkz. §6).
- **Dokümantasyon:** Google-style docstring + kısa klinik not.

**Örnek Tipler**
```python
from typing import Literal, TypedDict, Set

Shape = Literal["Round", "Oval", "Irregular"]
Margin = Literal["Circumscribed", "Obscured", "Indistinct", "Microlobulated", "Spiculated"]
CalcMorph = Literal["Amorphous","Coarse Heterogeneous","Fine Pleomorphic","Fine Linear/Linear Branching",
                    "Round/Punctate","Skin","Vascular","Popcorn/Dystrophic","Eggshell/Rim","Large Rod-like/Secretory","Milk of Calcium"]
CalcDist = Literal["Grouped","Regional","Linear","Segmental","Diffuse"]
Category = Literal["BI-RADS 0","BI-RADS 2","BI-RADS 3","BI-RADS 4A","BI-RADS 4B","BI-RADS 4C","BI-RADS 5"]

class Associated(TypedDict):
    retraction: bool
    AD: bool
    suspicious_calcs: bool  # segmental fine linear / obvious pleomorphic cluster
    nodes: bool
```

**Örnek Kural Fonksiyonları (iskelet)**
```python
def default_mass_category(shape: Shape, margin: Margin) -> Category:
    if margin == "Obscured":
        return "BI-RADS 0"
    if margin == "Spiculated":
        return "BI-RADS 4C"
    if margin in {"Indistinct","Microlobulated"}:
        return "BI-RADS 4B"
    if shape == "Irregular" and margin == "Circumscribed":
        return "BI-RADS 4A"
    return "BI-RADS 2"  # Round/Oval + Circumscribed (yeni/uyumsuzsa 3)

def upgrade_with_associated_features(cat: Category, feats: Associated, spiculated: bool) -> Category:
    score = {"BI-RADS 2":2,"BI-RADS 3":3,"BI-RADS 4A":4.1,"BI-RADS 4B":4.5,"BI-RADS 4C":4.9,"BI-RADS 5":5.0}[cat]
    bump = 0
    if feats["AD"]: bump += 0.4
    if feats["retraction"]: bump += 0.4
    if feats["suspicious_calcs"]: bump += 0.4
    if feats["nodes"]: bump += 0.4
    if spiculated and (feats["retraction"] or feats["AD"] or feats["suspicious_calcs"] or feats["nodes"]):
        return "BI-RADS 5"
    if score + bump >= 5.0:
        return "BI-RADS 5"
    if score + bump >= 4.9:
        return "BI-RADS 4C"
    if score + bump >= 4.5:
        return "BI-RADS 4B"
    return cat
```

---

## 4) UI/UX Kuralları
- Dropdown’lar: `shape`, `margin`, `calc_morph`, `calc_dist` (benign morfolojiler seçildiğinde `calc_dist` gizle).
- “**Sadece MLO**” ve “**Tek projeksiyon bulgusu**” toggles → **BI-RADS 0** uyarısı.
- Yardım metinleri: “Grouped ↔ ≤2 cm alan içinde klaster”, “Regional ↔ >2 cm ama segmental/lineer değil” gibi kısa tanımlar.
- Çıktı kartında: **Kategori**, **Gerekçe (1–2 madde)**, **Yönetim önerisi**.

---

## 5) Yazım/Stil
- **PEP8**, `ruff`/`flake8` + `black` ile format.
- Docstring’lerde kısa klinik gerekçe.
- Türkçe UI sabitleri `i18n/tr.py`, İngilizce `i18n/en.py` (gerekirse).

---

## 6) Test Senaryoları (örnek liste)
- `Round + Circumscribed` → **2** (yeni bulguda → **3**)
- `Oval + Obscured` → **0**, spot sonrası `Circumscribed` → **2**
- `Irregular + Indistinct` → **4B**
- `Any + Spiculated` → **4C**, `+ retraction` → **5**
- `Coarse Heterogeneous + Grouped` → **4B**
- `Coarse Heterogeneous + Segmental` → **4C**
- `Amorphous + Grouped` → **4B**
- `Round/Punctate single cluster stable` → **3**, `new/increasing` → **4A**
- `One-view asymmetry` → **0`
- `AD present + Microlobulated mass` → **4C**, `+ retraction`/`+ nodes` → **5**

---

## 7) Copilot’a “asla yapma / özellikle yap” kuralları
**ASLA:**
- “Irregular margin” terimini önermeyin (yanlış).  
- `Coarse Heterogeneous`’ı `Popcorn/Dystrophic` ile birleştirmeyin.  
- `Obscured` için doğrudan kesin kategori atamayın; **0** önerin.

**ÖZELLİKLE:**
- `Regional` dağılım seçeneğini UI’da sunun ve kural motoruna bağlayın.
- Çekinti (retraction) için: tek başına otomatik **5** önermeyin; şüpheli morfolojiyle **yükseltin**.
- Kural/metin değişiklikleri için **unit test** yazın.

---

## 8) Copilot Chat için örnek istekler (prompt şablonları)
- “`rules/engine.py` içinde `calc_category` fonksiyonuna **Coarse Heterogeneous** kuralını ekle: Grouped/Regional=4B, Segmental/Linear=4C; testlerini `tests/test_calc.py`’a yaz.”
- “`ui/forms.py` içine **Regional** dağılım seçeneğini ekle ve `logic/validators.py` ile doğrula.”
- “`associated.py`’da `upgrade_with_associated_features` fonksiyonuna `nodes` alanını dahil edip 5’e yükseltme eşiğini güncelle.”
- “`views/result.py` açıklama metnini **şekil + sınır + eşlikçi** maddeleriyle üret.”

---

## 9) Dosya/Dizin Önerisi
```
/app
  /logic
    rules.py         # default & upgrade kuralları
    validators.py
  /ui
    forms.py
    strings.py
  /i18n
    tr.py
    en.py
  /tests
    test_rules_mass.py
    test_rules_calcs.py
    test_upgrade_associated.py
constants.py
app.py
```

---

## 10) Kaynak Notu
- Temel sözlük: **ACR BI-RADS® 5th ed. (2013)** (halen geçerli).  
- Güncel pratik nüansları: 2019–2025 döneminde AJR/Radiology özetleri ve ders notları; kural setindeki mantık bu çerçeveyi takip eder.
- Kategori eşikleri: 4A (%2–10), 4B (%10–50), 4C (%50–<95), 5 (≥%95).

> Bu dosyayı depo kökünde **copilot-instructions.md** adıyla tutun. Copilot önerilerinde bu kuralları referans alan değişiklikler beklenmelidir.
