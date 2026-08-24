import React, { useState } from 'react'
import { Muscle, IExerciseData } from '@plexapro/react-body-highlighter'
import {
  SelectionMode,
  ThemePalette
} from '../types/showcase'
import { MUSCLE_METADATA, CATEGORIES } from '../data/muscleMetadata'
import { THEME_PALETTES } from '../data/presets'
import {
  Palette,
  Search,
  Sliders,
  CheckSquare,
  Square,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Footprints,
  Eye
} from 'lucide-react'

interface ControlPanelProps {
  selectionMode: SelectionMode
  onSelectionModeChange: (mode: SelectionMode) => void
  showExtremities: boolean
  onToggleShowExtremities: () => void
  bodyColor: string
  onBodyColorChange: (color: string) => void
  highlightColors: string[]
  onHighlightColorsChange: (colors: string[]) => void
  borderColor: string
  onBorderColorChange: (color: string) => void
  borderWidth: number
  onBorderWidthChange: (width: number) => void
  onApplyTheme: (theme: ThemePalette) => void
  exerciseData: IExerciseData[]
  onToggleMuscle: (muscle: Muscle, defaultFrequency?: number) => void
  onUpdateIntensity: (muscle: Muscle, frequency: number) => void
  onSelectAll: () => void
  onClearAll: () => void
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectionMode,
  onSelectionModeChange,
  showExtremities,
  onToggleShowExtremities,
  bodyColor,
  onBodyColorChange,
  highlightColors,
  onHighlightColorsChange,
  borderColor,
  onBorderColorChange,
  borderWidth,
  onBorderWidthChange,
  onApplyTheme,
  exerciseData,
  onToggleMuscle,
  onUpdateIntensity,
  onSelectAll,
  onClearAll
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [paletteExpanded, setPaletteExpanded] = useState(true)
  const [musclesExpanded, setMusclesExpanded] = useState(true)

  // Map active muscles to quick lookup map
  const activeMusclesMap = new Map<string, number>()
  exerciseData.forEach((item) => {
    item.muscles.forEach((m) => {
      activeMusclesMap.set(m, item.frequency || 1)
    })
  })

  // Filter muscles
  const filteredMuscles = Object.values(MUSCLE_METADATA).filter((item) => {
    const matchesSearch =
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* 1. Interaction Mode & Extremities Switcher */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-sm shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Interaction Mode</span>
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onSelectionModeChange('multi')}
            className={`py-2 px-2 rounded-lg font-medium transition-all ${
              selectionMode === 'multi'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multi-Select
          </button>

          <button
            onClick={() => onSelectionModeChange('single')}
            className={`py-2 px-2 rounded-lg font-medium transition-all ${
              selectionMode === 'single'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Single-Select
          </button>

          <button
            onClick={() => onSelectionModeChange('intensity')}
            className={`py-2 px-2 rounded-lg font-medium transition-all ${
              selectionMode === 'intensity'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Heatmap / Scale
          </button>
        </div>

        {/* Extremities Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Footprints className="w-4 h-4 text-cyan-400" />
            <span>Show Hands & Feet Inspector</span>
          </div>

          <button
            onClick={onToggleShowExtremities}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              showExtremities
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'bg-slate-950 text-slate-500 border border-slate-800'
            }`}
          >
            {showExtremities ? 'Visible' : 'Hidden'}
          </button>
        </div>
      </div>

      {/* 2. Color Palette & Theming */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-sm shadow-xl space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setPaletteExpanded(!paletteExpanded)}
        >
          <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-400" />
            <span>Theming & Custom Colors</span>
          </h3>

          <button className="text-slate-400 hover:text-white">
            {paletteExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {paletteExpanded && (
          <div className="space-y-4 pt-2">
            {/* Quick Themes */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Preset Palettes:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {THEME_PALETTES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => onApplyTheme(theme)}
                    className="p-2 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-left transition-colors group flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: theme.highlightColors[1] || theme.highlightColors[0] }}
                      />
                      <span className="text-[11px] font-semibold text-slate-200 truncate group-hover:text-white">
                        {theme.name.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex gap-0.5 h-1.5 w-full rounded-full overflow-hidden">
                      {theme.highlightColors.map((c, i) => (
                        <div
                          key={i}
                          className="flex-1"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Pickers */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
              {/* Body Fill Color */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] text-slate-400 block font-medium">
                  Base Body Fill
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bodyColor}
                    onChange={(e) => onBodyColorChange(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="font-mono text-[11px] text-slate-300">
                    {bodyColor}
                  </span>
                </div>
              </div>

              {/* Stroke / Border Color */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] text-slate-400 block font-medium">
                  Stroke / Outline
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => onBorderColorChange(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="font-mono text-[11px] text-slate-300">
                    {borderColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Border Width Slider */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">
                  Outline Width (px)
                </span>
                <span className="font-mono font-bold text-blue-400">
                  {borderWidth}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="3.5"
                step="0.5"
                value={borderWidth}
                onChange={(e) => onBorderWidthChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Searchable Muscle Selection List */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-sm shadow-xl space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setMusclesExpanded(!musclesExpanded)}
        >
          <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-blue-400" />
            <span>Anatomical Selector ({filteredMuscles.length})</span>
          </h3>

          <button className="text-slate-400 hover:text-white">
            {musclesExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {musclesExpanded && (
          <div className="space-y-3 pt-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search muscles, regions, injuries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <button
                onClick={onSelectAll}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Select Filtered
              </button>
              <button
                onClick={onClearAll}
                className="text-slate-400 hover:text-slate-300"
              >
                Clear All
              </button>
            </div>

            {/* Scrollable Muscle Items */}
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {filteredMuscles.map((muscleItem) => {
                const isActive = activeMusclesMap.has(muscleItem.slug)
                const currentIntensity = activeMusclesMap.get(muscleItem.slug) || 1

                return (
                  <div
                    key={muscleItem.slug}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-slate-950 border-blue-500/50 shadow-sm shadow-blue-500/10'
                        : 'bg-slate-950/40 border-slate-850 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => onToggleMuscle(muscleItem.slug)}
                          className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                        <span
                          className={`truncate font-medium ${
                            isActive ? 'text-blue-400 font-semibold' : 'text-slate-300'
                          }`}
                        >
                          {muscleItem.label}
                        </span>
                      </label>

                      {isActive && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                          Int: {currentIntensity}
                        </span>
                      )}
                    </div>

                    {/* Intensity Slider if Active */}
                    {isActive && (
                      <div className="mt-2 pt-2 border-t border-slate-900 flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">Scale:</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentIntensity}
                          onChange={(e) =>
                            onUpdateIntensity(muscleItem.slug, Number(e.target.value))
                          }
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
