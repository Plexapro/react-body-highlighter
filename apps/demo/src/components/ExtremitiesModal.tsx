import React from 'react'
import { HandSvg, FootSvg } from '@plexapro/react-body-highlighter'
import { ExtremitiesState, ExtremityItemState } from '../types/showcase'
import { X, Sliders, AlertTriangle } from 'lucide-react'

interface ExtremitiesModalProps {
  itemKey: keyof ExtremitiesState | null
  extremities: ExtremitiesState
  onClose: () => void
  onUpdateItem: (key: keyof ExtremitiesState, updates: Partial<ExtremityItemState>) => void
  bodyColor: string
  borderColor: string
  borderWidth: number
}

export const ExtremitiesModal: React.FC<ExtremitiesModalProps> = ({
  itemKey,
  extremities,
  onClose,
  onUpdateItem,
  bodyColor,
  borderColor,
  borderWidth
}) => {
  if (!itemKey) return null

  const item = extremities[itemKey]
  const isHand = itemKey.includes('Hand')
  const position = itemKey.startsWith('left') ? 'left' : 'right'
  const title = `${position === 'left' ? 'Left' : 'Right'} ${isHand ? 'Hand' : 'Foot'}`

  const handleSeverityChange = (val: number) => {
    const color =
      val >= 8
        ? '#ef4444'
        : val >= 5
        ? '#f97316'
        : val >= 3
        ? '#eab308'
        : '#3b82f6'
    onUpdateItem(itemKey, { severity: val, color, selected: true })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title} Specialist View</h3>
            <p className="text-xs text-slate-400">
              High-resolution joint, ligament, and dorsal/palmar/plantar inspection
            </p>
          </div>
        </div>

        {/* Graphic Preview */}
        <div className="flex justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 mb-5">
          {isHand ? (
            <HandSvg
              position={position}
              color={item.selected ? item.color : bodyColor}
              borderColor={borderColor}
              borderWidth={borderWidth}
              sizing="w-36 h-36"
            />
          ) : (
            <FootSvg
              position={position}
              color={item.selected ? item.color : bodyColor}
              borderColor={borderColor}
              borderWidth={borderWidth}
              sizing="w-36 h-36"
            />
          )}
        </div>

        {/* Form Controls */}
        <div className="space-y-4 text-xs">
          {/* Active Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="font-medium text-slate-200">Highlight Status</span>
            <button
              onClick={() => onUpdateItem(itemKey, { selected: !item.selected })}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                item.selected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {item.selected ? 'Selected (Active)' : 'Inactive (Unselected)'}
            </button>
          </div>

          {/* Aspect Selection */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="font-medium text-slate-200">Anatomical Aspect</span>
            <div className="inline-flex bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => onUpdateItem(itemKey, { aspect: 'dorsal' })}
                className={`px-3 py-1 rounded-md capitalize transition-colors ${
                  item.aspect === 'dorsal'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dorsal ({isHand ? 'Back' : 'Top'})
              </button>
              <button
                onClick={() =>
                  onUpdateItem(itemKey, { aspect: isHand ? 'palmar' : 'plantar' })
                }
                className={`px-3 py-1 rounded-md capitalize transition-colors ${
                  item.aspect === (isHand ? 'palmar' : 'plantar')
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isHand ? 'Palmar (Palm)' : 'Plantar (Sole)'}
              </button>
            </div>
          </div>

          {/* Severity Slider */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-200">
                Injury / Discomfort Severity Score
              </span>
              <span className="font-bold text-blue-400 font-mono">
                {item.severity || 5} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={item.severity || 5}
              onChange={(e) => handleSeverityChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Clinical Notes Input */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
            <label className="block font-medium text-slate-200">
              Clinical Assessment & Diagnostic Notes
            </label>
            <input
              type="text"
              value={item.notes || ''}
              onChange={(e) => onUpdateItem(itemKey, { notes: e.target.value })}
              placeholder="e.g. Tenderness over 2nd metacarpal joint, swollen dorsal surface..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Done Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-colors"
          >
            Save & Apply
          </button>
        </div>
      </div>
    </div>
  )
}
