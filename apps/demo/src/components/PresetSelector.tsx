import React from 'react'
import { PresetScenario } from '../types/showcase'
import { PRESET_SCENARIOS } from '../data/presets'
import {
  ShieldAlert,
  Flame,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

interface PresetSelectorProps {
  activePresetId: string | null
  onSelectPreset: (preset: PresetScenario) => void
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  activePresetId,
  onSelectPreset
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />
      case 'Flame':
        return <Flame className="w-5 h-5" />
      case 'Activity':
        return <Activity className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  return (
    <div id="presets-section" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Real-World Application Presets</span>
          </h2>
          <p className="text-xs text-slate-400">
            One-click interactive scenarios showing production use cases across EHS, Fitness, and Telehealth
          </p>
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESET_SCENARIOS.map((preset) => {
          const isActive = activePresetId === preset.id

          return (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900/90 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/40'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Active Indicator Ribbon */}
              {isActive && (
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                  <div className="absolute transform rotate-45 bg-blue-600 text-white font-bold text-[9px] py-0.5 right-[-35px] top-[18px] w-[120px] text-center shadow-md">
                    ACTIVE
                  </div>
                </div>
              )}

              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      preset.id.includes('safety')
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : preset.id.includes('gym')
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {getIcon(preset.icon)}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${preset.badgeColor}`}
                  >
                    {preset.badge}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {preset.title}
                </h3>
                <span className="text-[11px] font-medium text-slate-400 block mb-2">
                  {preset.subtitle}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {preset.description}
                </p>

                {/* Key Metadata Badges */}
                <div className="space-y-1 pt-3 border-t border-slate-800/80 mb-4 text-[11px]">
                  {preset.metadata.slice(0, 3).map((meta, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-400">
                      <span>{meta.label}:</span>
                      <strong className="text-slate-200 font-medium">{meta.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-300 group-hover:bg-slate-800 group-hover:text-white border border-slate-800'
                }`}
              >
                {isActive ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Preset Applied</span>
                  </>
                ) : (
                  <>
                    <span>Load Scenario</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
