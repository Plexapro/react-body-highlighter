# Test Infrastructure & Specification Matrix: `@plexapro/react-body-highlighter`

## 1. Test Philosophy

The testing methodology for `@plexapro/react-body-highlighter` is strictly **opaque-box and requirement-driven**.

1. **Specification & Contract-Centric**: Tests are authored against the public interface contracts, anatomical coordinate geometry, SVG element specifications, utility functional invariants, and real-world user workflows documented in `PROJECT.md` and `ORIGINAL_REQUEST.md`.
2. **Zero Internal Leakage / Implementation Independence**: Tests do not rely on private component state or internal helper implementation details. They exercise public component props, SVG DOM structure, polygon coordinates, attributes, event handlers, utility functions, and serialized outputs.
3. **Deterministic & Authoritative Expected Outputs**: All test expectations are derived from:
   - The authoritative 42-slug anatomical model and 100x200 viewBox coordinate geometry.
   - SVG vector transform specifications (bilateral reflection `scale(-1, 1)` for right extremities vs `scale(1, 1)` for left extremities).
   - Frequency-to-palette indexing rules ($C_i = \text{palette}[\min(\text{len}-1, \text{freq}-1)]$).
   - Real-world domain presets (Plexa EHS Workplace Safety incident report, Gym fatigue tracking, Telehealth clinical pain grading).
4. **Adversarial & Boundary Rigor**: Tests systematically probe empty inputs, undefined props, invalid muscle slugs, negative/floating/extreme frequencies, special characters, and malformed datasets to verify system resilience.

---

## 2. Feature Inventory Test Matrix

Every feature defined in `PROJECT.md` is tested across the 4-tier matrix:

| Feature # | Feature Name | Tier 1 (Feature) | Tier 2 (Boundary) | Tier 3 (Combinations) | Tier 4 (Scenarios) |
|---|---|---|---|---|---|
| **F1** | Anatomy Coordinate System (100x200 viewBox, 40 anterior & 36 posterior polygons) | `T1.F1.1` - `T1.F1.6` | `T2.F1.1` - `T2.F1.5` | `T3.C1`, `T3.C5` | `T4.S1` - `T4.S4` |
| **F2** | Anatomical Muscle Slugs (42 slugs enum/union, bilateral pairs) | `T1.F2.1` - `T1.F2.6` | `T2.F2.1` - `T2.F2.5` | `T3.C1`, `T3.C3` | `T4.S1` - `T4.S4` |
| **F3** | Core SVG Model Component (`<Model />` / anterior & posterior views) | `T1.F3.1` - `T1.F3.6` | `T2.F3.1` - `T2.F3.5` | `T3.C1`, `T3.C7` | `T4.S1` - `T4.S4` |
| **F4** | Extremity Hand SVG Component (`<HandSvg />` / left-right bilateral transform) | `T1.F4.1` - `T1.F4.6` | `T2.F4.1` - `T2.F4.5` | `T3.C2`, `T3.C8` | `T4.S1`, `T4.S4` |
| **F5** | Extremity Foot SVG Component (`<FootSvg />` / left-right bilateral transform) | `T1.F5.1` - `T1.F5.6` | `T2.F5.1` - `T2.F5.5` | `T3.C2`, `T3.C8` | `T4.S1`, `T4.S3`, `T4.S4` |
| **F6** | Composite BodyVisualizer Layout (Front/back co-location, side labels, chips) | `T1.F6.1` - `T1.F6.6` | `T2.F6.1` - `T2.F6.5` | `T3.C5`, `T3.C8` | `T4.S1` - `T4.S4` |
| **F7** | Intensity Color Calculation (`fillIntensityColor` utility) | `T1.F7.1` - `T1.F7.6` | `T2.F7.1` - `T2.F7.5` | `T3.C3`, `T3.C7` | `T4.S2`, `T4.S3` |
| **F8** | Muscle Data Normalizer & Aggregator (`fillMuscleData` utility) | `T1.F8.1` - `T1.F8.6` | `T2.F8.1` - `T2.F8.5` | `T3.C1`, `T3.C4` | `T4.S1` - `T4.S4` |
| **F9** | Deduplication & Injury Normalization (`dedupeBodyParts`, `normalizeExistingData`) | `T1.F9.1` - `T1.F9.6` | `T2.F9.1` - `T2.F9.5` | `T3.C8` | `T4.S1` |
| **F10** | Interaction Handlers & Callbacks (`onClick`, `onHover`, `renderTooltip`) | `T1.F10.1` - `T1.F10.6` | `T2.F10.1` - `T2.F10.5` | `T3.C4`, `T3.C5` | `T4.S1` - `T4.S4` |
| **F11** | Zero Proprietary Leakage & Dual ESM/CJS Bundle Integrity | `T1.F11.1` - `T1.F11.6` | `T2.F11.1` - `T2.F11.5` | `T3.C7` | `T4.S1` - `T4.S4` |
| **F12** | Demo App Foundation & UI Controls (Playground, color pickers, snippet gen, Plexa branding) | `T1.F12.1` - `T1.F12.6` | `T2.F12.1` - `T2.F12.5` | `T3.C6`, `T3.C7` | `T4.S1` - `T4.S4` |

