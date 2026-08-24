---
name: 🐛 Bug Report
about: Create a report to help us improve @plexapro/react-body-highlighter
title: '[BUG] '
labels: ['bug', 'triage']
assignees: ''
---

## 🐛 Bug Description
A clear and concise description of what the bug is.

## 🔄 Reproduction Steps
Steps to reproduce the behavior:
1. Initialize `<Model type="anterior" ... />` with props: `...`
2. Click on muscle `...`
3. Notice unexpected behavior: `...`

## 💻 Minimal Code Example
```tsx
import Model from '@plexapro/react-body-highlighter'

export function BugRepro() {
  return (
    <Model
      type="anterior"
      data={[{ name: 'Test', muscles: ['chest'] }]}
    />
  )
}
```

## 🎯 Expected Behavior
A clear and concise description of what you expected to happen.

## 🖥️ Environment & Versions
- **Package Version**: (e.g. `1.0.0`)
- **React Version**: (e.g. `19.0.0` / `18.3.1`)
- **Browser**: (e.g. Chrome 128, Safari 18, Firefox 130)
- **OS**: (e.g. macOS 15, Windows 11, iOS 18, Android 14)
- **Bundler / Framework**: (e.g. Vite 7, Next.js 15, Webpack 5, Remix)

## 📸 Screenshots / Recordings
If applicable, add screenshots or screen recordings to help explain your problem.

## 📋 Additional Context
Add any other context about the problem here (e.g., SSR / RSC hydration behavior, SVG viewBox scaling, touch event quirks).
