# Reference Codebase Survey & Analysis Report
**Target Package:** `@plexapro/react-body-highlighter`  
**Investigator:** `survey_explorer_1` (Source Code & Component Investigator)  
**Date:** 2026-08-24  

---

## 1. Executive Summary & Scope Overview

This report provides a thorough, line-by-line investigation of the existing body visualization and highlighting implementations within the reference codebase at `/Users/seanhamawi/Documents/PLEXA_FRONTEND/frontend`.

The goal is to extract all anatomical SVG definitions, coordinate systems, component APIs, interaction logic, and extremity assets to inform the creation of a standalone, zero-dependency, production-grade open-source React library (`@plexapro/react-body-highlighter`) and its companion interactive documentation playground.

### Summary of Surveyed Reference Files
| File Path | Lines | Key Responsibility / Content |
| :--- | :--- | :--- |
| `src/components/react-body-highlighter/index.ts` | 3 | Package entry point exporting metadata and Model component |
| `src/components/react-body-highlighter/component/Model.tsx` | 78 | Core SVG rendering component using polygon elements (viewBox `0 0 100 200`) |
| `src/components/react-body-highlighter/component/metadata.ts` | 107 | `MuscleType` mapping (42 slugs), `ModelType`, `IExerciseData`, `IModelProps` |
| `src/components/react-body-highlighter/constants/index.ts` | 75 | Default muscle record with 42 entries, default colors, default model type |
| `src/components/react-body-highlighter/utils/index.ts` | 82 | Color interpolation, intensity calculation, data normalization utility |
| `src/components/react-body-highlighter/assets/index.ts` | 546 | Raw SVG polygon coordinates for Anterior (40 items) and Posterior (36 items) |
| `src/components/BodyVisualiser.tsx` | 250 | Composite layout combining Front/Back body views with Hand & Foot SVG extremities |
| `src/components/ui/HandSvg.tsx` | 112 | Left/right hand SVG icon (viewBox `0 0 128 128` and legacy `0 0 512 512`) |
| `src/components/ui/FootSvg.tsx` | 109 | Left/right foot SVG icon (viewBox `0 0 491.365 491.365`) |
| `src/hooks/site-management/injuries/model.ts` | 185 | Proprietary data contracts (`InjuryBodyPart`, `InjurySmallBodyPart`, `Injury`) |

---

## 2. Comprehensive Anatomy & Slug Identifier Catalog

The body model supports both **Anterior (Front)** and **Posterior (Back)** views. Slugs are defined for both general muscle groups (bilateral / combined) and specific left/right variations.

### 2.1 Anterior (Front View) Muscles and Slugs
ViewBox: `0 0 100 200`

| Slug Identifier (`Muscle`) | Bilateral / Side | Polygon Count | Description / Anatomical Region |
| :--- | :--- | :--- | :--- |
| `head` | Neutral | 1 polygon | Head and face contour |
| `neck` | Combined | 2 polygons | Anterior neck (left & right) |
| `left-neck` | Left side | 1 polygon | Left sternocleidomastoid / neck |
| `right-neck` | Right side | 1 polygon | Right sternocleidomastoid / neck |
| `chest` | Combined | 2 polygons | Left and right pectoralis major |
| `left-chest` | Left side | 1 polygon | Left pectoralis major |
| `right-chest` | Right side | 1 polygon | Right pectoralis major |
| `front-deltoids` | Combined | 2 polygons | Left and right anterior deltoids |
| `left-front-deltoids` | Left side | 1 polygon | Left anterior deltoid |
| `right-front-deltoids` | Right side | 1 polygon | Right anterior deltoid |
| `biceps` | Combined | 2 polygons | Left and right biceps brachii |
| `left-biceps` | Left side | 1 polygon | Left biceps brachii |
| `right-biceps` | Right side | 1 polygon | Right biceps brachii |
| `triceps` | Combined | 2 polygons | Anterior lateral triceps visible from front |
| `left-triceps` | Left side | 1 polygon | Left triceps (anterior profile) |
| `right-triceps` | Right side | 1 polygon | Right triceps (anterior profile) |
| `forearm` | Combined | 4 polygons | Forearms flexors / brachioradialis (2 per arm) |
| `left-forearm` | Left side | 2 polygons | Left forearm |
| `right-forearm` | Right side | 2 polygons | Right forearm |
| `abs` | Combined | 2 polygons | Rectus abdominis (left and right columns) |
| `left-abs` | Left side | 1 polygon | Left rectus abdominis column |
| `right-abs` | Right side | 1 polygon | Right rectus abdominis column |
| `obliques` | Combined | 2 polygons | External obliques (flanks) |
| `left-obliques` | Left side | 1 polygon | Left external oblique |
| `right-obliques` | Right side | 1 polygon | Right external oblique |
| `abductors` | Combined | 2 polygons | Hip abductors / tensor fasciae latae (front) |
| `left-abductors` | Left side | 1 polygon | Left hip abductors |
| `right-abductors` | Right side | 1 polygon | Right hip abductors |
| `quadriceps` | Combined | 6 polygons | Rectus femoris, vastus lateralis, medialis (3 per leg) |
| `left-quadriceps` | Left side | 3 polygons | Left quadriceps group |
| `right-quadriceps` | Right side | 3 polygons | Right quadriceps group |
| `knees` | Combined | 2 polygons | Left and right patella / knee joints |
| `left-knees` | Left side | 1 polygon | Left knee joint |
| `right-knees` | Right side | 1 polygon | Right knee joint |
| `calves` | Combined | 4 polygons | Anterior tibialis / shin regions (2 per leg) |
| `left-shins` | Left side | 2 polygons | Left shin / anterior tibialis |
| `right-shins` | Right side | 2 polygons | Right shin / anterior tibialis |
| `ankles` | Combined | 2 polygons | Left and right ankle joints |
| `left-ankle` | Left side | 1 polygon | Left ankle joint |
| `right-ankle` | Right side | 1 polygon | Right ankle joint |

