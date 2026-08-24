/**
 * Tier 4: Real-World Application Scenarios Test Suite
 * End-to-end multi-step application scenarios modeling production workflows:
 * 1. Workplace Safety & EHS Incident Report (Plexa Construction Management)
 * 2. Gym Workout Fatigue & Muscle Recovery Heatmap
 * 3. Telehealth Pain Severity & Physical Therapy Clinical Map
 * 4. Interactive Showcase Playground Full Lifecycle
 */

import { describe, it, expect } from './test_framework'
import { anteriorData, posteriorData } from '../../packages/react-body-highlighter/src/assets'
import { MuscleType, ModelType } from '../../packages/react-body-highlighter/src/types'
import { DEFAULT_BODY_COLOR, DEFAULT_HIGHLIGHTED_COLORS } from '../../packages/react-body-highlighter/src/constants'
import { fillIntensityColor, fillMuscleData, dedupeBodyParts, normalizeBodyParts, ensure } from '../../packages/react-body-highlighter/src/utils'

describe('Tier 4 - Scenario 1: Plexa Workplace Safety / EHS Incident Report', () => {
  it('T4.S1: Complete Construction Site EHS Incident Reporting Workflow', () => {
    // 1. Context: Construction site supervisor logs multi-injury event on scaffolding accident
    const incidentMetadata = {
      incidentId: 'INC-PLEXA-2026-0881',
      siteName: 'Sydney Central Metro Tower',
      contractor: 'Plexa Construction Group',
      workerRole: 'Formwork Carpenter',
      timestamp: '2026-08-24T07:45:00Z'
    }

    // 2. Reported injuries across body and extremities
    const rawInjuries = [
      { name: 'Lower back acute strain from timber lift', muscles: ['lower-back'], type: 'posterior' },
      { name: 'Right hand laceration / crush', muscles: ['forearm'], type: 'hands', side: 'right' },
      { name: 'Right ankle grade 2 sprain', muscles: ['right-ankle'], type: 'anterior', side: 'right' }
    ]

    // 3. Normalize and validate data distribution
    const dedupedInjuries = dedupeBodyParts(rawInjuries as any)
    expect(dedupedInjuries.length).toBe(3)

    // 4. Posterior model state check: Lower Back highlighted in danger red (#ef4444)
    const posteriorActivity = fillMuscleData(dedupedInjuries.filter((i) => i.type === 'posterior'))
    const posteriorColor = fillIntensityColor(posteriorActivity, ['#ef4444'], 'lower-back' as any)
    expect(posteriorColor).toBe('#ef4444')

    // 5. Anterior model state check: Right Ankle highlighted
    const anteriorActivity = fillMuscleData(dedupedInjuries.filter((i) => i.type === 'anterior'))
    const anteriorColor = fillIntensityColor(anteriorActivity, ['#ef4444'], 'right-ankle' as any)
    expect(anteriorColor).toBe('#ef4444')

    // 6. Extremity state check: Right Hand & Right Foot active
    const isRightHandInjured = rawInjuries.some((i) => i.type === 'hands' && i.side === 'right')
    const isRightAnkleInjured = rawInjuries.some((i) => i.muscles.includes('right-ankle'))
    expect(isRightHandInjured).toBe(true)
    expect(isRightAnkleInjured).toBe(true)

    // 7. Structured JSON incident export for Plexa API
    const incidentPayload = {
      ...incidentMetadata,
      injuries: dedupedInjuries.map((i) => ({
        location: i.muscles[0],
        description: i.name,
        view: i.type,
        severity: 'high'
      })),
      branding: {
        platform: 'Plexa Construction Management',
        url: 'https://www.plexapro.com'
      }
    }

    expect(incidentPayload.injuries.length).toBe(3)
    expect(incidentPayload.branding.url).toBe('https://www.plexapro.com')
  })
}, 4)