---

## 3. Test Architecture & Runner

### Test Runner Architecture

```
tests/e2e/
├── runner.ts                     # Standalone CLI Test Runner & Aggregator
├── tier1_feature.test.ts         # Tier 1: Core Feature Contract Verification
├── tier2_boundary.test.ts        # Tier 2: Edge Cases, Nullish, and Extreme Inputs
├── tier3_combinations.test.ts    # Tier 3: Pairwise & Cross-Component Interactions
└── tier4_scenarios.test.ts       # Tier 4: End-to-End Real-World Application Workflows
```

### Execution Commands

```bash
# Run full E2E test suite via standalone runner
npx tsx tests/e2e/runner.ts

# Run specific tier
npx tsx tests/e2e/runner.ts --tier=1
npx tsx tests/e2e/runner.ts --tier=2
npx tsx tests/e2e/runner.ts --tier=3
npx tsx tests/e2e/runner.ts --tier=4

# Run with JSON report generation
npx tsx tests/e2e/runner.ts --json

# Run with Vitest (standard test runner)
npx vitest run tests/e2e
```

---

## 4. 4-Tier Test Case Design Methodology

### Tier 1: Core Feature Coverage
Exhaustive verification of functional requirements across all 12 feature domains. Requires $\ge 5$ explicit test cases per feature (minimum 60 test cases total).

- **F1 (Coordinates & Geometry)**:
  - `T1.F1.1`: Anterior coordinate map provides valid polygon coordinates for all anterior muscle groups.
  - `T1.F1.2`: Posterior coordinate map provides valid polygon coordinates for all posterior muscle groups.
  - `T1.F1.3`: SVG viewBox contract is strictly `0 0 100 200` ensuring correct aspect ratio.
  - `T1.F1.4`: Polygon coordinates adhere to floating point and integer 2D point sequences (`x,y x,y ...`).
  - `T1.F1.5`: Non-overlapping coordinate boundary verification (anterior vs posterior distinct sets).
  - `T1.F1.6`: Total polygon count meets anatomical specification (40 anterior polygon entries, 36 posterior polygon entries).
- **F2 (Muscle Slugs & Types)**:
  - `T1.F2.1`: Exhaustive 42 muscle slugs catalog completeness.
  - `T1.F2.2`: Bilateral symmetry pairs integrity (left/right counterparts exist for all unilateral muscles).
  - `T1.F2.3`: Unpaired midline muscle integrity (`head`, `neck`, `abs`, `chest`, `upper-back`, `lower-back`, etc.).
  - `T1.F2.4`: Slug naming format strictly lowercase kebab-case.
  - `T1.F2.5`: Slug constant object mapping matches string union types.
  - `T1.F2.6`: Default muscle data dictionary contains pre-initialized records for all 42 slugs.
