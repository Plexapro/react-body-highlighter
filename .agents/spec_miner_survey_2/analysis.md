# Packaging, Build System & Distribution Specification Report
**Package**: `@plexapro/react-body-highlighter`  
**Repository**: `https://github.com/Plexapro/react-body-highlighter`  
**Author / Sponsor**: Plexa (https://www.plexapro.com)  
**License**: MIT  
**Date**: 2026-08-24  
**Author**: survey_spec_miner_2 (Packaging & Build Specification Miner)

---

## 1. Executive Summary & Architecture Overview

This specification establishes the authoritative monorepo architecture, package distribution structure, build toolchain, TypeScript type compilation pipeline, testing infrastructure, and isolation boundaries for `@plexapro/react-body-highlighter`.

### Core Goals & Architectural Invariants
1. **Universal Module Distribution (Dual ESM/CJS)**: Deliver first-class ECMAScript Modules (`dist/index.js` / `.mjs`) and CommonJS (`dist/index.cjs`) bundles, compatible with modern bundlers (Vite, Webpack 5, Rollup, Turbopack, esbuild) and Node.js environments.
2. **First-Class TypeScript Support**: Produce bundled `.d.ts` declaration files with full JSDoc annotations, strict typing, and zero type leakage.
3. **React 18 & 19 Peer Dependency Range**: Seamless support for both React 18 (`^18.0.0`) and React 19 (`^19.0.0`) including React Server Components (RSC) `"use client"` boundary compatibility.
4. **Zero Proprietary Dependency Leakage**: Pure standalone MIT-licensed library with 0 runtime dependencies. Decouple from all internal Plexa Frontend models (`@/hooks/site-management/injuries/model`), stores (`jotai`), styling utilities (`clsxm`), and theme hooks (`useTheme`).
5. **Tree-Shaking & Lean Footprint**: `sideEffects: false` with granular exports ensuring consumers only pay for what they import (< 15 KB gzipped).
6. **Workspace Monorepo Layout**: Clean root workspace managing `packages/react-body-highlighter` (the publishable npm package) and `apps/demo` (the interactive showcase & documentation playground web app).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Packaging | Modern `exports` Map | Universal conditional exports map supporting `import`, `require`, and `types` | Consumer `import` or `require` | Resolved ESM/CJS file + `.d.ts` | Falls back to `main`/`module` in legacy bundlers | Node.js / TypeScript Package Spec |
| 2 | Packaging | Dual ESM / CJS Output | Generation of tree-shakeable ESM (`dist/index.js`) and CJS (`dist/index.cjs`) | Source TypeScript files (`src/`) | Clean bundled JavaScript files in `dist/` | Build errors on syntax or bundling failure | `tsup` / Rollup / esbuild Toolchain |
| 3 | Packaging | Bundled TypeScript Declarations | Consolidated `.d.ts` type declarations bundle mapping all public APIs | TypeScript source files | Single clean `dist/index.d.ts` | TS typecheck failure halts build | `tsup --dts` / `vite-plugin-dts` |
| 4 | Packaging | RSC `"use client"` Preservation | React Server Components boundary banner preserving client execution | Source React components with SVG hooks | Bundle prefixed with `"use client";` | Warns if used in RSC without client directive | React 18/19 Next.js / Remix Spec |
| 5 | Packaging | `sideEffects: false` Optimization | Manifest marker allowing bundlers to drop unreferenced modules | `package.json` config | Zero dead-code in consumer bundles | None (pure tree-shaking metadata) | Webpack / Rollup / Vite Spec |
| 6 | Packaging | Selective Files Packaging | Whitelist of published npm artifacts (`dist`, `README.md`, `LICENSE`) | `files` field in `package.json` | Lean npm tarball without tests/configs | Omits non-whitelisted dev files | npm packaging spec |
| 7 | Dependencies | Zero Runtime Dependencies | Library operates with 0 runtime dependencies (`dependencies: {}`) | Peer React & React-DOM | Pure React + SVG execution | No dependency version conflicts | Isolation & Security Matrix |
| 8 | Dependencies | React 18 & 19 Support | Broad peer dependency range `^18.0.0 \|\| ^19.0.0` or `>=18.0.0` | React runtime version | Compatible VDOM execution | Warns on incompatible React (<18.0.0) | React ecosystem compatibility |
| 9 | Components | Core Body `Model` Component | Low-level SVG interactive anterior/posterior human body visualizer | `IModelProps` (data, type, bodyColor, etc.) | Interactive SVG DOM element | Graceful fallback to default body color | Source: `react-body-highlighter/component/Model.tsx` |
| 10 | Components | Composed `BodyVisualizer` | High-level interactive layout with Front/Back body, side labels, and chips | `BodyVisualizerProps` | Full visualizer UI with body & chips | Handles empty/undefined body part arrays | Source: `BodyVisualiser.tsx` |
| 11 | Components | Standalone `HandSvg` | Isolated SVG component for left/right hands with custom colors & borders | `HandSvgProps` (position, color, sizing, etc.) | SVG element scaled/flipped | Renders fallback color if unspecified | Source: `ui/HandSvg.tsx` |
| 12 | Components | Standalone `FootSvg` | Isolated SVG component for left/right feet with custom colors & borders | `FootSvgProps` (position, color, sizing, etc.) | SVG element scaled/flipped | Renders fallback color if unspecified | Source: `ui/FootSvg.tsx` |
| 13 | Data / Types | Muscle & Model Type Enums | Exhaustive type-safe constant definitions for 68+ anatomical body parts | `MuscleType`, `ModelType` | `Muscle` union type, `ModelType` union | TypeScript compile-time validation | Source: `metadata.ts` |
| 14 | Data / Types | Generic Body Data Interfaces | Generic interfaces (`IBodyPart`, `IExerciseData`, `IMuscleStats`) | Array of user activity/injury records | Structured activity mapping | Safe default mapping on empty data | Source: `metadata.ts` + `utils/index.ts` |
| 15 | Utilities | Activity / Intensity Resolver | Color intensity calculator based on muscle exercise frequency | Activity map, color palette, muscle ID | Hex/RGB color string or undefined | Falls back to undefined / bodyColor | Source: `utils/index.ts:fillIntensityColor` |
| 16 | Utilities | Muscle Data Normalizer | Normalizes muscle lists into structured record map | `IExerciseData[]` or `IBodyPart[]` | `Record<Muscle, IMuscleData>` | Ignores invalid muscle names safely | Source: `utils/index.ts:fillMuscleData` |
| 17 | Utilities | Deduplication Utility | Removes duplicate muscle/type entries from body part arrays | Array of body parts | Deduplicated array | Safe identity check on single elements | Source: `BodyVisualiser.tsx:dedupeBodyParts` |
| 18 | Workspace | Monorepo Structure | Root workspace linking library package and demo application | `npm workspaces` / `pnpm` / `yarn` | Simultaneous dev & live demo testing | Resolves local workspace packages | Monorepo architecture standards |
| 19 | Testing | Vitest + RTL Test Suite | Unit and integration testing suite for components and utilities | Test cases with simulated user clicks/props | Test pass/fail reports & coverage | Fails build if assertions fail | Vitest + React Testing Library |
| 20 | Testing | High Test Coverage (>90%) | Code coverage instrumentation checking statements, branches, functions | Vitest coverage provider (v8) | LCOV & text coverage tables | Alerts on untested branches | Vitest Coverage Configuration |
| 21 | Build | Pre-Publish Verification | Mandatory checks running typecheck, lint, test, and build before publish | `prepublishOnly` / `prepack` scripts | Validated build artifacts in `dist/` | Halts publish on any error | npm lifecycle scripts |
| 22 | CI/CD | GitHub Actions Workflow | Automated CI pipeline for linting, testing, and packaging on PR / Push | Push / Pull Request event | Matrix build status badge | Fails PR checks on regression | `.github/workflows/ci.yml` |

---

## 3. Edge Cases & Boundary Conditions

| # | Feature | Input / Condition | Observed Behavior & Safe Mitigation |
|---|---------|-------------------|-------------------------------------|
| 1 | `fillMuscleData` | Empty array `[]` passed as `data` prop | Returns default activity map with 0 frequencies; all muscles render default `bodyColor`. |
| 2 | `fillMuscleData` | Muscle with undefined `frequency` | Defaults frequency increment to `1` per exercise entry without throwing `NaN`. |
| 3 | `fillIntensityColor` | Frequency exceeds `highlightedColors` array length | Clamps index to `highlightedColors.length - 1` (highest intensity color applied). |
| 4 | `Model` Component | Unrecognized muscle name in `data` | Ignored gracefully without breaking SVG rendering; polygon remains unhighlighted. |
| 5 | `HandSvg` / `FootSvg` | `position='right'` | Inverts horizontal scale `scale(-1, 1)` around SVG center without distorting stroke or path. |
| 6 | `HandSvg` / `FootSvg` | Missing `borderColor` or `borderWidth` | `stroke` is omitted or undefined; `strokeWidth` defaults gracefully to 1px when borderColor is provided. |
| 7 | `BodyVisualizer` | `frontBodyPart` containing duplicate muscle keys | `dedupeBodyParts` filters redundant entries, keeping first occurrence and preventing duplicate chip rendering. |
| 8 | `BodyVisualizer` | `isDisabled={true}` | Injects `pointer-events: none` into SVG styles and sets cursor to default, disabling click handlers. |
| 9 | Dual Package Hazard | Consumer uses both `import` and `require` in same app | Identical state-free pure components rendered; no singleton state corruption occurs. |
| 10 | TypeScript Resolution | Node16 / NodeNext / Bundler moduleResolution | `package.json` exports map provides explicit `"types"` condition first, ensuring zero type resolution errors. |
| 11 | Dark Mode / Theming | Consumer app switches between light and dark modes | Standalone components accept explicit `bodyColor`, `highlightedColors`, `borderColor`, `className`, or `style` props with zero hardcoded theme hooks. |
| 12 | React 19 Ref Handling | React 19 no longer requires `forwardRef` for ref prop passing | Component functions accept `ref` seamlessly across React 18 & 19. |

---

## 4. Monorepo & Workspace Layout Specification

```
react_body_highlighter/
├── .agents/                               # Multi-agent metadata and coordination
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                         # Automated CI pipeline (lint, typecheck, test, build)
│   │   ├── release.yml                    # Automated npm release pipeline on version tag
│   │   └── deploy-demo.yml                # Automated GitHub Pages / Vercel demo deploy
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── apps/
│   └── demo/                              # Interactive Showcase & Documentation Playground Web App
│       ├── public/
│       │   ├── favicon.svg
│       │   ├── og-image.png
│       │   └── robots.txt
│       ├── src/
│       │   ├── assets/                    # Plexa brand assets & icons
│       │   ├── components/                # Demo UI controls, presets, snippet generator, headers
│       │   │   ├── Header.tsx             # Branded Plexa Navbar
│       │   │   ├── Footer.tsx             # Branded Plexa Footer & Links
│       │   │   ├── Playground.tsx         # Main interactive visualizer canvas
│       │   │   ├── Controls.tsx           # View switcher, color picker, mode toggles
│       │   │   ├── PresetSelector.tsx     # Incident / Workout / Physio presets
│       │   │   ├── CodeGenerator.tsx      # Copyable JSX snippet generator
│       │   │   └── ExtremitiesViewer.tsx  # Interactive Hands and Feet viewer
│       │   ├── data/
│       │   │   └── presets.ts             # Demo preset scenarios
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       ├── postcss.config.js
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts
├── packages/
│   └── react-body-highlighter/            # Publishable NPM Library (@plexapro/react-body-highlighter)
│       ├── src/
│       │   ├── assets/                    # Anatomical SVG polygon coordinate datasets
│       │   │   ├── anterior.ts            # Front body polygon coordinates (68+ muscles)
│       │   │   ├── posterior.ts           # Back body polygon coordinates
│       │   │   └── index.ts
│       │   ├── components/                # React Components
│       │   │   ├── Model.tsx              # Core anterior/posterior SVG Body model
│       │   │   ├── BodyVisualizer.tsx     # High-level full body + extremities + chips component
│       │   │   ├── HandSvg.tsx            # Standalone Hand SVG component
│       │   │   ├── FootSvg.tsx            # Standalone Foot SVG component
│       │   │   └── index.ts
│       │   ├── constants/                 # Default palettes, model views, default datasets
│       │   │   └── index.ts
│       │   ├── types/                     # Strict TypeScript interfaces & definitions
│       │   │   └── index.ts
│       │   ├── utils/                     # Pure utility helpers (colors, data mapping, deduping)
│       │   │   └── index.ts
│       │   └── index.ts                   # Main public API export barrier
│       ├── tests/                         # Test Suite (Vitest + React Testing Library)
│       │   ├── setup.ts
│       │   ├── Model.test.tsx
│       │   ├── BodyVisualizer.test.tsx
│       │   ├── HandSvg.test.tsx
│       │   ├── FootSvg.test.tsx
│       │   └── utils.test.ts
│       ├── dist/                          # Generated distribution bundle (ESM, CJS, .d.ts)
│       ├── package.json                   # NPM package manifest
│       ├── tsconfig.json                  # Dev TypeScript configuration
│       ├── tsconfig.build.json            # Build TypeScript declaration configuration
│       ├── tsup.config.ts                 # Modern fast bundler configuration
│       ├── vitest.config.ts               # Vitest test configuration
│       ├── README.md                      # Package README for npm
│       └── LICENSE                        # MIT License
├── .editorconfig
├── .gitignore
├── .prettierrc
├── .prettierignore
├── eslint.config.js
├── package.json                           # Root monorepo workspace manifest
├── tsconfig.json                          # Base TypeScript config
├── tsconfig.node.json
├── LICENSE                                # Root MIT License
├── README.md                              # Root High-Converting Repository README
├── CONTRIBUTING.md
├── CHANGELOG.md
└── SECURITY.md
```

---

## 5. Authoritative Manifest Specification (`package.json`)

### `packages/react-body-highlighter/package.json`
```json
{
  "name": "@plexapro/react-body-highlighter",
  "version": "1.0.0",
  "description": "High-performance, interactive SVG Human Body & Injury Visualizer React component with full-body muscle highlighting, extremities (hands & feet), custom color mapping, and TypeScript support.",
  "author": "Plexa <dev@plexapro.com> (https://www.plexapro.com)",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Plexapro/react-body-highlighter.git"
  },
  "homepage": "https://github.com/Plexapro/react-body-highlighter#readme",
  "bugs": {
    "url": "https://github.com/Plexapro/react-body-highlighter/issues"
  },
  "keywords": [
    "react",
    "body-highlighter",
    "react-body-highlighter",
    "human-body",
    "anatomy",
    "muscle-highlighter",
    "injury-visualizer",
    "injury-tracking",
    "safety-management",
    "ehs-software",
    "ergonomics",
    "physiotherapy",
    "fitness",
    "workout-tracker",
    "svg-body",
    "svg",
    "plexa",
    "react18",
    "react19",
    "typescript"
  ],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/ --ext .ts,.tsx",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "clean": "rimraf dist coverage",
    "prepack": "npm run clean && npm run build",
    "prepublishOnly": "npm run typecheck && npm run test && npm run build"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^22.13.4",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "@vitest/coverage-v8": "^3.0.5",
    "jsdom": "^26.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "rimraf": "^6.0.1",
    "tsup": "^8.3.6",
    "typescript": "^5.7.3",
    "vitest": "^3.0.5"
  }
}
```

### Root `package.json`
```json
{
  "name": "react-body-highlighter-monorepo",
  "private": true,
  "description": "Interactive SVG Human Body & Injury Visualizer React Component Monorepo",
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=@plexapro/react-body-highlighter & npm run dev --workspace=demo",
    "build": "npm run build --workspaces",
    "build:pkg": "npm run build --workspace=@plexapro/react-body-highlighter",
    "build:demo": "npm run build --workspace=demo",
    "test": "npm run test --workspace=@plexapro/react-body-highlighter",
    "test:coverage": "npm run test:coverage --workspace=@plexapro/react-body-highlighter",
    "typecheck": "npm run typecheck --workspaces",
    "lint": "npm run lint --workspaces",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md,css}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md,css}\""
  },
  "devDependencies": {
    "@types/node": "^22.13.4",
    "prettier": "^3.5.1",
    "typescript": "^5.7.3"
  }
}
```

---

## 6. Bundler & Build Toolchain Configuration

We configure `tsup` as the primary library bundler due to its extreme build speed, native esbuild core, flawless dual ESM/CJS bundling, automatic RSC `"use client"` banner injection, and zero-config TypeScript `.d.ts` generation.

### `packages/react-body-highlighter/tsup.config.ts`
```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false, // Keep readable output with JSDoc; consumer bundlers handle minification
  external: ['react', 'react-dom'],
  banner: {
    js: "'use client';"
  },
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.js' : '.cjs'
    }
  }
})
```

### Alternative: `packages/react-body-highlighter/vite.config.ts` (Vite Library Mode)
```typescript
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PlexaReactBodyHighlighter',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        banner: "'use client';",
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
})
```

---

## 7. TypeScript Compiler Configuration

### `packages/react-body-highlighter/tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src", "tests"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 8. Public API Surface & Type Contracts

The package entry point (`src/index.ts`) exposes clean, modular, and non-proprietary public APIs:

### Primary Exports
```typescript
// Components
export { default as Model } from './components/Model'
export { default as BodyVisualizer } from './components/BodyVisualizer'
export { HandSvg } from './components/HandSvg'
export { FootSvg } from './components/FootSvg'

// Default Export
export { default } from './components/Model'

// Types & Metadata
export {
  MuscleType,
  ModelType,
  type Muscle,
  type ModelTypeKey,
  type IExerciseData,
  type IMuscleData,
  type IMuscleStats,
  type IModelProps,
  type IBodyPart,
  type ISmallBodyPart,
  type BodyVisualizerProps,
  type HandSvgProps,
  type FootSvgProps
} from './types'

// Constants
export {
  DEFAULT_BODY_COLOR,
  DEFAULT_HIGHLIGHTED_COLORS,
  DEFAULT_MODEL_TYPE,
  DEFAULT_MUSCLE_DATA
} from './constants'

// Utilities
export {
  ensure,
  fillIntensityColor,
  fillMuscleData,
  dedupeBodyParts,
  normalizeBodyParts
} from './utils'
```

### Generic Type Interfaces (`src/types/index.ts`)
```typescript
import { CSSProperties, ReactNode } from 'react'

export const MuscleType = {
  TRAPEZIUS: 'trapezius',
  LEFT_TRAPEZIUS: 'left-trapezius',
  RIGHT_TRAPEZIUS: 'right-trapezius',
  UPPER_BACK: 'upper-back',
  LEFT_UPPER_BACK: 'left-upper-back',
  RIGHT_UPPER_BACK: 'right-upper-back',
  LOWER_BACK: 'lower-back',
  LEFT_LOWER_BACK: 'left-lower-back',
  RIGHT_LOWER_BACK: 'right-lower-back',
  CHEST: 'chest',
  LEFT_CHEST: 'left-chest',
  RIGHT_CHEST: 'right-chest',
  BICEPS: 'biceps',
  LEFT_BICEPS: 'left-biceps',
  RIGHT_BICEPS: 'right-biceps',
  TRICEPS: 'triceps',
  LEFT_TRICEPS: 'left-triceps',
  RIGHT_TRICEPS: 'right-triceps',
  FOREARM: 'forearm',
  LEFT_FOREARM: 'left-forearm',
  RIGHT_FOREARM: 'right-forearm',
  BACK_DELTOIDS: 'back-deltoids',
  LEFT_BACK_DELTOIDS: 'left-back-deltoids',
  RIGHT_BACK_DELTOIDS: 'right-back-deltoids',
  FRONT_DELTOIDS: 'front-deltoids',
  LEFT_FRONT_DELTOIDS: 'left-front-deltoids',
  RIGHT_FRONT_DELTOIDS: 'right-front-deltoids',
  ABS: 'abs',
  LEFT_ABS: 'left-abs',
  RIGHT_ABS: 'right-abs',
  OBLIQUES: 'obliques',
  LEFT_OBLIQUES: 'left-obliques',
  RIGHT_OBLIQUES: 'right-obliques',
  ABDUCTOR: 'adductor',
  LEFT_ABDUCTOR: 'left-adductor',
  RIGHT_ABDUCTOR: 'right-adductor',
  ABDUCTORS: 'abductors',
  LEFT_ABDUCTORS: 'left-abductors',
  RIGHT_ABDUCTORS: 'right-abductors',
  HAMSTRING: 'hamstring',
  LEFT_HAMSTRING: 'left-hamstring',
  RIGHT_HAMSTRING: 'right-hamstring',
  QUADRICEPS: 'quadriceps',
  LEFT_QUADRICEPS: 'left-quadriceps',
  RIGHT_QUADRICEPS: 'right-quadriceps',
  CALVES: 'calves',
  LEFT_CALVES: 'left-calves',
  RIGHT_CALVES: 'right-calves',
  LEFT_SHINS: 'left-shins',
  RIGHT_SHINS: 'right-shins',
  GLUTEAL: 'gluteal',
  LEFT_GLUTEAL: 'left-gluteal',
  RIGHT_GLUTEAL: 'right-gluteal',
  HEAD: 'head',
  NECK: 'neck',
  LEFT_NECK: 'left-neck',
  RIGHT_NECK: 'right-neck',
  KNEES: 'knees',
  LEFT_KNEES: 'left-knees',
  RIGHT_KNEES: 'right-knees',
  LEFT_SOLEUS: 'left-soleus',
  RIGHT_SOLEUS: 'right-soleus',
  ANKLES: 'ankles',
  LEFT_ANKLE: 'left-ankle',
  RIGHT_ANKLE: 'right-ankle'
} as const

export type Muscle = (typeof MuscleType)[keyof typeof MuscleType]

export const ModelType = {
  POSTERIOR: 'posterior',
  ANTERIOR: 'anterior'
} as const

export type ModelTypeKey = (typeof ModelType)[keyof typeof ModelType]

export interface IExerciseData {
  name: string
  muscles: Muscle[]
  frequency?: number
}

export interface IMuscleData {
  exercises: string[]
  frequency: number
}

export interface IMuscleStats {
  muscle: Muscle
  data: IMuscleData
}

export interface IModelProps {
  data?: IExerciseData[]
  bodyColor?: string
  highlightedColors?: string[]
  onClick?: ((exercise: IMuscleStats) => void) | (() => void)
  onHover?: (exercise: IMuscleStats | null) => void
  borderColor?: string
  borderWidth?: number
  style?: CSSProperties
  svgStyle?: CSSProperties
  className?: string
  type?: ModelTypeKey
}

export interface IBodyPart {
  name: string
  type: 'anterior' | 'posterior'
  muscles: Muscle[] | string[]
  color?: string
}

export interface ISmallBodyPart {
  name: string
  muscles: Muscle[] | string[]
  color?: string
}

export interface BodyVisualizerProps {
  frontBodyPart?: IBodyPart[]
  backBodyPart?: IBodyPart[]
  handsPart?: ISmallBodyPart[]
  footPart?: ISmallBodyPart[]
  isDisabled?: boolean
  showSideLabels?: boolean
  size?: 'default' | 'compact'
  className?: string
  handleChange?: (data: IMuscleStats, type: string, smallMuscle?: string) => void
}

export interface HandSvgProps {
  position: 'left' | 'right'
  color?: string
  sizing?: string
  className?: string
  borderColor?: string
  borderWidth?: number
  style?: CSSProperties
  onClick?: () => void
  theme?: 'light' | 'dark'
}

export interface FootSvgProps {
  position: 'left' | 'right'
  color?: string
  sizing?: string
  className?: string
  borderColor?: string
  borderWidth?: number
  style?: CSSProperties
  onClick?: () => void
  theme?: 'light' | 'dark'
}
```

---

## 9. Zero-Leakage & Isolation Boundary Verification Matrix

| Source File in PLEXA_FRONTEND | Proprietary Import / Dependency | Standalone Replacement in `@plexapro/react-body-highlighter` | Verification Status |
|--------------------------------|---------------------------------|--------------------------------------------------------------|---------------------|
| `BodyVisualiser.tsx:4` | `import { InjuryBodyPart } from '@/hooks/site-management/injuries/model'` | Generic `IBodyPart`, `ISmallBodyPart` in `src/types/index.ts` | Isolated (100% generic) |
| `BodyVisualiser.tsx:6` | `import { clsxm } from '@/utils'` | Native string concatenation / template literals `${base} ${className \|\| ''}` | Isolated (0 helper deps) |
| `react-body-highlighter/utils/index.ts:1` | `import { InjuryBodyPart } from '@/hooks/site-management/injuries/model'` | Pure `IBodyPart` generic data normalization in `src/utils/index.ts` | Isolated (100% generic) |
| `ui/HandSvg.tsx:1` | `import { useTheme } from '@/hooks'` | `theme?: 'light' \| 'dark'` prop or CSS fill / style prop | Isolated (No Jotai / hook dep) |
| `ui/HandSvg.tsx:3` | `import { clsxm } from '@/utils'` | Standard string template `${className \|\| ''}` | Isolated |
| `ui/FootSvg.tsx:1` | `import { useTheme } from '@/hooks'` | `theme?: 'light' \| 'dark'` prop or CSS fill / style prop | Isolated |
| `ui/FootSvg.tsx:3` | `import { clsxm } from '@/utils'` | Standard string template `${className \|\| ''}` | Isolated |
| Entire codebase | Internal API endpoints, auth tokens, telemetry | Zero tokens, URLs, or API requests | Verified Clean |

---

## 10. Testing & Quality Assurance Infrastructure

### `packages/react-body-highlighter/vitest.config.ts`
```typescript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'dist/', 'tests/']
    }
  }
})
```

### `packages/react-body-highlighter/tests/setup.ts`
```typescript
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

### Comprehensive Test Coverage Target (>90%)
1. **`Model.test.tsx`**:
   - Renders anterior (front) body SVG by default.
   - Renders posterior (back) body SVG when `type="posterior"`.
   - Fires `onClick` callback with `{ muscle: 'chest', data: {...} }` when polygon is clicked.
   - Applies custom `bodyColor`, `highlightedColors`, `borderColor`, and `borderWidth`.
   - Handles empty and custom `data` arrays without errors.
2. **`BodyVisualizer.test.tsx`**:
   - Renders front and back body models simultaneously.
   - Renders side labels ("Left Side" / "Right Side") and hides them when `showSideLabels={false}`.
   - Renders Hand and Foot extremity sections.
   - Deduplicates muscle chips and renders badge list.
   - Respects `isDisabled={true}` (disabling pointer events).
3. **`HandSvg.test.tsx` & `FootSvg.test.tsx`**:
   - Renders left hand/foot with default scale.
   - Renders right hand/foot with inverted horizontal scale `scale(-1, 1)`.
   - Applies custom fill colors, border styling, and handles click events.
4. **`utils.test.ts`**:
   - `ensure`: returns value if present, fallback if null/undefined.
   - `fillMuscleData`: aggregates exercise names and frequencies across multiple muscle groups.
   - `fillIntensityColor`: picks correct color step from palette based on frequency.
   - `dedupeBodyParts`: removes duplicate muscle entries across identical types.
   - `normalizeBodyParts`: expands combined entries into left/right side variations.

---

## 11. Interactive Demo Showcase & Packaging Architecture

The demo web application under `apps/demo` serves as the official live showcase, documentation playground, and backlink engine for Plexa.

### Demo Package Manifest (`apps/demo/package.json`)
```json
{
  "name": "demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@plexapro/react-body-highlighter": "workspace:*",
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3",
    "vite": "^6.1.0"
  }
}
```

### Demo App Features
- **Plexa Header & Hero**: Clean Plexa branding, "Maintained by Plexa (www.plexapro.com)" top banner, GitHub star badge, npm install command badge.
- **Multi-View Visualizer**: Toggle between Full Body (Front & Back), Upper Extremities (Hands), Lower Extremities (Feet).
- **Interactive Preset Scenarios**:
  1. *Safety & EHS Incident Report* (Construction site wrist strain, lumbar lower back injury, shoulder contusion).
  2. *Gym Workout Tracker* (Push Day: Chest, Triceps, Front Deltoids; Leg Day: Quadriceps, Calves, Hamstrings).
  3. *Physiotherapy Assessment* (Postural neck & trapezius tension, patellar knee pain).
- **Live Code Generator**: Interactive JSX snippet generator allowing users to configure props and copy code in 1 click.
- **Custom Color Picker**: Custom palette creator with live hex preview.
- **SEO & Social Optimization**: OpenGraph card (`og:image`, `og:title`, `og:description`), Twitter summary card, JSON-LD `SoftwareSourceCode` schema.

---

## 12. CI/CD & Automated Release Pipeline

### `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Typecheck
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Run Unit Tests & Coverage
        run: npm run test:coverage

      - name: Build Package & Demo
        run: npm run build
```

### `.github/workflows/release.yml`
```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Run Validation Pipeline
        run: |
          npm run typecheck
          npm run test
          npm run build

      - name: Publish to NPM
        run: npm publish --access public
        working-directory: packages/react-body-highlighter
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 13. Summary of Recommendations for Implementation Phase

1. **Adopt `tsup` for `packages/react-body-highlighter`**: Cleanest, fastest build configuration with automatic TypeScript declaration bundling and RSC `"use client"` injection.
2. **Execute Full Decoupling**: Keep all package files in `packages/react-body-highlighter/src/` completely self-contained with 0 runtime dependencies.
3. **Workspace Linking**: Use standard root `package.json` workspaces (`["packages/*", "apps/*"]`) for frictionless cross-linking in development.
4. **Target 100% Pass on Tiers 1-4 Tests**: Establish Vitest + React Testing Library test suite with high branch coverage (>90%).