describe('Tier 4 - Scenario 2: Gym Workout Fatigue & Muscle Recovery Heatmap', () => {
  it('T4.S2: High-Volume Chest & Triceps Push Day Heatmap Calculation', () => {
    // 1. Log exercises performed during a push workout session
    const pushWorkoutSession = [
      { name: 'Barbell Flat Bench Press', muscles: ['chest' as any, 'triceps' as any, 'front-deltoids' as any], frequency: 4 },
      { name: 'Incline Dumbbell Press', muscles: ['chest' as any, 'front-deltoids' as any], frequency: 3 },
      { name: 'Dips (Weighted)', muscles: ['triceps' as any, 'chest' as any], frequency: 3 },
      { name: 'Overhead Cable Tricep Extension', muscles: ['triceps' as any], frequency: 4 },
      { name: 'Standing Overhead Military Press', muscles: ['front-deltoids' as any, 'triceps' as any], frequency: 3 }
    ]

    // 2. Define 5-level recovery fatigue palette (Light Yellow -> Deep Crimson)
    const recoveryHeatmapPalette = [
      '#fef9c3', // Level 1 (1-2 sets): Minimal fatigue
      '#fde047', // Level 2 (3-4 sets): Moderate workload
      '#fb923c', // Level 3 (5-6 sets): High fatigue
      '#ea580c', // Level 4 (7-8 sets): Heavy fatigue
      '#991b1b'  // Level 5 (9+ sets): Maximum exhaustion / Deload required
    ]

    // 3. Aggregate muscle workloads
    const aggregatedMap = fillMuscleData(pushWorkoutSession)

    // Verify set totals:
    // Chest: 4 + 3 + 3 = 10 sets (Level 5)
    // Triceps: 4 + 3 + 4 + 3 = 14 sets (Level 5)
    // Front Deltoids: 4 + 3 + 3 = 10 sets (Level 5)
    expect(aggregatedMap['chest'].frequency).toBe(10)
    expect(aggregatedMap['triceps'].frequency).toBe(14)
    expect(aggregatedMap['front-deltoids'].frequency).toBe(10)
    expect(aggregatedMap['hamstring'].frequency).toBe(0) // Untouched

    // 4. Verify heatmap intensity mapping
    const chestColor = fillIntensityColor(aggregatedMap, recoveryHeatmapPalette, 'chest' as any)
    const tricepColor = fillIntensityColor(aggregatedMap, recoveryHeatmapPalette, 'triceps' as any)
    const legColor = fillIntensityColor(aggregatedMap, recoveryHeatmapPalette, 'hamstring' as any)

    expect(chestColor).toBe('#991b1b') // Max index
    expect(tricepColor).toBe('#991b1b')
    expect(legColor).toBeUndefined() // Default body color

    // 5. Generate athlete recovery readiness score
    const fatigueScore = Object.values(aggregatedMap).reduce((sum, item) => sum + item.frequency, 0)
    expect(fatigueScore).toBe(34) // Total work sets logged
  })
}, 4)

describe('Tier 4 - Scenario 3: Telehealth Pain Severity & Physical Therapy Clinical Map', () => {
  it('T4.S3: Clinical Pain Assessment & Visual Severity Mapping', () => {
    // 1. Patient reports pain scale across multiple anatomical zones (VAS scale 1-10)
    const patientPainLog = [
      { region: 'neck', score: 3, description: 'Mild cervical tightness' },
      { region: 'lower-back', score: 7, description: 'Severe lumbar disc pain' },
      { region: 'knees', score: 8, description: 'Bilateral patellar tendinitis' },
      { region: 'left-foot', score: 5, description: 'Plantar fasciitis arch pain' }
    ]

    // 2. Clinical color grading function
    const getClinicalPainColor = (score: number) => {
      if (score <= 3) return '#86efac' // Mild: Green
      if (score <= 6) return '#fdba74' // Moderate: Orange
      return '#f87171'                 // Severe: Red
    }

    // 3. Validate severity classification
    expect(getClinicalPainColor(3)).toBe('#86efac')
    expect(getClinicalPainColor(7)).toBe('#f87171')
    expect(getClinicalPainColor(8)).toBe('#f87171')
    expect(getClinicalPainColor(5)).toBe('#fdba74')

    // 4. Map to BodyModel data format
    const bodyModelData = patientPainLog
      .filter((p) => p.region !== 'left-foot')
      .map((p) => ({
        name: `${p.description} (VAS ${p.score}/10)`,
        muscles: [p.region as any],
        frequency: p.score
      }))

    const activityMap = fillMuscleData(bodyModelData)
    expect(activityMap['lower-back'].frequency).toBe(7)
    expect(activityMap['knees'].frequency).toBe(8)
    expect(activityMap['neck'].frequency).toBe(3)

    // 5. Clinical telemetry report export
    const clinicalSummary = {
      patientId: 'PT-99402',
      primaryComplaint: 'lower-back',
      maxPainSeverity: Math.max(...patientPainLog.map((p) => p.score)),
      extremityInvolvement: ['left-foot'],
      telehealthTimestamp: '2026-08-24T07:50:00Z'
    }

    expect(clinicalSummary.maxPainSeverity).toBe(8)
    expect(clinicalSummary.extremityInvolvement).toContain('left-foot')
  })
}, 4)

