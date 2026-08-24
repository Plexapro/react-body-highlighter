import React, { useState } from 'react'
import { Muscle, IMuscleStats, IExerciseData } from '@plexapro/react-body-highlighter'
import {
  ViewMode,
  SelectionMode,
  ExtremitiesState,
  ExtremityItemState,
  PresetScenario,
  ThemePalette
} from './types/showcase'
import { PRESET_SCENARIOS, THEME_PALETTES } from './data/presets'
import { Header } from './components/Header'
import { PlexaBanner } from './components/PlexaBanner'
import { BodyPlayground } from './components/BodyPlayground'
import { ExtremitiesCard } from './components/ExtremitiesCard'
import { ExtremitiesModal } from './components/ExtremitiesModal'
import { ControlPanel } from './components/ControlPanel'
import { PresetSelector } from './components/PresetSelector'
import { CodeGenerator } from './components/CodeGenerator'
import { Footer } from './components/Footer'

export function App() {
  // Master state
  const [viewMode, setViewMode] = useState<ViewMode>('dual')
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('multi')
  const [showExtremities, setShowExtremities] = useState<boolean>(true)
  const [activePresetId, setActivePresetId] = useState<string | null>(
    'plexa-safety-incident'
  )

  // Color & styling state (defaults to Plexa Safety / EHS Preset)
  const defaultPreset = PRESET_SCENARIOS[0]
  const [bodyColor, setBodyColor] = useState<string>(
    defaultPreset.recommendedColors.bodyColor
  )
  const [highlightColors, setHighlightColors] = useState<string[]>(
    defaultPreset.recommendedColors.highlightColors
  )
  const [borderColor, setBorderColor] = useState<string>(
    defaultPreset.recommendedColors.borderColor
  )
  const [borderWidth, setBorderWidth] = useState<number>(
    defaultPreset.recommendedColors.borderWidth
  )

  // Body highlights data
  const [exerciseData, setExerciseData] = useState<IExerciseData[]>(
    defaultPreset.data
  )

  // Extremities state
  const [extremities, setExtremities] = useState<ExtremitiesState>({
    leftHand: {
      selected: false,
      aspect: 'dorsal',
      color: '#3b82f6',
      notes: 'No abnormal joint signs'
    },
    rightHand: {
      selected: true,
      aspect: 'dorsal',
      color: '#ef4444',
      notes: 'Right hand contusion & dorsal swelling from scaffolding grab impact',
      severity: 7
    },
    leftFoot: {
      selected: false,
      aspect: 'plantar',
      color: '#3b82f6',
      notes: 'Intact plantar arch'
    },
    rightFoot: {
      selected: false,
      aspect: 'dorsal',
      color: '#3b82f6',
      notes: 'Full range of motion'
    }
  })

  // Extremity inspection modal state
  const [inspectedExtremityKey, setInspectedExtremityKey] = useState<
    keyof ExtremitiesState | null
  >(null)

  // Handlers
  const handlePresetSelect = (preset: PresetScenario) => {
    setActivePresetId(preset.id)
    setExerciseData(preset.data)
    setBodyColor(preset.recommendedColors.bodyColor)
    setHighlightColors(preset.recommendedColors.highlightColors)
    setBorderColor(preset.recommendedColors.borderColor)
    setBorderWidth(preset.recommendedColors.borderWidth)

    if (preset.extremities) {
      setExtremities((prev) => ({
        leftHand: { ...prev.leftHand, ...(preset.extremities?.leftHand || {}) },
        rightHand: { ...prev.rightHand, ...(preset.extremities?.rightHand || {}) },
        leftFoot: { ...prev.leftFoot, ...(preset.extremities?.leftFoot || {}) },
        rightFoot: { ...prev.rightFoot, ...(preset.extremities?.rightFoot || {}) }
      }))
    }
  }

  const handleApplyTheme = (theme: ThemePalette) => {
    setBodyColor(theme.bodyColor)
    setHighlightColors(theme.highlightColors)
    setBorderColor(theme.borderColor)
    setBorderWidth(theme.borderWidth)
  }

  const handleMuscleClick = (stats: IMuscleStats) => {
    if (!stats || !stats.muscle) return
    const muscle = stats.muscle

    if (selectionMode === 'single') {
      setActivePresetId(null)
      setExerciseData([
        {
          name: `${muscle} selection`,
          muscles: [muscle],
          frequency: 5
        }
      ])
      return
    }

    if (selectionMode === 'intensity') {
      setActivePresetId(null)
      setExerciseData((prev) => {
        const existingIdx = prev.findIndex((item) =>
          (item.muscles as string[]).includes(muscle)
        )
        if (existingIdx >= 0) {
          const currentFreq = prev[existingIdx].frequency || 1
          const nextFreq = currentFreq >= 10 ? 1 : currentFreq + 2
          const updated = [...prev]
          updated[existingIdx] = {
            ...updated[existingIdx],
            frequency: nextFreq
          }
          return updated
        } else {
          return [
            ...prev,
            {
              name: `${muscle} intensity`,
              muscles: [muscle],
              frequency: 3
            }
          ]
        }
      })
      return
    }

    // Default Multi-Select mode: Toggle muscle
    setActivePresetId(null)
    setExerciseData((prev) => {
      const isAlreadySelected = prev.some((item) =>
        (item.muscles as string[]).includes(muscle)
      )

      if (isAlreadySelected) {
        // Remove muscle from records
        return prev
          .map((item) => ({
            ...item,
            muscles: (item.muscles as string[]).filter((m) => m !== muscle)
          }))
          .filter((item) => item.muscles.length > 0)
      } else {
        // Add muscle
        return [
          ...prev,
          {
            name: `${muscle} highlighted`,
            muscles: [muscle],
            frequency: 5
          }
        ]
      }
    })
  }

  const handleToggleMuscle = (muscle: Muscle, defaultFrequency = 5) => {
    setActivePresetId(null)
    setExerciseData((prev) => {
      const isAlreadySelected = prev.some((item) =>
        (item.muscles as string[]).includes(muscle)
      )

      if (isAlreadySelected) {
        return prev
          .map((item) => ({
            ...item,
            muscles: (item.muscles as string[]).filter((m) => m !== muscle)
          }))
          .filter((item) => item.muscles.length > 0)
      } else {
        return [
          ...prev,
          {
            name: `${muscle} highlighted`,
            muscles: [muscle],
            frequency: defaultFrequency
          }
        ]
      }
    })
  }

  const handleUpdateIntensity = (muscle: Muscle, frequency: number) => {
    setActivePresetId(null)
    setExerciseData((prev) => {
      const existingIdx = prev.findIndex((item) =>
        (item.muscles as string[]).includes(muscle)
      )

      if (existingIdx >= 0) {
        const updated = [...prev]
        updated[existingIdx] = {
          ...updated[existingIdx],
          frequency
        }
        return updated
      } else {
        return [
          ...prev,
          {
            name: `${muscle} intensity`,
            muscles: [muscle],
            frequency
          }
        ]
      }
    })
  }

  const handleSelectAll = () => {
    setActivePresetId(null)
    // Gather all muscles in a single item
    const allMuscles: Muscle[] = [
      'chest', 'front-deltoids', 'biceps', 'forearm', 'abs', 'obliques',
      'quadriceps', 'knees', 'shins', 'neck', 'trapezius', 'upper-back',
      'lower-back', 'triceps', 'gluteal', 'hamstring', 'calves', 'left-ankle', 'right-ankle'
    ] as Muscle[]

    setExerciseData([
      {
        name: 'Full Body Highlight',
        muscles: allMuscles,
        frequency: 6
      }
    ])
  }

  const handleClearAll = () => {
    setActivePresetId(null)
    setExerciseData([])
    setExtremities((prev) => ({
      leftHand: { ...prev.leftHand, selected: false },
      rightHand: { ...prev.rightHand, selected: false },
      leftFoot: { ...prev.leftFoot, selected: false },
      rightFoot: { ...prev.rightFoot, selected: false }
    }))
  }

  const handleToggleExtremity = (key: keyof ExtremitiesState) => {
    setActivePresetId(null)
    setExtremities((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        selected: !prev[key].selected
      }
    }))
  }

  const handleToggleAspect = (key: keyof ExtremitiesState) => {
    setExtremities((prev) => {
      const item = prev[key]
      const isHand = key.includes('Hand')
      let nextAspect: 'dorsal' | 'palmar' | 'plantar' = 'dorsal'

      if (isHand) {
        nextAspect = item.aspect === 'dorsal' ? 'palmar' : 'dorsal'
      } else {
        nextAspect = item.aspect === 'dorsal' ? 'plantar' : 'dorsal'
      }

      return {
        ...prev,
        [key]: {
          ...item,
          aspect: nextAspect
        }
      }
    })
  }

  const handleUpdateExtremityItem = (
    key: keyof ExtremitiesState,
    updates: Partial<ExtremityItemState>
  ) => {
    setActivePresetId(null)
    setExtremities((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates
      }
    }))
  }

  // Count active selected muscles
  const selectedMusclesCount = exerciseData.reduce(
    (acc, curr) => acc + curr.muscles.length,
    0
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* 2. Hero Plexa Callout Banner */}
        <PlexaBanner />

        {/* 3. Main Workspace: Canvas (Left/Center) + Control Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center Main Canvas Area */}
          <div className="lg:col-span-8 space-y-6">
            <BodyPlayground
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              exerciseData={exerciseData}
              bodyColor={bodyColor}
              highlightColors={highlightColors}
              borderColor={borderColor}
              borderWidth={borderWidth}
              onMuscleClick={handleMuscleClick}
              selectedMusclesCount={selectedMusclesCount}
              onReset={handleClearAll}
            />

            {/* Extremities Section */}
            {showExtremities && (
              <ExtremitiesCard
                extremities={extremities}
                onToggleExtremity={handleToggleExtremity}
                onToggleAspect={handleToggleAspect}
                onInspectModal={(key) => setInspectedExtremityKey(key)}
                bodyColor={bodyColor}
                borderColor={borderColor}
                borderWidth={borderWidth}
              />
            )}
          </div>

          {/* Right Control Sidebar */}
          <div className="lg:col-span-4">
            <ControlPanel
              selectionMode={selectionMode}
              onSelectionModeChange={setSelectionMode}
              showExtremities={showExtremities}
              onToggleShowExtremities={() => setShowExtremities(!showExtremities)}
              bodyColor={bodyColor}
              onBodyColorChange={setBodyColor}
              highlightColors={highlightColors}
              onHighlightColorsChange={setHighlightColors}
              borderColor={borderColor}
              onBorderColorChange={setBorderColor}
              borderWidth={borderWidth}
              onBorderWidthChange={setBorderWidth}
              onApplyTheme={handleApplyTheme}
              exerciseData={exerciseData}
              onToggleMuscle={handleToggleMuscle}
              onUpdateIntensity={handleUpdateIntensity}
              onSelectAll={handleSelectAll}
              onClearAll={handleClearAll}
            />
          </div>
        </div>

        {/* 4. Scenario Presets Section */}
        <PresetSelector
          activePresetId={activePresetId}
          onSelectPreset={handlePresetSelect}
        />

        {/* 5. Live Code Generator */}
        <CodeGenerator
          viewMode={viewMode}
          exerciseData={exerciseData}
          bodyColor={bodyColor}
          highlightColors={highlightColors}
          borderColor={borderColor}
          borderWidth={borderWidth}
          showExtremities={showExtremities}
          extremities={extremities}
        />
      </main>

      {/* 6. Extremity Inspection Modal */}
      <ExtremitiesModal
        itemKey={inspectedExtremityKey}
        extremities={extremities}
        onClose={() => setInspectedExtremityKey(null)}
        onUpdateItem={handleUpdateExtremityItem}
        bodyColor={bodyColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
      />

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}

export default App
