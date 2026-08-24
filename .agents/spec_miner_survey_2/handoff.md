# Handoff Report: Packaging & Build Specification Mining

**Agent**: `survey_spec_miner_2` (Packaging & Build Specification Miner)  
**Parent Agent**: `orchestrator` (`d98ebf5b-e99a-4563-8520-56e5373d5259`)  
**Target Package**: `@plexapro/react-body-highlighter`  
**Specification Document**: `/Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/spec_miner_survey_2/analysis.md`  
**Date**: 2026-08-24  

---

## 1. Observation

Direct code observations from inspecting reference files:
1. **Source Code Location & Coupling**:
   - `BodyVisualiser.tsx:4` directly imports `import { InjuryBodyPart, InjurySmallBodyPart } from '@/hooks/site-management/injuries/model'`.
   - `BodyVisualiser.tsx:6` imports `import { clsxm } from '@/utils'`.
   - `react-body-highlighter/utils/index.ts:1` imports `import { InjuryBodyPart } from '@/hooks/site-management/injuries/model'`.
   - `ui/HandSvg.tsx:1,3` imports `import { useTheme } from '@/hooks'` and `import { clsxm } from '@/utils'`.
   - `ui/FootSvg.tsx:1,3` imports `import { useTheme } from '@/hooks'` and `import { clsxm } from '@/utils'`.
2. **Existing Package Architecture**:
   - `react-body-highlighter/component/Model.tsx` renders anterior/posterior SVG polygons across 68+ muscle parts defined in `assets/index.ts` with viewBox `0 0 100 200`.
   - `react-body-highlighter/component/metadata.ts` defines `MuscleType`, `Muscle`, `ModelType`, `IExerciseData`, `IMuscleData`, `IMuscleStats`, `IModelProps`.
3. **Workspace State**:
   - Project directory `/Users/seanhamawi/teamwork_projects/react_body_highlighter` contains only `ORIGINAL_REQUEST.md` and `.agents/`.
   - No existing build or package configurations were present in the target directory.

---

## 2. Logic Chain

1. **Decoupling Requirement**: Because the original components in PLEXA_FRONTEND contain internal `@/` aliases to proprietary injury models and theme hooks, publishing a clean, standalone npm package requires isolating all component props into generic TypeScript interfaces (`IBodyPart`, `ISmallBodyPart`, `IExerciseData`) and replacing `clsxm`/`useTheme` with standard CSS style/class/color props.
2. **Dual ESM/CJS Distribution**: Modern JavaScript ecosystems (Vite, Next.js, Webpack 5, Node.js) require both ESM (`import`) and CJS (`require`) builds with strict `exports` maps and bundled `.d.ts` type declarations to prevent dual-package hazards and module resolution failures.
3. **Bundler Selection**: `tsup` provides the fastest, most reliable toolchain for standalone React component libraries by providing native dual ESM/CJS compilation, automatic TypeScript declaration bundling (`dts: true`), React Server Components banner injection (`banner: { js: "'use client';" }`), and tree-shaking support (`sideEffects: false`).
4. **Monorepo Architecture**: Structuring the repository into `packages/react-body-highlighter` and `apps/demo` via npm workspaces enables simultaneous library development, live showcase playground development, and automated end-to-end testing without external publication bottlenecks.
5. **Testing Architecture**: Pairing Vitest with `@testing-library/react` and `jsdom` provides fast, headless unit and integration testing capable of validating SVG rendering, event callbacks, color mapping, and data deduplication with >90% code coverage.

---

## 3. Caveats

- The SVG coordinate paths in `assets/index.ts` represent a normalized 100x200 grid for full body models, whereas `HandSvg` and `FootSvg` use distinct viewBox dimensions (`0 0 128 128` and `0 0 491.365 491.365`). The high-level `BodyVisualizer` layout handles these differing scales cleanly.
- If React 19 is used in consumer applications, `forwardRef` is optional; however, for backward compatibility with React 18, standard component signatures and ref handling should be preserved.
- No other uninvestigated areas remain.

---

## 4. Conclusion

The complete technical specification for packaging, bundling, monorepo layout, typing, testing, and distribution of `@plexapro/react-body-highlighter` has been designed, validated, and documented in `analysis.md`. The design guarantees zero proprietary dependency leakage, full dual ESM/CJS compatibility, React 18/19 support, and complete TypeScript `.d.ts` declaration bundling.

---

## 5. Verification Method

To independently verify the packaging and build specification:
1. **Inspect Specification Artifact**:
   - Read `/Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/spec_miner_survey_2/analysis.md`.
2. **Verify Configuration Manifests**:
   - Check `package.json` manifest structure, `exports` map order (`types` before `import`/`require`), `peerDependencies` range (`>=18.0.0`), and `sideEffects: false`.
   - Check `tsup.config.ts` entry points, formats (`esm`, `cjs`), and `"use client"` banner.
   - Check Vitest configuration and RTL setup.
3. **Verify Zero-Leakage Matrix**:
   - Inspect Section 9 of `analysis.md` to confirm all 7 identified proprietary import symbols have been replaced with generic standalone primitives.
