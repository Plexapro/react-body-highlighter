# Empirical Challenge Report: Public Contract, Package Consumption & Integration

**Agent**: `challenger_m1_2` (M1 Contract & Integration Challenger 2)  
**Target**: `@plexapro/react-body-highlighter` (Milestone 1)  
**Date**: 2026-08-24  
**Verdict**: **REQUEST_CHANGES**

---

## 1. Executive Summary

An adversarial empirical evaluation was conducted against the build artifacts, package manifest, TypeScript definitions, tree-shaking characteristics, and runtime integration boundaries of `@plexapro/react-body-highlighter` (v1.0.0).

While the library features high-fidelity polygon datasets, complete type declarations, and functional CJS export interoperability, **critical packaging and tree-shaking issues were empirically uncovered**:

1. **[CRITICAL] Native Node.js ESM Import Failure**: Importing `@plexapro/react-body-highlighter` in Node.js ESM mode crashes with `SyntaxError: Cannot use import statement outside a module` because `package.json` lacks `"type": "module"` while `dist/index.js` uses `.js` rather than `.mjs`.
2. **[HIGH] Tree-Shaking Inefficiency**: Top-level `React.memo` calls in `dist/index.js` lack `/* @__PURE__ */` annotations, preventing bundlers (esbuild, rollup, webpack) from pruning heavy SVG polygon datasets (43.9 KB minified bundle remains even when importing a single 10-line utility function `ensure`).
3. **[MEDIUM] Custom Label Invalidation in `BodyVisualizer`**: Chip badges render `{item.muscles[0] || item.name}` which permanently hides custom `selectedParts[i].label` values in favor of raw muscle slugs.

---

## 2. Challenge Findings & Stress Test Results

### Challenge 1 (CRITICAL): Native Node.js ESM Import Crash

- **Assumption Challenged**: The library can be consumed in modern ESM projects via `import '@plexapro/react-body-highlighter'`.
- **Empirical Attack**:
  Executed dynamic ESM import in Node.js v18/v20/v22:
  ```bash
  node -e "import('@plexapro/react-body-highlighter').then(console.log).catch(console.error);" --input-type=module
  ```
- **Result / Failure Mode**:
  ```
  (node:21295) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
  /Users/seanhamawi/teamwork_projects/react_body_highlighter/packages/react-body-highlighter/dist/index.js:2
  import React, { useState } from 'react';
  ^^^^^^

  SyntaxError: Cannot use import statement outside a module
      at ModuleLoader.import (node:internal/modules/esm/loader:337:24)
  ```
- **Root Cause**:
  `packages/react-body-highlighter/package.json` specifies `"exports": { ".": { "import": "./dist/index.js", "require": "./dist/index.cjs" } }`. However, without `"type": "module"` in `package.json`, Node.js treats all `.js` files as CommonJS. When the ESM loader reads `./dist/index.js`, it attempts to parse ESM syntax as CommonJS and crashes immediately.
- **Blast Radius**:
  Any Next.js, Remix, Vite SSR, Vitest, or pure Node.js ESM consumer importing this package will crash on startup.
- **Remediation**:
  In `packages/react-body-highlighter/package.json`, add:
  ```json
  "type": "module"
  ```
  And configure `tsup.config.ts` or `package.json` exports accordingly.

---

### Challenge 2 (HIGH): Tree-Shaking Failure on Partial Package Imports

- **Assumption Challenged**: Declaring `"sideEffects": false` in `package.json` ensures fine-grained tree-shaking of unused components and large polygon datasets.
- **Empirical Attack**:
  Created a consumer entry point importing **only** the `ensure` utility:
  ```javascript
  import { ensure } from '@plexapro/react-body-highlighter';
  console.log(ensure('hello', 'world'));
  ```
  Bundled using `esbuild` with `--bundle --format=esm --minify --tree-shaking=true`.
