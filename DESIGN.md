# facesjs Fork Design — Spy Management Game

## Overview

This is a fork of facesjs adapted for a spy management game. The original library was built around sports teams (jerseys, hats, sport-specific accessories). This document describes the changes needed to make it suitable for generating spy agent portraits.

---

## 1. SVG Asset Changes

### Features to Keep (generic enough to reuse)
- `body`, `head`, `ear` — generic, keep as-is
- `eye`, `eyebrow`, `eyeLine` — keep as-is
- `hair`, `hairBg` — keep as-is
- `mouth`, `nose`, `smileLine`, `miscLine` — keep as-is
- `facialHair` — keep as-is
- `glasses` — keep; sunglasses could be added here

### Features to Replace/Repurpose

| Feature | Current purpose | Spy repurpose |
|---------|----------------|---------------|
| `jersey` | Sports uniforms | Base shirts/tops — keep name internally, replace SVG assets with spy-appropriate shirts |
| `accessories` | Sports gear (hats, headbands, eye-black) | Spy gear — audit and replace sport-specific items |

**Decision: keep `jersey` as the internal name** (less churn, no type system changes needed).

---

## 2. New Feature: `outerwear`

### Purpose
A clothing layer rendered on top of the shirt/jersey. Represents outer garments a spy might wear.

### Assets (initial set)
| SVG file | Description | Gender |
|----------|-------------|--------|
| `none.svg` | No outerwear | both |
| `blazer.svg` | Smart blazer | both |
| `trench-coat.svg` | Classic spy trench coat | both |
| `suit-jacket.svg` | Suit jacket | both |
| `windbreaker.svg` | Casual windbreaker | both |
| `overcoat.svg` | Heavy overcoat | both |

All outerwear entries tagged as `"both"` in `genders.js`.

### Rendering Layer Position
Slots in **after `jersey`**, before `ear`:

```
hairBg → body → jersey → [outerwear] → ear → head → eyeLine → smileLine →
miscLine → facialHair → eye → eyebrow → mouth → nose →
hair → glasses → accessories
```

### SVG Design Notes
- Canvas: 400×600 (same as all other features)
- Can use `$[primary]` / `$[secondary]` / `$[accent]` template variables for faction/team colors
- Should cover the body/torso area, layering naturally over the jersey

### Data Shape
```ts
outerwear: {
  id: string;  // "blazer" | "trench-coat" | "suit-jacket" | "windbreaker" | "overcoat" | "none"
}
```

### Generation
- Probability: `Math.random() < 0.5`
- Scales with `body.size` (same treatment as `jersey` in `display.ts`)

---

## 3. Code Changes Required

### `src/common.ts`
- Add `"outerwear"` to the `features` array
- Add `outerwear: { id: string }` to `FaceConfig`

### `src/display.ts`
- Insert after `jersey` in `featureInfos`:
  ```ts
  {
    name: "outerwear",
    positions: [null],
  }
  ```
- In `drawFeature`, add `"outerwear"` to the `body`/`jersey` branch that applies `bodySize` scaling:
  ```ts
  if (info.name === "body" || info.name === "jersey" || info.name === "outerwear") {
    scaleCentered(svg.lastChild, bodySize, 1);
  }
  ```

### `src/generate.ts`
- Add to generated face object:
  ```ts
  outerwear: {
    id: Math.random() < 0.5 ? getID("outerwear", gender) : "none",
  },
  ```

### `tools/lib/genders.js`
- Add `outerwear` section:
  ```js
  outerwear: {
    none: "both",
    blazer: "both",
    "trench-coat": "both",
    "suit-jacket": "both",
    windbreaker: "both",
    overcoat: "both",
  },
  ```

### `svgs/outerwear/`
- Create directory with: `none.svg`, `blazer.svg`, `trench-coat.svg`, `suit-jacket.svg`, `windbreaker.svg`, `overcoat.svg`
- `none.svg` should be an empty SVG (just a root `<svg>` element with no content)
- `process-svgs.js` auto-discovers this directory — no changes needed there

### `public/editor/stateStore.ts`
- The editor feature list is manually defined in `gallerySectionInfos`. Add an entry after the `jersey.id` entry:
  ```ts
  {
    key: "outerwear.id",
    text: "Outerwear Style",
    selectionType: "svgs",
  },
  ```

---

## 4. Implementation Order

1. Create `svgs/outerwear/` with `none.svg` placeholder
2. Update `tools/lib/genders.js` with outerwear entries
3. Update `src/common.ts`, `src/display.ts`, `src/generate.ts`
4. Update `public/editor/stateStore.ts`
5. Run `pnpm run dev` to process SVGs and verify the feature renders
6. Add real SVG assets one by one, testing each in the editor
