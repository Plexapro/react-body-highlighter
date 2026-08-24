# Handoff Report: Reference Codebase Survey & Analysis

**Agent:** `survey_explorer_1` (Role: Source Code & Component Investigator)  
**Date:** 2026-08-24  
**Target:** Parent Orchestrator (`d98ebf5b-e99a-4563-8520-56e5373d5259`)

---

## 1. Observation

Direct observations from examining reference files in `/Users/seanhamawi/Documents/PLEXA_FRONTEND/frontend`:

1. **`src/components/react-body-highlighter/component/Model.tsx` (Lines 46-75):**
   Renders an SVG with viewBox `0 0 100 200`. Iterates over `modelData` (either `anteriorData` or `posteriorData`) and renders `<polygon points={points} onClick={...} style={{ fill: ..., stroke: borderColor, strokeWidth: ... }} />`.
2. **`src/components/react-body-highlighter/assets/index.ts` (Lines 8-289 & Lines 291-545):**
   Contains float coordinate polygon string definitions for 40 anterior entries and 36 posterior entries. Defines 42 distinct muscle slugs in `MuscleType`.
3. **`src/components/react-body-highlighter/utils/index.ts` (Line 1):**
   Imports `import { InjuryBodyPart } from '@/hooks/site-management/injuries/model'`. This is a direct proprietary Plexa domain dependency embedded in what was intended as a reusable component.
4. **`src/components/ui/HandSvg.tsx` (Lines 20-44):**
   SVG viewBox `0 0 128 128` with transform reflection `transform={position === 'left' ? 'scale(1,1)' : 'scale(-1,1)'}`. Contains base hand path and 4 accent crease lines. Imports `useTheme` from `@/hooks` and `clsxm` from `@/utils`.
5. **`src/components/ui/FootSvg.tsx` (Lines 20-52):**
   SVG viewBox `0 0 491.365 491.365` with transform reflection `transform={position === 'left' ? 'scale(1,1)' : 'scale(-1,1)'}`. Contains plantar foot path and 4 crease lines. Imports `useTheme` and `clsxm`.
6. **`src/components/BodyVisualiser.tsx` (Lines 65-248):**
   Composite component combining Front and Back `Model` components alongside `Hand` and `Foot` extremity subcomponents, with side labels ("Right Side", "Left Side") and chip listings of selected body parts.

---

## 2. Logic Chain

1. **SVG Geometry Completeness:**  
   Observation 1 and 2 demonstrate that the 100x200 polygon coordinate system completely defines both anterior and posterior muscle anatomy across 42 slugs. Polygons can be copied directly to the new library without vector loss or coordinate translation.
2. **Extremity Integration:**  
   Observations 4, 5, and 6 show that the existing Plexa application represents extremities (hands and feet) as separate SVG icons with bilateral mirroring via `scale(-1,1)`. Exposing `<HandModel />` / `<HandSvg />` and `<FootModel />` / `<FootSvg />` alongside `<BodyModel />` and a composite `<BodyVisualizer />` fulfills the user's multi-view visualization requirement.
3. **Proprietary Purge Requirement:**  
   Observations 3, 4, and 5 confirm that the current code in `PLEXA_FRONTEND` contains internal dependencies on `@/hooks/site-management/injuries/model`, `@/hooks/useTheme`, and `@/utils/clsxm`. These must be excised to create a pure, zero-dependency `@plexapro/react-body-highlighter` package.
4. **API Modernization:**  
   The reference `Model` only supports click handlers and frequency index colors without hover callbacks, tooltip rendering, or simple multi-select toggling. The new package must expand `IModelProps` into `BodyModelProps` to provide a modern React developer experience.

---

## 3. Caveats

- The reference `HandSvg.tsx` and `FootSvg.tsx` do not have individual polygon sub-parts for each distinct finger/toe (they are single silhouette paths with inner stroke details). For detailed sub-digit selection (e.g. thumb vs index finger), multi-path sub-segmentation can be implemented in future iterations or via separate extremity SVGs.
- No caveats regarding coordinate math or slug completeness for the main body views.

---

## 4. Conclusion

The reference survey is complete. All 42 muscle slugs, SVG polygon data sets, component props, and extremity designs have been cataloged in `/Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/explorer_survey_1/analysis.md`. The design is ready for downstream implementation of `@plexapro/react-body-highlighter` and the interactive demo app.

---

## 5. Verification Method

To independently verify these findings:
1. Check `analysis.md` at `/Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/explorer_survey_1/analysis.md`.
2. Inspect source paths:
   - `src/components/react-body-highlighter/assets/index.ts`
   - `src/components/react-body-highlighter/component/Model.tsx`
   - `src/components/ui/HandSvg.tsx`
   - `src/components/ui/FootSvg.tsx`
   - `src/components/BodyVisualiser.tsx`
3. Verify that all 42 slugs and polygon coordinates listed in `analysis.md` match the source geometry.
