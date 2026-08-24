<div align="center">

# 🧍 React Body Highlighter

### Interactive Vector SVG Human Body & Injury Visualizer for React

[![NPM Version](https://img.shields.io/npm/v/@plexapro/react-body-highlighter?style=for-the-badge&color=2563EB&labelColor=0F172A)](https://www.npmjs.com/package/@plexapro/react-body-highlighter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=06B6D4&labelColor=0F172A)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6&labelColor=0F172A)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20runtime-emerald?style=for-the-badge&color=10B981&labelColor=0F172A)](https://www.npmjs.com/package/@plexapro/react-body-highlighter)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@plexapro/react-body-highlighter?style=for-the-badge&color=8B5CF6&labelColor=0F172A)](https://bundlephobia.com/package/@plexapro/react-body-highlighter)
[![CI Status](https://img.shields.io/github/actions/workflow/status/Plexapro/react-body-highlighter/ci.yml?branch=main&style=for-the-badge&labelColor=0F172A)](https://github.com/Plexapro/react-body-highlighter/actions)
[![Maintained by Plexa](https://img.shields.io/badge/Maintained%20by-Plexa-2563EB?style=for-the-badge&logo=shield&labelColor=0F172A)](https://www.plexapro.com)

<p align="center">
  <strong>High-performance, type-safe interactive human body highlighter with 42 anatomical regions, bilateral extremities (hands & feet), intensity heatmaps, custom theming, and zero runtime dependencies.</strong>
</p>

<p align="center">
  <a href="https://plexapro.github.io/react-body-highlighter/"><strong>🚀 Explore Interactive Live Playground & Documentation »</strong></a>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-usage-examples">Usage Examples</a> •
  <a href="#-extremities-specialist-components">Extremities</a> •
  <a href="#-composite-bodyvisualizer">BodyVisualizer</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-anatomical-muscle-slugs-reference">Muscle Slugs</a> •
  <a href="#-real-world-use-cases">Use Cases</a> •
  <a href="#-maintained-by-plexa">Maintained by Plexa</a>
</p>

</div>

---

## 🌟 Overview

**`@plexapro/react-body-highlighter`** is a production-grade, zero-dependency React component library for visualizing and interacting with the human musculoskeletal system. It offers pixel-accurate anterior (front) and posterior (back) anatomical vector SVGs, standalone extremity renderers (hands and feet), customizable color palettes, frequency/intensity heatmap calculations, click/hover interaction hooks, and tooltip rendering.

Originally engineered and battle-tested by **[Plexa](https://www.plexapro.com)** for enterprise workplace safety and real-time construction incident documentation, this library has been decoupled and open-sourced to empower developers building:
- 🦺 **Workplace Safety & EHS Platforms** (OSHA incident logs, injury tracking, site hazard heatmaps)
- 🏋️ **Fitness & Bodybuilding Trackers** (Muscle fatigue analysis, recovery timers, workout logs)
- 🩺 **Telehealth & Physical Therapy Portals** (Patient intake, Visual Analogue Scale [VAS] pain mapping)
- 🪑 **Ergonomics & Occupational Health Systems** (Repetitive strain tracking, posture analysis)

<img width="475" height="778" alt="image" src="https://github.com/user-attachments/assets/38493367-fee4-448e-8817-e2594779087a" />



---

## ✨ Key Features

- ⚡ **Zero Runtime Dependencies**: Renders clean, high-performance vector SVGs directly into the React virtual DOM with zero heavy external libraries.
- 📐 **Dual Anatomical Perspectives**: High-definition Anterior (front) and Posterior (back) body models with 42 distinct anatomical muscle regions and bilateral subdivision support.
- 🖐️ **Dedicated Extremities Specialists**: Standalone `HandSvg` and `FootSvg` vector components with left/right bilateral scaling, custom borders, and custom fill colors.
- 🧩 **Composite `BodyVisualizer` Layout**: Turnkey dual-view component with side labels ("Right Side" / "Left Side"), extremity preview chips, active selection tags, and unified click handlers.
- 📊 **Dynamic Intensity & Heatmap Engine**: Pass frequency scores, workout reps, or pain severity (1–10 VAS) to automatically interpolate multi-color gradient heatmaps.
- 🎨 **Unlimited Theming & Customization**: Granular control over base body fill, stroke colors, stroke widths, hover highlights, and dark/light modes.
- 🛡️ **TypeScript First**: 100% written in TypeScript with full strict type definitions, autocomplete for all 42 muscle slugs, and exported data contracts.
- 🚀 **Next.js & SSR Ready**: Packaged with `"use client"` directives for seamless Next.js App Router, Remix, and Gatsby compatibility.
- 📦 **Dual ESM & CommonJS Bundling**: Cleanly bundles to `dist/index.js` (ESM), `dist/index.cjs` (CJS), and `dist/index.d.ts` declaration maps.

---

## 📦 Installation

Install `@plexapro/react-body-highlighter` using your package manager of choice:

```bash
# Using npm
npm install @plexapro/react-body-highlighter

# Using yarn
yarn add @plexapro/react-body-highlighter

# Using pnpm
pnpm add @plexapro/react-body-highlighter

# Using bun
bun add @plexapro/react-body-highlighter
```

> **Peer Dependency Notice**: Requires `react >= 18.0.0` and `react-dom >= 18.0.0`.

---

## 🚀 Quick Start

### 1. Basic Front & Back Visualization

```tsx
import React, { useState } from 'react'
import { Model, IExerciseData, IMuscleStats } from '@plexapro/react-body-highlighter'

export default function BodyMap() {
  const [data, setData] = useState<IExerciseData[]>([
    { name: 'Chest Pain', muscles: ['chest', 'left-front-deltoids'], frequency: 3 },
    { name: 'Lower Back Strain', muscles: ['lower-back'], frequency: 5 }
  ])

  const handleMuscleClick = (stats: IMuscleStats) => {
    console.log('Clicked muscle:', stats.muscle)
    console.log('Associated records:', stats.data.exercises)
    console.log('Frequency score:', stats.data.frequency)
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
      {/* Front / Anterior View */}
      <div>
        <h3>Anterior</h3>
        <Model
          type="anterior"
          data={data}
          bodyColor="#E2E8F0"
          highlightedColors={['#93C5FD', '#2563EB', '#1D4ED8']}
          borderColor="#64748B"
          borderWidth={1}
          onClick={handleMuscleClick}
          style={{ width: '18rem', height: 'auto' }}
        />
      </div>

      {/* Back / Posterior View */}
      <div>
        <h3>Posterior</h3>
        <Model
          type="posterior"
          data={data}
          bodyColor="#E2E8F0"
          highlightedColors={['#93C5FD', '#2563EB', '#1D4ED8']}
          borderColor="#64748B"
          borderWidth={1}
          onClick={handleMuscleClick}
          style={{ width: '18rem', height: 'auto' }}
        />
      </div>
    </div>
  )
}
```

---

## 💡 Usage Examples

### 1. Multi-Select Injury & Incident Logging (Workplace Safety / EHS)

In workplace incident reporting, safety officers select multiple affected regions and log specific injury types:

```tsx
import React, { useState } from 'react'
import { Model, Muscle, IBodyPart, IMuscleStats } from '@plexapro/react-body-highlighter'

export function WorkplaceInjuryLogger() {
  const [injuries, setInjuries] = useState<IBodyPart[]>([
    { name: 'Lumbar Strain (Lifting)', type: 'posterior', muscles: ['lower-back'], color: '#EF4444' },
    { name: 'Right Wrist Sprain', type: 'anterior', muscles: ['right-forearm'], color: '#F59E0B' }
  ])

  const handleToggleMuscle = (stats: IMuscleStats) => {
    const slug = stats.muscle
    const existingIndex = injuries.findIndex(i => i.muscles.includes(slug))

    if (existingIndex >= 0) {
      // Remove injury
      setInjuries(prev => prev.filter((_, idx) => idx !== existingIndex))
    } else {
      // Add new logged injury
      setInjuries(prev => [
        ...prev,
        {
          name: `Reported Injury (${slug})`,
          type: 'anterior',
          muscles: [slug],
          color: '#EF4444'
        }
      ])
    }
  }

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">Site Incident Report: Visual Body Map</h2>
      <div className="flex gap-8 justify-center">
        <Model
          type="anterior"
          data={injuries}
          bodyColor="#334155"
          borderColor="#64748B"
          onClick={handleToggleMuscle}
          style={{ width: '16rem' }}
        />
        <Model
          type="posterior"
          data={injuries}
          bodyColor="#334155"
          borderColor="#64748B"
          onClick={handleToggleMuscle}
          style={{ width: '16rem' }}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Logged Injuries ({injuries.length}):</h4>
        <ul>
          {injuries.map((injury, idx) => (
            <li key={idx} className="text-sm text-slate-300">
              • <strong style={{ color: injury.color }}>{injury.name}</strong> ({injury.muscles.join(', ')})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

---

### 2. Gym Workout Soreness & Fatigue Heatmap

Map exercise volume or soreness levels across a progressive color gradient:

```tsx
import React from 'react'
import { Model, IExerciseData } from '@plexapro/react-body-highlighter'

export function WorkoutHeatmap() {
  // Frequency represents total completed working sets
  const workoutData: IExerciseData[] = [
    { name: 'Barbell Bench Press', muscles: ['chest', 'front-deltoids'], frequency: 8 },
    { name: 'Incline Dumbbell Flyes', muscles: ['chest'], frequency: 4 },
    { name: 'Overhead Triceps Extensions', muscles: ['triceps'], frequency: 6 },
    { name: 'Barbell Squats', muscles: ['quadriceps', 'gluteal'], frequency: 10 },
    { name: 'Romanian Deadlifts', muscles: ['hamstring', 'lower-back'], frequency: 7 }
  ]

  // Gradient: Light Blue (Low) -> Blue (Moderate) -> Amber (High) -> Red (Exhaustion)
  const heatPalette = ['#93C5FD', '#3B82F6', '#F59E0B', '#EF4444']

  return (
    <div className="flex gap-6">
      <Model
        type="anterior"
        data={workoutData}
        highlightedColors={heatPalette}
        bodyColor="#F1F5F9"
        borderColor="#94A3B8"
        style={{ width: '18rem' }}
      />
      <Model
        type="posterior"
        data={workoutData}
        highlightedColors={heatPalette}
        bodyColor="#F1F5F9"
        borderColor="#94A3B8"
        style={{ width: '18rem' }}
      />
    </div>
  )
}
```

---

### 3. Custom Hover Tooltips & Telehealth Pain Grading

```tsx
import React, { useState } from 'react'
import { Model, IMuscleStats, IExerciseData } from '@plexapro/react-body-highlighter'

export function TelehealthPainAssessment() {
  const [activeHover, setActiveHover] = useState<IMuscleStats | null>(null)

  const patientPainData: IExerciseData[] = [
    { name: 'Severe Cervical Spasm (VAS 9/10)', muscles: ['neck', 'trapezius'], frequency: 9 },
    { name: 'Sciatic Radiating Pain (VAS 6/10)', muscles: ['gluteal', 'hamstring'], frequency: 6 }
  ]

  return (
    <div className="relative inline-block">
      <Model
        type="posterior"
        data={patientPainData}
        highlightedColors={['#FEF08A', '#F97316', '#DC2626']}
        bodyColor="#1E293B"
        borderColor="#475569"
        onHover={(stats) => setActiveHover(stats)}
        style={{ width: '20rem' }}
      />

      {/* Floating Info Tooltip */}
      {activeHover && (
        <div className="absolute top-4 right-4 bg-slate-950/90 text-white p-3 rounded-lg border border-slate-700 shadow-xl text-xs backdrop-blur-sm pointer-events-none">
          <p className="font-bold text-blue-400 uppercase tracking-wider">{activeHover.muscle}</p>
          <p className="mt-1 text-slate-300">
            {activeHover.data.exercises.length > 0
              ? activeHover.data.exercises.join(', ')
              : 'No reported discomfort'}
          </p>
          {activeHover.data.frequency > 0 && (
            <p className="mt-1 text-amber-400 font-semibold">
              Severity Level: {activeHover.data.frequency} / 10
            </p>
          )}
        </div>
      )}
    </div>
  )
}
```

---

## 🖐️ Extremities Specialist Components

When detailed examination of the hands or feet is required, `@plexapro/react-body-highlighter` includes dedicated standalone vector components with built-in bilateral scaling:

```tsx
import React from 'react'
import { HandSvg, FootSvg } from '@plexapro/react-body-highlighter'

export function ExtremitiesShowcase() {
  return (
    <div className="flex gap-6 items-center p-6 bg-slate-900 rounded-xl">
      {/* Left Hand (Highlighted in Red for Fracture) */}
      <div className="text-center text-white text-xs">
        <HandSvg
          position="left"
          color="#EF4444"
          borderColor="#DC2626"
          borderWidth={1.5}
          width={100}
          height={100}
          onClick={() => alert('Left Hand clicked')}
        />
        <span className="block mt-1">Left Hand</span>
      </div>

      {/* Right Hand (Normal) */}
      <div className="text-center text-white text-xs">
        <HandSvg
          position="right"
          color="#E2E8F0"
          borderColor="#64748B"
          width={100}
          height={100}
        />
        <span className="block mt-1">Right Hand</span>
      </div>

      {/* Left Foot */}
      <div className="text-center text-white text-xs">
        <FootSvg
          position="left"
          color="#E2E8F0"
          borderColor="#64748B"
          width={100}
          height={100}
        />
        <span className="block mt-1">Left Foot</span>
      </div>

      {/* Right Foot (Highlighted in Amber for Ankle Sprain) */}
      <div className="text-center text-white text-xs">
        <FootSvg
          position="right"
          color="#F59E0B"
          borderColor="#D97706"
          borderWidth={1.5}
          width={100}
          height={100}
          onClick={() => alert('Right Foot clicked')}
        />
        <span className="block mt-1">Right Foot</span>
      </div>
    </div>
  )
}
```

---

## 🧩 Composite `BodyVisualizer`

The high-level `BodyVisualizer` component packages anterior and posterior models, extremity chips, side orientation labels, and active selection state into a complete turnkey widget:

```tsx
import React, { useState } from 'react'
import { BodyVisualizer, Muscle } from '@plexapro/react-body-highlighter'

export function FullAssessmentWidget() {
  const [selectedParts, setSelectedParts] = useState<Array<{ muscle: Muscle; label?: string; color?: string }>>([
    { muscle: 'chest', label: 'Contusion', color: '#EF4444' },
    { muscle: 'lower-back', label: 'Lumbar Strain', color: '#F59E0B' }
  ])

  const handlePartClick = (muscle: Muscle) => {
    setSelectedParts(prev => {
      const exists = prev.some(p => p.muscle === muscle)
      if (exists) return prev.filter(p => p.muscle !== muscle)
      return [...prev, { muscle, label: 'Selected', color: '#2563EB' }]
    })
  }

  return (
    <BodyVisualizer
      selectedParts={selectedParts}
      onPartClick={handlePartClick}
      showExtremities={true}
      showSideLabels={true}
      bodyColor="#F8FAFC"
      highlightColor="#2563EB"
      borderColor="#64748B"
      borderWidth={1}
    />
  )
}
```

---

## 📖 API Reference

### `<Model />` (or `<BodyModel />`) Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'anterior' \| 'posterior'` | `'anterior'` | Anatomical perspective: Front (`anterior`) or Back (`posterior`). |
| `data` | `(IExerciseData \| IBodyPart)[]` | `[]` | Array of highlighted muscle records and frequency scores. |
| `bodyColor` | `string` | `'#E2E8F0'` | Base fill color for unhighlighted muscle polygons. |
| `highlightedColors` | `string[]` | `['#81B1D8', '#2563EB']` | Color palette array used for single or gradient frequency highlighting. |
| `borderColor` | `string` | `undefined` | Stroke outline color for muscle boundaries. |
| `borderWidth` | `number \| string` | `1` | Stroke width in pixels. |
| `onClick` | `(stats: IMuscleStats) => void` | `undefined` | Callback fired when an anatomical muscle polygon is clicked. |
| `onHover` | `(stats: IMuscleStats \| null) => void` | `undefined` | Callback fired on mouse enter / mouse leave over a muscle polygon. |
| `renderTooltip` | `(stats: IMuscleStats) => ReactNode` | `undefined` | Custom render function for embedding floating tooltips. |
| `style` | `React.CSSProperties` | `{}` | Inline CSS styles applied to the outer container element. |
| `svgStyle` | `React.CSSProperties` | `{}` | Inline styles applied directly to the root `<svg>` element. |
| `className` | `string` | `''` | CSS / Tailwind class name for styling the wrapper. |

---

### `<BodyVisualizer />` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectedParts` | `Array<{ muscle: Muscle; label?: string; color?: string }>` | `[]` | Array of selected parts with custom colors and labels. |
| `frontBodyPart` | `IBodyPart[]` | `[]` | Specific anterior body part data. |
| `backBodyPart` | `IBodyPart[]` | `[]` | Specific posterior body part data. |
| `handsPart` | `ISmallBodyPart[]` | `[]` | Specific hands extremity data. |
| `footPart` | `ISmallBodyPart[]` | `[]` | Specific foot extremity data. |
| `onPartClick` | `(muscle: Muscle) => void` | `undefined` | Callback fired when any body part or extremity is clicked. |
| `showSideLabels` | `boolean` | `true` | Show/hide "Right Side" and "Left Side" anatomical markers. |
| `showExtremities` | `boolean` | `true` | Show/hide the interactive Hands and Feet extremity cards. |
| `size` | `'default' \| 'compact'` | `'default'` | Sizing scale for layout. |
| `bodyColor` | `string` | `'#E2E8F0'` | Base fill color for unhighlighted segments. |
| `highlightColor` | `string` | `'#2563EB'` | Default highlight color when no specific color is supplied. |
| `highlightedColors` | `string[]` | `['#81B1D8', '#2563EB']` | Gradient color stops for frequency mode. |
| `borderColor` | `string` | `undefined` | Border stroke color. |
| `borderWidth` | `number \| string` | `1` | Border stroke width. |
| `isDisabled` | `boolean` | `false` | Disables interactive clicks when true. |
| `className` | `string` | `''` | CSS / Tailwind classes. |
| `style` | `React.CSSProperties` | `{}` | Inline container styles. |
| `handleChange` | `(data: IMuscleStats, type: string, smallMuscle?: string) => void` | `undefined` | Low-level change handler callback. |

---

### `<HandSvg />` & `<FootSvg />` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `'left' \| 'right'` | `'left'` | Bilateral position: automatically applies horizontal mirror reflection for `'right'`. |
| `color` | `string` | `'#E2E8F0'` | Fill color of the extremity SVG. |
| `borderColor` | `string` | `'#64748B'` | Stroke outline color. |
| `borderWidth` | `number \| string` | `1` | Stroke width in pixels. |
| `width` | `number \| string` | `undefined` | Explicit width dimension (px or CSS string). |
| `height` | `number \| string` | `undefined` | Explicit height dimension (px or CSS string). |
| `sizing` | `string` | `undefined` | Tailwind dimension classes (e.g. `'w-24 h-24'`). |
| `className` | `string` | `''` | CSS classes applied to the SVG. |
| `style` | `React.CSSProperties` | `{}` | Inline CSS styles applied to the SVG. |
| `onClick` | `() => void` | `undefined` | Click event handler. |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme mode modifier. |

---

### Core Data Interfaces

```typescript
export interface IExerciseData {
  name: string
  muscles: Muscle[] | string[]
  frequency?: number
}

export interface IBodyPart {
  name: string
  type: 'anterior' | 'posterior'
  muscles: Muscle[] | string[]
  color?: string
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

## 🗺️ Anatomical Muscle Slugs Reference

The library recognizes 42 exhaustive anatomical muscle slugs, supporting both general group keys and isolated bilateral keys (`left-*` / `right-*`):

| Anatomical Region | Universal Group Key | Bilateral Slugs (`left-*` / `right-*`) | Primary View |
|---|---|---|---|
| **Head & Neck** | `head`, `neck` | `left-neck`, `right-neck` | Anterior / Posterior |
| **Shoulders & Trapezius** | `trapezius`, `front-deltoids`, `back-deltoids` | `left-trapezius`, `right-trapezius`<br>`left-front-deltoids`, `right-front-deltoids`<br>`left-back-deltoids`, `right-back-deltoids` | Both |
| **Chest & Upper Torso** | `chest` | `left-chest`, `right-chest` | Anterior |
| **Back & Spine** | `upper-back`, `lower-back` | `left-upper-back`, `right-upper-back`<br>`left-lower-back`, `right-lower-back` | Posterior |
| **Arms & Forearms** | `biceps`, `triceps`, `forearm` | `left-biceps`, `right-biceps`<br>`left-triceps`, `right-triceps`<br>`left-forearm`, `right-forearm` | Both |
| **Abdominals & Core** | `abs`, `obliques` | `left-abs`, `right-abs`<br>`left-obliques`, `right-obliques` | Anterior |
| **Hips & Gluteals** | `gluteal`, `adductor`, `abductors` | `left-gluteal`, `right-gluteal`<br>`left-adductor`, `right-adductor`<br>`left-abductors`, `right-abductors` | Both |
| **Upper Legs (Thighs)** | `quadriceps`, `hamstring` | `left-quadriceps`, `right-quadriceps`<br>`left-hamstring`, `right-hamstring` | Both |
| **Knees & Joints** | `knees` | `left-knees`, `right-knees` | Anterior / Posterior |
| **Lower Legs & Calves** | `calves`, `shins`, `soleus` | `left-calves`, `right-calves`<br>`left-shins`, `right-shins`<br>`left-soleus`, `right-soleus` | Both |
| **Ankles & Feet** | `ankles`, `left-foot`, `right-foot` | `left-ankle`, `right-ankle` | Anterior / Posterior |
| **Hands & Wrists** | `left-hand`, `right-hand` | `left-hand`, `right-hand` | Extremities |

---

## 🏗️ Real-World Use Cases

### 1. 🦺 Workplace Safety & EHS Incident Reporting (Plexa)
Enterprise construction safety officers click exact anatomical damage zones on tablets to log OSHA / SafeWork site injuries in under 15 seconds. Generates automated injury logs with incident classifications, severity scores, and hazard reports.

### 2. 🏋️ Athletic Recovery & Bodybuilding Fatigue Heatmaps
Track exercise volume per muscle group across training splits (Push/Pull/Legs). Automatically shades recovered muscles in green, active fatigue in amber, and maximum strain in deep red.

### 3. 🩺 Telehealth & Physical Therapy Pain Maps
Patients click and grade their discomfort on a 1-to-10 Visual Analogue Scale (VAS) before remote orthopedic consultations, streamlining clinical intake and physical therapy charting.

---

## 🏢 Maintained by Plexa

<div align="center">

[![Plexa Construction Platform](https://img.shields.io/badge/Powered%20By-Plexa%20Platform-2563EB?style=for-the-badge&logo=react&logoColor=white)](https://www.plexapro.com)
[![Visit Plexa Website](https://img.shields.io/badge/Visit-www.plexapro.com-0F172A?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.plexapro.com)

</div>

**React Body Highlighter** is maintained with ❤️ by the engineering team at **[Plexa](https://www.plexapro.com)**.

**Plexa** is the modern construction management and field operations platform that connects site safety, project tracking, financials, subcontracts, and daily site logs in one unified workspace.

- 🌐 **Official Website**: [https://www.plexapro.com](https://www.plexapro.com)
- 💼 **Careers & Engineering**: [https://www.plexapro.com/careers](https://www.plexapro.com/careers)
- 🔒 **Security Disclosures**: `security@plexapro.com`

---

## 🤝 Contributing

Contributions, issues, and feature requests are very welcome!
Please check our [Contributing Guide](CONTRIBUTING.md) and [Security Policy](SECURITY.md) before opening a pull request.

```bash
# Clone repository
git clone https://github.com/Plexapro/react-body-highlighter.git

# Install dependencies across monorepo
yarn install

# Run library unit tests
yarn test

# Run build
yarn build:pkg
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete terms and copyright notices.

Copyright © 2026 [Plexa](https://www.plexapro.com). All rights reserved.
