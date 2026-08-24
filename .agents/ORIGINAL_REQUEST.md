# Original User Request

## Initial Request — 2026-08-24T07:45:23+10:00

Build a complete, production-ready open-source project for an interactive SVG Human Body & Injury Visualizer (`@plexapro/react-body-highlighter`), hosted for GitHub under `https://github.com/Plexapro` and branded for Plexa (www.plexapro.com), optimized for GitHub stars, SEO discovery, and npm downloads.

Working directory: ~/teamwork_projects/react_body_highlighter
Integrity mode: development

Source reference to copy/adapt SVGs and logic from:
- /Users/seanhamawi/Documents/PLEXA_FRONTEND/frontend/src/components/BodyVisualiser.tsx
- /Users/seanhamawi/Documents/PLEXA_FRONTEND/frontend/src/components/react-body-highlighter
- /Users/seanhamawi/Documents/PLEXA_FRONTEND/frontend/src/components/ui/HandSvg.tsx
- /Users/seanhamawi/Documents/PLEXA_FRONTEND/frontend/src/components/ui/FootSvg.tsx

## Requirements

### R1. Standalone React Library Package
- Complete, type-safe interactive body highlighter component supporting front/back views, muscle/body part highlighting, custom colors, click/hover handlers, and detailed sub-parts (hands, feet).
- Adapted from the existing codebase body highlighter SVGs and component logic.
- Clean build setup producing TypeScript definitions (`.d.ts`), ESM, and CommonJS bundles with zero proprietary business-logic leakage.

### R2. Interactive Demo & Documentation Web Application
- Modern, interactive showcase playground web app demonstrating:
  - Full body front/back view with selectable muscle groups / body parts.
  - Extremities selector (hands and feet).
  - Custom color palette theming and multi-selection mode.
  - Code generator / snippet copy for easy developer adoption.
- Prominently styled and branded with Plexa branding (referencing www.plexapro.com, Plexa logo/badges, "Maintained by Plexa" banner, and backlink to Plexa's construction management platform).
- SEO-optimized metadata, title tags, OpenGraph preview cards, structured data, and search keywords for search engines.

### R3. Open Source Polish & GitHub Presentation
- Rich, high-converting `README.md` complete with:
  - Interactive GIF / screenshot previews.
  - Badges (npm version, bundle size, license, build status).
  - Quickstart guide and API reference table.
  - Live demo link and use-case examples (Safety/EHS incident reporting, fitness/workout tracking, medical/telehealth).
  - Prominent attribution and promotion for Plexa (www.plexapro.com).
- GitHub repository templates (Issue templates, PR template, CI workflow for build/lint, MIT license, contributing guide).

## Acceptance Criteria

### Build & Package Verification
- [ ] Library builds cleanly (`yarn build` / `npm run build`) generating valid ESM, CJS, and `.d.ts` type declaration artifacts.
- [ ] No circular dependencies or broken relative paths.
- [ ] Zero internal proprietary dependencies included.

### Demo & App Verification
- [ ] Demo web app builds and runs locally without errors.
- [ ] Interactive controls (selecting muscles, toggling front/back, hands, feet, custom colors) update visual state correctly.

### Branding & SEO
- [ ] Plexa logo / badge and backlink to `https://www.plexapro.com` are clearly positioned in both the README and Demo app.
- [ ] Metadata tags (`<title>`, `<meta description>`, OpenGraph/Twitter tags, keywords) are populated for maximum search discoverability.
