import React, { useState } from 'react'
import {
  CodeLanguage,
  CodeSnippetStyle,
  ViewMode,
  ExtremitiesState
} from '../types/showcase'
import { IExerciseData } from '@plexapro/react-body-highlighter'
import { generateCodeSnippet } from '../utils/codeFormatter'
import {
  Code2,
  Copy,
  Check,
  FileCode,
  Sparkles,
  Terminal
} from 'lucide-react'

interface CodeGeneratorProps {
  viewMode: ViewMode
  exerciseData: IExerciseData[]
  bodyColor: string
  highlightColors: string[]
  borderColor: string
  borderWidth: number
  showExtremities: boolean
  extremities: ExtremitiesState
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  viewMode,
  exerciseData,
  bodyColor,
  highlightColors,
  borderColor,
  borderWidth,
  showExtremities,
  extremities
}) => {
  const [language, setLanguage] = useState<CodeLanguage>('typescript')
  const [style, setStyle] = useState<CodeSnippetStyle>('minimal')
  const [copied, setCopied] = useState(false)

  const codeString = generateCodeSnippet({
    language,
    style,
    viewMode,
    data: exerciseData,
    bodyColor,
    highlightColors,
    borderColor,
    borderWidth,
    showExtremities,
    extremities
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Live Code Snippet Generator</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                Live State
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Copy-pasteable React code customized to your active anatomy selections and styling
            </p>
          </div>
        </div>

        {/* Toggles: TSX/JSX & Minimal/Full */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Toggle */}
          <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setLanguage('typescript')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                language === 'typescript'
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              TSX (TypeScript)
            </button>
            <button
              onClick={() => setLanguage('javascript')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                language === 'javascript'
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JSX (JavaScript)
            </button>
          </div>

          {/* Style Toggle */}
          <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setStyle('minimal')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                style === 'minimal'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Minimal
            </button>
            <button
              onClick={() => setStyle('full')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                style === 'full'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Interactive
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold shadow-lg transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[11px] text-slate-300">
              BodyVisualizer.{language === 'typescript' ? 'tsx' : 'jsx'}
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            {codeString.split('\n').length} lines
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-96">
          <code>{codeString}</code>
        </pre>
      </div>
    </div>
  )
}
