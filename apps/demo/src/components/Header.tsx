import React, { useState } from 'react'
import {
  Github,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Sparkles
} from 'lucide-react'

export const Header: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const installCmd = 'npm i @plexapro/react-body-highlighter'

  const copyInstall = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.plexapro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group"
            title="Visit Plexa (www.plexapro.com)"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-lg tracking-tighter">
                  P
                </span>
              </div>
            </div>
          </a>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>React Body Highlighter</span>
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Interactive SVG Anatomy & Injury Visualizer for React
            </p>
          </div>
        </div>

        {/* Center/Right: Action Buttons & Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Install Snippet */}
          <button
            onClick={copyInstall}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-300 transition-colors shadow-inner"
            title="Click to copy install command"
          >
            <span className="text-blue-400">$</span>
            <span>{installCmd}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400 ml-1" />
            )}
          </button>

          {/* Preset scenarios jump button */}
          <a
            href="#presets-section"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Presets</span>
          </a>

          {/* Documentation link */}
          <a
            href="https://github.com/Plexapro/react-body-highlighter#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Docs</span>
          </a>

          {/* GitHub Repo Button */}
          <a
            href="https://github.com/Plexapro/react-body-highlighter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all hover:scale-105"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>
        </div>
      </div>
    </header>
  )
}
