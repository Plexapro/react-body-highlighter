import React from 'react'
import { ShieldAlert, ExternalLink, HardHat } from 'lucide-react'

export const PlexaBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-cyan-950/70 border border-blue-500/30 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-md shadow-xl shadow-blue-950/30 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400 shrink-0 shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                <HardHat className="w-3 h-3" />
                Maintained by Plexa
              </span>
              <span className="text-xs text-slate-400">
                Battle-Tested in Enterprise Jobsite Safety
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white mt-1.5 tracking-tight">
              High-Stakes Injury Documentation Built for the Field
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              This component powers visual incident and injury reporting in{' '}
              <a
                href="https://www.plexapro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 decoration-blue-500/50 hover:decoration-blue-400"
              >
                Plexa
              </a>{' '}
              — the comprehensive construction operations platform. Safety supervisors use it on site tablets to visually log injuries in under 15 seconds, automating worker compensation reports, OSHA logs, and hazard heatmaps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto self-end lg:self-center shrink-0">
          <a
            href="https://www.plexapro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Plexa Platform</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