- **F3 (Core SVG Model Component)**:
  - `T1.F3.1`: Renders anterior view SVG with `<polygon>` elements.
  - `T1.F3.2`: Renders posterior view SVG with `<polygon>` elements.
  - `T1.F3.3`: Applies custom `bodyColor` (e.g. `#1e293b`) to unexercised/uninjured muscles.
  - `T1.F3.4`: Applies custom `borderColor` and `borderWidth` across polygons.
  - `T1.F3.5`: Forwards custom `style`, `svgStyle`, and `className` to DOM wrapper and SVG element.
  - `T1.F3.6`: Applies dynamic highlight fill colors when muscle matches input exercise/injury dataset.
- **F4 (Extremity Hand SVG)**:
  - `T1.F4.1`: Renders left hand with base transform `scale(1, 1)`.
  - `T1.F4.2`: Renders right hand with bilateral reflection transform `scale(-1, 1)`.
  - `T1.F4.3`: Applies custom fill color and stroke border attributes.
  - `T1.F4.4`: Renders crease lines and vector details with `shapeRendering='geometricPrecision'`.
  - `T1.F4.5`: Fires `onClick` event handler when clicked.
  - `T1.F4.6`: Standard viewBox `0 0 128 128` preserved across both positions.
- **F5 (Extremity Foot SVG)**:
  - `T1.F5.1`: Renders left foot with base transform `scale(1, 1)`.
  - `T1.F5.2`: Renders right foot with bilateral reflection transform `scale(-1, 1)`.
  - `T1.F5.3`: Applies custom fill color and stroke border attributes.
  - `T1.F5.4`: Renders plantar arch and toe creases with `vectorEffect='non-scaling-stroke'`.
  - `T1.F5.5`: Fires `onClick` event handler when clicked.
  - `T1.F5.6`: Standard viewBox `0 0 491.365 491.365` preserved across both positions.
- **F6 (Composite BodyVisualizer Layout)**:
  - `T1.F6.1`: Renders both Anterior (Front) and Posterior (Back) models co-located in grid layout.
  - `T1.F6.2`: Renders anatomical side labels ("Right Side" on viewer's left for front; "Left Side" on viewer's left for back).
  - `T1.F6.3`: Integrates Left & Right Hand components with active/inactive highlighting.
  - `T1.F6.4`: Integrates Left & Right Foot components with active/inactive highlighting.
  - `T1.F6.5`: Renders selected body part chips/badges with muscle name labels.
  - `T1.F6.6`: Supports `size="compact"` mode with adjusted container widths and font classes.
- **F7 (Intensity Color Calculation)**:
  - `T1.F7.1`: Returns `undefined` for frequency 0 or unexercised muscles.
  - `T1.F7.2`: Returns first palette color for frequency 1 ($C_0$).
  - `T1.F7.3`: Returns $n$-th palette color for frequency $n \le \text{length}$.
  - `T1.F7.4`: Caps to highest palette color when frequency exceeds palette length.
  - `T1.F7.5`: Works seamlessly with custom multi-step color gradients (e.g. 5-step heatmap).
  - `T1.F7.6`: Handles undefined/null muscle keys safely without crashing.
- **F8 (Muscle Data Normalizer & Aggregator)**:
  - `T1.F8.1`: Aggregates single exercise mapped to multiple muscles.
  - `T1.F8.2`: Aggregates multiple exercises targeting the same muscle, summing frequencies.
  - `T1.F8.3`: Records exercise names array under each muscle's `exercises` property.
  - `T1.F8.4`: Preserves zero frequencies for unexercised muscles across all 42 slugs.
  - `T1.F8.5`: Produces a deep-cloned dictionary preventing cross-instance state mutation.
  - `T1.F8.6`: Handles empty exercise list returning pristine default map.
