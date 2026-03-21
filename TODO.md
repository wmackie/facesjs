# TODO — facesJS Fork

_Last updated: 2026-03-21_

---

## P1 — Blocking

_(nothing currently blocking)_

## P2 — Core Work

- [ ] Female eye audit / new eye drawings — existing styles left intact; user is drawing new female eye SVGs to add. Drop `name.female.svg` in `svgs/eye/` and rebuild. No code changes needed.
- [ ] Add 2-3 more female-appropriate head shapes — currently only 5 female-accessible heads (female1-3, head13, head14). More variety needed for female character distinctiveness.

## P3 — Polish

- [ ] Consider `bodyShadow` layer (face-contour shadows tied to body.id — not yet implemented)
- [ ] Outerwear collar bg is subtle — consider extending collar wings further upward to y≈440 for more visible raised-collar effect
- [ ] Review sunglasses probability — currently 18% total for all glasses (2/9 variants are sunglasses). Could weight them separately if needed.
- [ ] Audit male eye styles for any remaining sports/cartoonish styles

## Deferred — After face system is solid

- [ ] **Age effects:** nasolabial folds, crow's feet, under-eye bags, forehead wrinkles — scaled by an `age` parameter on the face config. Reference implementation in `demos/portrait_demo.html`. Only worth doing once the base face SVGs (eyes, heads, noses) have been overhauled — wrinkles on a cartoon face that doesn't yet read as a person won't help.

---

## Done

- [x] Scaffolded `outerwear` and `outerwearBg` layers (2026-03-16)
- [x] Added spy accessories: fedora, fedora2, stealth-beanie, beret (2026-03-16)
- [x] Fixed build/prepare scripts (2026-03-16)
- [x] Created `none.svg` and `overcoat.svg` in svgs/outerwear/ (2026-03-16)
- [x] Drew blazer, trench-coat, suit-jacket, windbreaker outerwear SVGs (2026-03-19)
- [x] Removed sport accessories: eye-black, headband, headband-high (files + genders.js) (2026-03-19)
- [x] Removed sport jerseys: baseball x4, hockey x4 (files + genders.js) (2026-03-19)
- [x] Redrawn jersey layer: dress shirt, crew neck, v-neck, henley, mandarin collar (2026-03-19)
- [x] Updated CLAUDE.md: autonomous operation mandate, artistic freedom, ready-state definition (2026-03-19)
- [x] Removed sports hats (hat, hat2, hat3) and facemask glasses (2026-03-19)
- [x] Outerwear already wired in editor stateStore.ts — confirmed (2026-03-19)
- [x] Tuned generate() defaults: muted team colors, randomized gender (2026-03-19)
- [x] Fixed jersey necklines: raised y=592 → y=530 (tank-top-strap issue resolved) (2026-03-19)
- [x] Mouth audit: removed open-grin styles (mouth2, mouth3, mouth7, mouth8, smile, smile3) (2026-03-19)
- [x] Overcoat.svg redrawn from scratch (was a baseball jersey placeholder) (2026-03-19)
- [x] outerwearBg/none.svg fixed (was 0 bytes; now valid empty SVG) (2026-03-19)
- [x] turtleneck-adobe.svg: fixed color tokens (was all-black; now $[primary]/$[secondary]) (2026-03-19)
- [x] Eye audit: removed bug-eyed styles (eye1, eye3, female3, female11, female12) (2026-03-19)
- [x] Outerwear probability raised 50% → 80% (2026-03-19)
- [x] Hat hair clipping: replaced hair-swap system with SVG clipPath approach (2026-03-19)
- [x] Fedora/fedora2 consolidated: fedora2 content merged into fedora.svg, fedora2 deleted (2026-03-19)
- [x] Added sleeve geometry to 5 jersey styles, widened v-neck (2026-03-19)
- [x] Fixed floating collar band on jersey2, mockneck, jersey5 (2026-03-19)
- [x] Replaced genders.js with filename-based gender convention (.male/.female/.svg) (2026-03-21)
- [x] Added directional eye variant support (-left/-right SVG pairs) in display.ts (2026-03-21)
- [x] Wire outerwearBg to outerwear selection in generate.ts (2026-03-21)
- [x] Add outerwearBg variants: trench-coat.svg, overcoat.svg collar wings (2026-03-21)
- [x] Audit miscLine SVGs — all appropriate, no removals (2026-03-21)
- [x] Add sunglasses variants: sunglasses-aviator, sunglasses-rect (2026-03-21)
- [x] Expand outerwear color palette (12 colors: navy, leather brown, burgundy, forest green, blue-grey added) (2026-03-21)
- [x] Jersey sleeveless issue reviewed — body shoulder silhouette handles it; no SVG changes needed (2026-03-21)
- [x] Promoted eye12/eye13/eye15 from male-only to both (2026-03-21)
- [x] Add hoodie and peacoat outerwear + outerwearBg (2026-03-21)
- [x] Add leather jacket outerwear + outerwearBg (2026-03-21)
- [x] Add vest outerwear (2026-03-21)
- [x] Fix outerwear buttons: move to painted panel area; widen double-breasted overlap (2026-03-21)
- [x] Remove mouth4 (open-mouth with teeth — breaks spy aesthetic) (2026-03-21)
- [x] Reassign head2/head6/head16 to male-only to improve female character readability (2026-03-21)
