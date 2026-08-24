# @plexapro/react-body-highlighter

> High-performance, interactive SVG Human Body & Injury Visualizer React component with full-body muscle highlighting, extremities (hands & feet), custom color mapping, and TypeScript support.

Maintained by **[Plexa](https://www.plexapro.com)** — The Modern Construction & Safety Management Platform.

[![npm version](https://img.shields.io/npm/v/@plexapro/react-body-highlighter.svg)](https://www.npmjs.com/package/@plexapro/react-body-highlighter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Installation

```bash
npm install @plexapro/react-body-highlighter
# or
yarn add @plexapro/react-body-highlighter
# or
pnpm add @plexapro/react-body-highlighter
```

## Quick Start

### Basic Anterior (Front) & Posterior (Back) Model

```tsx
import React, { useState } from 'react'
import Model, { IExerciseData, IMuscleStats } from '@plexapro/react-body-highlighter'

export default function App() {
  const data: IExerciseData[] = [
    { name: 'Bench Press', muscles: ['chest', 'front-deltoids', 'triceps'], frequency: 2 },
    { name: 'Squats', muscles: ['quadriceps', 'calves'], frequency: 3 }
  ]

  const handleMuscleClick = (stats: IMuscleStats) => {
    console.log(`Clicked muscle: ${stats.muscle}`, stats.data)
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Model
        type="anterior"
        data={data}
        highlightedColors={['#81b1d9', '#277abf']}
        onClick={handleMuscleClick}
      />
      <Model
        type="posterior"
        data={data}
        highlightedColors={['#81b1d9', '#277abf']}
        onClick={handleMuscleClick}
      />
    </div>
  )
}
```

### Composed Body Visualizer with Extremities

```tsx
import React, { useState } from 'react'
import { BodyVisualizer, IBodyPart, ISmallBodyPart } from '@plexapro/react-body-highlighter'

export default function SafetyIncidentReport() {
  const [frontParts, setFrontParts] = useState<IBodyPart[]>([
    { name: 'Pectoral Strain', type: 'anterior', muscles: ['chest'], color: '#ef4444' }
  ])
  const [hands, setHands] = useState<ISmallBodyPart[]>([
    { name: 'Wrist Sprain', muscles: ['left-hand'] }
  ])

  return (
    <BodyVisualizer
      frontBodyPart={frontParts}
      handsPart={hands}
      showSideLabels={true}
      showExtremities={true}
      highlightColor="#ef4444"
      handleChange={(stats, type, smallMuscle) => {
        console.log('Selected part:', stats, type, smallMuscle)
      }}
    />
  )
}
```

### Standalone Extremities (Hands & Feet)

```tsx
import React from 'react'
import { HandSvg, FootSvg } from '@plexapro/react-body-highlighter'

export function ExtremitiesDemo() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <HandSvg position="left" color="#3b82f6" width={64} height={64} />
      <HandSvg position="right" color="#10b981" width={64} height={64} />
      <FootSvg position="left" color="#f59e0b" width={64} height={64} />
      <FootSvg position="right" color="#ef4444" width={64} height={64} />
    </div>
  )
}
```

---

## License

MIT © [Plexa](https://www.plexapro.com)
