import React, { useState } from 'react'

import { anteriorData, posteriorData } from '../assets'
import {
  DEFAULT_BODY_COLOR,
  DEFAULT_HIGHLIGHTED_COLORS,
  DEFAULT_MODEL_TYPE
} from '../constants'
import {
  IModelProps,
  IMuscleStats,
  ModelType,
  Muscle
} from '../types'
import { ensure, fillIntensityColor, fillMuscleData } from '../utils'

/**
 * Interactive SVG Body Model component supporting Anterior (Front) and Posterior (Back) views
 */
export const Model: React.FC<IModelProps> = ({
  data = [],
  bodyColor = DEFAULT_BODY_COLOR,
  highlightedColors = DEFAULT_HIGHLIGHTED_COLORS,
  onClick,
  onHover,
  renderTooltip,
  svgStyle,
  style,
  className,
  borderColor,
  borderWidth = 0.5,
  type = DEFAULT_MODEL_TYPE
}) => {
  const [hoveredMuscle, setHoveredMuscle] = useState<IMuscleStats | null>(null)

  const muscleData = fillMuscleData([...data])
  const modelData = type === ModelType.POSTERIOR ? posteriorData : anteriorData

  // Map individual custom colors from data items if present
  const customColorMap: Record<string, string> = {}
  for (const item of data) {
    if (item && 'color' in item && item.color && Array.isArray(item.muscles)) {
      for (const m of item.muscles) {
        customColorMap[m] = item.color
      }
    }
  }

  const handleClick = (muscle: Muscle) => {
    const stats: IMuscleStats = {
      muscle,
      data: muscleData[muscle] || { exercises: [], frequency: 0 }
    }
    if (onClick) {
      onClick(stats)
    }
  }

  const handleMouseEnter = (muscle: Muscle) => {
    const stats: IMuscleStats = {
      muscle,
      data: muscleData[muscle] || { exercises: [], frequency: 0 }
    }
    setHoveredMuscle(stats)
    if (onHover) {
      onHover(stats)
    }
  }

  const handleMouseLeave = () => {
    setHoveredMuscle(null)
    if (onHover) {
      onHover(null)
    }
  }

  const getPolygonFill = (muscle: Muscle): string => {
    if (customColorMap[muscle]) {
      return customColorMap[muscle]
    }
    const intensityColor = fillIntensityColor(muscleData, highlightedColors, muscle)
    return ensure(intensityColor, bodyColor)
  }

  const wrapperClass = ['rbh-wrapper', className].filter(Boolean).join(' ')

  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }} className={wrapperClass}>
      <svg
        className='rbh'
        width='100%'
        height='100%'
        viewBox='0 0 100 200'
        style={{
          display: 'block',
          ...svgStyle
        }}
        data-testid={`model-${type}`}
      >
        {modelData.map((exercise) =>
          exercise.svgPoints.map((points, index) => (
            <polygon
              key={`${exercise.muscle}-${index}`}
              points={points}
              data-muscle={exercise.muscle}
              data-testid={`muscle-${exercise.muscle}`}
              aria-label={exercise.muscle}
              onClick={() => handleClick(exercise.muscle)}
              onMouseEnter={() => handleMouseEnter(exercise.muscle)}
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: 'pointer',
                fill: getPolygonFill(exercise.muscle),
                stroke: borderColor,
                strokeWidth: borderColor ? borderWidth : undefined,
                strokeLinejoin: 'round',
                strokeLinecap: 'round',
                transition: 'fill 0.15s ease-in-out'
              }}
            />
          ))
        )}
      </svg>
      {renderTooltip && hoveredMuscle && (
        <div
          className='rbh-tooltip'
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 10
          }}
          data-testid='rbh-tooltip'
        >
          {renderTooltip(hoveredMuscle)}
        </div>
      )}
    </div>
  )
}

export default React.memo(Model)
