# DEVLOG — facesJS Fork

_Maintained automatically by Claude. Most recent entry at top._

---

## 2026-03-21 09:35 — Sunglasses, outerwear colors, miscLine audit, jersey review

**What:** Four items:
1. Added sunglasses-aviator.svg and sunglasses-rect.svg to glasses layer — dark opaque lenses, both genders. Bumped glasses probability 10%→18%.
2. Expanded outerwear color palette from 7 to 12 colors (added navy, leather brown, forest green, burgundy, blue-grey).
3. miscLine audit: reviewed all variants visually — all appropriate for spy aesthetic. No removals.
4. Jersey sleeveless review: with outerwear=none, all jerseys render acceptably — body's shoulder curve handles the silhouette. No SVG changes needed.
**Why:** P2/P3 tasks from TODO. Sunglasses are a core spy look. Color variety improves randomization.
**Files changed:** generate.ts (glasses prob, outerwear colors), sunglasses-aviator.svg, sunglasses-rect.svg, TODO.md.
**Result:** Build + tests pass (72/72). Sunglasses visually confirmed against existing glasses styles.
**Notes:** Aviator style is particularly on-brand. Rect style reads as modern operative.

---

## 2026-03-21 09:30 — outerwearBg wiring + collar SVGs; gender-filename migration

**What:** Three changes committed this session:
1. Replaced `genders.js` manual registry with filename-based gender convention (`name.male.svg`, `name.female.svg`, `name.svg` = both). 199 files renamed via `git mv`. `process-svgs.js` now auto-discovers gender at build time.
2. Wired `outerwearBg` to outerwear selection in `generate.ts`. Drawn `outerwearBg/trench-coat.svg` and `outerwearBg/overcoat.svg` — raised collar wings visible to sides of the lower face/jaw.
3. Also committed in-progress directional eye variant feature (display.ts + eye2-variant*.svg) from last session.
4. Promoted eye12/eye13/eye15 from male-only to both.

**Why:** genders.js was a friction point when adding new SVGs. outerwearBg was scaffolded but hardcoded to "none". Collar detail adds depth to the spy coat look.
**Files changed:** 205 files (renames) + generate.ts, process-svgs.js, display.ts, outerwearBg SVGs, eye SVGs.
**Result:** Build passes, tests pass (72/72). Collar bg visually confirmed via SVG render comparison.
**Notes:** Collar effect is intentionally subtle — wings visible at jaw sides. The "no bg" vs "with bg" difference is present but not dramatic. Future refinement possible by adjusting y-coordinates upward to extend collar higher alongside the face.

---

## 2026-03-19 19:20 — Replace sports jerseys; delete sport accessory SVGs

**What:** Deleted all sports-specific SVG files and redrawn all jersey-layer SVGs as spy-appropriate tops.
**Why:** Artistic mandate updated — existing SVG artwork does not need to be preserved. Sports aesthetic conflicts with spy portrait goal.
**Files changed:**
- Deleted: `svgs/accessories/eye-black.svg`, `headband.svg`, `headband-high.svg`
- Deleted: `svgs/jersey/baseball*.svg` (x4), `hockey*.svg` (x4)
- Redrawn: `jersey.svg` (dress shirt), `jersey2.svg` (crew neck), `jersey3.svg` (v-neck), `jersey4.svg` (henley), `jersey5.svg` (mandarin collar)
**Result:** Build passes clean. All 7 jersey-layer SVGs now spy-appropriate.
**Notes:** `mockneck.svg` and `turtleneck-adobe.svg` were already suitable — left unchanged.

---

## 2026-03-19 19:00 — Add outerwear SVGs; remove sports from genders.js

**What:** Committed 4 outerwear SVGs (blazer, trench-coat, suit-jacket, windbreaker) and cleaned sports entries from genders.js.
**Why:** Outerwear layer was scaffolded but had no artwork. Sports entries needed purging.
**Files changed:** `svgs/outerwear/blazer.svg`, `trench-coat.svg`, `suit-jacket.svg`, `windbreaker.svg`, `tools/lib/genders.js`
**Result:** Build passes. All outerwear variants registered and rendering.
**Notes:** Project workflow files (TODO, DEVLOG, RESOURCES, CLAUDE.md) also committed in this batch.

---

## 2026-03-19 18:45 — Updated CLAUDE.md with autonomous operation mandate

**What:** Rewrote CLAUDE.md with artistic freedom directive, ready-state definition, autonomous operation mandate, and real project setup info.
**Why:** User confirmed that existing SVG artwork style does not need to be preserved; only the underlying system is kept. Wanted nearly autonomous operation.
**Files changed:** `.claude/CLAUDE.md`
**Result:** Directives in place.
**Notes:** Artistic target: clean vector illustration, graphic novel / spy dossier aesthetic — not sports trading card.

---
