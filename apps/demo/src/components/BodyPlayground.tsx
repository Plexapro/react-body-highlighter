import React, { useState } from 'react'
import Model, { Muscle, IMuscleStats, IExerciseData } from '@plexapro/react-body-highlighter'
import {
  ViewMode,
  ActiveTooltipData
} from '../types/showcase'
import { MUSCLE_METADATA } from '../data/muscleMetadata'
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Layers,
  Sparkles,
  Info,
  Sliders
} from 'lucide-react'

interface BodyPlaygroundProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  exerciseData: IExerciseData[]
  bodyColor: string
  highlightColors: string[]
  borderColor: string
  borderWidth: number
  onMuscleClick: (stats: IMuscleStats) => void
  selectedMusclesCount: number
  onReset: () => void
}

export const BodyPlayground: React.FC<BodyPlaygroundProps> = ({
  viewMode,
  onViewModeChange,
  exerciseData,
  bodyColor,
  highlightColors,
  borderColor,
  borderWidth,
  onMuscleClick,
  selectedMusclesCount,
  onReset
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [hoveredData, setHoveredData] = useState<ActiveTooltipData | null>(null)

  const handleHover = (stats: IMuscleStats | null, event?: React.MouseEvent) => {
    if (!stats || !stats.muscle) {
      setHoveredData(null)
      return
    }

    const meta = MUSCLE_METADATA[stats.muscle]
    const label = meta ? meta.label : stats.muscle.replace(/-/g, ' ')
    const category = meta ? meta.category : 'Anatomical Region'

    setHoveredData({
      muscle: stats.muscle,
      label,
      category,
      frequency: stats.data?.frequency || 1,
      notes: meta?.commonInjuries,
      x: event ? event.clientX : 0,
      y: event ? event.clientY : 0
    })
  }

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.6))
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.7))
  const handleResetZoom = () => setZoomLevel(1)

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl relative overflow-hidden flex flex-col h-full">
      {/* Top Bar: View Mode Switcher & Zoom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Perspective:
          </span>

          <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onViewModeChange('dual')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                viewMode === 'dual'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dual (Both)
            </button>
            <button
              onClick={() => onViewModeChange('anterior')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                viewMode === 'anterior'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Anterior (Front)
            </button>
            <button
              onClick={() => onViewModeChange('posterior')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                viewMode === 'posterior'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Posterior (Back)
            </button>
          </div>
        </div>

        {/* Action Controls: Zoom + Reset */}
        <div className="flex items-center gap-2">
          <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-slate-300">
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-slate-800 rounded-lg hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-slate-800 rounded-lg hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1.5 text-xs font-mono hover:bg-slate-800 rounded-lg hover:text-white transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 rounded-xl transition-colors"
            title="Reset All Selections"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 min-h-[440px] flex items-center justify-center p-4 overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Models Container */}
        <div
          className="relative z-10 transition-transform duration-200 ease-out flex flex-wrap items-center justify-center gap-6 sm:gap-12"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Anterior (Front) Model View */}
          {(viewMode === 'dual' || viewMode === 'anterior') && (
            <div className="flex flex-col items-center group">
              <div className="flex items-center justify-between w-full px-2 mb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                <span className="text-blue-400/80">Right (Anat.)</span>
                <span className="text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                  Front (Anterior)
                </span>
                <span className="text-cyan-400/80">Left (Anat.)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-2xl hover:border-blue-500/40 transition-colors">
                <Model
                  type="anterior"
                  data={exerciseData}
                  bodyColor={bodyColor}
                  highlightedColors={highlightColors}
                  borderColor={borderColor}
                  borderWidth={borderWidth}
                  onClick={onMuscleClick}
                  onHover={(stats) => handleHover(stats)}
                  style={{
                    width: viewMode === 'dual' ? '14rem' : '18rem',
                    height: 'auto',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          )}

          {/* Posterior (Back) Model View */}
          {(viewMode === 'dual' || viewMode === 'posterior') && (
            <div className="flex flex-col items-center group">
              <div className="flex items-center justify-between w-full px-2 mb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                <span className="text-cyan-400/80">Left (Anat.)</span>
                <span className="text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                  Back (Posterior)
                </span>
                <span className="text-blue-400/80">Right (Anat.)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-2xl hover:border-blue-500/40 transition-colors">
                <Model
                  type="posterior"
                  data={exerciseData}
                  bodyColor={bodyColor}
                  highlightedColors={highlightColors}
                  borderColor={borderColor}
                  borderWidth={borderWidth}
                  onClick={onMuscleClick}
                  onHover={(stats) => handleHover(stats)}
                  style={{
                    width: viewMode === 'dual' ? '14rem' : '18rem',
                    height: 'auto',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Hover Tooltip / Status Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
            <Info className="w-4 h-4" />
          </div>

          <div>
            {hoveredData ? (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white capitalize">
                    {hoveredData.label}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {hoveredData.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {hoveredData.notes ? `Clinical notes: ${hoveredData.notes}` : `Click to toggle selection or adjust intensity`}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-medium text-slate-300">
                  Interactive Anatomy Inspector
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Hover over any muscle group to view anatomical data; click to highlight.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="text-xs font-medium text-slate-400">
            Active Regions: <strong className="text-blue-400">{selectedMusclesCount}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
