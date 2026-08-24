# Project: @plexapro/react-body-highlighter

## Architecture
A production-grade, zero-dependency open-source monorepo delivering:
1. **`packages/react-body-highlighter`**: Standalone TypeScript React component library (`@plexapro/react-body-highlighter`) featuring interactive vector SVG human body visualization (anterior & posterior views, 42 anatomical muscle slugs, polygon coordinate mapping, customizable colors/intensities, click/hover handlers, tooltips) plus extremity components (`HandSvg`, `FootSvg` with bilateral reflection). Builds clean ESM, CJS, and `.d.ts` bundles with zero proprietary business-logic leakage.
2. **`apps/demo`**: Interactive showcase playground & documentation web application built with Vite, React 19, TailwindCSS, and Lucide React. Features front/back toggles, extremity inspection modals, live color/intensity theming, multi-selection modes, 3 real-world presets (Workplace Safety/EHS Incident Report for Plexa, Gym Workout Soreness, Telehealth Pain Map), live code generator, SEO optimization, and prominent Plexa branding (`https://www.plexapro.com`).
3. **Open Source Presentation & Governance**: Comprehensive root `README.md` with interactive diagrams and badges, MIT License, GitHub Actions CI workflows (`ci.yml`), issue/PR templates, `CONTRIBUTING.md`, `CHANGELOG.md`, and `SECURITY.md`.
4. **E2E Testing Suite**: Dual-track test infrastructure executing comprehensive opaque-box requirement tests across Tiers 1-4, culminating in adversarial coverage hardening (Tier 5).

```
react_body_highlighter/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── ci.yml
├── packages/
│   └── react-body-highlighter/
│       ├── src/
│       │   ├── assets/
│       │   │   ├── anterior.ts
│       │   │   ├── posterior.ts
│       │   │   └── index.ts
│       │   ├── components/
│       │   │   ├── Model.tsx
│       │   │   ├── BodyVisualizer.tsx
│       │   │   ├── HandSvg.tsx
│       │   │   ├── FootSvg.tsx
│       │   │   └── index.ts
│       │   ├── types/
│       │   │   └── index.ts
│       │   ├── utils/
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── tests/
│       │   ├── Model.test.tsx
│       │   ├── Extremities.test.tsx
│       │   ├── BodyVisualizer.test.tsx
│       │   └── utils.test.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts (or vite.config.ts)
│       └── vitest.config.ts
├── apps/
│   └── demo/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Header.tsx
│       │   │   ├── BodyPlayground.tsx
│       │   │   ├── ExtremitiesCard.tsx
│       │   │   ├── ControlPanel.tsx
│       │   │   ├── PresetSelector.tsx
│       │   │   ├── CodeGenerator.tsx
│       │   │   ├── PlexaBanner.tsx
│       │   │   └── Footer.tsx
│       │   ├── data/
│       │   │   └── presets.ts
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── tests/
│   └── e2e/
│       ├── tier1_feature.test.ts
│       ├── tier2_boundary.test.ts
│       ├── tier3_combinations.test.ts
│       ├── tier4_scenarios.test.ts
│       └── runner.ts
├── package.json
├── tsconfig.base.json
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── SECURITY.md
```

---

