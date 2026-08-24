import React from 'react'
import { HandSvg, FootSvg } from '@plexapro/react-body-highlighter'
import { ExtremitiesState, ExtremityItemState } from '../types/showcase'
import { CheckCircle2, Circle, Eye, Sparkles } from 'lucide-react'

interface ExtremitiesCardProps {
  extremities: ExtremitiesState
  onToggleExtremity: (key: keyof ExtremitiesState) => void
  onToggleAspect: (key: keyof ExtremitiesState) => void
  onInspectModal: (key: keyof ExtremitiesState) => void
  bodyColor: string
  borderColor: string
  borderWidth: number
}

export const ExtremitiesCard: React.FC<ExtremitiesCardProps> = ({
  extremities,
  onToggleExtremity,
  onToggleAspect,
  onInspectModal,
  bodyColor,
  borderColor,
  borderWidth
}) => {
  const items: Array<{
    key: keyof ExtremitiesState
    title: string
    type: 'hand' | 'foot'
    position: 'left' | 'right'
    state: ExtremityItemState
  }> = [
    {
      key: 'leftHand',
      title: 'Left Hand',
      type: 'hand',
      position: 'left',
      state: extremities.leftHand
    },
    {
      key: 'rightHand',
      title: 'Right Hand',
      type: 'hand',
      position: 'right',
      state: extremities.rightHand
    },
    {
      key: 'leftFoot',
      title: 'Left Foot',
      type: 'foot',
      position: 'left',
      state: extremities.leftFoot
    },
    {
      key: 'rightFoot',
      title: 'Right Foot',
      type: 'foot',
      position: 'right',
      state: extremities.rightFoot
    }
  ]

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span>Extremities Specialist Inspector</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Hands & Feet
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dedicated high-resolution vector models for intricate distal joint & ligament analysis
          </p>
        </div>
      </div>

      {/* Grid of 4 Extremity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const isSelected = item.state.selected
          const fillColor = isSelected ? item.state.color : bodyColor

          return (
            <div
              key={item.key}
              className={`relative rounded-xl p-3.5 border transition-all duration-200 ${
                isSelected
                  ? 'bg-slate-950/80 border-blue-500/60 shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/30'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">
                  {item.title}
                </span>

                <button
                  onClick={() => onToggleExtremity(item.key)}
                  className={`p-1 rounded-md transition-colors ${
                    isSelected
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={isSelected ? 'Deselect extremity' : 'Select extremity'}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* SVG Graphic Viewport */}
              <div
                onClick={() => onToggleExtremity(item.key)}
                className="w-full h-28 flex items-center justify-center p-2 rounded-lg bg-slate-900/80 border border-slate-800/60 cursor-pointer hover:bg-slate-900 transition-colors group"
                title={`Click to toggle ${item.title}`}
              >
                {item.type === 'hand' ? (
                  <HandSvg
                    position={item.position}
                    color={fillColor}
                    borderColor={borderColor}
                    borderWidth={borderWidth}
                    sizing="w-20 h-20 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <FootSvg
                    position={item.position}
                    color={fillColor}
                    borderColor={borderColor}
                    borderWidth={borderWidth}
                    sizing="w-20 h-20 group-hover:scale-105 transition-transform"
                  />
                )}
              </div>

              {/* Aspect & Details Controls */}
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => onToggleAspect(item.key)}
                  className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 capitalize transition-colors"
                >
                  Aspect:{' '}
                  <span className="font-semibold text-blue-400">
                    {item.state.aspect}
                  </span>
                </button>

                <button
                  onClick={() => onInspectModal(item.key)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Inspect extremity notes"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>

              {/* Clinical note preview if active */}
              {isSelected && item.state.notes && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 line-clamp-2">
                  <span className="font-semibold text-slate-300">Note:</span>{' '}
                  {item.state.notes}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