- **F9 (Deduplication & Injury Normalization)**:
  - `T1.F9.1`: Deduplicates body part entries sharing identical `type:muscle` key.
  - `T1.F9.2`: Auto-expands generic unilateral muscle slugs into bilateral `left-` and `right-` variants.
  - `T1.F9.3`: Preserves singular muscles (e.g. `head`) without creating invalid `left-head` variants.
  - `T1.F9.4`: Normalizes `posterior-` and `anterior-` slug prefixes into clean type and muscle attributes.
  - `T1.F9.5`: Filters normalized items by requested view type (`anterior` vs `posterior`).
  - `T1.F9.6`: Handles empty and single-element arrays without mutation.
- **F10 (Interactive Event Handlers & Callbacks)**:
  - `T1.F10.1`: Invokes `onClick` callback with clicked muscle slug and muscle stats metadata.
  - `T1.F10.2`: Invokes `onHover` / `onMouseEnter` callback with muscle parameters.
  - `T1.F10.3`: Invokes `onMouseLeave` callback when cursor leaves polygon.
  - `T1.F10.4`: Supports custom `renderTooltip` returning rendered node or string.
  - `T1.F10.5`: Enforces `pointerEvents: 'none'` when `isDisabled={true}`.
  - `T1.F10.6`: Gracefully handles omitted callback props without runtime exceptions.
- **F11 (Zero Proprietary Leakage & Packaging)**:
  - `T1.F11.1`: Package exports valid ESM bundle entrypoint (`dist/index.js`).
  - `T1.F11.2`: Package exports valid CJS bundle entrypoint (`dist/index.cjs`).
  - `T1.F11.3`: Package exports complete TypeScript definitions (`dist/index.d.ts`).
  - `T1.F11.4`: Package source code contains zero imports from `@/hooks`, `@/utils`, `@/components`, or Jotai.
  - `T1.F11.5`: `package.json` manifest contains correct `peerDependencies` (`react >= 18.0.0`).
  - `T1.F11.6`: `package.json` contains `sideEffects: false` for optimal tree-shaking.
- **F12 (Demo App Foundation & UI Controls)**:
  - `T1.F12.1`: View selector toggles between Anterior, Posterior, and Dual view modes.
  - `T1.F12.2`: Mode selector toggles between Single-Select and Multi-Select behavior.
  - `T1.F12.3`: Color theme controls update body color and highlight color states dynamically.
  - `T1.F12.4`: Extremities modal opens and allows selecting Left/Right Hand and Foot parts.
  - `T1.F12.5`: Code Generator dynamically serializes current component configuration into copyable TSX snippet.
  - `T1.F12.6`: Plexa branding banner renders logo, "Maintained by Plexa", and backlink to `https://www.plexapro.com`.

---

### Tier 2: Boundary & Corner Cases
Verification of edge conditions, extreme parameters, malformed structures, and defensive defaults ($\ge 5$ test cases per feature).

- **Empty / Omitted Inputs**:
  - `T2.1`: `data={[]}` renders clean SVG with all 42 muscles defaulting to `bodyColor`.
  - `T2.2`: `data={undefined}` and missing props render default anterior model without errors.
  - `T2.3`: `selectedParts={[]}` renders visualizer with zero chips and unhighlighted extremities.
  - `T2.4`: `highlightedColors={[]}` falls back to default body color without index out of bounds error.
  - `T2.5`: Empty string muscle slug in exercise data ignored without throwing.
- **Invalid / Malformed Slugs & Data**:
  - `T2.6`: Unknown muscle slug (e.g. `'non-existent-muscle'`) in exercise data does not crash aggregator.
  - `T2.7`: Muscle slug with trailing whitespace or casing mismatch handled defensively.
  - `T2.8`: Malformed exercise object with missing `muscles` array defaults to empty list.
  - `T2.9`: Array containing `null` or `undefined` items filtered out gracefully.
  - `T2.10`: Deeply nested prototype pollution payload strings rejected safely.
