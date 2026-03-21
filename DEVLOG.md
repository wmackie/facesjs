# DEVLOG — facesJS Fork

_Maintained automatically by Claude. Most recent entry at top._

---

## 2026-03-21 10:15 — Outerwear button fix; leather jacket; vest; mouth4 removed

**What:** Four changes:
1. Fixed systemic button placement bug across all outerwear — buttons were rendering in the gap between front panels (on top of jersey), not on the outerwear itself. Single-breasted styles (blazer, suit-jacket, overcoat) now have button column following left panel inner fold. Double-breasted styles (trench-coat, peacoat) have widened panel inner edges to create real overlap zone so both button columns land on painted panels.
2. Added leather-jacket.svg: moto-cut, angular lapels, zip closure, chest strap pocket, waist cinch stitching. Removed front buttons (correct — moto jackets zip). Added outerwearBg/leather-jacket.svg low collar band.
3. Added vest.svg: sleeveless waistcoat, deep-V notch lapels in primary color, 3-button center front on left panel fold, welt pockets, armhole bound edges.
4. Removed mouth4.svg: only remaining open-mouth style with white teeth visible — broke spy aesthetic.
**Why:** User correctly flagged that buttons not attached to outerwear silhouette render on top of the jersey. Leather jacket and vest add variety to the outerwear pool.
**Files changed:** blazer, suit-jacket, overcoat, trench-coat, peacoat, leather-jacket, vest SVGs; outerwearBg/leather-jacket; mouth/mouth4 deleted.
**Result:** Build + tests pass (72/72). All outerwear buttons now clearly on painted panel area.
**Notes:** For double-breasted, the fix also gives a more realistic silhouette — the left panel now visibly overlaps the right, which is how a real peacoat/trench-coat looks.

---

## 2026-03-21 10:40 — Final autonomous session audit; no issues found

**What:** Visual audits completed — male eyes (all 17 styles), female eyes (all 13 styles), hair "both" styles on female faces, accessories (fedora/beret/stealth-beanie), vest+jersey combinations (6 combinations), and 20-face alternating M/F grid.
**Why:** Autonomous quality sweep before waiting for user input (new female eyes).
**Files changed:** None (audit only).
**Result:** No removals or fixes needed. Vest layers correctly over all jerseys. Accessories all spy-appropriate. Male eye audit: eye11 and eye18 are slightly wide but acceptable. Female eye styles: kept per prior user decision.
**Notes:** Female character readability is now strong after head2/6/16 reassignment and female4/5 addition. Outstanding item: the single-breasted button positions are on the left panel inner fold (slightly left of center) — technically correct but differs from real-world coat refs. User approved this fix.

---

## 2026-03-21 10:25 — Female character readability: head gender reassignment

**What:** Renamed head2.svg, head6.svg, head16.svg to head2.male.svg etc. These three "both" heads have squared jaws, prominent brow ridges, and features that read as male. Female characters now use only female1-3, head13, head14 (5 clearly feminine or gender-neutral heads).
**Why:** 30-face female audit showed many characters reading as androgynous/male. Traced to masculine "both" head shapes being assigned to female characters.
**Files changed:** svgs/head/head2, head6, head16 renamed.
**Result:** Build + tests pass. Female character grid looks distinctly more feminine with better variety.
**Notes:** Female pool now has 5 heads. Could use a couple more clearly feminine neutral heads in future.

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