### 2.2 Posterior (Back View) Muscles and Slugs
ViewBox: `0 0 100 200`

| Slug Identifier (`Muscle`) | Bilateral / Side | Polygon Count | Description / Anatomical Region |
| :--- | :--- | :--- | :--- |
| `head` | Neutral | 1 polygon | Posterior cranium / occiput |
| `trapezius` | Combined | 2 polygons | Upper/mid trapezius (diamond shape) |
| `left-trapezius` | Left side | 1 polygon | Left trapezius |
| `right-trapezius` | Right side | 1 polygon | Right trapezius |
| `back-deltoids` | Combined | 2 polygons | Posterior deltoids |
| `left-back-deltoids` | Left side | 1 polygon | Left posterior deltoid |
| `right-back-deltoids` | Right side | 1 polygon | Right posterior deltoid |
| `upper-back` | Combined | 2 polygons | Latissimus dorsi & rhomboids (upper back) |
| `left-upper-back` | Left side | 1 polygon | Left upper back / lat |
| `right-upper-back` | Right side | 1 polygon | Right upper back / lat |
| `triceps` | Combined | 4 polygons | Triceps long/lateral heads (2 per arm) |
| `left-triceps` | Left side | 2 polygons | Left triceps posterior |
| `right-triceps` | Right side | 2 polygons | Right triceps posterior |
| `lower-back` | Combined | 2 polygons | Erector spinae / lumbar region |
| `left-lower-back` | Left side | 1 polygon | Left lower back |
| `right-lower-back` | Right side | 1 polygon | Right lower back |
| `forearm` | Combined | 4 polygons | Extensor muscles of forearm (2 per arm) |
| `left-forearm` | Left side | 2 polygons | Left extensor forearm |
| `right-forearm` | Right side | 2 polygons | Right extensor forearm |
| `gluteal` | Combined | 2 polygons | Gluteus maximus (left and right) |
| `left-gluteal` | Left side | 1 polygon | Left gluteus maximus |
| `right-gluteal` | Right side | 1 polygon | Right gluteus maximus |
| `adductor` | Combined | 2 polygons | Inner thigh adductor magnus/longus |
| `left-adductor` | Left side | 1 polygon | Left inner thigh adductor |
| `right-adductor` | Right side | 1 polygon | Right inner thigh adductor |
| `hamstring` | Combined | 4 polygons | Biceps femoris, semitendinosus (2 per leg) |
| `left-hamstring` | Left side | 2 polygons | Left hamstring group |
| `right-hamstring` | Right side | 2 polygons | Right hamstring group |
| `knees` | Combined | 2 polygons | Popliteal fossa (back of knees) |
| `left-knees` | Left side | 1 polygon | Left back of knee |
| `right-knees` | Right side | 1 polygon | Right back of knee |
| `calves` | Combined | 4 polygons | Gastrocnemius medial & lateral heads (2 per leg) |
| `left-calves` | Left side | 2 polygons | Left gastrocnemius calf muscle |
| `right-calves` | Right side | 2 polygons | Right gastrocnemius calf muscle |
| `left-soleus` | Left side | 1 polygon | Left lower calf / Achilles / soleus |
| `right-soleus` | Right side | 1 polygon | Right lower calf / Achilles / soleus |

---

## 3. SVG Coordinate Systems & Rendering Architecture

### 3.1 Main Body SVG (`Model.tsx` & `assets/index.ts`)
1. **ViewBox:** `0 0 100 200`
   - Aspect ratio: 1:2 (width: 100, height: 200).
   - Scales smoothly via `width="100%"` and `height="100%"` with standard SVG vector scaling.