- **Frequency Extremes & Numeric Boundaries**:
  - `T2.11`: `frequency: 0` produces unhighlighted default color.
  - `T2.12`: Negative frequency (`frequency: -10`) treated as zero/unhighlighted.
  - `T2.13`: Floating point frequency (`frequency: 3.7`) floored or rounded safely to integer index.
  - `T2.14`: Extreme frequency (`frequency: 999999`) clamped to maximum palette index without memory blowup.
  - `T2.15`: `Number.MAX_SAFE_INTEGER` handled without precision overflow.
- **Extremity Boundary & Invalid Positions**:
  - `T2.16`: Invalid position string (e.g. `'center'`, `undefined`) defaults safely to left orientation.
  - `T2.17`: `width={0}` and `height={0}` handled without SVG rendering collapse.
  - `T2.18`: Negative width/height sanitized or handled cleanly.
  - `T2.19`: `borderWidth={0}` suppresses stroke without DOM error.
  - `T2.20`: Color string with special characters or invalid CSS format rendered without SVG parse failure.
- **Stress & Volume Benchmarks**:
  - `T2.21`: Aggregates 1,000 exercise objects across all 42 muscles in $< 15\text{ms}$.
  - `T2.22`: Normalizes 500 duplicate body parts in $< 10\text{ms}$.
  - `T2.23`: Rapid successive click dispatch (100 sequential events) without race conditions.
  - `T2.24`: Deep state cloning performance maintains immutability across 10,000 iterations.
  - `T2.25`: HTML/XSS injection attempts in exercise names (e.g. `<script>alert(1)</script>`) escaped and safe in DOM/tooltips.

---

### Tier 3: Cross-Feature Combinations
Verification of pairwise interactions, state synchronization, and multi-component workflows.

- **`T3.C1`: Anterior + Posterior Dual Model Synchronization**
  - Exercises with muscles on both front and back (e.g. `trapezius`, `deltoids`, `obliques`) correctly highlight on both anterior and posterior models when rendered together.
- **`T3.C2`: Core Body Model + Extremities Synchronized Palette**
  - Unified color theme (e.g. Danger Red `#ef4444`) applied across main body muscles, Left/Right Hand, and Left/Right Foot with visual coherence.
- **`T3.C3`: Multi-Selection State with Intensity Heatmap**
  - Selecting multiple muscle groups incrementally increases frequency counter and shifts color along a 5-step heat gradient from low (`#fef08a`) to high (`#b91c1c`).
- **`T3.C4`: Interactive Click Event to State Mutation Cycle**
  - Clicking a muscle polygon updates external React state -> passes updated `data` back to `<Model />` -> re-renders polygon with updated intensity color.
- **`T3.C5`: Anatomical Side Label Inversion with Responsive Compact Mode**
  - Front view renders "Right Side" on left and "Left Side" on right; Back view renders "Left Side" on left and "Right Side" on right. When `size="compact"`, container widths scale to `w-32` and font size shifts to `text-base`.
- **`T3.C6`: Preset Selector to Code Generator Synchronization**
  - Loading preset configuration instantly updates both interactive canvas and generated TSX snippet code string, reflecting exact props and data payloads.
- **`T3.C7`: Dark/Light Theme Switching with Dynamic SVG Borders**
  - Switching theme changes `bodyColor` (e.g. `#334155` dark vs `#e2e8f0` light) while preserving stroke contrast (`borderColor="#94a3b8"`, `borderWidth=1`).
- **`T3.C8`: Legacy Normalized Data Ingestion into Composite Visualizer**
  - Ingesting legacy injury records (with `anterior-` / `posterior-` prefixes and un-split bilateral muscles) correctly populates both body models, hand/foot extremity states, and chip tags.

---

### Tier 4: Real-World Application Scenarios
End-to-end multi-step user workflows modeling real-world production use cases.

