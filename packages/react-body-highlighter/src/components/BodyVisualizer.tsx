import React from 'react'

import { DEFAULT_BODY_COLOR, DEFAULT_HIGHLIGHTED_COLORS } from '../constants'
import {
  BodyVisualizerProps,
  IBodyPart,
  IMuscleStats,
  Muscle
} from '../types'
import { dedupeBodyParts } from '../utils'
import FootSvg from './FootSvg'
import HandSvg from './HandSvg'
import Model from './Model'

export const BodyVisualizer: React.FC<BodyVisualizerProps> = ({
  frontBodyPart = [],
  backBodyPart = [],
  handsPart = [],
  footPart = [],
  selectedParts,
  onPartClick,
  isDisabled = false,
  showSideLabels = true,
  showExtremities = true,
  size = 'default',
  bodyColor = DEFAULT_BODY_COLOR,
  highlightColor = '#81B1D8',
  highlightedColors = DEFAULT_HIGHLIGHTED_COLORS,
  borderColor,
  borderWidth = 0.5,
  className,
  style,
  handleChange
}) => {
  // If selectedParts convenience prop is passed and front/back arrays are empty, populate them
  let resolvedFront: IBodyPart[] = Array.isArray(frontBodyPart) ? frontBodyPart : []
  let resolvedBack: IBodyPart[] = Array.isArray(backBodyPart) ? backBodyPart : []

  if (Array.isArray(selectedParts) && selectedParts.length > 0 && resolvedFront.length === 0 && resolvedBack.length === 0) {
    const validParts = selectedParts.filter(Boolean)
    resolvedFront = validParts.map((p) => ({
      name: p.label || p.muscle,
      type: 'anterior' as const,
      muscles: [p.muscle],
      color: p.color || highlightColor
    }))
    resolvedBack = validParts.map((p) => ({
      name: p.label || p.muscle,
      type: 'posterior' as const,
      muscles: [p.muscle],
      color: p.color || highlightColor
    }))
  }

  const uniqueFrontBodyPart = dedupeBodyParts(resolvedFront)
  const uniqueBackBodyPart = dedupeBodyParts(resolvedBack)

  const isHandActive = (side: 'left' | 'right') => {
    if (!Array.isArray(handsPart)) return false
    return handsPart.some((item) => {
      if (!item) return false
      const name = item.name ? String(item.name).toLowerCase() : ''
      const hasMuscle =
        Array.isArray(item.muscles) &&
        item.muscles.some((m) => m && String(m).toLowerCase().includes(side))
      return name.includes(side) || hasMuscle
    })
  }

  const isFootActive = (side: 'left' | 'right') => {
    if (!Array.isArray(footPart)) return false
    return footPart.some((item) => {
      if (!item) return false
      const name = item.name ? String(item.name).toLowerCase() : ''
      const hasMuscle =
        Array.isArray(item.muscles) &&
        item.muscles.some((m) => m && String(m).toLowerCase().includes(side))
      return name.includes(side) || hasMuscle
    })
  }

  const handleHandClick = (_side: 'left' | 'right', internalMuscle: string) => {
    if (isDisabled) return
    const stats: IMuscleStats = {
      muscle: 'forearm' as Muscle,
      data: { exercises: [internalMuscle], frequency: 1 }
    }
    if (handleChange) {
      handleChange(stats, 'hands', internalMuscle)
    }
    if (onPartClick) {
      onPartClick('forearm' as Muscle)
    }
  }

  const handleFootClick = (_side: 'left' | 'right', internalMuscle: string) => {
    if (isDisabled) return
    const stats: IMuscleStats = {
      muscle: 'calves' as Muscle,
      data: { exercises: [internalMuscle], frequency: 1 }
    }
    if (handleChange) {
      handleChange(stats, 'foot', internalMuscle)
    }
    if (onPartClick) {
      onPartClick('calves' as Muscle)
    }
  }

  const handleModelClick = (stats: IMuscleStats, type: 'anterior' | 'posterior') => {
    if (isDisabled) return
    if (handleChange) {
      handleChange(stats, type)
    }
    if (onPartClick) {
      onPartClick(stats.muscle)
    }
  }

  const isCompact = size === 'compact'
  const modelWidth = isCompact ? 130 : 160
  const headingStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: isCompact ? '0.95rem' : '1.125rem',
    textAlign: 'center',
    marginBottom: '0.5rem'
  }
  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: isCompact ? '2px 6px' : '4px 8px',
    fontSize: isCompact ? '0.75rem' : '0.85rem',
    fontWeight: 500,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '4px',
    margin: '2px'
  }

  return (
    <div
      className={['rbh-visualizer', className].filter(Boolean).join(' ')}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        ...style
      }}
      data-testid='body-visualizer'
    >
      {/* Upper Extremities / Hands Section */}
      {showExtremities && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={headingStyle}>Hand Part</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.25rem' }}>
            <div
              role='button'
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => handleHandClick('left', 'left-hand')}
              style={{ cursor: isDisabled ? 'default' : 'pointer', width: '3.5rem', height: '3.5rem' }}
              data-testid='hand-button-left'
            >
              <HandSvg
                position='right'
                color={isHandActive('left') ? highlightColor : bodyColor}
                borderColor={borderColor}
                borderWidth={borderWidth}
              />
            </div>
            <div
              role='button'
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => handleHandClick('right', 'right-hand')}
              style={{ cursor: isDisabled ? 'default' : 'pointer', width: '3.5rem', height: '3.5rem' }}
              data-testid='hand-button-right'
            >
              <HandSvg
                position='left'
                color={isHandActive('right') ? highlightColor : bodyColor}
                borderColor={borderColor}
                borderWidth={borderWidth}
              />
            </div>
          </div>
          {handsPart && handsPart.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', justifyContent: 'center', marginTop: '0.5rem' }}>
              {handsPart
                .filter(Boolean)
                .slice()
                .sort((a, b) => ((a.name || '') > (b.name || '') ? 1 : -1))
                .map((item, idx) => (
                  <span key={idx} style={chipStyle} data-testid='hand-chip'>
                    {item.name || item.muscles?.[0] || 'Unknown'}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Main Body Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={headingStyle}>Body Part</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isCompact ? '1.5rem' : '2.5rem',
            width: '100%'
          }}
        >
          {/* Front / Anterior Model */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: modelWidth }}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 500 }}>Front</div>
            <div style={{ position: 'relative', width: '100%' }}>
              {showSideLabels && (
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    left: '-2.5rem',
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}
                  data-testid='side-label-front-right'
                >
                  Right Side
                </div>
              )}
              <Model
                type='anterior'
                data={uniqueFrontBodyPart}
                bodyColor={bodyColor}
                highlightedColors={highlightedColors}
                borderColor={borderColor}
                borderWidth={borderWidth}
                svgStyle={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
                onClick={(stats) => handleModelClick(stats, 'anterior')}
              />
              {showSideLabels && (
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    right: '-2.5rem',
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}
                  data-testid='side-label-front-left'
                >
                  Left Side
                </div>
              )}
            </div>
          </div>

          {/* Back / Posterior Model */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: modelWidth }}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 500 }}>Back</div>
            <div style={{ position: 'relative', width: '100%' }}>
              {showSideLabels && (
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    left: '-2.5rem',
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}
                  data-testid='side-label-back-left'
                >
                  Left Side
                </div>
              )}
              <Model
                type='posterior'
                data={uniqueBackBodyPart}
                bodyColor={bodyColor}
                highlightedColors={highlightedColors}
                borderColor={borderColor}
                borderWidth={borderWidth}
                svgStyle={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
                onClick={(stats) => handleModelClick(stats, 'posterior')}
              />
              {showSideLabels && (
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    right: '-2.5rem',
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}
                  data-testid='side-label-back-right'
                >
                  Right Side
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Body Part Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1rem',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', flex: 1, justifyContent: 'center' }}>
            {uniqueFrontBodyPart.map((item, idx) => (
              <span key={idx} style={chipStyle} data-testid='front-chip'>
                {item.name || item.muscles?.[0] || 'Unknown'}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', flex: 1, justifyContent: 'center' }}>
            {uniqueBackBodyPart.map((item, idx) => (
              <span key={idx} style={chipStyle} data-testid='back-chip'>
                {item.name || item.muscles?.[0] || 'Unknown'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Extremities / Feet Section */}
      {showExtremities && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={headingStyle}>Foot Part</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.25rem' }}>
            <div
              role='button'
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => handleFootClick('left', 'left-foot')}
              style={{ cursor: isDisabled ? 'default' : 'pointer', width: '4rem', height: '4rem' }}
              data-testid='foot-button-left'
            >
              <FootSvg
                position='left'
                color={isFootActive('left') ? highlightColor : bodyColor}
                borderColor={borderColor}
                borderWidth={borderWidth}
              />
            </div>
            <div
              role='button'
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => handleFootClick('right', 'right-foot')}
              style={{ cursor: isDisabled ? 'default' : 'pointer', width: '4rem', height: '4rem' }}
              data-testid='foot-button-right'
            >
              <FootSvg
                position='right'
                color={isFootActive('right') ? highlightColor : bodyColor}
                borderColor={borderColor}
                borderWidth={borderWidth}
              />
            </div>
          </div>
          {footPart && footPart.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', justifyContent: 'center', marginTop: '0.5rem' }}>
              {footPart
                .filter(Boolean)
                .slice()
                .sort((a, b) => ((a.name || '') > (b.name || '') ? 1 : -1))
                .map((item, idx) => (
                  <span key={idx} style={chipStyle} data-testid='foot-chip'>
                    {item.name || item.muscles?.[0] || 'Unknown'}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default React.memo(BodyVisualizer)
