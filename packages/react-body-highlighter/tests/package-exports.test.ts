import { describe, expect, it } from 'vitest'

import * as ComponentExports from '../src/components/index'
import * as PackageExports from '../src/index'

describe('@plexapro/react-body-highlighter Package Exports', () => {
  it('exports core components from barrel', () => {
    expect(ComponentExports.Model).toBeDefined()
    expect(ComponentExports.BodyModel).toBeDefined()
    expect(ComponentExports.HandSvg).toBeDefined()
    expect(ComponentExports.HandModel).toBeDefined()
    expect(ComponentExports.FootSvg).toBeDefined()
    expect(ComponentExports.FootModel).toBeDefined()
    expect(ComponentExports.BodyVisualizer).toBeDefined()
  })

  it('exports core components', () => {
    expect(PackageExports.Model).toBeDefined()
    expect(PackageExports.default).toBe(PackageExports.Model)
    expect(PackageExports.BodyModel).toBeDefined()
    expect(PackageExports.BodyVisualizer).toBeDefined()
    expect(PackageExports.HandSvg).toBeDefined()
    expect(PackageExports.HandModel).toBeDefined()
    expect(PackageExports.FootSvg).toBeDefined()
    expect(PackageExports.FootModel).toBeDefined()
  })

  it('exports constants', () => {
    expect(PackageExports.DEFAULT_BODY_COLOR).toBe('#B6BDC3')
    expect(PackageExports.DEFAULT_HIGHLIGHTED_COLORS).toEqual(['#81b1d9', '#277abf'])
    expect(PackageExports.DEFAULT_MODEL_TYPE).toBe('anterior')
    expect(PackageExports.DEFAULT_MUSCLE_DATA).toBeDefined()
    expect(Object.keys(PackageExports.DEFAULT_MUSCLE_DATA).length).toBe(65)
  })

  it('exports utility functions', () => {
    expect(typeof PackageExports.ensure).toBe('function')
    expect(typeof PackageExports.fillIntensityColor).toBe('function')
    expect(typeof PackageExports.fillMuscleData).toBe('function')
    expect(typeof PackageExports.dedupeBodyParts).toBe('function')
    expect(typeof PackageExports.normalizeBodyParts).toBe('function')
  })

  it('exports polygon assets', () => {
    expect(Array.isArray(PackageExports.anteriorData)).toBe(true)
    expect(PackageExports.anteriorData.length).toBe(40)
    expect(Array.isArray(PackageExports.posteriorData)).toBe(true)
    expect(PackageExports.posteriorData.length).toBe(36)
  })

  it('exports type enums and maps', () => {
    expect(PackageExports.MuscleType).toBeDefined()
    expect(PackageExports.MuscleType.CHEST).toBe('chest')
    expect(PackageExports.ModelType).toBeDefined()
    expect(PackageExports.ModelType.ANTERIOR).toBe('anterior')
    expect(PackageExports.ModelType.POSTERIOR).toBe('posterior')
  })
})
