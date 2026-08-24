import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import BodyVisualizer from '../src/components/BodyVisualizer'
import FootSvg from '../src/components/FootSvg'
import HandSvg from '../src/components/HandSvg'
import Model from '../src/components/Model'
import { DEFAULT_MUSCLE_DATA } from '../src/constants'
import { IBodyPart, Muscle, MuscleType } from '../src/types'
import { dedupeBodyParts, ensure, fillIntensityColor, fillMuscleData, normalizeBodyParts } from '../src/utils'

describe('Adversarial & Stress Test Suite', () => {
  /* ==========================================================================
     1. UTILITY DEFENSIVE & MALFORMED INPUT STRESS
     ========================================================================== */
  describe('1. Utility Defensive & Malformed Input Stress', () => {
    it('1.1 fillMuscleData handles prototype property keys safely without throwing', () => {
      const maliciousData = [
        { name: 'Prototype Attack', muscles: ['toString' as any, '__proto__' as any, 'valueOf' as any] }
      ]

      expect(() => {
        const result = fillMuscleData(maliciousData)
        expect(result).toBeDefined()
        expect(result.chest.frequency).toBe(0)
      }).not.toThrow()
    })

    it('1.2 fillMuscleData handles malformed items (null, undefined, non-array, primitives)', () => {
      const malformedData: any = [
        null,
        undefined,
        123,
        'string-item',
        {},
        { name: 'No Muscles' },
        { name: 'Null Muscles', muscles: null },
        { name: 'Invalid Frequency', muscles: [MuscleType.CHEST], frequency: 'not-a-number' },
        { name: 'Negative Frequency', muscles: [MuscleType.BICEPS], frequency: -5 },
        { name: 'NaN Frequency', muscles: [MuscleType.ABS], frequency: NaN },
        { name: 'Infinity Frequency', muscles: [MuscleType.BACK_DELTOIDS], frequency: Infinity },
        { name: 'Valid Item', muscles: [MuscleType.CHEST], frequency: 3 }
      ]

      const result = fillMuscleData(malformedData)
      expect(result.chest.frequency).toBe(4) // 1 from default fallback ('not-a-number') + 3 from valid
      expect(result.biceps.frequency).toBe(1) // negative frequency falls back to 1
      expect(result.abs.frequency).toBe(1) // NaN falls back to 1
      expect(result['back-deltoids'].frequency).toBe(1) // Infinity falls back to 1
    })

    it('1.3 fillIntensityColor handles null/undefined activityMap defensively without throwing', () => {
      const palette = ['#00FF00', '#FFFF00', '#FF0000']
      expect(fillIntensityColor(null as any, palette, 'chest' as Muscle)).toBeUndefined()
      expect(fillIntensityColor(undefined as any, palette, 'chest' as Muscle)).toBeUndefined()
    })

    it('1.4 fillIntensityColor handles extreme frequencies, NaN, Infinity, negative, and empty/single palettes', () => {
      const customActivityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))
      const palette = ['#00FF00', '#FFFF00', '#FF0000'] // length 3

      // Frequency 0 -> undefined
      customActivityMap.chest.frequency = 0
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBeUndefined()

      // Negative frequency -> undefined
      customActivityMap.chest.frequency = -3
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBeUndefined()

      // NaN frequency -> undefined
      customActivityMap.chest.frequency = NaN
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBeUndefined()

      // Infinity frequency -> undefined
      customActivityMap.chest.frequency = Infinity
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBeUndefined()

      // Frequency 1 -> palette[0]
      customActivityMap.chest.frequency = 1
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBe('#00FF00')

      // Frequency 2 -> palette[1]
      customActivityMap.chest.frequency = 2
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBe('#FFFF00')

      // Frequency 3 -> palette[2]
      customActivityMap.chest.frequency = 3
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBe('#FF0000')

      // Frequency 1,000,000 -> clamped to highest palette[2]
      customActivityMap.chest.frequency = 1000000
      expect(fillIntensityColor(customActivityMap, palette, 'chest' as Muscle)).toBe('#FF0000')

      // Empty palette -> undefined
      expect(fillIntensityColor(customActivityMap, [], 'chest' as Muscle)).toBeUndefined()

      // Single-item palette
      expect(fillIntensityColor(customActivityMap, ['#PURPLE'], 'chest' as Muscle)).toBe('#PURPLE')
    })

    it('1.5 dedupeBodyParts handles null, undefined, malformed items without throwing', () => {
      const malformedItems: any = [
        null,
        undefined,
        {},
        { name: 'Only Name' },
        { muscles: ['chest'], type: 'anterior' },
        { muscles: ['chest'], type: 'anterior' }, // duplicate
        { muscles: ['chest'], type: 'posterior' } // different view
      ]

      const deduped = dedupeBodyParts(malformedItems)
      expect(deduped).toHaveLength(4)
    })

    it('1.6 normalizeBodyParts handles malformed items and expands unilateral muscles safely', () => {
      const malformedData: any = [
        null,
        undefined,
        {},
        { name: 'Head Region', muscles: ['head'], type: 'anterior' },
        { name: 'Chest Strain', muscles: ['chest'], type: 'anterior' },
        { name: 'Anterior Quads', muscles: ['anterior-quadriceps'] }
      ]

      const anteriorResult = normalizeBodyParts(malformedData, 'anterior')
      expect(anteriorResult.some((i) => i.muscles[0] === 'head')).toBe(true)
      expect(anteriorResult.some((i) => i.muscles[0] === 'left-chest')).toBe(true)
      expect(anteriorResult.some((i) => i.muscles[0] === 'right-chest')).toBe(true)
      expect(anteriorResult.some((i) => i.muscles[0] === 'left-quadriceps')).toBe(true)
      expect(anteriorResult.some((i) => i.muscles[0] === 'right-quadriceps')).toBe(true)
    })

    it('1.7 ensure handles edge cases (0, empty string, false, null, undefined)', () => {
      expect(ensure(null, 'fallback')).toBe('fallback')
      expect(ensure(undefined, 'fallback')).toBe('fallback')
      expect(ensure('', 'fallback')).toBe('')
      expect(ensure(0, 42)).toBe(0)
      expect(ensure(false, true)).toBe(false)
      expect(ensure(NaN, 10)).toBeNaN()
    })
  })

  /* ==========================================================================
     2. COMPONENT MALFORMED & DEFENSIVE PROP TESTS
     ========================================================================== */
  describe('2. Component Defensive Resilience with Malformed Props', () => {
    it('2.1 Model renders safely with null/undefined data and empty highlightedColors', () => {
      const { container } = render(
        <Model
          data={undefined}
          highlightedColors={[]}
          type={'invalid-type' as any}
        />
      )
      expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('2.2 Model handles custom item colors overriding palette colors', () => {
      const data: IBodyPart[] = [
        { name: 'Custom Colored Chest', type: 'anterior', muscles: [MuscleType.CHEST], color: '#ABCDEF' }
      ]
      render(<Model type='anterior' data={data} />)
      const chestPolygons = screen.getAllByTestId('muscle-chest')
      expect(chestPolygons[0]).toHaveStyle({ fill: '#ABCDEF' })
    })

    it('2.3 HandSvg & FootSvg render safely with malformed props', () => {
      const { container: handContainer } = render(
        <HandSvg
          position={'invalid-pos' as any}
          theme={'invalid-theme' as any}
          borderWidth={-5}
          width={'0' as any}
          height={'0' as any}
        />
      )
      expect(handContainer.querySelector('svg')).toBeInTheDocument()

      const { container: footContainer } = render(
        <FootSvg
          position={'invalid-pos' as any}
          theme={'dark'}
          borderWidth={0}
          width={'100%'}
          height={'100%'}
        />
      )
      expect(footContainer.querySelector('svg')).toBeInTheDocument()
    })

    it('2.4 BodyVisualizer handles missing or empty props defensively', () => {
      const { container } = render(
        <BodyVisualizer
          frontBodyPart={[]}
          backBodyPart={[]}
          handsPart={[]}
          footPart={[]}
        />
      )
      expect(container.querySelector('[data-testid="body-visualizer"]')).toBeInTheDocument()
    })

    it('2.5 BodyVisualizer handles handsPart item lacking name property safely', () => {
      const { container } = render(
        <BodyVisualizer
          handsPart={[{ muscles: ['left-hand'] } as any]}
        />
      )
      expect(container.querySelector('[data-testid="body-visualizer"]')).toBeInTheDocument()
      expect(screen.getByTestId('hand-chip')).toHaveTextContent('left-hand')
    })

    it('2.6 BodyVisualizer handles handsPart item lacking muscles array safely', () => {
      const { container } = render(
        <BodyVisualizer
          handsPart={[{ name: 'Left Hand' } as any]}
        />
      )
      expect(container.querySelector('[data-testid="body-visualizer"]')).toBeInTheDocument()
      expect(screen.getByTestId('hand-chip')).toHaveTextContent('Left Hand')
    })

    it('2.7 BodyVisualizer handles extremity array containing null items safely', () => {
      const { container } = render(
        <BodyVisualizer
          handsPart={[null as any, { name: 'Right Hand', muscles: ['right-hand'] }]}
          footPart={[null as any, { name: 'Left Foot', muscles: ['left-foot'] }]}
        />
      )
      expect(container.querySelector('[data-testid="body-visualizer"]')).toBeInTheDocument()
      expect(screen.getByTestId('hand-chip')).toHaveTextContent('Right Hand')
      expect(screen.getByTestId('foot-chip')).toHaveTextContent('Left Foot')
    })

    it('2.8 BodyVisualizer handles selectedParts containing null items safely', () => {
      const { container } = render(
        <BodyVisualizer
          selectedParts={[null as any, { muscle: MuscleType.CHEST, label: 'Chest Injury', color: '#ff0000' }]}
        />
      )
      expect(container.querySelector('[data-testid="body-visualizer"]')).toBeInTheDocument()
      expect(screen.getByTestId('front-chip')).toHaveTextContent('Chest Injury')
    })
  })

  /* ==========================================================================
     3. RAPID EVENT STRESS & CONCURRENCY CYCLES
     ========================================================================== */
  describe('3. Rapid Event Stress & Concurrency Cycles', () => {
    it('3.1 Simulates 500 rapid alternating click events without state drift or crashes', () => {
      const handleClick = vi.fn()
      render(<Model type='anterior' onClick={handleClick} />)

      const chestPolygons = screen.getAllByTestId('muscle-chest')
      const absPolygons = screen.getAllByTestId('muscle-abs')

      for (let i = 0; i < 250; i++) {
        fireEvent.click(chestPolygons[0])
        fireEvent.click(absPolygons[0])
      }

      expect(handleClick).toHaveBeenCalledTimes(500)
    })

    it('3.2 Simulates 300 rapid hover enter/leave events verifying tooltip lifecycle', () => {
      const handleHover = vi.fn()
      render(
        <Model
          type='anterior'
          onHover={handleHover}
          renderTooltip={(stats) => `Muscle: ${stats.muscle}`}
        />
      )

      const chestPolygon = screen.getAllByTestId('muscle-chest')[0]

      for (let i = 0; i < 150; i++) {
        fireEvent.mouseEnter(chestPolygon)
        expect(screen.getByTestId('rbh-tooltip')).toHaveTextContent('Muscle: chest')
        fireEvent.mouseLeave(chestPolygon)
        expect(screen.queryByTestId('rbh-tooltip')).not.toBeInTheDocument()
      }

      expect(handleHover).toHaveBeenCalledTimes(300)
    })

    it('3.3 Multi-part selection and deselection cycles across full bilateral catalog', () => {
      const InteractiveVisualizerHarness = () => {
        const [selected, setSelected] = useState<IBodyPart[]>([])

        const toggleMuscle = (muscle: Muscle) => {
          setSelected((prev) => {
            const exists = prev.some((p) => p.muscles[0] === muscle)
            if (exists) {
              return prev.filter((p) => p.muscles[0] !== muscle)
            }
            return [...prev, { name: muscle, type: 'anterior', muscles: [muscle] }]
          })
        }

        return (
          <div>
            <div data-testid='selected-count'>{selected.length}</div>
            <BodyVisualizer
              frontBodyPart={selected}
              onPartClick={(muscle) => toggleMuscle(muscle)}
            />
          </div>
        )
      }

      render(<InteractiveVisualizerHarness />)

      const chest = screen.getAllByTestId('muscle-chest')[0]
      const abs = screen.getAllByTestId('muscle-abs')[0]
      const biceps = screen.getAllByTestId('muscle-biceps')[0]

      // Select chest -> count 1
      fireEvent.click(chest)
      expect(screen.getByTestId('selected-count')).toHaveTextContent('1')

      // Select abs -> count 2
      fireEvent.click(abs)
      expect(screen.getByTestId('selected-count')).toHaveTextContent('2')

      // Select biceps -> count 3
      fireEvent.click(biceps)
      expect(screen.getByTestId('selected-count')).toHaveTextContent('3')

      // Deselect chest -> count 2
      fireEvent.click(chest)
      expect(screen.getByTestId('selected-count')).toHaveTextContent('2')

      // Deselect abs -> count 1
      fireEvent.click(abs)
      expect(screen.getByTestId('selected-count')).toHaveTextContent('1')

      // Deselect biceps -> count 0
      fireEvent.click(biceps)
      expect(screen.getByTestId('selected-count')).toHaveTextContent('0')
    })

    it('3.4 Disabled visualizer drops 100 rapid click events without firing callbacks', () => {
      const handleChange = vi.fn()
      const handlePartClick = vi.fn()

      render(
        <BodyVisualizer
          isDisabled={true}
          handleChange={handleChange}
          onPartClick={handlePartClick}
        />
      )

      const handBtn = screen.getByTestId('hand-button-left')
      const footBtn = screen.getByTestId('foot-button-right')

      for (let i = 0; i < 50; i++) {
        fireEvent.click(handBtn)
        fireEvent.click(footBtn)
      }

      expect(handleChange).not.toHaveBeenCalled()
      expect(handlePartClick).not.toHaveBeenCalled()
    })
  })

  /* ==========================================================================
     4. NUMERICAL EXTREMES & CUSTOM PALETTE CLAMPING
     ========================================================================== */
  describe('4. Numerical Extremes & Custom Palette Clamping', () => {
    it('4.1 Multi-step gradient palette maps frequencies 1..5 accurately and clamps 6+ to max', () => {
      const gradient = ['#E0F2FE', '#7DD3FC', '#38BDF8', '#0284C7', '#0369A1']
      const activityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))

      for (let f = 1; f <= 5; f++) {
        activityMap.chest.frequency = f
        expect(fillIntensityColor(activityMap, gradient, 'chest' as Muscle)).toBe(gradient[f - 1])
      }

      // Clamping tests
      activityMap.chest.frequency = 6
      expect(fillIntensityColor(activityMap, gradient, 'chest' as Muscle)).toBe('#0369A1')

      activityMap.chest.frequency = 9999
      expect(fillIntensityColor(activityMap, gradient, 'chest' as Muscle)).toBe('#0369A1')

      activityMap.chest.frequency = Number.MAX_SAFE_INTEGER
      expect(fillIntensityColor(activityMap, gradient, 'chest' as Muscle)).toBe('#0369A1')
    })

    it('4.2 Float frequencies map safely without crashing', () => {
      const palette = ['#111', '#222', '#333']
      const activityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))

      activityMap.chest.frequency = 1.7
      const color = fillIntensityColor(activityMap, palette, 'chest' as Muscle)
      expect(color === undefined || palette.includes(color)).toBe(true)
    })
  })
})