2. **Path Geometry Structure:**
   - Instead of `<path d="...">`, the body model uses `<polygon points="x1 y1 x2 y2 ..."/>`.
   - Each polygon coordinate pair is space/number-separated float coordinates matching the 100x200 bounding box.
   - Example:
     ```tsx
     <polygon
       key={index}
       points={points}
       onClick={() => handleClick(exercise.muscle, onClick)}
       style={{
         cursor: 'pointer',
         fill: ensure(fillIntensityColor(muscleData, highlightedColors, exercise.muscle), bodyColor),
         stroke: borderColor,
         strokeWidth: borderColor ? borderWidth : undefined,
         strokeLinejoin: 'round',
         strokeLinecap: 'round'
       }}
     />
     ```
3. **Data Key Mapping:**
   - In `assets/index.ts`, `anteriorData` and `posteriorData` are arrays of `{ muscle: Muscle, svgPoints: string[] }`.
   - For combined muscles (e.g. `chest`), `svgPoints` contains array of all sub-polygons (e.g. 2 polygons).
   - For single-sided muscles (e.g. `left-chest`), `svgPoints` contains 1 polygon.
   - When mapping over `modelData`, rendering iterates through all entries and renders `<polygon>` tags with individual `onClick` handlers.

### 3.2 Hand Extremity SVG (`HandSvg.tsx`)
1. **ViewBox:** `0 0 128 128`
2. **Reflection & Sidedness:**
   - Hand is rendered for left or right using SVG transform:
     ```tsx
     transform={position === 'left' ? 'scale(1,1)' : 'scale(-1,1)'}
     ```
   - When scaled by `-1` on X axis, SVG mirrors horizontally across the origin.
3. **Internal Structure:**
   - Base hand silhouette path: `M73.2 122.3c-25.26 0-35.37-4.38...`
   - Secondary detail paths (finger creases / knuckle lines): 4 separate sub-paths for fingers inside `<g>`.
4. **Alternative Detailed Hand SVG (Found in comments):**
   - ViewBox: `0 0 512 512`
   - Detailed contour with individual fingers, thumb, and palm creases.

### 3.3 Foot Extremity SVG (`FootSvg.tsx`)
1. **ViewBox:** `0 0 491.365 491.365`
2. **Reflection & Sidedness:**
   - Foot is rendered for left or right using SVG transform:
     ```tsx
     transform={position === 'left' ? 'scale(1,1)' : 'scale(-1,1)'}
     ```
3. **Internal Structure:**
   - Plantar/dorsal outline with 5 individual toes (big toe to pinky toe), metatarsal arch, heel (calcaneus).
   - 4 accent and crease paths (`d="M207.434,131.837..."`, `d="M301.73,392.351..."`, `d="M270.917,265.315..."`).

---

## 4. Props Interface & Customization Specifications

### 4.1 Existing `IModelProps` in Reference Code
```typescript
export interface IModelProps {
  bodyColor?: string                       // Default: '#B6BDC3'
  data?: IExerciseData[]                   // Array of active/worked muscles
  highlightedColors?: string[]             // Array: ['#81b1d9', '#277abf']
  onClick?: ((exercise: IMuscleStats) => void) | (() => void)
  borderColor?: string                     // Stroke border color
  borderWidth?: number                     // Default: 0.5
  style?: CSSProperties                    // Style passed to wrapper <div>
  svgStyle?: CSSProperties                 // Style passed to <svg>
  type?: 'anterior' | 'posterior'          // Default: 'anterior'
}
```

### 4.2 Existing Data Contracts
```typescript
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
```

### 4.3 Deficiencies in Reference Props & Proposed Enhancements for `@plexapro/react-body-highlighter`

| Area | Current Reference Implementation | Proposed Open-Source Enhancement |
| :--- | :--- | :--- |
| **Hover States** | None (only cursor: pointer) | `onHover?: (exercise: IMuscleStats \| null) => void`, `hoverColor?: string` |
| **Tooltips** | None | Built-in or render-prop tooltip support (`renderTooltip?: (stats: IMuscleStats) => ReactNode`) |
| **Active / Selected State** | Calculated purely from `data` array frequencies | Support both simple `selectedMuscles: Muscle[]` (convenience mode) AND weighted `data: IExerciseData[]` (intensity mode) |
| **Multi-Selection** | Requires manual parent array manipulation in `onClick` | Built-in multi-select helper or toggle mode |
| **Color Scales** | Simple index lookup `highlightedColors[frequency - 1]` | Discrete palette OR continuous min/max interpolation |
| **Responsive Sizing** | Relies on `style` or container dimensions | `width?: number \| string`, `height?: number \| string`, `className?: string` |
| **Side Labels & Indicators** | Hardcoded in `BodyVisualiser.tsx` with tailwind classes | Prop options: `showLabels?: boolean`, `labelFormat?: 'anatomical' \| 'view'`, customizable label styling |
| **Extremities Integration** | Disjoint components in `BodyVisualiser.tsx` | Composite `<BodyVisualizer />` that accepts `includeHands?: boolean`, `includeFeet?: boolean`, `layout?: 'vertical' \| 'horizontal' \| 'grid'` |

