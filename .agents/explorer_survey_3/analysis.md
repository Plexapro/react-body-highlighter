# Architectural Specification: Interactive Showcase Web Application & Open-Source Presentation

**Project:** `@plexapro/react-body-highlighter`  
**Author:** Showcase App & OSS Presentation Architect (`survey_explorer_3`)  
**Target Repository:** `https://github.com/Plexapro/react-body-highlighter`  
**Official Sponsor / Maintainer:** Plexa ([https://www.plexapro.com](https://www.plexapro.com))  
**Date:** 2026-08-24  

---

## Executive Summary

This document provides the complete, production-ready architectural design, UI/UX specification, component hierarchy, metadata configurations, and open-source documentation suite for `@plexapro/react-body-highlighter`.

It covers two major deliverables:
1. **Interactive Showcase Playground Web App**: A modern, responsive, high-performance Vite + React 19 + TailwindCSS application demonstrating every capability of `@plexapro/react-body-highlighter`, featuring real-time state manipulation, extremity visualization, multi-mode inspection, one-click preset scenarios (Plexa Safety Incident, Fitness Tracker, Telehealth Pain Map), live code generation, and prominent Plexa branding.
2. **Open-Source Polish & GitHub Presentation Suite**: A complete GitHub ecosystem containing a rich, conversion-optimized `README.md`, community guidelines (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`, `LICENSE`), issue/PR templates, and an automated GitHub Actions CI workflow (`.github/workflows/ci.yml`).

---

# Part 1: Interactive Showcase Playground Web App

## 1.1 Technology Stack & Architecture

| Layer | Technology | Rationale |
|---|---|---|
| **Build & Dev Tool** | Vite 7.x | Ultra-fast HMR, optimized tree-shaking, lightweight static bundle. |
| **Framework** | React 19 (TypeScript 5.x) | Modern React architecture with strict type safety. |
| **Styling** | TailwindCSS v4 | Atomic utility styling, CSS variables theming, dark mode support. |
| **Icons** | `lucide-react` | Clean, accessible SVG icons (ShieldAlert, Flame, Activity, Copy, Check, Github, ExternalLink, Moon, Sun, RotateCcw). |
| **State Management** | React `useState` / `useReducer` | Lightweight atomic local state without heavy external state libraries. |
| **Syntax Highlighting** | `prismjs` or custom lightweight token highlighter | Instant zero-lag code generation and rendering. |
| **Deployment Target** | GitHub Pages / Vercel / Cloudflare Pages | Single-page application (SPA) with static routing and zero backend requirements. |

---

## 1.2 Application Architecture & Directory Structure

```text
demo/
├── index.html                      # HTML entry point with rich SEO, OG tags, JSON-LD schema
├── package.json                    # Showcase app dependencies & scripts
├── vite.config.ts                  # Vite build config with path aliases
├── src/
│   ├── main.tsx                    # React root mounting
│   ├── App.tsx                     # Main layout & coordinator state
│   ├── index.css                   # Tailwind directives & CSS custom properties
│   ├── types/
│   │   └── showcase.ts             # Showcase-specific state interfaces & preset types
│   ├── data/
│   │   ├── presets.ts              # Preset scenario definitions (Safety, Gym, Telehealth)
│   │   └── muscleMetadata.ts       # Anatomical names, descriptions, categories
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Top navbar with Plexa badge, GitHub stars, NPM copy, Dark mode
│   │   │   ├── HeroBanner.tsx      # High-impact title, value proposition, and quick actions
│   │   │   ├── PlexaCallout.tsx    # "Maintained by Plexa" banner & construction safety case study
│   │   │   └── Footer.tsx          # OSS credits, Plexa backlinks, MIT License link
│   │   ├── canvas/
│   │   │   ├── InteractiveCanvas.tsx # Main dual-model viewport (Anterior & Posterior + Extremities)
│   │   │   ├── BodyModelWrapper.tsx  # Wrapper for Body Model with side labels and zoom/reset
│   │   │   ├── ExtremitiesViewer.tsx # Left/Right Hand and Foot interactive cards
│   │   │   └── AnatomyTooltip.tsx    # Hover tooltip displaying muscle name, frequency, notes
│   │   ├── controls/
│   │   │   ├── SideControlPanel.tsx  # Master control sidebar
│   │   │   ├── ModeSelector.tsx      # Multi-select vs Single-select vs Intensity/Heatmap
│   │   │   ├── ColorPalettePicker.tsx # Custom color pickers for body, highlight, borders
│   │   │   ├── MusclePartList.tsx    # Searchable list of muscles with toggle and intensity sliders
│   │   │   └── ExtremitySelector.tsx # Hand/Foot view switchers (Dorsal, Palmar, Plantar)
│   │   ├── presets/
│   │   │   ├── PresetBar.tsx         # Bottom/Floating scenario selector cards
│   │   │   └── PresetCard.tsx        # Individual preset trigger card with icon & badge
│   │   └── code/
│   │       ├── CodeGeneratorDrawer.tsx # Drawer/Card showing live TSX/JSX snippet
│   │       └── CopyButton.tsx        # One-click copy with animated check state
│   └── utils/
│       ├── codeFormatter.ts        # Generates clean TSX/JSX code strings from current state
│       └── colorUtils.ts           # Hex/HSL interpolation for heatmaps
```

---

## 1.3 UI Layout & User Journey

```text
+---------------------------------------------------------------------------------------------------+
|  [Plexa Logo] @plexapro/react-body-highlighter   [v1.0.0]  [npm i ...] [⭐ Star on GitHub] [🌙/☀️] |
+---------------------------------------------------------------------------------------------------+
|  BANNER: 🏗️ Maintained with ❤️ by Plexa (www.plexapro.com) — Powering construction incident & EHS |
+---------------------------------------------------------------------------------------------------+
|                                 |                                                                 |
|   SIDE CONTROL PANEL (Left)     |   INTERACTIVE CANVAS (Center/Right)                             |
|                                 |                                                                 |
|   1. Mode Selector              |   +-----------------------+  +-----------------------+          |
|      [ Single | Multi | Heat ]  |   |     FRONT (Anterior)  |  |     BACK (Posterior)  |          |
|                                 |   |                       |  |                       |          |
|   2. Theming & Palette          |   |      [SVG Model]      |  |      [SVG Model]      |          |
|      Body Fill:  [ #E2E8F0 ]    |   |                       |  |                       |          |
|      Highlight:  [ #2563EB ]    |   +-----------------------+  +-----------------------+          |
|      Border:     [ #64748B ]    |                                                                 |
|      Border W:   [--o-------]   |   EXTREMITIES INSPECTOR:                                        |
|                                 |   +-------------+ +-------------+ +-------------+ +-----------+ |
|   3. Active Selections & Search |   | Left Hand   | | Right Hand  | | Left Foot   | | Right Foot| |
|      [🔍 Search muscles...   ]  |   | [Dorsal/Plm]| | [Dorsal/Plm]| | [Dorsal/Pln]| |[Dorsal/Pln]||
|      ☑ Chest (Intensity: 8)     |   +-------------+ +-------------+ +-------------+ +-----------+ |
|      ☑ Lower Back (Int: 10)     |                                                                 |
|      ☑ Left Ankle (Int: 5)      |   LIVE ANATOMY TOOLTIP: "Lower Back (Lumbar) • Severity: High"   |
|                                 |                                                                 |
+---------------------------------+-----------------------------------------------------------------+
|  PRESETS BAR: [ 🦺 Workplace Safety Report ]  [ 🏋️ Gym Fatigue Tracker ]  [ 🩺 Medical Pain Map ] |
+---------------------------------------------------------------------------------------------------+
|  LIVE CODE SNIPPET DRAWER: (TSX / JSX Toggle)                               [ 📋 Copy Code Snippet ]|
|  <Model type="anterior" data={[{ name: 'Injury', muscles: ['chest', 'trapezius'] }]} ... />       |
+---------------------------------------------------------------------------------------------------+
```

---

## 1.4 Interactive Feature Set & Capabilities

### Feature 1: Dual Anatomical Orientation (Anterior & Posterior)
- Synchronized or independent front/back body rendering.
- Anatomical side labels ("Right Side" on model's anatomical right / viewer's left, "Left Side" on model's anatomical left / viewer's right).
- Smooth CSS transition highlighting on hover and selection.

### Feature 2: Extremities Specialist View (Hands & Feet)
- Dedicated extremities viewports for intricate injury / joint assessment.
- Support for **Left Hand**, **Right Hand**, **Left Foot**, and **Right Foot**.
- Toggle between anatomical aspects:
  - Hands: **Dorsal** (back of hand) vs **Palmar** (palm).
  - Feet: **Dorsal** (top of foot) vs **Plantar** (sole).
- Individual finger/toe or whole extremity highlighting and selection.

### Feature 3: Interaction Modes
1. **Single Select**: Clicking a muscle isolates that single anatomical part.
2. **Multi-Select**: Toggle multiple muscles and extremity parts simultaneously.
3. **Intensity / Heatmap Mode**: Muscles are mapped with an intensity slider (1 to 10 or 1 to 100), transitioning colors through a user-defined gradient (e.g., `#93C5FD` (low) $\rightarrow$ `#3B82F6` (medium) $\rightarrow$ `#EF4444` (critical)).

### Feature 4: Theming & Customization Palette
- **Body Background Fill**: Dark mode slate (`#1E293B`), Light mode soft gray (`#E2E8F0`), or custom hex.
- **Highlight Palette**: Multi-color arrays (e.g., `['#2563EB', '#F59E0B', '#EF4444']`).
- **Borders & Strokes**: Stroke color picker, stroke width slider (0px to 4px), stroke linecap and linejoin control.
- **Canvas Background**: Transparent, grid-pattern, or solid.

### Feature 5: Real-Time Interactive Preset Scenarios

#### Scenario 1: 🦺 Workplace Safety & EHS Incident Report (Plexa Flagship Preset)
- **Context**: Construction site injury reporting compliant with OSHA / SafeWork guidelines.
- **Preloaded Data**:
  - `lower-back`: Intensity 9 (Lumbar strain from heavy lifting).
  - `right-wrist` / `right-hand`: Intensity 7 (Sprain from repetitive tool handling).
  - `left-knees`: Intensity 5 (Contusion from slip/fall).
- **Metadata displayed**: Incident Date, Severity Level ("High"), Affected Body Zone, OSHA Code, PPE in use.
- **Plexa Callout**: "In Plexa Site Management, safety managers log worker incidents visually in under 15 seconds, automating worker compensation reports and hazard analysis."

#### Scenario 2: 🏋️ Gym Workout & Muscle Fatigue Tracker
- **Context**: Athletic recovery and bodybuilding muscle split tracking (Push / Pull / Legs).
- **Preloaded Data (Chest & Triceps Focus)**:
  - `chest` (anterior): Intensity 10 (Flat Barbell Bench Press, 4 sets).
  - `front-deltoids` (anterior): Intensity 8 (Overhead Shoulder Press, 3 sets).
  - `triceps` (posterior): Intensity 7 (Cable Rope Pushdowns, 4 sets).
  - `abs` (anterior): Intensity 4 (Core stability).
- **Metadata displayed**: Primary targets, secondary synergists, estimated recovery time (48h).

#### Scenario 3: 🩺 Medical & Telehealth Pain Map
- **Context**: Clinical patient intake and chronic pain assessment using the Visual Analogue Scale (VAS 0–10).
- **Preloaded Data**:
  - `neck`: VAS Score 8 (Cervical radiculopathy, radiating).
  - `left-trapezius`: VAS Score 6 (Muscle spasm).
  - `left-deltoids`: VAS Score 5 (Referred pain).
  - `left-ankle`: VAS Score 9 (Acute lateral ligament tear).
- **Metadata displayed**: Pain character (Sharp, Dull, Aching), Duration (>3 months), VAS Score.

### Feature 6: Live Code Snippet Generator with 1-Click Copy
- Generates exact TSX / JSX code matching the active UI configuration in real time.
- Allows switching between:
  - **TypeScript (TSX)** vs **JavaScript (JSX)**.
  - **Minimal Example** (standard props) vs **Full Config** (all event handlers, custom styles, extremity hooks).
- Animated copy feedback with `lucide-react` `Copy` and `Check` icons.

---

## 1.5 Plexa Branding, Value Proposition & Backlinks

### 1.5.1 Brand Alignment
- **Brand Title**: Plexa — The Modern Construction Operations Platform.
- **Website URL**: `https://www.plexapro.com`
- **GitHub Organization**: `https://github.com/Plexapro`
- **Badge Tagline**: `Maintained with ❤️ by Plexa`
- **Color Palette**:
  - Plexa Primary Blue: `#2563EB` (Tailwind `blue-600`) / `#1D4ED8` (Tailwind `blue-700`)
  - Plexa Accent Cyan: `#06B6D4` (Tailwind `cyan-500`)
  - Dark Surface: `#0F172A` (Tailwind `slate-900`) / `#1E293B` (Tailwind `slate-800`)
  - Border Accents: `#334155` (Tailwind `slate-700`)

### 1.5.2 Plexa Hero Callout Component Specification
```tsx
export const PlexaCallout = () => (
  <div className="bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-cyan-900/40 border border-blue-500/30 rounded-xl p-4 sm:p-6 mb-6 backdrop-blur-sm shadow-lg">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-600/20 border border-blue-500/40 rounded-lg text-blue-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
              Battle-Tested in Production
            </span>
            <span className="text-xs text-slate-400">Open Source Core</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            Built by Plexa for High-Stakes Construction Safety & EHS
          </h3>
          <p className="text-sm text-slate-300 mt-0.5 max-w-2xl">
            This component powers visual injury documentation in <a href="https://www.plexapro.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2">Plexa</a>, helping safety officers on enterprise jobsites record, track, and mitigate site incidents in real time.
          </p>
        </div>
      </div>
      <a
        href="https://www.plexapro.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md transition-all whitespace-nowrap"
      >
        Explore Plexa Platform
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
)
```

---

## 1.6 SEO, OpenGraph & Structured Schema Specification

### 1.6.1 HTML `<head>` Meta Tags (`index.html`)

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React Body Highlighter | Interactive SVG Human Body & Injury Visualizer</title>
  
  <!-- Primary Meta Tags -->
  <meta name="title" content="React Body Highlighter | Interactive SVG Human Body & Injury Visualizer" />
  <meta name="description" content="An open-source, fully interactive SVG human body, muscle, and extremities visualizer component for React. Highlight body parts, visualize injuries, track workouts, and map pain points with zero dependencies." />
  <meta name="keywords" content="react, react-body-highlighter, body highlighter, svg body map, injury visualizer, muscle selector, construction safety, telehealth pain map, fitness tracker, plexa, plexapro, typescript react component" />
  <meta name="author" content="Plexa (https://www.plexapro.com)" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://plexapro.github.io/react-body-highlighter/" />

  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://plexapro.github.io/react-body-highlighter/" />
  <meta property="og:title" content="React Body Highlighter | Interactive SVG Human Body & Injury Visualizer" />
  <meta property="og:description" content="Interactive SVG human body and extremities visualizer for React 18 & 19. Custom colors, multi-select, heatmap intensity, and touch support. Open source from Plexa." />
  <meta property="og:image" content="https://plexapro.github.io/react-body-highlighter/og-preview.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="React Body Highlighter by Plexa" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://plexapro.github.io/react-body-highlighter/" />
  <meta name="twitter:title" content="React Body Highlighter | Interactive SVG Human Body & Injury Visualizer" />
  <meta name="twitter:description" content="Interactive SVG human body and extremities visualizer for React 18 & 19. Built with TypeScript, maintained with ❤️ by Plexa." />
  <meta name="twitter:image" content="https://plexapro.github.io/react-body-highlighter/og-preview.png" />

  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "name": "@plexapro/react-body-highlighter",
        "alternateName": "React Body Highlighter",
        "description": "An open-source interactive SVG human body, muscle, and extremities visualizer component for React.",
        "programmingLanguage": ["TypeScript", "JavaScript", "React"],
        "runtimePlatform": "Browser",
        "license": "https://opensource.org/licenses/MIT",
        "codeRepository": "https://github.com/Plexapro/react-body-highlighter",
        "author": {
          "@type": "Organization",
          "name": "Plexa",
          "url": "https://www.plexapro.com",
          "logo": "https://www.plexapro.com/logo.png"
        },
        "maintainer": {
          "@type": "Organization",
          "name": "Plexa",
          "url": "https://www.plexapro.com"
        }
      },
      {
        "@type": "WebSite",
        "name": "React Body Highlighter Interactive Showcase",
        "url": "https://plexapro.github.io/react-body-highlighter/",
        "description": "Interactive demo, documentation, and live code playground for @plexapro/react-body-highlighter.",
        "publisher": {
          "@type": "Organization",
          "name": "Plexa",
          "url": "https://www.plexapro.com"
        }
      }
    ]
  }
  </script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white">
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

# Part 2: Open Source Polish & GitHub Presentation Suite

## 2.1 Complete `README.md` Specification

The project `README.md` must be professional, informative, and visually captivating, incorporating dynamic shields, interactive ASCII diagrams, installation guides, code samples, API tables, and Plexa sponsorship.

```markdown
<div align="center">

# 🧍 React Body Highlighter

### Interactive SVG Human Body & Extremities Visualizer for React

[![NPM Version](https://img.shields.io/npm/v/@plexapro/react-body-highlighter?style=for-the-badge&color=2563EB&labelColor=0F172A)](https://www.npmjs.com/package/@plexapro/react-body-highlighter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=06B6D4&labelColor=0F172A)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6&labelColor=0F172A)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@plexapro/react-body-highlighter?style=for-the-badge&color=10B981&labelColor=0F172A)](https://bundlephobia.com/package/@plexapro/react-body-highlighter)
[![CI Status](https://img.shields.io/github/actions/workflow/status/Plexapro/react-body-highlighter/ci.yml?branch=main&style=for-the-badge&labelColor=0F172A)](https://github.com/Plexapro/react-body-highlighter/actions)
[![Maintained by Plexa](https://img.shields.io/badge/Maintained%20by-Plexa-2563EB?style=for-the-badge&logo=shield&labelColor=0F172A)](https://www.plexapro.com)

<p align="center">
  <a href="https://plexapro.github.io/react-body-highlighter/"><strong>Explore Interactive Demo & Playground »</strong></a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#usage-examples">Usage Examples</a> •
  <a href="#extremities-support">Extremities</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#anatomical-keys">Anatomical Keys</a> •
  <a href="#use-cases">Use Cases</a> •
  <a href="#about-plexa">About Plexa</a>
</p>

</div>

---

## 🌟 Overview

**`@plexapro/react-body-highlighter`** is a lightweight, responsive, type-safe React component for highlighting muscle groups, anatomical body parts, and extremities (hands and feet).

Originally developed and battle-tested by [Plexa](https://www.plexapro.com) for real-time construction site injury documentation and EHS incident reporting, this library has been decoupled and open-sourced for developers building **Workplace Safety Systems**, **Fitness & Workout Trackers**, **Telehealth & Clinical Pain Maps**, and **Ergonomics Tools**.

```text
       Anterior (Front)                        Posterior (Back)
             ( )  <-- Head                           ( )  <-- Neck / Trapezius
            / | \ <-- Chest / Deltoids              / | \ <-- Upper / Lower Back
           /  |  \ <-- Biceps / Abs                /  |  \ <-- Triceps / Lats
          |  / \  | <-- Forearms                  |  / \  | <-- Gluteal
             | |   <-- Quads / Knees                 | |   <-- Hamstrings
             | |   <-- Shins / Ankles                | |   <-- Calves / Achilles
```

---

## ✨ Key Features

- ⚡ **Zero Heavy Runtime Dependencies**: Pure SVG vector graphics rendered via native React DOM elements.
- 📐 **Dual Anatomical Perspectives**: High-definition anterior (front) and posterior (back) body models with 35+ selectable anatomical regions.
- 🖐️ **Extremities Specialists (Hands & Feet)**: Dedicated SVG components for Left/Right Hands and Left/Right Feet with dorsal, palmar, and plantar precision.
- 🎨 **Fully Themeable**: Customize base body fill, multi-level highlight gradients, stroke widths, stroke colors, and hover states.
- 📊 **Heatmap & Intensity Mapping**: Pass custom frequency or severity values to automatically calculate multi-color gradient heatmaps.
- 🛡️ **TypeScript First**: 100% written in TypeScript with full type definitions, auto-complete for muscle IDs, and strict typing.
- ♿ **Accessible & Responsive**: Clean SVG DOM structures with ARIA tags, role attributes, and responsive `viewBox` scaling.

---

## 📦 Quick Start

### 1. Installation

```bash
# Using npm
npm install @plexapro/react-body-highlighter

# Using yarn
yarn add @plexapro/react-body-highlighter

# Using pnpm
pnpm add @plexapro/react-body-highlighter
```

### 2. Basic Example

```tsx
import React, { useState } from 'react'
import Model, { IExerciseData, IMuscleStats } from '@plexapro/react-body-highlighter'

export default function BodyMap() {
  const [highlighted, setHighlighted] = useState<IExerciseData[]>([
    { name: 'Chest Fatigue', muscles: ['chest', 'front-deltoids'], frequency: 2 },
    { name: 'Lower Back Strain', muscles: ['lower-back'], frequency: 5 }
  ])

  const handleClick = (stats: IMuscleStats) => {
    console.log('Clicked muscle:', stats.muscle, stats.data)
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      {/* Front View */}
      <Model
        type="anterior"
        data={highlighted}
        highlightedColors={['#93C5FD', '#2563EB', '#1D4ED8']}
        bodyColor="#E2E8F0"
        borderColor="#64748B"
        borderWidth={1}
        onClick={handleClick}
        style={{ width: '18rem', height: 'auto' }}
      />

      {/* Back View */}
      <Model
        type="posterior"
        data={highlighted}
        highlightedColors={['#93C5FD', '#2563EB', '#1D4ED8']}
        bodyColor="#E2E8F0"
        borderColor="#64748B"
        borderWidth={1}
        onClick={handleClick}
        style={{ width: '18rem', height: 'auto' }}
      />
    </div>
  )
}
```

---

## 🖐️ Extremities Components (Hands & Feet)

In addition to full-body models, `@plexapro/react-body-highlighter` includes dedicated SVG extremity components:

```tsx
import { HandSvg, FootSvg } from '@plexapro/react-body-highlighter'

export function ExtremitiesDemo() {
  return (
    <div className="flex gap-4">
      {/* Left Hand (Highlighted in Red) */}
      <HandSvg
        position="left"
        color="#EF4444"
        borderColor="#991B1B"
        borderWidth={1.5}
        sizing="w-24 h-24"
      />

      {/* Right Hand */}
      <HandSvg
        position="right"
        color="#E2E8F0"
        borderColor="#64748B"
        sizing="w-24 h-24"
      />

      {/* Left Foot */}
      <FootSvg
        position="left"
        color="#3B82F6"
        borderColor="#1D4ED8"
        sizing="w-24 h-24"
      />

      {/* Right Foot */}
      <FootSvg
        position="right"
        color="#E2E8F0"
        borderColor="#64748B"
        sizing="w-24 h-24"
      />
    </div>
  )
}
```

---

## 📖 API Reference

### `<Model />` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'anterior' \| 'posterior'` | `'anterior'` | Anatomical perspective (front vs back). |
| `data` | `IExerciseData[]` | `[]` | Array of highlighted muscle records and frequency scores. |
| `bodyColor` | `string` | `'#E2E8F0'` | Base fill color for unhighlighted muscle segments. |
| `highlightedColors` | `string[]` | `['#81B1D8', '#2563EB']` | Color palette array used for single or gradient frequency highlighting. |
| `borderColor` | `string` | `undefined` | Stroke color outlining muscle boundaries. |
| `borderWidth` | `number` | `1` | Stroke width in pixels. |
| `onClick` | `(stats: IMuscleStats) => void` | `undefined` | Callback fired when an anatomical muscle is clicked. |
| `onHover` | `(stats: IMuscleStats \| null) => void`| `undefined` | Callback fired on mouse enter / leave over a muscle. |
| `style` | `React.CSSProperties` | `{}` | CSS styles applied to the outer container. |
| `svgStyle` | `React.CSSProperties` | `{}` | Inline styles applied directly to the `<svg>` element. |
| `className` | `string` | `''` | Tailwind or CSS class names for styling. |

### Data Interfaces

```typescript
export interface IExerciseData {
  name: string
  muscles: Muscle[]
  frequency?: number
}

export interface IMuscleStats {
  muscle: Muscle
  data: {
    exercises: string[]
    frequency: number
  }
}
```

---

## 🗺️ Anatomical Muscle Keys (`Muscle`)

The following muscle keys are supported out-of-the-box:

| Anterior (Front View) | Posterior (Back View) | Extremities & Joints |
|---|---|---|
| `head` | `neck`, `left-neck`, `right-neck` | `left-forearm`, `right-forearm` |
| `chest`, `left-chest`, `right-chest` | `trapezius`, `left-trapezius`, `right-trapezius` | `left-hand`, `right-hand` |
| `biceps`, `left-biceps`, `right-biceps` | `upper-back`, `left-upper-back`, `right-upper-back` | `left-ankle`, `right-ankle` |
| `front-deltoids`, `left-front-deltoids` | `back-deltoids`, `left-back-deltoids` | `left-foot`, `right-foot` |
| `abs`, `left-abs`, `right-abs` | `lower-back`, `left-lower-back`, `right-lower-back` | `left-knees`, `right-knees` |
| `obliques`, `left-obliques`, `right-obliques` | `triceps`, `left-triceps`, `right-triceps` | `left-soleus`, `right-soleus` |
| `quadriceps`, `left-quadriceps` | `gluteal`, `left-gluteal`, `right-gluteal` | |
| `adductor`, `left-adductor` | `hamstring`, `left-hamstring`, `right-hamstring` | |
| `shins`, `left-shins`, `right-shins` | `calves`, `left-calves`, `right-calves` | |

---

## 🏗️ Real-World Use Cases

### 1. Workplace EHS & Construction Incident Reporting (Plexa)
Safety officers click the exact injury location on site tablets, generating OSHA-compliant incident logs with injury classifications (e.g. laceration, sprain, fracture).

### 2. Gym Workout & Fatigue Analytics
Track muscle group training volume across sets and repetitions, highlighting fatigued muscle zones in red and rested muscles in green.

### 3. Telehealth & Physical Therapy Pain Maps
Patients click and grade their discomfort on a 1-to-10 VAS visual scale prior to remote physical therapy consultations.

---

## 🏢 Maintained by Plexa

<div align="center">
  <a href="https://www.plexapro.com">
    <img src="https://raw.githubusercontent.com/Plexapro/react-body-highlighter/main/assets/plexa-banner.svg" alt="Plexa Platform" width="100%" />
  </a>
</div>

**React Body Highlighter** is proudly maintained by the engineering team at [Plexa](https://www.plexapro.com).

Plexa is the leading construction operations and site management platform, connecting field safety, financials, subcontracts, and daily site logs in one unified workspace.

- 🌐 **Website**: [https://www.plexapro.com](https://www.plexapro.com)
- 💼 **Careers**: [https://www.plexapro.com/careers](https://www.plexapro.com/careers)
- 🐦 **Twitter/X**: [@PlexaPro](https://twitter.com/PlexaPro)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Please check our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request.

```bash
# Clone the repository
git clone https://github.com/Plexapro/react-body-highlighter.git

# Install dependencies
yarn install

# Run showcase demo
yarn dev

# Run test suite
yarn test
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

Copyright (c) 2026 [Plexa](https://www.plexapro.com). All rights reserved.
```

---

## 2.2 GitHub Community Templates & Workflows

### 2.2.1 Bug Report Template (`.github/ISSUE_TEMPLATE/bug_report.md`)

```markdown
---
name: 🐛 Bug Report
about: Create a report to help us improve @plexapro/react-body-highlighter
title: '[BUG] '
labels: ['bug', 'triage']
assignees: ''
---

## 🐛 Bug Description
A clear and concise description of what the bug is.

## 🔄 Reproduction Steps
Steps to reproduce the behavior:
1. Initialize `<Model type="anterior" ... />` with props: `...`
2. Click on muscle `...`
3. Notice unexpected behavior: `...`

## 💻 Minimal Code Example
```tsx
import Model from '@plexapro/react-body-highlighter';

export function BugRepro() {
  return (
    <Model
      type="anterior"
      data={[{ name: 'Test', muscles: ['chest'] }]}
    />
  );
}
```

## 🎯 Expected Behavior
A clear and concise description of what you expected to happen.

## 🖥️ Environment & Versions
- **Package Version**: (e.g. `1.0.0`)
- **React Version**: (e.g. `19.0.0` / `18.3.1`)
- **Browser**: (e.g. Chrome 128, Safari 18, Firefox 130)
- **OS**: (e.g. macOS 15, Windows 11, iOS 18, Android 14)
- **Bundler**: (e.g. Vite 7, Next.js 15, Webpack 5)

## 📸 Screenshots / Recordings
If applicable, add screenshots or screen recordings to help explain your problem.

## 📋 Additional Context
Add any other context about the problem here (e.g., SSR behavior, SVG rendering quirks).
```

---

### 2.2.2 Feature Request Template (`.github/ISSUE_TEMPLATE/feature_request.md`)

```markdown
---
name: 🚀 Feature Request
about: Suggest an idea or enhancement for @plexapro/react-body-highlighter
title: '[FEAT] '
labels: ['enhancement']
assignees: ''
---

## 💡 Feature Summary
A clear and concise description of what the feature or improvement is.

## 🎯 Problem It Solves
Is your feature request related to a problem or limitation? (e.g., "I'm always frustrated when trying to isolate specific finger joints...")

## 🛠️ Proposed Solution / API Design
Describe how you envision the feature working and what the API / JSX props would look like:

```tsx
<Model
  type="anterior"
  enableZoom={true}
  zoomFactor={1.5}
  onPartHover={(part) => console.log(part)}
/>
```

## 🔄 Alternative Solutions Considered
A description of any alternative solutions or workarounds you've considered.

## 🏢 Use Case (EHS Safety / Fitness / Telehealth / Other)
Explain the real-world application (e.g., Construction safety incident logging in Plexa, gym tracker, clinical diagnosis).

## 📋 Additional Context
Add any other context, diagrams, or mockups here.
```

---

### 2.2.3 Pull Request Template (`.github/PULL_REQUEST_TEMPLATE.md`)

```markdown
## 📝 Description
Provide a clear and concise summary of the changes introduced in this pull request.

Fixes #(issue_number)

## 🔀 Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 Code style / formatting / refactoring
- [ ] ⚡ Performance optimization
- [ ] 🧪 Tests (adding missing tests or correcting existing tests)
- [ ] 🏗️ Build / CI / Tooling changes

## 🧪 Verification & Testing
Describe the tests you ran to verify your changes:
- [ ] Ran `yarn test` — all unit tests pass
- [ ] Ran `yarn build` — clean TypeScript and ESM/CJS compilation
- [ ] Ran `yarn lint` — no ESLint or formatting errors
- [ ] Verified visually in the demo showcase app (`yarn dev`)

## 📸 Screenshots / Previews (if UI changed)
| Before | After |
|---|---|
| (image) | (image) |

## 📋 Checklist
- [ ] My code follows the repository's code style and TypeScript guidelines.
- [ ] I have commented my code, particularly in hard-to-understand areas.
- [ ] I have updated the documentation / README accordingly.
- [ ] My changes generate no new warnings or TypeScript errors.
- [ ] I have added tests that prove my fix is effective or that my feature works.
```

---

### 2.2.4 GitHub Actions CI Workflow (`.github/workflows/ci.yml`)

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate:
    name: Lint, Test & Build (Node ${{ matrix.node-version }})
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]

    steps:
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'yarn'

      - name: 📦 Install dependencies
        run: yarn install --frozen-lockfile

      - name: 🔍 Type-check
        run: yarn type-check

      - name: 🧹 ESLint & Prettier check
        run: yarn lint

      - name: 🧪 Run Vitest unit tests
        run: yarn test:coverage

      - name: 🏗️ Build Library Package
        run: yarn build

      - name: 🚀 Build Showcase Demo App
        run: yarn build:demo

      - name: 📊 Upload Test Coverage
        if: matrix.node-version == '20.x'
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: false
```

---

### 2.2.5 MIT License (`LICENSE`)

```text
MIT License

Copyright (c) 2026 Plexa (https://www.plexapro.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

### 2.2.6 Contributing Guide (`CONTRIBUTING.md`)

```markdown
# Contributing to @plexapro/react-body-highlighter

Thank you for your interest in contributing to **`@plexapro/react-body-highlighter`**! This open-source project is maintained by [Plexa](https://www.plexapro.com) and the community.

## 📜 Code of Conduct
Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all project interactions.

---

## 🛠️ Development Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **Yarn**: `v1.22+` or Corepack Yarn

### Initial Setup
```bash
# 1. Fork and clone the repository
git clone https://github.com/<your-username>/react-body-highlighter.git
cd react-body-highlighter

# 2. Install dependencies
yarn install

# 3. Start the interactive demo showcase
yarn dev
```

---

## 📂 Project Structure

```text
react_body_highlighter/
├── src/                # Library source code
│   ├── assets/         # Raw anatomical SVGs and path vectors
│   ├── component/      # React Model and Extremity components
│   ├── constants/      # Muscle and model type definitions
│   └── index.ts        # Main library entry point
├── demo/               # Showcase playground web app
├── test/               # Vitest unit and integration test suite
└── .github/            # GitHub workflows and community templates
```

---

## 🌿 Git & Branching Strategy

- **Branch Naming**:
  - `feat/feature-name` for new features.
  - `fix/bug-description` for bug fixes.
  - `docs/update-readme` for documentation.
- **Commit Messages**: Follow Conventional Commits:
  - `feat(model): add hover callbacks for muscle groups`
  - `fix(svg): correct left-hand palmar viewBox alignment`
  - `docs: update API reference table`

---

## 🧪 Testing Guidelines

Before opening a pull request, run all verification commands:

```bash
yarn lint        # Check code quality and formatting
yarn type-check  # Verify TypeScript compilation
yarn test        # Run Vitest unit tests
yarn build       # Ensure library bundles build cleanly
```

---

## 🚀 Pull Request Process

1. Ensure all tests and lint checks pass.
2. Update documentation / README if introducing new props or behaviors.
3. Link your PR to any relevant issue (`Fixes #12`).
4. Maintainers will review and provide feedback promptly.
```

---

### 2.2.7 Changelog (`CHANGELOG.md`)

```markdown
# Changelog

All notable changes to `@plexapro/react-body-highlighter` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-24

### Added
- **Core Body Model**: High-definition anterior (front) and posterior (back) SVG human body models.
- **35+ Muscle Groups**: Full coverage of anatomical muscle regions including upper back, lower back, chest, deltoids, quadriceps, hamstrings, calves, and abs.
- **Extremities Components**: Dedicated `HandSvg` and `FootSvg` components with Left/Right positioning and customizable dimensions.
- **Intensity & Heatmap Support**: Dynamic frequency/intensity mapping with custom multi-color gradient thresholds.
- **TypeScript Support**: Full `.d.ts` type definitions for `Muscle`, `ModelType`, `IExerciseData`, and `IMuscleStats`.
- **Interactive Showcase**: Modern Vite + React playground with live preset scenarios (Workplace Safety, Gym Workout, Telehealth Pain Map) and live code generator.
- **Community & CI Suite**: Comprehensive GitHub templates, MIT License, and GitHub Actions CI workflow.

### Origin
- Open-sourced and decoupled from [Plexa](https://www.plexapro.com) construction safety and incident management platform.
```

---

### 2.2.8 Security Policy (`SECURITY.md`)

```markdown
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within `@plexapro/react-body-highlighter`, please do **not** open a public issue.

Instead, please send an email to **security@plexapro.com** with:
- A description of the vulnerability.
- Steps or a minimal code example to reproduce the issue.
- Potential impact and affected versions.

The Plexa security team will acknowledge receipt within 48 hours and work with you on a coordinated disclosure and patch release.
```

---

# Part 3: Implementation Roadmaps & Recommendations

1. **Downstream Implementer Guidance**:
   - The showcase app in `demo/` should import the library directly from `src/index.ts` during development to allow instant hot-reloading.
   - For production deployment, ensure the showcase build outputs to `dist-demo/` or `build-demo/` so it does not conflict with the library's `dist/` bundle.
2. **Plexa Asset Delivery**:
   - Store official vector SVGs in `assets/` (e.g. `plexa-logo.svg`, `plexa-banner.svg`).
   - Use high-contrast accessible color tokens for both dark and light modes.
