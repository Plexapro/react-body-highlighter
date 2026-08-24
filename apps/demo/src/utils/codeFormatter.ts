import { IExerciseData } from '@plexapro/react-body-highlighter'
import { CodeLanguage, CodeSnippetStyle, ViewMode, ExtremitiesState } from '../types/showcase'

interface FormatCodeOptions {
  language: CodeLanguage
  style: CodeSnippetStyle
  viewMode: ViewMode
  data: IExerciseData[]
  bodyColor: string
  highlightColors: string[]
  borderColor: string
  borderWidth: number
  showExtremities: boolean
  extremities: ExtremitiesState
}

export function generateCodeSnippet(options: FormatCodeOptions): string {
  const {
    language,
    style,
    viewMode,
    data,
    bodyColor,
    highlightColors,
    borderColor,
    borderWidth,
    showExtremities,
    extremities
  } = options

  const isTs = language === 'typescript'
  const isFull = style === 'full'

  // Format data array cleanly
  const formattedData = JSON.stringify(data, null, 2)
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `  ${line}`))
    .join('\n')

  const formattedColors = JSON.stringify(highlightColors)

  if (!isFull) {
    // Minimal snippet
    if (viewMode === 'dual') {
      return `${isTs ? "import React from 'react'\n" : ''}import Model from '@plexapro/react-body-highlighter'

const data = ${formattedData}

export default function BodyVisualizer() {
  return (
    <div className="flex gap-8 justify-center">
      {/* Front View (Anterior) */}
      <Model
        type="anterior"
        data={data}
        highlightedColors={${formattedColors}}
        bodyColor="${bodyColor}"
        borderColor="${borderColor}"
        borderWidth={${borderWidth}}
        style={{ width: '18rem' }}
      />

      {/* Back View (Posterior) */}
      <Model
        type="posterior"
        data={data}
        highlightedColors={${formattedColors}}
        bodyColor="${bodyColor}"
        borderColor="${borderColor}"
        borderWidth={${borderWidth}}
        style={{ width: '18rem' }}
      />
    </div>
  )
}`
    } else {
      return `${isTs ? "import React from 'react'\n" : ''}import Model from '@plexapro/react-body-highlighter'

const data = ${formattedData}

export default function SingleBodyVisualizer() {
  return (
    <div className="flex justify-center">
      <Model
        type="${viewMode}"
        data={data}
        highlightedColors={${formattedColors}}
        bodyColor="${bodyColor}"
        borderColor="${borderColor}"
        borderWidth={${borderWidth}}
        style={{ width: '20rem' }}
      />
    </div>
  )
}`
    }
  }

  // Full snippet with state, handlers, extremities
  const namedImports = [
    ...(showExtremities ? ['HandSvg', 'FootSvg'] : []),
    ...(isTs ? ['IMuscleStats', 'IExerciseData'] : [])
  ]
  const importClause = namedImports.length > 0 ? `, { ${namedImports.join(', ')} }` : ''

  let extremitiesJsx = ''
  if (showExtremities) {
    extremitiesJsx = `
      {/* Extremities Specialist View (Hands & Feet) */}
      <div className="flex gap-4 mt-6 justify-center">
        <HandSvg
          position="left"
          color="${extremities.leftHand.selected ? extremities.leftHand.color : bodyColor}"
          borderColor="${borderColor}"
          borderWidth={${borderWidth}}
          sizing="w-20 h-20"
        />
        <HandSvg
          position="right"
          color="${extremities.rightHand.selected ? extremities.rightHand.color : bodyColor}"
          borderColor="${borderColor}"
          borderWidth={${borderWidth}}
          sizing="w-20 h-20"
        />
        <FootSvg
          position="left"
          color="${extremities.leftFoot.selected ? extremities.leftFoot.color : bodyColor}"
          borderColor="${borderColor}"
          borderWidth={${borderWidth}}
          sizing="w-20 h-20"
        />
        <FootSvg
          position="right"
          color="${extremities.rightFoot.selected ? extremities.rightFoot.color : bodyColor}"
          borderColor="${borderColor}"
          borderWidth={${borderWidth}}
          sizing="w-20 h-20"
        />
      </div>`
  }

  return `${isTs ? "import React, { useState } from 'react'\n" : "import { useState } from 'react'\n"}import Model${importClause} from '@plexapro/react-body-highlighter'

export default function InteractiveBodyDashboard() {
  const [data, setData] = useState${isTs ? '<IExerciseData[]>' : ''}(${formattedData})
  const [selectedMuscle, setSelectedMuscle] = useState${isTs ? '<string | null>' : ''}(null)

  const handleMuscleClick = (stats${isTs ? ': IMuscleStats' : ''}) => {
    console.log('Muscle clicked:', stats.muscle, stats.data)
    setSelectedMuscle(stats.muscle)
  }

  const handleMuscleHover = (stats${isTs ? ': IMuscleStats | null' : ''}) => {
    if (stats) {
      console.log('Hovering over:', stats.muscle)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        ${
          viewMode === 'dual' || viewMode === 'anterior'
            ? `<div>
          <h3 className="text-center font-medium text-slate-400 mb-2">Anterior (Front)</h3>
          <Model
            type="anterior"
            data={data}
            highlightedColors={${formattedColors}}
            bodyColor="${bodyColor}"
            borderColor="${borderColor}"
            borderWidth={${borderWidth}}
            onClick={handleMuscleClick}
            onHover={handleMuscleHover}
            style={{ width: '18rem', cursor: 'pointer' }}
          />
        </div>`
            : ''
        }
        ${
          viewMode === 'dual' || viewMode === 'posterior'
            ? `<div>
          <h3 className="text-center font-medium text-slate-400 mb-2">Posterior (Back)</h3>
          <Model
            type="posterior"
            data={data}
            highlightedColors={${formattedColors}}
            bodyColor="${bodyColor}"
            borderColor="${borderColor}"
            borderWidth={${borderWidth}}
            onClick={handleMuscleClick}
            onHover={handleMuscleHover}
            style={{ width: '18rem', cursor: 'pointer' }}
          />
        </div>`
            : ''
        }
      </div>${extremitiesJsx}

      {selectedMuscle && (
        <div className="mt-4 p-3 bg-slate-800 rounded-lg text-center text-sm text-slate-200">
          Active Selection: <span className="font-semibold text-blue-400">{selectedMuscle}</span>
        </div>
      )}
    </div>
  )
}`
}
