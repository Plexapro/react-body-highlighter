import { DEFAULT_MUSCLE_DATA } from '../constants'
import { IBodyPart, IExerciseData, IMuscleData, Muscle } from '../types'

/**
 * Utility function for choosing backup value if first value is null or undefined
 */
export const ensure = <T>(value: T | undefined | null, backupValue: T): T => {
  return value == null ? backupValue : value
}

/**
 * Function which determines color of muscle based on how often it has been exercised
 */
export const fillIntensityColor = (
  activityMap: Record<Muscle, IMuscleData> | undefined | null,
  highlightedColors: string[] | undefined | null,
  muscle: Muscle
): string | undefined => {
  if (!activityMap) {
    return undefined
  }

  if (!Object.prototype.hasOwnProperty.call(activityMap, muscle) || !activityMap[muscle]) {
    return undefined
  }

  const frequency = activityMap[muscle]?.frequency

  if (
    frequency == null ||
    typeof frequency !== 'number' ||
    !Number.isFinite(frequency) ||
    frequency <= 0
  ) {
    return undefined
  }

  if (highlightedColors == null || !Array.isArray(highlightedColors) || highlightedColors.length === 0) {
    return undefined
  }

  const index = Math.min(highlightedColors.length - 1, Math.max(0, Math.floor(frequency) - 1))
  return highlightedColors[index]
}

/**
 * Function which generates object with aggregated muscle data from exercises or body parts
 */
export const fillMuscleData = (
  data: (IExerciseData | IBodyPart)[] = []
): Record<Muscle, IMuscleData> => {
  const result: Record<Muscle, IMuscleData> = JSON.parse(JSON.stringify(DEFAULT_MUSCLE_DATA))

  if (!Array.isArray(data)) {
    return result
  }

  for (const item of data) {
    if (!item || !Array.isArray(item.muscles)) continue

    const name = item.name || ''
    const rawFreq = 'frequency' in item ? item.frequency : undefined
    const freq =
      typeof rawFreq === 'number' && Number.isFinite(rawFreq) && rawFreq > 0
        ? rawFreq
        : typeof rawFreq === 'number' && Number.isFinite(rawFreq) && rawFreq === 0
        ? 0
        : 1

    for (const rawMuscle of item.muscles) {
      const muscle = rawMuscle as Muscle
      if (
        Object.prototype.hasOwnProperty.call(result, muscle) &&
        result[muscle] &&
        Array.isArray(result[muscle].exercises)
      ) {
        result[muscle].exercises.push(name)
        result[muscle].frequency = (typeof result[muscle].frequency === 'number' && Number.isFinite(result[muscle].frequency) ? result[muscle].frequency : 0) + freq
      }
    }
  }

  return result
}

/**
 * Deduplicates body part array based on type and primary muscle slug
 */
export const dedupeBodyParts = (items: IBodyPart[] = []): IBodyPart[] => {
  if (!Array.isArray(items)) return []
  const seen = new Set<string>()

  return items.filter((item) => {
    if (!item) return false
    const muscle = String(item.muscles?.[0] ?? item.name ?? '')
    const key = `${item.type || 'anterior'}:${muscle}`

    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Normalizes body part entries, expanding general bilateral muscles into left and right variations
 */
export const normalizeBodyParts = (
  data: IBodyPart[] = [],
  type: 'anterior' | 'posterior' = 'anterior'
): IBodyPart[] => {
  if (!Array.isArray(data)) return []
  const excludeMuscle = ['head']

  return data
    .flatMap((item) => {
      if (!item || !Array.isArray(item.muscles)) return []
      const rawMuscle = String(item.muscles[0] ?? '')
      const normalized =
        rawMuscle.startsWith('posterior-') || rawMuscle.startsWith('anterior-')
          ? ({
              muscle: rawMuscle.replace(/^(posterior|anterior)-/, '') as Muscle,
              type: (rawMuscle.startsWith('posterior-') ? 'posterior' : 'anterior') as
                | 'anterior'
                | 'posterior'
            } as const)
          : undefined

      const muscle = normalized?.muscle ?? (rawMuscle as Muscle)
      const targetType = normalized?.type ?? item.type ?? type
      const normalizedItem: IBodyPart = {
        ...item,
        type: targetType,
        muscles: [muscle],
        name: item.name || `${muscle}`
      }

      if (excludeMuscle.includes(muscle)) {
        return [normalizedItem]
      }

      if (muscle.includes('left') || muscle.includes('right')) {
        return [normalizedItem]
      }

      return [
        { ...normalizedItem, name: `left-${muscle}`, muscles: [`left-${muscle}` as Muscle] },
        { ...normalizedItem, name: `right-${muscle}`, muscles: [`right-${muscle}` as Muscle] }
      ]
    })
    .filter((item) => item.type === type)
}
