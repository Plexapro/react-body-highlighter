import React from 'react'

import { DEFAULT_BODY_COLOR } from '../constants'
import { HandSvgProps } from '../types'

/**
 * Hand SVG Extremity component with bilateral left/right reflection
 */
export const HandSvg: React.FC<HandSvgProps> = ({
  position = 'left',
  color = DEFAULT_BODY_COLOR,
  borderColor,
  borderWidth = 1,
  width,
  height,
  sizing,
  className,
  style,
  onClick,
  theme = 'light'
}) => {
  const isRight = position === 'right'
  const classes = ['rbh-hand', sizing, className].filter(Boolean).join(' ')
  const defaultFill = theme === 'dark' ? '#374151' : 'white'

  return (
    <svg
      transform={isRight ? 'scale(-1, 1)' : undefined}
      width={width ?? '100%'}
      height={height ?? '100%'}
      viewBox='0 0 128 128'
      className={classes}
      fill={defaultFill}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      aria-label={`${position} hand`}
      role='img'
      preserveAspectRatio='xMidYMid meet'
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        transformOrigin: 'center center',
        ...style
      }}
      data-testid={`hand-svg-${position}`}
    >
      <path
        fill={color}
        stroke={borderColor}
        strokeWidth={borderColor ? borderWidth : undefined}
        strokeLinejoin='round'
        strokeLinecap='round'
        vectorEffect='non-scaling-stroke'
        shapeRendering='geometricPrecision'
        d='M73.2 122.3c-25.26 0-35.37-4.38-41.59-18.03c-2.11-4.62-5.03-11.76-6.12-20.46c-.5-4-.72-8.73-.95-13.73l-.18-3.76c-.31-6.14-2.01-12.44-2.27-13.38c-.1-.95.5-1.84 1.39-2.06c.86-.2 2.02-.44 3.3-.44c3.07 0 5.23 1.34 6.61 4.11c1.51 3.01 1.9 7.28 2.21 10.71c.3 3.28.5 5.44 1.48 6.61c1.11 1.32 2.26 2.02 3.33 2.02c.65 0 1.24-.25 1.66-.72c.35-.38.74-1.08.64-2.23c-.04-1.1.23-33.54.34-45.94c0-3.75 2-7.51 6.46-7.51s6.46 3.77 6.46 7.5l.47 34.67a1.5 1.5 0 0 0 3 0l.59-46.45c0-3.75 2-7.52 6.46-7.52s6.46 3.77 6.46 7.5l.57 46.72a1.5 1.5 0 0 0 3 0L77 22c0-3.75 2-7.52 6.46-7.52s6.46 3.77 6.46 7.5l.59 38.17c.01.82.68 1.47 1.5 1.48c.82 0 1.48-.65 1.5-1.47L94 37.14c0-3.76 2-7.53 6.46-7.53c4.75 0 5.46 4.7 5.46 7.5c-.02.48-2.2 54.28-3.68 62.39c-1.55 8.52-7.38 22.8-29.04 22.8z'
      />

      <g>
        <path
          fill='none'
          stroke={borderColor}
          strokeWidth={borderColor ? borderWidth : undefined}
          strokeLinejoin='round'
          strokeLinecap='round'
          vectorEffect='non-scaling-stroke'
          shapeRendering='geometricPrecision'
          d='M52.07 71.1c.37-1.05 1.61-1.43 2.27-.53c.25.34.46.71.63 1.09c.47 1.07.71 2.24.67 3.38a8.215 8.215 0 0 1-.77 3.28c-.18.37-.38.73-.62 1.07c-.64.92-1.68.44-2.28-.51c-.45-.7-.54-5.97.1-7.78z'
        />

        <path
          fill='none'
          stroke={borderColor}
          strokeWidth={borderColor ? borderWidth : undefined}
          strokeLinejoin='round'
          strokeLinecap='round'
          vectorEffect='non-scaling-stroke'
          shapeRendering='geometricPrecision'
          d='M66.29 70.19c.41-1.32 1.91-1.6 2.6-.4c.32.55 1.54 2.18 1.54 5.2c0 2.97-1.06 4.54-1.65 5.21c-.91 1.03-2.17.93-2.6-.38c-.47-1.41-.55-7.48.11-9.63z'
        />

        <path
          fill='none'
          stroke={borderColor}
          strokeWidth={borderColor ? borderWidth : undefined}
          strokeLinejoin='round'
          strokeLinecap='round'
          vectorEffect='non-scaling-stroke'
          shapeRendering='geometricPrecision'
          d='M81.58 70.57c.4-1.16 1.81-1.46 2.43-.4c.35.6 1.32 1.83 1.32 4.86c0 1.97-1.04 4.31-1.4 4.79c-.74.97-1.92.74-2.43-.37c-.5-1.07-.42-7.45.08-8.88z'
        />

        <path
          fill='none'
          stroke={borderColor}
          strokeWidth={borderColor ? borderWidth : undefined}
          strokeLinejoin='round'
          strokeLinecap='round'
          vectorEffect='non-scaling-stroke'
          shapeRendering='geometricPrecision'
          d='M94.95 71.1c.36-1.05 1.61-1.43 2.27-.53c.25.34 1.3 1.43 1.3 4.46c0 1.96-1.15 4.01-1.39 4.35c-.64.92-1.89.55-2.28-.51c-.43-1.12-.43-6.2.1-7.77z'
        />
      </g>
    </svg>
  )
}

export default React.memo(HandSvg)
