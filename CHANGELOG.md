# Changelog

All notable changes to `@plexapro/react-body-highlighter` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-24

### Added
- **Core Vector Model Component (`Model`)**: High-definition anterior (front) and posterior (back) SVG human body visualization with responsive `0 0 100 200` coordinate system.
- **42 Anatomical Muscle Slugs**: Comprehensive coverage of muscle regions including `trapezius`, `upper-back`, `lower-back`, `chest`, `biceps`, `triceps`, `forearm`, `front-deltoids`, `back-deltoids`, `abs`, `obliques`, `adductor`, `abductors`, `hamstring`, `quadriceps`, `calves`, `shins`, `gluteal`, `head`, `neck`, `knees`, `soleus`, `ankles`, and bilateral subdivisions (`left-*` and `right-*`).
- **Extremities Specialist Components (`HandSvg`, `FootSvg`)**: Standalone SVG components for Left/Right Hands and Left/Right Feet with bilateral reflection, customizable dimensions, colors, and borders.
- **Composite Body Visualizer (`BodyVisualizer`)**: High-level component combining anterior and posterior models, extremities inspection chips, side labels, and selection badges.
- **Dynamic Intensity & Heatmap Engine**: Frequency/intensity color interpolation algorithm supporting multi-color gradient palettes for fatigue, pain mapping, and injury severity tracking.
- **Event Handling & Custom Tooltips**: Built-in `onClick`, `onHover`, and `renderTooltip` hooks for rich interactive applications.
- **Zero Runtime Dependencies**: Ultra-lightweight footprint with zero external dependencies, rendering purely through native SVG and React DOM elements.
- **Universal Bundling & Server Components**: Dual ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) output with full `.d.ts` TypeScript definitions and `"use client"` banner for Next.js App Router and SSR compatibility.
- **Showcase Demo Playground**: Interactive documentation and live playground web app (`apps/demo`) featuring preset scenarios (Plexa Workplace Safety / EHS, Gym Workout Soreness, Telehealth Pain Map) and live code generation.
- **Open Source Governance & CI**: GitHub Actions matrix CI workflow (Node 18, 20, 22), bug report and feature request templates, pull request template, MIT License, and security policy.

### Origin
- Open-sourced and decoupled from [Plexa](https://www.plexapro.com), the leading construction operations and workplace safety management platform.
