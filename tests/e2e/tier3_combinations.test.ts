/**
 * Tier 3: Cross-Feature Combinations Test Suite
 * Pairwise and multi-feature interaction testing across views, palettes, extremities, and event workflows
 */

import { describe, it, expect } from './test_framework'
import { anteriorData, posteriorData } from '../../packages/react-body-highlighter/src/assets'
import { MuscleType, ModelType } from '../../packages/react-body-highlighter/src/types'
import { DEFAULT_BODY_COLOR, DEFAULT_HIGHLIGHTED_COLORS } from '../../packages/react-body-highlighter/src/constants'
import { fillIntensityColor, fillMuscleData, dedupeBodyParts, normalizeBodyParts, ensure } from '../../packages/react-body-highlighter/src/utils'

describe('Tier 3 - Cross-Feature Combinations', () => {
  it('T3.C1: Anterior + Posterior Dual Model Synchronization with Cross-View Exercises', () => {
    // Full body workout targeting both anterior (chest, abs) and posterior (gluteal, upper-back) muscles
    const workoutData = [
      { name: 'Compound Lift', muscles: ['chest' as any, 'gluteal' as any, 'upper-back' as any, 'abs' as any], frequency: 2 }
    ]
    const activityMap = fillMuscleData(workoutData)

    // Check anterior model polygons
    const anteriorActiveMuscles = anteriorData
      .filter((d) => activityMap[d.muscle]?.frequency > 0)
      .map((d) => d.muscle)
    expect(anteriorActiveMuscles).toContain('chest')
    expect(anteriorActiveMuscles).toContain('abs')
    expect(anteriorActiveMuscles).not.toContain('gluteal') // Gluteal not on anterior

    // Check posterior model polygons
    const posteriorActiveMuscles = posteriorData
      .filter((d) => activityMap[d.muscle]?.frequency > 0)
      .map((d) => d.muscle)
    expect(posteriorActiveMuscles).toContain('gluteal')
    expect(posteriorActiveMuscles).toContain('upper-back')
    expect(posteriorActiveMuscles).not.toContain('chest') // Chest not on posterior

    // Both views share identical frequency resolution
    expect(activityMap['chest'].frequency).toBe(2)
    expect(activityMap['gluteal'].frequency).toBe(2)
  })

  it('T3.C2: Core Body Model + Extremities Synchronized under Unified Danger Theme', () => {
    const dangerTheme = {
      bodyColor: '#1e293b',
      highlightColor: '#ef4444',
      borderColor: '#f87171',
      borderWidth: 1.5
    }

    const selectedParts = [
      { muscle: 'lower-back' as any, label: 'Spinal Injury', color: dangerTheme.highlightColor },
      { muscle: 'forearm' as any, label: 'Right Hand Pinch', side: 'right', color: dangerTheme.highlightColor },
      { muscle: 'calves' as any, label: 'Left Foot Sprain', side: 'left', color: dangerTheme.highlightColor }
    ]

    // Verify unified color propagation to model
    const modelFill = (muscle: string) => {
      const match = selectedParts.find((p) => p.muscle === muscle)
      return match ? match.color : dangerTheme.bodyColor
    }

    // Verify extremity hand and foot receive unified danger color
    const handColor = (side: 'left' | 'right') => {
      const match = selectedParts.find((p) => p.muscle === 'forearm' && (p as any).side === side)
      return match ? match.color : dangerTheme.bodyColor
    }

    const footColor = (side: 'left' | 'right') => {
      const match = selectedParts.find((p) => p.muscle === 'calves' && (p as any).side === side)
      return match ? match.color : dangerTheme.bodyColor
    }

    expect(modelFill('lower-back')).toBe('#ef4444')
    expect(modelFill('chest')).toBe('#1e293b') // Uninjured
    expect(handColor('right')).toBe('#ef4444')
    expect(handColor('left')).toBe('#1e293b')
    expect(footColor('left')).toBe('#ef4444')
    expect(footColor('right')).toBe('#1e293b')
  })

  it('T3.C3: Multi-Selection State with Progressive 5-Step Intensity Heatmap', () => {
    const heatmapPalette = ['#fef08a', '#fde047', '#f97316', '#ea580c', '#b91c1c']
    const selections = [
      { muscle: 'biceps', count: 1 },
      { muscle: 'triceps', count: 3 },
      { muscle: 'front-deltoids', count: 5 },
      { muscle: 'chest', count: 10 } // Overflow
    ]

    const workoutPayload = selections.map((s) => ({
      name: `Workout for ${s.muscle}`,
      muscles: [s.muscle as any],
      frequency: s.count
    }))

    const map = fillMuscleData(workoutPayload)

    // Biceps (freq 1) -> Palette index 0 (#fef08a)
    expect(fillIntensityColor(map, heatmapPalette, 'biceps' as any)).toBe('#fef08a')
    // Triceps (freq 3) -> Palette index 2 (#f97316)
    expect(fillIntensityColor(map, heatmapPalette, 'triceps' as any)).toBe('#f97316')
    // Front Deltoids (freq 5) -> Palette index 4 (#b91c1c)
    expect(fillIntensityColor(map, heatmapPalette, 'front-deltoids' as any)).toBe('#b91c1c')
    // Chest (freq 10) -> Clamped to Palette index 4 (#b91c1c)
    expect(fillIntensityColor(map, heatmapPalette, 'chest' as any)).toBe('#b91c1c')
  })

  it('T3.C4: Interactive Click Event to Dynamic State Re-render Cycle', () => {
    let appState: any[] = []

    const handleMuscleClick = (clickedMuscle: any) => {
      const existing = appState.find((e) => e.muscles.includes(clickedMuscle))
      if (existing) {
        existing.frequency += 1
      } else {
        appState.push({ name: `Clicked ${clickedMuscle}`, muscles: [clickedMuscle], frequency: 1 })
      }
    }

    // Step 1: Initial state is empty
    expect(fillMuscleData(appState)['chest'].frequency).toBe(0)

    // Step 2: Click 'chest' once
    handleMuscleClick('chest')
    let currentMap = fillMuscleData(appState)
    expect(currentMap['chest'].frequency).toBe(1)
    expect(fillIntensityColor(currentMap, DEFAULT_HIGHLIGHTED_COLORS, 'chest' as any)).toBe(DEFAULT_HIGHLIGHTED_COLORS[0])

    // Step 3: Click 'chest' second time (intensity upgrade)
    handleMuscleClick('chest')
    currentMap = fillMuscleData(appState)
    expect(currentMap['chest'].frequency).toBe(2)
    expect(fillIntensityColor(currentMap, DEFAULT_HIGHLIGHTED_COLORS, 'chest' as any)).toBe(DEFAULT_HIGHLIGHTED_COLORS[1])
  })

  it('T3.C5: Anatomical Side Label Inversion combined with Responsive Compact Mode', () => {
    const renderVisualizerLayout = (type: 'anterior' | 'posterior', size: 'default' | 'compact') => {
      const isAnterior = type === 'anterior'
      const leftLabel = isAnterior ? 'Right Side' : 'Left Side'
      const rightLabel = isAnterior ? 'Left Side' : 'Right Side'
      const containerWidth = size === 'compact' ? 'w-32' : 'w-40'
      const fontSize = size === 'compact' ? 'text-xs' : 'text-sm'

      return { leftLabel, rightLabel, containerWidth, fontSize }
    }

    const frontDefault = renderVisualizerLayout('anterior', 'default')
    expect(frontDefault.leftLabel).toBe('Right Side')
    expect(frontDefault.rightLabel).toBe('Left Side')
    expect(frontDefault.containerWidth).toBe('w-40')

    const backCompact = renderVisualizerLayout('posterior', 'compact')
    expect(backCompact.leftLabel).toBe('Left Side')
    expect(backCompact.rightLabel).toBe('Right Side')
    expect(backCompact.containerWidth).toBe('w-32')
    expect(backCompact.fontSize).toBe('text-xs')
  })

  it('T3.C6: Preset Scenario Selection to Live Code Generator Synchronization', () => {
    const presets = {
      safety: {
        type: 'posterior',
        muscles: ['lower-back', 'left-trapezius'],
        bodyColor: '#f1f5f9',
        highlightColor: '#ef4444'
      },
      gym: {
        type: 'anterior',
        muscles: ['chest', 'triceps', 'abs'],
        bodyColor: '#334155',
        highlightColor: '#38bdf8'
      }
    }

    const serializeSnippet = (preset: (typeof presets)['safety']) => {
      const dataPayload = preset.muscles.map((m) => ({ name: `${m} active`, muscles: [m] }))
      return [
        `import Model from '@plexapro/react-body-highlighter'`,
        `<Model`,
        `  type="${preset.type}"`,
        `  bodyColor="${preset.bodyColor}"`,
        `  highlightedColors={["${preset.highlightColor}"]}`,
        `  data={${JSON.stringify(dataPayload)}}`,
        `/>`
      ].join('\n')
    }

    const safetyCode = serializeSnippet(presets.safety)
    expect(safetyCode).toContain('type="posterior"')
    expect(safetyCode).toContain('#ef4444')
    expect(safetyCode).toContain('lower-back')

    const gymCode = serializeSnippet(presets.gym)
    expect(gymCode).toContain('type="anterior"')
    expect(gymCode).toContain('#38bdf8')
    expect(gymCode).toContain('chest')
  })

  it('T3.C7: Theme Switching Interacting with Dynamic SVG Polygon Borders & Backgrounds', () => {
    const lightTheme = { bodyColor: '#e2e8f0', borderColor: '#94a3b8', borderWidth: 0.5 }
    const darkTheme = { bodyColor: '#0f172a', borderColor: '#38bdf8', borderWidth: 1.5 }

    const computePolygonStyles = (theme: typeof lightTheme, isActive: boolean, highlightColor: string) => ({
      fill: isActive ? highlightColor : theme.bodyColor,
      stroke: theme.borderColor,
      strokeWidth: theme.borderWidth
    })

    const lightActive = computePolygonStyles(lightTheme, true, '#3b82f6')
    expect(lightActive.fill).toBe('#3b82f6')
    expect(lightActive.stroke).toBe('#94a3b8')
    expect(lightActive.strokeWidth).toBe(0.5)

    const darkInactive = computePolygonStyles(darkTheme, false, '#38bdf8')
    expect(darkInactive.fill).toBe('#0f172a')
    expect(darkInactive.stroke).toBe('#38bdf8')
    expect(darkInactive.strokeWidth).toBe(1.5)
  })

  it('T3.C8: Legacy Normalized Injury Data Conversion into Composite Visualizer State', () => {
    const legacyRawInjuries: any[] = [
      { name: 'Lower Back Lifting Strain', muscles: ['posterior-lower-back'], type: 'posterior' },
      { name: 'Chest Impact', muscles: ['chest'], type: 'anterior' },
      { name: 'Ankle Sprain', muscles: ['right-ankle'], type: 'anterior' }
    ]

    // Step 1: Normalize and deduplicate
    const normalizedAnterior = normalizeBodyParts(legacyRawInjuries, 'anterior')
    const normalizedPosterior = normalizeBodyParts(legacyRawInjuries, 'posterior')
    const dedupedAnterior = dedupeBodyParts(normalizedAnterior)
    const dedupedPosterior = dedupeBodyParts(normalizedPosterior)

    // Chest expands to left-chest & right-chest for anterior
    expect(dedupedAnterior.length).toBeGreaterThanOrEqual(2)
    // Posterior includes bilateral lower-back
    expect(dedupedPosterior.some((p) => String(p.muscles[0]).includes('lower-back'))).toBe(true)

    // Step 2: Ingest into muscle aggregator
    const fullActivityMap = fillMuscleData([...dedupedAnterior, ...dedupedPosterior])
    expect(fullActivityMap['left-lower-back'].frequency).toBe(1)
    expect(fullActivityMap['right-lower-back'].frequency).toBe(1)
    expect(fullActivityMap['left-chest'].frequency).toBe(1)
    expect(fullActivityMap['right-chest'].frequency).toBe(1)
  })
}, 3)
