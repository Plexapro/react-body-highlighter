# BRIEFING — 2026-08-24T07:48:15Z

## Mission
Investigate and design the exact technical specification, monorepo/workspace layout, build system, and distribution packaging for `@plexapro/react-body-highlighter`.

## 🔒 My Identity
- Archetype: spec_miner
- Roles: Packaging & Build Specification Miner (survey_spec_miner_2)
- Working directory: /Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/spec_miner_survey_2
- Original parent: d98ebf5b-e99a-4563-8520-56e5373d5259
- Milestone: Phase 0 Survey & Source Analysis

## 🔒 Key Constraints
- Standalone open-source library under `@plexapro/react-body-highlighter`
- Zero proprietary business-logic, internal URLs, or token leakage
- Pure MIT open source licensing (branded for Plexa)
- Dual ESM / CJS output + complete TypeScript `.d.ts` declaration bundles
- React 18 (`>=18.0.0`) and React 19 (`>=19.0.0`) peerDependencies support
- Modern `exports` map in `package.json` with `import`, `require`, and `types` conditions
- `sideEffects: false` for optimal tree-shaking
- Clean monorepo workspace architecture with showcase demo app (`packages/react-body-highlighter` + `apps/demo`)
- Vitest + React Testing Library setup for reliable CI testing

## Current Parent
- Conversation ID: d98ebf5b-e99a-4563-8520-56e5373d5259
- Updated: 2026-08-24T07:48:15Z

## Task Summary
- **What to build**: Technical architecture, monorepo structure, package manifest, bundler toolchain, typing setup, test framework, and isolation specification for `@plexapro/react-body-highlighter`.
- **Success criteria**: Detailed, actionable specification report in `analysis.md` and standard 5-component `handoff.md`.
- **Interface contracts**: `/Users/seanhamawi/teamwork_projects/react_body_highlighter/ORIGINAL_REQUEST.md`
- **Code layout**: Monorepo with `packages/react-body-highlighter` and `apps/demo`.

## Key Decisions Made
- Selected npm workspace monorepo layout (`packages/react-body-highlighter` + `apps/demo`).
- Selected `tsup` for library bundling with esbuild core, emitting `dist/index.js` (ESM), `dist/index.cjs` (CJS), and bundled `dist/index.d.ts` with RSC `"use client"` banner.
- Specified complete `package.json` manifest with conditional exports map (`types`, `import`, `require`).
- Verified zero proprietary dependencies: replaced all `@/` imports with generic types and native string formatting.
- Configured Vitest + React Testing Library + jsdom for >90% test coverage.
- Formulated GitHub Actions CI/CD workflows for PR validation and tag-based npm releases.

## Artifact Index
- `/Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/spec_miner_survey_2/analysis.md` — Packaging & Build Specification Report
- `/Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/spec_miner_survey_2/handoff.md` — Handoff Report
