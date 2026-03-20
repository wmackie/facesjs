# TODO — facesJS Fork

_Last updated: 2026-03-19_

---

## P1 — Blocking

_(nothing currently blocking)_

## P2 — Core Work

- [ ] Female eye audit: some remaining female eye styles still read as "anime/kawaii" (eyelash-heavy, sparkle style). Review female5, female6, female7, female16 against spy aesthetic.
- [ ] Add `outerwearBg` variants — hood/collar silhouettes for trench coat and overcoat that appear BEHIND the face (the layer currently always renders `none`)
- [ ] Wire outerwearBg to outerwear selection in generate.ts (currently hardcoded to "none" regardless of outerwear id)
- [ ] Audit `miscLine` SVGs — check forehead/chin lines work with current face style
- [ ] Add sunglasses variant to `glasses`

## P3 — Polish

- [ ] Consider `bodyShadow` layer (face-contour shadows tied to body.id — not yet implemented)
- [ ] Tune outerwear color palette further — current palette is good but could add more variety (leather brown, navy, olive)
- [ ] Jersey layer still shows "sleeveless" when outerwear is `none` — jersey SVGs have no sleeve geometry. Options: add sleeve paths to jerseys, or accept and keep outerwear probability at 80%.

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
