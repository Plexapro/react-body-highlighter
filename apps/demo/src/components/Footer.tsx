import React from 'react'
import {
  Github,
  Heart,
  ExternalLink,
  Shield,
  BookOpen,
  FileCode
} from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Plexa & Project Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-base">
                    P
                  </span>
                </div>
              </div>
              <span className="font-bold text-white text-base">
                @plexapro/react-body-highlighter
              </span>
            </div>

            <p className="text-slate-400 max-w-md leading-relaxed">
              An open-source interactive SVG human body, muscle, and extremities visualizer for React. Maintained with ❤️ by{' '}
              <a
                href="https://www.plexapro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2"
              >
                Plexa
              </a>{' '}
              — powering construction safety incident reporting and field site operations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Plexapro/react-body-highlighter"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.plexapro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <span>Visit Plexa Pro</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Resources & Documentation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Documentation & Guides
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter#quick-start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Quick Start Guide
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter#api-reference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  API Reference & Props
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter#anatomical-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  42 Anatomical Muscle Keys
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter#extremities-support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Extremities (Hands & Feet)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Governance */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Open Source Community
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contributing Guidelines
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Plexapro/react-body-highlighter/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Security Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 Plexa (www.plexapro.com). Distributed under the MIT License.</p>
          <div className="flex items-center gap-1">
            <span>Built with React 19 & TypeScript for the open-source community</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
