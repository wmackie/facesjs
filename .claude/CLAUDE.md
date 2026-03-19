# facesJS Fork — Claude Code Directives

## Project Goal (The "Ready State")

Generate stylized, vector portrait faces for a **spy management game**. A "ready" face must:

- Look like a plausible modern-day spy / intelligence operative — male or female, any ancestry
- Have varied, realistic skin tones and natural hair colors (no hot pink, no neon)
- Wear clothing appropriate to the genre: suits, blazers, trench coats, turtlenecks — NOT sports jerseys
- Use a restrained color palette (dark neutrals, muted tones, occasional accent)
- Be clearly stylized / illustrated — photorealism is NOT the goal
- Have NO sports-specific accessories or equipment (no eye-black, headbands, etc.)

---

## Autonomous Operation Mandate

Claude operates **autonomously** on this project. The default behavior is to **decide and act**, not to ask.

### When to act without asking:
- Choosing which SVG to draw next
- Deciding on shape, style, or proportion of an asset
- Choosing color placeholders (`$[primary]`, `$[outerwearColor]`, etc.)
- Deleting or replacing assets that conflict with the spy aesthetic
- Refactoring code to support new features
- Updating TODO.md, DEVLOG.md, and RESOURCES.md
- Committing completed work to the current branch

### When to STOP and defer to the human:
- Merging or rebasing into `master`
- Opening pull requests
- Deleting the repository or any git history
- Any action that is **irreversible** and affects more than the current branch
- A genuine design fork where two aesthetically opposite directions are equally valid and the choice will lock in future work

In all other cases: **make a decision, log the reasoning in DEVLOG, and proceed.**

---

## 🔴 Absolute Rules (Never Break These)

- **NEVER run `rm -rf` on any directory, especially the repo root.**
- **NEVER force-push to `main` or `master`.**
- **NEVER delete `.git/`, `.claude/`, or any config/settings files.**
- **NEVER commit secrets, API keys, or credentials.**
- Before any destructive file operation, write a DEVLOG entry and confirm the path.

---

## 🧠 Session Start Protocol

Every session, before any work:

1. Read `TODO.md` — identify the highest-priority unblocked task.
2. Read the last 5 entries in `DEVLOG.md` — absorb recent context and any unresolved notes.
3. Reassess priorities: are there new blockers, regressions, or changed dependencies?
4. Update `TODO.md` with the current ranked task list.
5. Begin work on the top task immediately.

---

## 🔍 Self-Evaluation Protocol

After every meaningful change:

1. Run `pnpm run build` — fix any errors before proceeding.
2. Run `pnpm test` — fix failures before proceeding.
3. If visual output changed, start `pnpm run dev` and screenshot the result with Playwright.
4. Compare against the Ready State definition above: does the output look like a spy, not an athlete?
5. If anything regressed, roll back and log what happened before retrying.
6. Only mark a task done and move to the next one after passing self-evaluation.

---

## 🎨 Artistic Mandate

**The existing SVG artwork does NOT need to be preserved.** All face assets (heads, eyes, hair, clothing, etc.) can be redrawn from scratch in a new style. What must be preserved is the **underlying system**: the layer stack, the SVG token conventions (`$[skinColor]`, `$[primary]`, etc.), the `generate()` / `display()` API, and the `genders.js` metadata.

When redrawing assets, aim for: clean vector illustration, readable at small sizes, muted/serious rather than cartoonish-sporty. Think graphic novel or intelligence dossier portrait, not a Wii Mii or a sports trading card.

### Standing Design Decisions

- **Outerwear layer** sits above `jersey` in the render stack. `outerwearBg` sits below the body.
- **Color token `$[outerwearColor]`** drives outerwear fill. `$[primary]` for lining/lapels. `$[secondary]` for accent details.
- **Jersey layer** = spy-appropriate base tops only: turtlenecks, dress shirts, plain knits. No sports jerseys remain.
- **Accessories** = spy headwear only: fedoras, berets, stealth beanies. No sports headgear.
- **Glasses**: existing frames acceptable; sunglasses variant is a P3 nice-to-have.
- **Color palette**: bias toward dark/muted defaults (charcoal, navy, black, olive). Avoid bright or neon colors in defaults.
- **`none.svg`** is always valid for optional layers (outerwear, accessories, glasses, facial hair).
- When redesigning a face feature (eyes, nose, mouth, head shape), consistency within a set matters more than preserving the old shapes.

---

## 🛠 Project Setup

- **Package manager:** `pnpm`
- **Dev server:** `pnpm run dev` → `http://localhost:5173`
- **Build:** `pnpm run build`
- **Test:** `pnpm test`
- **SVG pipeline:** `node tools/process-svgs.js` (runs as part of build; processes raw SVGs into `src/`)
- **Main entry:** `src/index.ts`
- **Editor:** `public/editor/` — React app for previewing generated faces

---

## 🌐 Repository & Git Workflow

- Always work on a feature branch. Current active branch: `spy-theme-overhaul`.
- Branch naming: `feature/<short>` or `fix/<short>`
- Commit when a logical unit of work is complete and passes self-evaluation.
- Push to remote when the branch has stable, committed progress.
- Do NOT open PRs without explicit human instruction.

```
git fetch origin
git checkout -b feature/<name>
git add -p          # selective staging
git commit -m "..."
git push origin feature/<name>
```

---

## 📝 Documentation Rules

### DEVLOG.md
Append an entry after every meaningful change. Most recent entry at top.

```
## YYYY-MM-DD HH:MM — <Short Title>

**What:** What was done.
**Why:** Motivation or reasoning behind the decision.
**Files changed:** List.
**Result:** Build pass/fail, test pass/fail, visual result.
**Notes:** Surprises, blockers, follow-ups.
```

### TODO.md
- Sorted P1 → P2 → P3.
- Completed items marked `[x]` and moved to `## Done`.
- Updated at session start and end.

### RESOURCES.md
```
## YYYY-MM-DD — <Name>
- URL: https://...
- Reason: Why fetched or installed
- Version: (if applicable)
```

---

## 🧩 Integration Context

- **Fork purpose:** Custom face generation for spy management game player characters.
- **Upstream:** `zengm-games/facesjs` — sports portrait generator. This fork repurposes the same SVG layer system for the spy genre.
- **Key divergences from upstream:**
  - Added `outerwear` and `outerwearBg` layers
  - Added spy accessories (fedora, beret, stealth-beanie)
  - Replacing/removing sports jerseys and sport accessories
  - Color palette generation will be tuned for muted/spy-appropriate defaults
- **API surface:** Library exports `generate()` and `display()`. Game calls `generate()` to get a face object and `display()` to render it into a DOM element.

---

## 📦 External Dependencies

- Prefer pinned versions when adding to `package.json`.
- Log every new external resource in `RESOURCES.md`.
- Use project-local installs only — no global installs.