## Feature Inventory
Every feature identified during the Survey phase is mapped to a milestone below:

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Anatomy Coordinate System | 40 Anterior & 36 Posterior polygon coordinates mapped to 0 0 100 200 viewBox | M1 | survey_explorer_1 |
| 2 | Anatomical Muscle Types | Exhaustive 42 muscle slugs enum and union type definitions | M1 | survey_explorer_1 |
| 3 | Core SVG Model Component | Low-level SVG component rendering anterior/posterior body with dynamic styles | M1 | survey_explorer_1 |
| 4 | Hand SVG Component | Standalone Hand SVG component with left/right bilateral scaling & styling | M1 | survey_explorer_1 |
| 5 | Foot SVG Component | Standalone Foot SVG component with left/right bilateral scaling & styling | M1 | survey_explorer_1 |
| 6 | Composite BodyVisualizer | High-level interactive layout with front/back bodies, side labels, and chips | M1 | survey_explorer_1 |
| 7 | Intensity Color Calculation | Utility calculating color scale/intensity based on exercise/injury frequency | M1 | survey_explorer_1 |
| 8 | Muscle Data Normalizer | Normalizes muscle lists into structured record map (`fillMuscleData`) | M1 | survey_explorer_1 |
| 9 | Deduplication Utility | Deduplicates body part arrays safely (`dedupeBodyParts`) | M1 | survey_explorer_1 |
| 10 | Interaction Handlers | `onClick`, `onHover`, `onMouseEnter`, `onMouseLeave` event handlers on body parts | M1 | survey_explorer_1 |
| 11 | Zero Proprietary Leakage | Removal of all `@/hooks`, `@/utils`, and Jotai dependencies from package | M1 | survey_explorer_1 |
| 12 | Dual ESM & CJS Bundling | `dist/index.js` (ESM) and `dist/index.cjs` (CJS) output via tsup / Vite | M1 | survey_spec_miner_2 |
| 13 | TypeScript Declarations | `dist/index.d.ts` bundled declaration file with complete type exports | M1 | survey_spec_miner_2 |
| 14 | React 18 & 19 Support | Broad peerDependencies range `^18.0.0 || ^19.0.0` with `"use client"` banner | M1 | survey_spec_miner_2 |
| 15 | Package Manifest Configuration | Modern `exports` map, `sideEffects: false`, `files` whitelist in `package.json` | M1 | survey_spec_miner_2 |
| 16 | Package Unit Test Suite | Vitest + React Testing Library tests covering components and utilities | M1 | survey_spec_miner_2 |
| 17 | Showcase App Foundation | Vite + React 19 + TailwindCSS web app in `apps/demo` | M2 | survey_explorer_3 |
| 18 | Interactive Body Canvas | Front/Back body view toggle, live selection highlight, tooltip inspection | M2 | survey_explorer_3 |
| 19 | Extremities Selector Modal | Interactive Left/Right Hand & Foot viewer cards with color states | M2 | survey_explorer_3 |
| 20 | Color Palette & Theme Controls | Customizable body color, highlight colors, border color, and background | M2 | survey_explorer_3 |
| 21 | Multi-Select & Single-Select Mode | Toggle between multi-part selection and single-part selection | M2 | survey_explorer_3 |
| 22 | Preset Scenario: Safety Incident | EHS / Workplace Injury incident report preset branded for Plexa | M2 | survey_explorer_3 |
| 23 | Preset Scenario: Gym Workout | Muscle soreness / fatigue tracking workout preset | M2 | survey_explorer_3 |
| 24 | Preset Scenario: Telehealth Pain Map | Medical / Physical therapy pain severity mapping preset | M2 | survey_explorer_3 |
| 25 | Live Code Snippet Generator | Real-time TSX/JSX snippet generator with 1-click copy to clipboard | M2 | survey_explorer_3 |
| 26 | Plexa Branding & Backlinks | "Maintained by Plexa" banner, Plexa logo/badges, backlinks to `www.plexapro.com` | M2 | survey_explorer_3 |
| 27 | SEO & OpenGraph Optimization | Meta tags, OpenGraph cards, Twitter cards, and JSON-LD structured data | M2 | survey_explorer_3 |
| 28 | Comprehensive README.md | Rich README with ASCII diagrams, badges, API tables, use cases, Plexa callout | M3 | survey_explorer_3 |
| 29 | GitHub Actions CI Workflow | `.github/workflows/ci.yml` running lint, build, and test across Node 18/20/22 | M3 | survey_explorer_3 |
| 30 | GitHub Issue & PR Templates | Bug report, feature request templates, and pull request template | M3 | survey_explorer_3 |
| 31 | Community Governance Files | `LICENSE` (MIT), `CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md` | M3 | survey_explorer_3 |
| 32 | Opaque-Box E2E Test Suite | E2E test harness covering Tiers 1-4 (Features, Boundaries, Combinations, Scenarios) | E2E Track | orchestrator |
| 33 | Adversarial Coverage Hardening | Tier 5 white-box stress testing, gap analysis, and integrity verification | M4 | orchestrator |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Test infra (`TEST_INFRA.md`), runner, test cases Tiers 1-4, publish `TEST_READY.md` | none | DONE |
| M1 | Standalone React Library Package | Core SVG components, extremities, types, utilities, ESM/CJS/.d.ts build, unit tests | none | DONE |
| M2 | Interactive Demo Web App | Vite+React+Tailwind showcase app, interactive canvas, extremities, presets, code gen, SEO, Plexa branding | M1 | DONE |
| M3 | Open Source Polish & GitHub Presentation | README.md, CI workflows, Issue/PR templates, MIT License, CONTRIBUTING, SECURITY | M1 | DONE |
| M4 | Final E2E Pass & Adversarial Hardening | Pass 100% E2E test suite (Tiers 1-4), Tier 5 adversarial testing, forensic audit | E2E, M1, M2, M3 | DONE |

---

## Interface Contracts

### `packages/react-body-highlighter` Public API
```typescript
export type Muscle =
  | 'trapezius' | 'upper-back' | 'lower-back' | 'chest' | 'biceps' | 'triceps'
  | 'forearm' | 'back-deltoids' | 'front-deltoids' | 'abs' | 'obliques'
  | 'adductor' | 'hamstring' | 'quadriceps' | 'calves' | 'gluteal' | 'head'
  | 'neck' | 'knees' | 'left-soleus' | 'right-soleus' /* ... all 42 slugs */

export type ModelType = 'anterior' | 'posterior'

export interface IMuscleData {
  name?: string
  slug: Muscle
  frequency?: number
  color?: string
  side?: 'left' | 'right' | 'front' | 'back'
}

export interface IExerciseData {
  name: string
  muscles: Muscle[]
  frequency?: number
}

export interface IModelProps {
  data?: IMuscleData[] | IExerciseData[]
  type?: ModelType
  bodyColor?: string
  highlightedColors?: string[]
  borderColor?: string
  borderWidth?: number | string
  style?: React.CSSProperties
  className?: string
  onClick?: (muscle: Muscle, data?: IMuscleData) => void
  onHover?: (muscle: Muscle, data?: IMuscleData) => void
  renderTooltip?: (muscle: Muscle, data?: IMuscleData) => React.ReactNode
}

export interface HandSvgProps {
  position?: 'left' | 'right'
  color?: string
  borderColor?: string
  width?: number | string
  height?: number | string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export interface FootSvgProps {
  position?: 'left' | 'right'
  color?: string
  borderColor?: string
  width?: number | string
  height?: number | string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export interface BodyVisualizerProps {
  selectedParts?: Array<{ muscle: Muscle; label?: string; color?: string }>
  onPartClick?: (muscle: Muscle) => void
  showExtremities?: boolean
  bodyColor?: string
  highlightColor?: string
  className?: string
}
```

---

## Code Layout
- `packages/react-body-highlighter/`: Exclusively owned by Milestone 1 Workers.
- `apps/demo/`: Exclusively owned by Milestone 2 Workers.
- `.github/`, root `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CHANGELOG.md`, `SECURITY.md`: Exclusively owned by Milestone 3 Workers.
- `tests/e2e/`: Exclusively owned by E2E Testing Track Workers.
