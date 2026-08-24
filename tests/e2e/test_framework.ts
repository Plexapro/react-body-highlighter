/**
 * Standalone Zero-Dependency Test Framework & Assertion Library for E2E Suite
 * Supports both standalone execution (npx tsx tests/e2e/runner.ts) and Vitest
 */

export interface TestCase {
  name: string
  suite: string
  tier: number
  featureId?: string
  fn: () => void | Promise<void>
}

export interface TestResult {
  suite: string
  name: string
  tier: number
  passed: boolean
  durationMs: number
  error?: Error
}

export interface TestSummary {
  total: number
  passed: number
  failed: number
  durationMs: number
  tierBreakdown: Record<number, { total: number; passed: number; failed: number }>
  results: TestResult[]
}

class TestRegistry {
  private currentSuite = ''
  private currentTier = 1
  public tests: TestCase[] = []

  setContext(suite: string, tier: number) {
    this.currentSuite = suite
    this.currentTier = tier
  }

  addTest(name: string, fn: () => void | Promise<void>, featureId?: string) {
    this.tests.push({
      name,
      suite: this.currentSuite,
      tier: this.currentTier,
      featureId,
      fn
    })
  }

  clear() {
    this.tests = []
  }
}

export const registry = new TestRegistry()

export function setTier(tier: number) {
  registry.setContext(registry['currentSuite'], tier)
}

export function describe(name: string, fn: () => void, tier = 1) {
  registry.setContext(name, tier)
  fn()
}

export function it(name: string, fn: () => void | Promise<void>, featureId?: string) {
  registry.addTest(name, fn, featureId)
}

export const test = it

export class AssertionError extends Error {
  constructor(message: string, public actual?: any, public expected?: any) {
    super(message)
    this.name = 'AssertionError'
  }
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== typeof b) return false

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  if (typeof a === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false
      if (!deepEqual(a[key], b[key])) return false
    }
    return true
  }

  return false
}

export function expect(actual: any) {
  const matchers = (isNot = false) => ({
    toBe(expected: any) {
      const match = Object.is(actual, expected)
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected ${JSON.stringify(actual)} ${isNot ? 'NOT to be' : 'to be'} ${JSON.stringify(expected)}`,
          actual,
          expected
        )
      }
    },
    toEqual(expected: any) {
      const match = deepEqual(actual, expected)
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected ${JSON.stringify(actual)} ${isNot ? 'NOT to deeply equal' : 'to deeply equal'} ${JSON.stringify(expected)}`,
          actual,
          expected
        )
      }
    },
    toBeDefined() {
      const match = actual !== undefined
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected value ${isNot ? 'to be undefined' : 'to be defined'}, received ${actual}`,
          actual,
          'defined'
        )
      }
    },
    toBeUndefined() {
      const match = actual === undefined
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected undefined, received ${JSON.stringify(actual)}`,
          actual,
          undefined
        )
      }
    },
    toBeNull() {
      const match = actual === null
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected null, received ${JSON.stringify(actual)}`,
          actual,
          null
        )
      }
    },
    toBeTruthy() {
      const match = Boolean(actual)
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected truthy value, received ${JSON.stringify(actual)}`,
          actual,
          'truthy'
        )
      }
    },
    toBeFalsy() {
      const match = !actual
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected falsy value, received ${JSON.stringify(actual)}`,
          actual,
          'falsy'
        )
      }
    },
    toBeGreaterThan(num: number) {
      const match = typeof actual === 'number' && actual > num
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected ${actual} ${isNot ? 'NOT to be >' : 'to be >'} ${num}`,
          actual,
          num
        )
      }
    },
    toBeGreaterThanOrEqual(num: number) {
      const match = typeof actual === 'number' && actual >= num
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected ${actual} ${isNot ? 'NOT to be >=' : 'to be >='} ${num}`,
          actual,
          num
        )
      }
    },
    toBeLessThan(num: number) {
      const match = typeof actual === 'number' && actual < num
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected ${actual} ${isNot ? 'NOT to be <' : 'to be <'} ${num}`,
          actual,
          num
        )
      }
    },
    toBeLessThanOrEqual(num: number) {
      const match = typeof actual === 'number' && actual <= num
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected ${actual} ${isNot ? 'NOT to be <=' : 'to be <='} ${num}`,
          actual,
          num
        )
      }
    },
    toContain(item: any) {
      let match = false
      if (Array.isArray(actual)) {
        match = actual.some((el) => deepEqual(el, item))
      } else if (typeof actual === 'string') {
        match = actual.includes(String(item))
      } else if (actual instanceof Set || actual instanceof Map) {
        match = actual.has(item)
      }
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected collection ${isNot ? 'NOT to contain' : 'to contain'} ${JSON.stringify(item)}`,
          actual,
          item
        )
      }
    },
    toMatch(regex: RegExp) {
      const match = typeof actual === 'string' && regex.test(actual)
      if (isNot ? match : !match) {
        throw new AssertionError(
          `Expected string ${isNot ? 'NOT to match' : 'to match'} regex ${regex}`,
          actual,
          regex.toString()
        )
      }
    },
    toThrow(expectedMessage?: string | RegExp) {
      if (typeof actual !== 'function') {
        throw new AssertionError('Expected function for toThrow assertion', typeof actual, 'function')
      }
      let thrown: any = null
      try {
        actual()
      } catch (err) {
        thrown = err
      }

      if (!isNot && !thrown) {
        throw new AssertionError('Expected function to throw an error, but it returned cleanly')
      }
      if (isNot && thrown) {
        throw new AssertionError(`Expected function NOT to throw, but it threw: ${thrown?.message || thrown}`)
      }
      if (expectedMessage && thrown) {
        const msg = thrown.message || String(thrown)
        if (expectedMessage instanceof RegExp) {
          if (!expectedMessage.test(msg)) {
            throw new AssertionError(`Expected error message to match ${expectedMessage}, got: "${msg}"`)
          }
        } else if (!msg.includes(expectedMessage)) {
          throw new AssertionError(`Expected error message to contain "${expectedMessage}", got: "${msg}"`)
        }
      }
    }
  })

  return {
    ...matchers(false),
    not: matchers(true)
  }
}