- **Result**:
  - Expected bundle size: `< 1 KB`
  - Actual bundle size: `43,920 bytes` (43.9 KB)
  - Resulting bundle contained the complete coordinate dataset for all 40 anterior and 36 posterior polygon arrays (`anteriorData` and `posteriorData`).
- **Root Cause**:
  `tsup.config.ts` bundled all components into a single file without code splitting. In `dist/index.js`, components are exported via top-level function calls `var Model_default = React.memo(Model)` and `var BodyVisualizer_default = React.memo(BodyVisualizer)`. Because these calls lack the `/* @__PURE__ */` compiler annotation, bundlers treat them as potential global side-effects, retaining the entire component and dataset tree.
- **Remediation**:
  1. Wrap `React.memo` calls with `/* @__PURE__ */` (e.g. `export default /* @__PURE__ */ React.memo(Model)`), or
  2. Enable `splitting: true` in `tsup.config.ts` so utilities and SVG datasets can be independently tree-shaken.

---

### Challenge 3 (MEDIUM): `BodyVisualizer` Ignores `selectedParts[i].label`

- **Assumption Challenged**: Passing `selectedParts: [{ muscle: 'chest', label: 'Torn Pectoralis Major', color: '#ff0000' }]` renders the user's custom label in the badge chips.
- **Empirical Attack**:
  Rendered `BodyVisualizer` with custom labels via `ReactDOMServer.renderToString`:
  ```javascript
  const html = ReactDOMServer.renderToString(
    React.createElement(BodyVisualizer, {
      selectedParts: [{ muscle: 'chest', label: 'Chest Soreness', color: '#ff0000' }]
    })
  );
  ```
- **Result**:
  Badge rendered as `<span ...>chest</span>` instead of `<span ...>Chest Soreness</span>`.
- **Root Cause**:
  In `BodyVisualizer.tsx` lines 316, 323, 184, and 370:
  ```tsx
  {item.muscles[0] || item.name}
  ```
  Because `item.muscles[0]` is `'chest'` (truthy), the expression always selects `item.muscles[0]` and completely ignores `item.name` (which stored `p.label`).
- **Remediation**:
  Change lines 316, 323, 184, and 370 in `BodyVisualizer.tsx` to:
  ```tsx
  {item.name || item.muscles[0]}
  ```

---

## 3. Verified Passing Integrations

### 1. CommonJS (`require()`) Interoperability: **PASS**
- Verified `require('@plexapro/react-body-highlighter')` and `require('./dist/index.cjs')`.
- All named exports (`Model`, `BodyModel`, `BodyVisualizer`, `HandSvg`, `FootSvg`, `HandModel`, `FootModel`, `MuscleType`, `ModelType`, `ensure`, `fillMuscleData`, `anteriorData`, `posteriorData`) and `default` export are cleanly defined and functional.

### 2. TypeScript Declaration Resolution: **PASS**
Tested strict typechecking (`tsc --noEmit`) across 4 compiler resolution strategies:
- `moduleResolution: "bundler"`: **PASS** (0 errors)
- `moduleResolution: "node16"`: **PASS** (0 errors)
- `moduleResolution: "nodenext"`: **PASS** (0 errors)
- `moduleResolution: "node"`: **PASS** (0 errors)

### 3. Server-Side Rendering (SSR) & SVG Markup: **PASS**
- Verified `Model` (Anterior/Posterior), `HandSvg` (Left/Right bilateral reflection), and `FootSvg` (Left/Right bilateral reflection) render valid, standard SVG elements without proprietary styling dependencies.

---

## 4. Required Action Items for M1 Implementer

| Priority | Area | Required Fix |
|----------|------|--------------|
| **P0** | `package.json` | Add `"type": "module"` so Node.js native ESM loader can parse `dist/index.js`. |
| **P1** | `tsup.config.ts` / Components | Add `/* @__PURE__ */` annotation to `React.memo()` or enable `splitting: true` to restore tree-shaking. |
| **P2** | `BodyVisualizer.tsx` | Fix chip text to `{item.name || item.muscles[0]}` to render `selectedParts` labels correctly. |
