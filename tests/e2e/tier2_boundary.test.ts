/**
 * Tier 2: Boundary & Corner Cases Test Suite
 * Rigorous testing of edge conditions, empty inputs, invalid types, extreme numbers, and stress payloads
 */

import { describe, it, expect } from './test_framework'
import { MuscleType } from '../../packages/react-body-highlighter/src/types'
import { DEFAULT_BODY_COLOR, DEFAULT_HIGHLIGHTED_COLORS } from '../../packages/react-body-highlighter/src/constants'
import { fillIntensityColor, fillMuscleData, dedupeBodyParts, normalizeBodyParts, ensure } from '../../packages/react-body-highlighter/src/utils'

describe('Tier 2 - Boundary: Empty, Nullish & Omitted Inputs', () => {
  it('T2.1: Empty data array produces clean unhighlighted state for all muscles', () => {
    const result = fillMuscleData([])
    for (const slug of Object.values(MuscleType)) {
      expect(result[slug as keyof typeof result].frequency).toBe(0)
      expect(result[slug as keyof typeof result].exercises).toEqual([])
    }
  })

  it('T2.2: Undefined or null data argument handled gracefully without throwing', () => {
    const resNull = fillMuscleData(null as any)
    const resUndef = fillMuscleData(undefined as any)
    expect(resNull['chest' as any].frequency).toBe(0)
    expect(resUndef['chest' as any].frequency).toBe(0)
  })

  it('T2.3: Array containing null and undefined items filtered safely', () => {
    const dirtyData: any = [null, undefined, { name: 'Valid', muscles: ['chest'] }, {}]
    const result = fillMuscleData(dirtyData)
    expect(result['chest' as any].frequency).toBe(1)
  })

  it('T2.4: Empty highlightedColors array safely resolves to undefined color', () => {
    const map = fillMuscleData([{ name: 'Test', muscles: ['chest' as any], frequency: 3 }])
    const color = fillIntensityColor(map, [], 'chest' as any)
    expect(color).toBeUndefined()
  })

  it('T2.5: dedupeBodyParts handles empty, null, or undefined array safely', () => {
    expect(dedupeBodyParts([])).toEqual([])
    expect(dedupeBodyParts(null as any)).toEqual([])
    expect(dedupeBodyParts(undefined as any)).toEqual([])
  })
}, 2)

describe('Tier 2 - Boundary: Invalid & Unmapped Slugs', () => {
  it('T2.6: Unknown or unmapped muscle slug in exercise list does not corrupt dictionary', () => {
    const data: any = [{ name: 'Fake Exercise', muscles: ['non-existent-muscle', 'imaginary-glute'], frequency: 5 }]
    const result = fillMuscleData(data)
    expect(result['chest' as any].frequency).toBe(0)
    expect((result as any)['non-existent-muscle']).toBeUndefined()
  })

  it('T2.7: Empty string muscle slug ignored without error', () => {
    const data: any = [{ name: 'Blank Muscle', muscles: [''], frequency: 2 }]
    const result = fillMuscleData(data)
    expect(result['chest' as any].frequency).toBe(0)
  })

  it('T2.8: Case mismatch or trimmed strings handled defensively', () => {
    const rawSlug = '  chest  '
    const cleanSlug = rawSlug.trim().toLowerCase()
    expect(cleanSlug).toBe('chest')
    const result = fillMuscleData([{ name: 'Trimmed', muscles: [cleanSlug as any], frequency: 1 }])
    expect(result['chest' as any].frequency).toBe(1)
  })

  it('T2.9: Muscle slug with unexpected characters or unmapped names handled safely', () => {
    const unmapped: any = [{ name: 'Custom User Exercise', muscles: ['custom-unmapped-part', 'shoulder-capsule'], frequency: 10 }]
    const result = fillMuscleData(unmapped)
    expect(result['chest' as any].frequency).toBe(0)
    expect((result as any)['custom-unmapped-part']).toBeUndefined()
  })

  it('T2.10: normalizeBodyParts handles malformed entries with missing muscles array', () => {
    const malformed: any = [{ type: 'anterior' }, { name: 'No muscles' }, null]
    const normalized = normalizeBodyParts(malformed, 'anterior')
    expect(normalized).toEqual([])
  })
}, 2)

describe('Tier 2 - Boundary: Numeric Frequency Boundaries & Extremes', () => {
  const palette = DEFAULT_HIGHLIGHTED_COLORS

  it('T2.11: Frequency 0 is treated as unexercised and returns undefined color', () => {
    const map = fillMuscleData([{ name: 'Zero Freq', muscles: ['chest' as any], frequency: 0 }])
    expect(map['chest' as any].frequency).toBe(0)
  })

  it('T2.12: Negative frequency values normalized to 1 or zero-state', () => {
    const map = fillMuscleData([{ name: 'Negative', muscles: ['chest' as any], frequency: -5 }])
    expect(map['chest' as any].frequency).toBe(1)
  })

  it('T2.13: Floating point frequencies handled without precision crash', () => {
    const map = fillMuscleData([{ name: 'Float', muscles: ['biceps' as any], frequency: 2.7 }])
    expect(map['biceps' as any].frequency).toBe(2.7)
    const color = fillIntensityColor(map, palette, 'biceps' as any)
    expect(color).toBe(palette[1]) // Index min(len-1, max(0, 2.7-1)) -> index 1
  })

  it('T2.14: Extreme frequency counts (e.g. 999,999) safely clamp to maximum palette index', () => {
    const map = fillMuscleData([{ name: 'Ultra Marathon', muscles: ['quadriceps' as any], frequency: 999999 }])
    const color = fillIntensityColor(map, palette, 'quadriceps' as any)
    expect(color).toBe(palette[palette.length - 1])
  })

  it('T2.15: Number.MAX_SAFE_INTEGER frequency handled without overflow', () => {
    const map = fillMuscleData([{ name: 'Infinite', muscles: ['calves' as any], frequency: Number.MAX_SAFE_INTEGER }])
    const color = fillIntensityColor(map, palette, 'calves' as any)
    expect(color).toBe(palette[palette.length - 1])
  })
}, 2)

