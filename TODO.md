# TODO — facesJS Fork

_Last updated: 2026-03-19_

---

## P1 — Blocking

_(nothing currently blocking)_

## P2 — Core Work

- [ ] Wire up `outerwear` in the editor (`public/editor/stateStore.ts`) — currently outerwear layer exists but may not be exposed in editor UI
- [ ] Audit hat SVGs (`hat.svg`, `hat2.svg`, `hat3.svg`) — likely sports caps; replace with spy-appropriate variants or remove
- [ ] Audit glasses SVGs — `facemask` is sports-specific; remove it. Evaluate other frames for spy aesthetic fit.
- [ ] Audit `miscLine` SVGs (forehead lines, chin lines) — check if any are sports-specific; likely fine
- [ ] Audit body SVGs — check for sports-specific shape cues; may need redrawing for spy aesthetic
- [ ] Add `outerwearBg` variants (hood-on-shoulder silhouettes for trench coat, overcoat) — currently only `none`
- [ ] Tune `generate()` defaults: bias outerwear toward dark/muted (charcoal, navy, black) and increase outerwear frequency

## P3 — Polish

- [ ] Consider `bodyShadow` layer (planned but not implemented — face-contour shadows tied to body.id)
- [ ] Evaluate whether `fedora2.svg` should replace `fedora.svg` as the main fedora
- [ ] Add sunglasses variant to `glasses` feature
- [ ] Redraw hat SVGs in spy-appropriate style (if keeping the hat feature at all)

---

## Done

- [x] Scaffolded `outerwear` and `outerwearBg` layers in common.ts, display.ts, generate.ts, genders.js (2026-03-16)
- [x] Added spy accessories: `fedora.svg`, `fedora2.svg`, `stealth-beanie.svg`, `beret.svg` (2026-03-16)
- [x] Fixed build/prepare scripts (2026-03-16)
- [x] Created `none.svg` and `overcoat.svg` in svgs/outerwear/ (2026-03-16)
- [x] Drew `blazer.svg`, `trench-coat.svg`, `suit-jacket.svg`, `windbreaker.svg` outerwear SVGs (2026-03-19)
- [x] Removed sport-specific accessories: `eye-black.svg`, `headband.svg`, `headband-high.svg` (files + genders.js) (2026-03-19)
- [x] Removed sport jerseys: baseball (x4), hockey (x4) SVGs + genders.js entries (2026-03-19)
- [x] Redrawn jersey layer: dress shirt, crew neck, v-neck, henley, mandarin collar (2026-03-19)
- [x] Updated CLAUDE.md: autonomous operation mandate, artistic freedom directive, ready-state definition (2026-03-19)
