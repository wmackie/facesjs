# TODO — facesJS Fork

_Last updated: 2026-03-19_

---

## P1 — Blocking

_(nothing currently blocking)_

## P2 — Core Work

- [ ] Visual QA: start dev server, screenshot sample faces, verify spy aesthetic is landing
- [ ] Audit `miscLine` SVGs — check forehead/chin lines work with redrawn jersey style
- [ ] Add `outerwearBg` variants — hood/collar silhouettes for trench coat and overcoat (currently only `none`)
- [ ] Review `turtleneck-adobe.svg` — SVG has no color token fill; likely renders in black only; add `$[primary]`

## P3 — Polish

- [ ] Consider `bodyShadow` layer (face-contour shadows tied to body.id — not yet implemented)
- [ ] Add sunglasses variant to `glasses`
- [ ] Tune outerwear probability and color distribution based on visual QA results

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
