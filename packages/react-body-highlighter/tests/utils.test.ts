import { describe, expect, it } from 'vitest'

import { DEFAULT_BODY_COLOR, DEFAULT_MUSCLE_DATA } from '../src/constants'
import { IBodyPart, IExerciseData } from '../src/types'
import { dedupeBodyParts, ensure, fillIntensityColor, fillMuscleData, normalizeBodyParts } from '../src/utils'

describe('Utility Functions', () => {
  describe('ensure', () => {
    it('returns original value when value is defined and non-null', () => {
      expect(ensure('#ff0000', DEFAULT_BODY_COLOR)).toBe('#ff0000')
      expect(ensure(0, 10)).toBe(0)
      expect(ensure(false, true)).toBe(false)
      expect(ensure('', 'fallback')).toBe('')
    })

    it('returns backup value when value is null or undefined', () => {
      expect(ensure(undefined, DEFAULT_BODY_COLOR)).toBe(DEFAULT_BODY_COLOR)
      expect(ensure(null, DEFAULT_BODY_COLOR)).toBe(DEFAULT_BODY_COLOR)
    })
  })

  describe('fillIntensityColor', () => {
    const palette = ['#111111', '#222222', '#333333']

    it('returns undefined when muscle has 0 frequency or is missing', () => {
      const activityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))
      expect(fillIntensityColor(activityMap, palette, 'chest')).toBeUndefined()
    })

    it('returns correct color step for frequency 1', () => {
      const activityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))
      activityMap.chest.frequency = 1
      expect(fillIntensityColor(activityMap, palette, 'chest')).toBe('#111111')
    })

    it('returns correct color step for frequency 2', () => {
      const activityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))
      activityMap.chest.frequency = 2
      expect(fillIntensityColor(activityMap, palette, 'chest')).toBe('#222222')
    })

    it('clamps to highest palette color when frequency exceeds palette length', () => {
      const activityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))
      activityMap.chest.frequency = 10
      expect(fillIntensityColor(activityMap, palette, 'chest')).toBe('#333333')
    })

    it('returns undefined if palette is empty', () => {
      const activityMap = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))
      activityMap.chest.frequency = 1
      expect(fillIntensityColor(activityMap, [], 'chest')).toBeUndefined()
    })
  })

  describe('fillMuscleData', () => {
    it('returns default map with 0 frequencies when data is empty', () => {
      const result = fillMuscleData([])
      expect(result.chest.frequency).toBe(0)
      expect(result.chest.exercises).toEqual([])
      expect(result.trapezius.frequency).toBe(0)
    })

    it('aggregates exercise names and frequencies across multiple muscle groups', () => {
      const exercises: IExerciseData[] = [
        { name: 'Bench Press', muscles: ['chest', 'triceps'], frequency: 2 },
        { name: 'Pushups', muscles: ['chest', 'front-deltoids'], frequency: 1 }
      ]
      const result = fillMuscleData(exercises)

      expect(result.chest.frequency).toBe(3)
      expect(result.chest.exercises).toEqual(['Bench Press', 'Pushups'])
      expect(result.triceps.frequency).toBe(2)
      expect(result.triceps.exercises).toEqual(['Bench Press'])
      expect(result['front-deltoids'].frequency).toBe(1)
      expect(result['front-deltoids'].exercises).toEqual(['Pushups'])
    })

    it('handles IBodyPart array without frequency by defaulting to 1', () => {
      const parts: IBodyPart[] = [
        { name: 'Bicep Strain', type: 'anterior', muscles: ['biceps'] }
      ]
      const result = fillMuscleData(parts)
      expect(result.biceps.frequency).toBe(1)
      expect(result.biceps.exercises).toEqual(['Bicep Strain'])
    })

    it('handles non-array inputs gracefully', () => {
      const result = fillMuscleData(null as any)
      expect(result.chest.frequency).toBe(0)
    })

    it('skips null items or items with invalid muscles array', () => {
      const exercises = [
        null,
        undefined,
        { name: 'Invalid' },
        { name: 'Valid', muscles: ['chest'], frequency: 1 }
      ]
      const result = fillMuscleData(exercises as any)
      expect(result.chest.frequency).toBe(1)
    })

    it('does not mutate DEFAULT_MUSCLE_DATA constant', () => {
      fillMuscleData([{ name: 'Test', muscles: ['abs'], frequency: 5 }])
      expect(DEFAULT_MUSCLE_DATA.abs.frequency).toBe(0)
    })
  })

  describe('dedupeBodyParts', () => {
    it('removes duplicate muscle entries for the same view type', () => {
      const items: IBodyPart[] = [
        { name: 'Chest 1', type: 'anterior', muscles: ['chest'] },
        { name: 'Chest 2', type: 'anterior', muscles: ['chest'] },
        { name: 'Back 1', type: 'posterior', muscles: ['upper-back'] }
      ]
      const result = dedupeBodyParts(items)
      expect(result.length).toBe(2)
      expect(result[0].name).toBe('Chest 1')
      expect(result[1].name).toBe('Back 1')
    })

    it('handles empty or non-array inputs gracefully', () => {
      expect(dedupeBodyParts([])).toEqual([])
      expect(dedupeBodyParts(undefined as any)).toEqual([])
      expect(dedupeBodyParts([null as any])).toEqual([])
    })
  })

  describe('normalizeBodyParts', () => {
    it('handles non-array inputs gracefully', () => {
      expect(normalizeBodyParts(null as any)).toEqual([])
    })

    it('skips invalid items in array', () => {
      const result = normalizeBodyParts([null, { name: 'Broken' }] as any, 'anterior')
      expect(result).toEqual([])
    })

    it('normalizes anterior- and posterior- prefixed slugs', () => {
      const items: IBodyPart[] = [
        { name: 'Anterior Chest', type: 'anterior', muscles: ['anterior-chest'] },
        { name: 'Posterior Upper Back', type: 'posterior', muscles: ['posterior-upper-back'] }
      ]
      const anteriorResult = normalizeBodyParts(items, 'anterior')
      expect(anteriorResult.length).toBe(2) // left-chest, right-chest
      expect(anteriorResult[0].muscles).toEqual(['left-chest'])

      const posteriorResult = normalizeBodyParts(items, 'posterior')
      expect(posteriorResult.length).toBe(2) // left-upper-back, right-upper-back
      expect(posteriorResult[0].muscles).toEqual(['left-upper-back'])
    })

    it('expands general bilateral muscle into left and right variations', () => {
      const items: IBodyPart[] = [
        { name: 'Biceps Pain', type: 'anterior', muscles: ['biceps'] }
      ]
      const result = normalizeBodyParts(items, 'anterior')
      expect(result.length).toBe(2)
      expect(result[0].muscles).toEqual(['left-biceps'])
      expect(result[1].muscles).toEqual(['right-biceps'])
    })

    it('preserves head without creating left/right duplicates', () => {
      const items: IBodyPart[] = [
        { name: 'Headache', type: 'anterior', muscles: ['head'] }
      ]
      const result = normalizeBodyParts(items, 'anterior')
      expect(result.length).toBe(1)
      expect(result[0].muscles).toEqual(['head'])
    })

    it('preserves existing left/right side variations', () => {
      const items: IBodyPart[] = [
        { name: 'Left Knee', type: 'anterior', muscles: ['left-knees'] }
      ]
      const result = normalizeBodyParts(items, 'anterior')
      expect(result.length).toBe(1)
      expect(result[0].muscles).toEqual(['left-knees'])
    })
  })
})
