# Master Plan: `@plexapro/react-body-highlighter` Open-Source Project

## Phase 0: Survey & Source Analysis
- Dispatch 3 parallel Explorers:
  1. `teamwork_preview_explorer` (Explorer 1): Analyze source components (`BodyVisualiser.tsx`, `react-body-highlighter` folder, `HandSvg.tsx`, `FootSvg.tsx`). Detail SVG paths, coordinates, body part identifiers, props, events, selection state, extremities mapping, and isolation from proprietary imports.
  2. `teamwork_preview_spec_miner` (Explorer 2): Analyze build system, monorepo/workspace setup, TypeScript config, Vite/tsup packaging for ESM + CJS + .d.ts, zero proprietary leakage check, package.json manifest specifications for `@plexapro/react-body-highlighter`.
  3. `teamwork_preview_explorer` (Explorer 3): Analyze Demo Showcase App requirements, TailwindCSS/UI integration, interactive controls, color themes, extremities selector, snippet generator, SEO metadata/OpenGraph, Plexa branding assets, and GitHub templates/CI workflows/docs.
- Synthesize all reports into `PROJECT.md` at project root with complete Feature Inventory, Milestones, Code Layout, Interface Contracts.

## Phase 1: Dual Track Initiation
- **E2E Testing Track**: Spawn E2E Testing Orchestrator / Test Writer specialists to define test infrastructure, test runner, and comprehensive test suite across Tiers 1-4.
- **Implementation Track**:
  - **Milestone 1**: Standalone React Library (`@plexapro/react-body-highlighter`)
    * Core Body component (Front & Back view) with full muscle/body part SVG coordinates and paths
    * Extremities components (`HandSvg`, `FootSvg` with dorsal/palmar/plantar views if available)
    * Type definitions, event handlers (`onClick`, `onHover`, `onMouseEnter`, `onMouseLeave`), tooltips, color maps, multi-select support
    * Build pipeline producing ESM, CJS, and `.d.ts` definitions.
    * Unit & integration tests for the package.
  - **Milestone 2**: Interactive Demo Showcase & Documentation Web Application
    * Vite + React + Tailwind application under `apps/demo` (or `demo/`)
    * Interactive playground: Front/Back toggles, Body/Hand/Foot extremity switchers, custom color pickers, multi-select mode, presets (e.g. Safety Incident, Gym Workout, Physiotherapy)
    * Code snippet generator / export tool
    * Plexa branding (Plexa header, logo, "Maintained by Plexa" banner, backlinks to `www.plexapro.com`)
    * Full SEO optimization (meta tags, OpenGraph preview cards, Twitter cards, JSON-LD structured data).
  - **Milestone 3**: Open Source Polish, CI/CD, Documentation & GitHub Presentation
    * High-converting, rich README.md with live interactive badges, ASCII architecture diagrams, quickstart, props reference, examples, Plexa sponsor promotion.
    * GitHub repo templates (`.github/ISSUE_TEMPLATE`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/workflows/ci.yml` with lint, build, test workflows).
    * `CONTRIBUTING.md`, `LICENSE` (MIT), `CHANGELOG.md`, `SECURITY.md`.
  - **Milestone 4**: Final E2E Test Suite Pass & Adversarial Hardening (Tiers 1-5)
    * Pass 100% of E2E test suite (Tiers 1-4).
    * Phase 2: Adversarial Coverage Hardening (Tier 5) with Challengers.
    * Forensic Auditor verification.

## Phase 2: Synthesis & Completion Report
- Final summary and handoff to parent agent.
