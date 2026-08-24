## 2026-08-24T07:46:40Z

You are survey_spec_miner_2 (Role: Packaging & Build Specification Miner).
Your working directory is: /Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/spec_miner_survey_2/
The original user request is at: /Users/seanhamawi/teamwork_projects/react_body_highlighter/ORIGINAL_REQUEST.md

Mission: Investigate and design the exact technical specification, monorepo/package layout, build system, and distribution packaging for `@plexapro/react-body-highlighter`.

Your task:
1. Initialize your BRIEFING.md and progress.md in your working directory.
2. Formulate the architecture and configuration specification:
   - Monorepo / workspace layout structure (e.g. `packages/react-body-highlighter` for the npm library and `apps/demo` for the showcase playground web app, or clean root package setup).
   - Package manifest (`package.json`) for `@plexapro/react-body-highlighter`: name, version, description, author, license (MIT), repository (`https://github.com/Plexapro/react-body-highlighter`), homepage, keywords, exports map (`.` and subpath exports if needed), main (CJS), module (ESM), types (.d.ts), files, peerDependencies (React 18 & React 19 support, `react`, `react-dom`), sideEffects: false.
   - Bundler & build toolchain configuration (e.g. Vite in library mode, tsup, or rollup + tsc) to produce clean, tree-shakeable ESM (`dist/index.mjs` / `dist/index.js`), CJS (`dist/index.cjs`), and complete TypeScript `.d.ts` declaration bundles.
   - Verify zero proprietary dependency leakage and define strict isolation boundaries.
   - Define testing framework setup (Vitest + React Testing Library) for high coverage.
3. Write your comprehensive specification report to:
   /Users/seanhamawi/teamwork_projects/react_body_highlighter/.agents/spec_miner_survey_2/analysis.md
4. Write your handoff.md following standard protocol.
5. Send a message back to parent when complete.