---

## 5. Extremities Architecture & Integration Design

In `BodyVisualiser.tsx`, the extremities (hands and feet) are rendered in separate sections above and below the main front/back body models.

### 5.1 Current Extremities Mapping in `BodyVisualiser.tsx`
- **Hands:**
  - `Hand` component receives `position='left' | 'right'` and `color`.
  - When clicked, calls `handleChange({ muscle: 'forearm', data: ... }, 'hands', 'left-hand' | 'right-hand')`.
- **Feet:**
  - `Foot` component receives `position='left' | 'right'` and `color`.
  - When clicked, calls `handleChange({ muscle: 'calves', data: ... }, 'foot', 'left-foot' | 'right-foot')`.

### 5.2 Recommended Library Architecture for Extremities
1. **Standalone Subcomponents:**
   - Export `<HandSvg />` / `<HandModel />` with props for `position: 'left' | 'right'`, `color`, `activeColor`, `hoverColor`, `onClick`, `size`.
   - Export `<FootSvg />` / `<FootModel />` with props for `position: 'left' | 'right'`, `color`, `activeColor`, `hoverColor`, `onClick`, `size`.
2. **Unified Composite Component (`<BodyVisualizer />`):**
   - High-level component managing both main body views (Front & Back) + Left/Right Hands + Left/Right Feet.
   - Synchronizes selections and provides unified callback: `onSelect={(part: BodyPartSelection) => void}`.

---

## 6. Proprietary Logic & Leakage Audit (Purge List)

The following items are internal Plexa proprietary dependencies or business-logic specifics that **MUST BE COMPLETELY PURGED** from the open-source package:

```
❌ CRITICAL PURGE LIST:
1. '@/hooks/site-management/injuries/model' 
   -> References to InjuryBodyPart, InjurySmallBodyPart, Injury, InjuryApprovalStatus, SDS, SWMS, Equipment.
2. '@/utils' / '@/utils/clsxm'
   -> Internal clsxm utility from Plexa frontend. Must be replaced with standard clsx/tailwind-merge or pure inline SVG styling.
3. '@/hooks' / '@/hooks/useTheme'
   -> Internal Plexa dark mode hook in HandSvg.tsx and FootSvg.tsx.
4. normalizeExistingData() in utils/index.ts
   -> Hardcoded normalization logic that prefixes 'left-' / 'right-' specifically for Plexa injury reporting forms.
5. Internal Jotai store / atoms
   -> Any global store references. Standalone library must use pure React state and controlled/uncontrolled props.
```

---

## 7. Package Specification & Build Architecture

### 7.1 Proposed Package Identity
- **NPM Package Name:** `@plexapro/react-body-highlighter`
- **Repository:** `https://github.com/Plexapro/react-body-highlighter`
- **Author/Org:** Plexa (`https://www.plexapro.com`)
- **License:** MIT

### 7.2 Core Exports
```typescript
// Components
export { default as Model, BodyModel } from './components/Model'
export { HandSvg, HandModel } from './components/HandModel'
export { FootSvg, FootModel } from './components/FootModel'
export { BodyVisualizer } from './components/BodyVisualizer'

// Types & Metadata
export { MuscleType, ModelType } from './types/metadata'
export type {
  Muscle,
  ModelTypeEnum,
  IModelProps,
  BodyModelProps,
  IExerciseData,
  IMuscleData,
  IMuscleStats,
  HandModelProps,
  FootModelProps,
  BodyVisualizerProps,
  BodyPartSelection
} from './types'

// Constants & Utilities
export { DEFAULT_BODY_COLOR, DEFAULT_HIGHLIGHTED_COLORS, DEFAULT_MUSCLE_DATA } from './constants'
export { fillIntensityColor, fillMuscleData } from './utils'
```

### 7.3 Build & Distribution Targets
- Bundler: `tsup` or `vite build` library mode producing:
  - `dist/index.mjs` (ESM)
  - `dist/index.cjs` (CommonJS)
  - `dist/index.d.ts` (TypeScript Declaration)
- React Peer Dependencies: `react >= 18.0.0`, `react-dom >= 18.0.0`
- Zero runtime dependencies for core package (optional lightweight utility like `clsx` if necessary).

---

## 8. Conclusion & Handoff Readiness

All coordinate systems, polygon points, anatomy slugs, extremity SVGs, and component props have been mapped and cataloged. The survey is complete and provides an actionable blueprint for the library implementers, documentation builders, and test engineers.