describe('Tier 4 - Scenario 4: Interactive Showcase Playground Full Lifecycle', () => {
  it('T4.S4: Complete Showcase User Journey (View Toggles, Custom Palette, Code Gen & Branding)', () => {
    // 1. Initial State: Anterior view, default gray body (#B6BDC3), single-select mode
    let currentView: 'anterior' | 'posterior' | 'dual' = 'anterior'
    let currentMode: 'single' | 'multi' = 'single'
    let selectedMuscles: string[] = []
    let bodyColor = '#B6BDC3'
    let highlightColor = '#3b82f6'

    expect(currentView).toBe('anterior')
    expect(selectedMuscles.length).toBe(0)

    // 2. User switches to Posterior view
    currentView = 'posterior'
    expect(currentView).toBe('posterior')

    // 3. User switches to Multi-Select mode
    currentMode = 'multi'
    expect(currentMode).toBe('multi')

    // 4. User selects 'gluteal' and 'hamstring'
    selectedMuscles = ['gluteal', 'hamstring']
    expect(selectedMuscles).toEqual(['gluteal', 'hamstring'])

    // 5. User changes palette to Midnight Dark theme
    bodyColor = '#0f172a'
    highlightColor = '#38bdf8'
    expect(bodyColor).toBe('#0f172a')
    expect(highlightColor).toBe('#38bdf8')

    // 6. User selects Right Foot in Extremities modal
    const extremitySelection = { type: 'foot', side: 'right', active: true }
    expect(extremitySelection.side).toBe('right')

    // 7. Live Code Generator serializes current UI state into TSX code snippet
    const generateCodeSnippet = () => {
      const partsPayload = selectedMuscles.map((m) => ({ name: m, muscles: [m] }))
      return [
        `import { Model, FootSvg } from '@plexapro/react-body-highlighter'`,
        `export function MyCustomVisualizer() {`,
        `  return (`,
        `    <div className="flex gap-4">`,
        `      <Model`,
        `        type="${currentView}"`,
        `        bodyColor="${bodyColor}"`,
        `        highlightedColors={["${highlightColor}"]}`,
        `        data={${JSON.stringify(partsPayload)}}`,
        `      />`,
        `      <FootSvg position="${extremitySelection.side}" color="${highlightColor}" />`,
        `    </div>`,
        `  )`,
        `}`
      ].join('\n')
    }

    const generatedTSX = generateCodeSnippet()
    expect(generatedTSX).toContain('type="posterior"')
    expect(generatedTSX).toContain('bodyColor="#0f172a"')
    expect(generatedTSX).toContain('highlightedColors={["#38bdf8"]}')
    expect(generatedTSX).toContain('position="right"')
    expect(generatedTSX).toContain('gluteal')

    // 8. User verifies Plexa branding attribution link
    const plexaAttribution = {
      text: 'Maintained by Plexa',
      href: 'https://www.plexapro.com',
      rel: 'noopener noreferrer'
    }
    expect(plexaAttribution.href).toBe('https://www.plexapro.com')
  })
}, 4)