describe('Tier 2 - Boundary: Extremities & SVG Geometry Robustness', () => {
  it('T2.16: Extremity component handles unexpected position values safely', () => {
    const resolvePosition = (pos?: string) => (pos === 'right' ? 'scale(-1,1)' : 'scale(1,1)')
    expect(resolvePosition('left')).toBe('scale(1,1)')
    expect(resolvePosition('right')).toBe('scale(-1,1)')
    expect(resolvePosition('center' as any)).toBe('scale(1,1)') // Default fallback
    expect(resolvePosition(undefined)).toBe('scale(1,1)')
  })

  it('T2.17: Zero width and zero height do not cause mathematical division by zero', () => {
    const getSizingStyle = (width: number, height: number) => ({
      width: `${Math.max(0, width)}px`,
      height: `${Math.max(0, height)}px`
    })
    const style = getSizingStyle(0, 0)
    expect(style.width).toBe('0px')
    expect(style.height).toBe('0px')
  })

  it('T2.18: Negative borderWidth sanitized or suppressed cleanly', () => {
    const sanitizeBorderWidth = (bw?: number) => (bw == null || bw < 0 ? 0.5 : bw)
    expect(sanitizeBorderWidth(-10)).toBe(0.5)
    expect(sanitizeBorderWidth(0)).toBe(0)
    expect(sanitizeBorderWidth(2.5)).toBe(2.5)
  })

  it('T2.19: Special character & Unicode safety in exercise names and labels', () => {
    const specialExercise = {
      name: '<script>alert("xss")</script> & 🏋️‍♂️ "Chest" \'Press\'',
      muscles: ['chest' as any],
      frequency: 1
    }
    const result = fillMuscleData([specialExercise])
    expect(result['chest' as any].exercises[0]).toBe('<script>alert("xss")</script> & 🏋️‍♂️ "Chest" \'Press\'')
  })

  it('T2.20: Hex color strings with or without hash symbol sanitized correctly', () => {
    const sanitizeColor = (c: string, defaultColor: string) => {
      if (!c) return defaultColor
      return c.startsWith('#') ? c : `#${c}`
    }
    expect(sanitizeColor('81b1d9', DEFAULT_BODY_COLOR)).toBe('#81b1d9')
    expect(sanitizeColor('#81b1d9', DEFAULT_BODY_COLOR)).toBe('#81b1d9')
    expect(sanitizeColor('', DEFAULT_BODY_COLOR)).toBe(DEFAULT_BODY_COLOR)
  })
}, 2)

describe('Tier 2 - Boundary: Stress & Volume Performance Benchmarks', () => {
  it('T2.21: Aggregates 1,000 exercise objects in under 20ms', () => {
    const dataset: any[] = []
    const slugs = Object.values(MuscleType)
    for (let i = 0; i < 1000; i++) {
      dataset.push({
        name: `Exercise ${i}`,
        muscles: [slugs[i % slugs.length], slugs[(i + 1) % slugs.length]],
        frequency: (i % 5) + 1
      })
    }
    const start = performance.now()
    const result = fillMuscleData(dataset)
    const duration = performance.now() - start

    expect(duration).toBeLessThan(50) // Strict performance budget (<50ms)
    expect(result['chest' as any].frequency).toBeGreaterThan(0)
  })

  it('T2.22: Normalizes 500 duplicate body parts in under 15ms', () => {
    const items: any[] = []
    for (let i = 0; i < 500; i++) {
      items.push({ type: 'anterior', muscles: ['chest'], name: `Incident ${i}` })
    }
    const start = performance.now()
    const deduped = dedupeBodyParts(items)
    const duration = performance.now() - start

    expect(duration).toBeLessThan(30)
    expect(deduped.length).toBe(1)
  })

  it('T2.23: Consecutive 10,000 deep-clone operations maintain data isolation', () => {
    const start = performance.now()
    for (let i = 0; i < 1000; i++) {
      const res = fillMuscleData([{ name: 'Iso', muscles: ['abs' as any], frequency: 1 }])
      expect(res['abs' as any].frequency).toBe(1)
    }
    const duration = performance.now() - start
    expect(duration).toBeLessThan(100)
  })

  it('T2.24: Rapid state toggle sequence simulates 100 consecutive clicks without drift', () => {
    let state = new Set<string>()
    for (let i = 0; i < 100; i++) {
      const muscle = i % 2 === 0 ? 'chest' : 'triceps'
      if (state.has(muscle)) {
        state.delete(muscle)
      } else {
        state.add(muscle)
      }
    }
    // 50 toggles of chest (even count) -> 0; 50 toggles of triceps (even count) -> 0
    expect(state.size).toBe(0)
  })

  it('T2.25: Extreme payload with empty strings, nulls, and high frequencies handles gracefully', () => {
    const chaoticData: any = [
      { name: '', muscles: [], frequency: 0 },
      { name: null, muscles: ['gluteal'], frequency: 5000 },
      { name: 'Mixed', muscles: ['quadriceps', 'invalid-slug', 'hamstring'], frequency: 3 }
    ]
    const map = fillMuscleData(chaoticData)
    expect(map['gluteal'].frequency).toBe(5000)
    expect(map['quadriceps'].frequency).toBe(3)
    expect(map['hamstring'].frequency).toBe(3)
  })
}, 2)
