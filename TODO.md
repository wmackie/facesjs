# TODO — facesJS Fork

_Last updated: 2026-03-19_

---

## P1 — Blocking

_(nothing currently blocking)_

## P2 — Core Work

- [ ] Draw `blazer.svg` outerwear SVG (400×600, use `$[primary]`/`$[secondary]`)
- [ ] Draw `trench-coat.svg` outerwear SVG
- [ ] Draw `suit-jacket.svg` outerwear SVG
- [ ] Draw `windbreaker.svg` outerwear SVG
- [ ] Remove sport-specific accessories: `eye-black.svg`, `headband.svg`, `headband-high.svg` (and clean up genders.js entries)
- [ ] Audit `jersey` SVGs — replace sports jerseys with spy-appropriate shirts/tops
- [ ] Wire up `outerwear` in the editor (`public/editor/stateStore.ts`) if not already done

## P3 — Polish

- [ ] Consider `bodyShadow` layer (planned but not implemented — face-contour shadows tied to body.id)
- [ ] Evaluate whether `fedora2.svg` should replace `fedora.svg` as the main fedora
- [ ] Add sunglasses variant to `glasses` feature

---

## Done

- [x] Scaffolded `outerwear` and `outerwearBg` layers in common.ts, display.ts, generate.ts, genders.js (2026-03-16)
- [x] Added spy accessories: `fedora.svg`, `fedora2.svg`, `stealth-beanie.svg`, `beret.svg` (2026-03-16)
- [x] Fixed build/prepare scripts (2026-03-16)
- [x] Created `none.svg` and `overcoat.svg` in svgs/outerwear/ (2026-03-16)