#### `T4.S1`: Workplace Safety & EHS Incident Report (Plexa Platform Integration)
- **Context**: Construction site health & safety supervisor reporting a multi-zone accident on Plexa.
- **Workflow Steps**:
  1. Initialize incident report with empty body visualizer.
  2. Select injured body parts: `lower-back` (strain from heavy lifting), `right-ankle` (slip/trip), and `left-hand` (pinch injury).
  3. Validate that `lower-back` highlights on Posterior model, `right-ankle` highlights on Anterior model, and Left Hand extremity widget turns active `#81B1D8`.
  4. Generate and verify structured incident report JSON payload:
     ```json
     {
       "incidentId": "INC-2026-0881",
       "injuredParts": ["lower-back", "right-ankle", "left-hand"],
       "bodyViews": ["posterior", "anterior", "extremity-hand"]
     }
     ```
  5. Verify Plexa branding banner and backlink to `https://www.plexapro.com`.

#### `T4.S2`: Gym Workout Fatigue & Recovery Heatmap
- **Context**: Fitness athlete logging an intense "Chest & Triceps Push Day" workout.
- **Workflow Steps**:
  1. Load exercise list:
     - Bench Press (3 sets): `chest`, `triceps`, `front-deltoids` (frequency: 3).
     - Incline Dumbbell Press (2 sets): `chest`, `front-deltoids` (frequency: 2).
     - Tricep Pushdowns (3 sets): `triceps` (frequency: 3).
  2. Normalize and compute total muscle frequencies:
     - `chest`: 5 $\rightarrow$ Tier 5 Max Intensity (`#b91c1c`)
     - `triceps`: 6 $\rightarrow$ Tier 5 Max Intensity (`#b91c1c`)
     - `front-deltoids`: 5 $\rightarrow$ Tier 5 Max Intensity (`#b91c1c`)
     - Unworked muscles (e.g. `quadriceps`, `hamstring`): 0 $\rightarrow$ Default Body Color (`#B6BDC3`).
  3. Verify color gradient mapping on Anterior model.
  4. Calculate total muscle workload summary and export recovery report.

#### `T4.S3`: Telehealth Pain Severity & Physical Therapy Mapping
- **Context**: Physical therapist conducting a remote clinical consultation for chronic lower extremity neuropathy and neck pain.
- **Workflow Steps**:
  1. Map patient-reported pain scores (1-10 VAS scale):
     - `neck`: Severity 4 (Moderate) $\rightarrow$ Highlight color `#fbbf24`.
     - `knees` (bilateral): Severity 8 (Severe) $\rightarrow$ Highlight color `#dc2626`.
     - `left-foot`: Severity 6 (Moderate-Severe) $\rightarrow$ Left Foot widget active `#f97316`.
  2. Verify dual front/back display shows neck and knees highlighted with exact severity colors.
  3. Verify extremity foot card reflects bilateral left-side neuropathy.
  4. Generate clinical consultation summary artifact with mapped anatomical codes.

#### `T4.S4`: Interactive Demo Playground Full Lifecycle
- **Context**: Prospective developer evaluating `@plexapro/react-body-highlighter` on the showcase documentation web application.
- **Workflow Steps**:
  1. Launch showcase app with Anterior view.
  2. Switch view toggle to Posterior view.
  3. Toggle mode to Multi-Select.
  4. Select `gluteal` and `hamstring` muscles.
  5. Change body color palette to Midnight Theme (`bodyColor: "#1e293b"`, `highlight: "#38bdf8"`).
  6. Open Extremities inspector and select Right Foot.
  7. Copy generated TSX code snippet from CodeGenerator component.
  8. Validate that the copied snippet is syntactically valid TSX and accurately matches all selected props and data structures.
  9. Click Plexa logo badge and verify target URL points to `https://www.plexapro.com`.

---

## 5. Verification Protocol & Quality Gates

To certify test suite readiness:
1. **Pass Rate**: 100% of test cases in Tiers 1-4 must execute and pass.
2. **Zero False Positives / Facade Tests**: Every test assertion must validate concrete mathematical properties, coordinate counts, DOM attributes, or state transformations.
3. **Execution Performance**: Full test suite must execute in $< 5$ seconds.
4. **Clean Exit Codes**: The test runner must exit with code `0` on success and non-zero on assertion failure.
