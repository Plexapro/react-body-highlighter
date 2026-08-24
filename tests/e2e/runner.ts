#!/usr/bin/env node
/**
 * Standalone E2E Test Suite Runner for `@plexapro/react-body-highlighter`
 * Executes Tiers 1-4 with detailed CLI reporting and exit code signaling.
 */

import { registry, TestResult, TestSummary } from './test_framework'

// Import all test suites to register tests
import './tier1_feature.test'
import './tier2_boundary.test'
import './tier3_combinations.test'
import './tier4_scenarios.test'
import './tier5_adversarial.test'

interface RunnerOptions {
  tier?: number
  json?: boolean
  bail?: boolean
  filter?: string
}

function parseArgs(): RunnerOptions {
  const args = process.argv.slice(2)
  const options: RunnerOptions = {}

  for (const arg of args) {
    if (arg.startsWith('--tier=')) {
      options.tier = parseInt(arg.replace('--tier=', ''), 10)
    } else if (arg === '--json') {
      options.json = true
    } else if (arg === '--bail') {
      options.bail = true
    } else if (arg.startsWith('--filter=')) {
      options.filter = arg.replace('--filter=', '')
    }
  }

  return options
}

async function runSuite(): Promise<number> {
  const options = parseArgs()
  let tests = registry.tests

  if (options.tier) {
    tests = tests.filter((t) => t.tier === options.tier)
  }

  if (options.filter) {
    const regex = new RegExp(options.filter, 'i')
    tests = tests.filter((t) => regex.test(t.name) || regex.test(t.suite))
  }

  if (!options.json) {
    console.log('\n======================================================================')
    console.log('  @plexapro/react-body-highlighter — E2E Test Suite Runner')
    console.log('======================================================================')
    console.log(`  Discovered ${tests.length} tests across Tiers 1-5\n`)
  }

  const results: TestResult[] = []
  const startTime = Date.now()
  let currentSuite = ''

  for (const test of tests) {
    if (!options.json && test.suite !== currentSuite) {
      currentSuite = test.suite
      console.log(`\n  \x1b[1m\x1b[36m▸ ${currentSuite}\x1b[0m (Tier ${test.tier})`)
    }

    const testStart = performance.now()
    let passed = false
    let testError: Error | undefined

    try {
      await test.fn()
      passed = true
    } catch (err: any) {
      passed = false
      testError = err instanceof Error ? err : new Error(String(err))
    }

    const durationMs = performance.now() - testStart

    results.push({
      suite: test.suite,
      name: test.name,
      tier: test.tier,
      passed,
      durationMs,
      error: testError
    })

    if (!options.json) {
      if (passed) {
        console.log(`    \x1b[32m✔\x1b[0m ${test.name} \x1b[90m(${durationMs.toFixed(2)}ms)\x1b[0m`)
      } else {
        console.log(`    \x1b[31m✖ ${test.name}\x1b[0m \x1b[90m(${durationMs.toFixed(2)}ms)\x1b[0m`)
        if (testError) {
          console.log(`      \x1b[31mError:\x1b[0m ${testError.message}`)
        }
        if (options.bail) {
          console.log('\n\x1b[31m[BAIL] Aborting execution on first failure.\x1b[0m')
          break
        }
      }
    }
  }

  const totalDurationMs = Date.now() - startTime
  const totalPassed = results.filter((r) => r.passed).length
  const totalFailed = results.filter((r) => !r.passed).length

  const tierBreakdown: Record<number, { total: number; passed: number; failed: number }> = {
    1: { total: 0, passed: 0, failed: 0 },
    2: { total: 0, passed: 0, failed: 0 },
    3: { total: 0, passed: 0, failed: 0 },
    4: { total: 0, passed: 0, failed: 0 },
    5: { total: 0, passed: 0, failed: 0 }
  }

  for (const r of results) {
    if (!tierBreakdown[r.tier]) {
      tierBreakdown[r.tier] = { total: 0, passed: 0, failed: 0 }
    }
    tierBreakdown[r.tier].total++
    if (r.passed) tierBreakdown[r.tier].passed++
    else tierBreakdown[r.tier].failed++
  }

  const summary: TestSummary = {
    total: results.length,
    passed: totalPassed,
    failed: totalFailed,
    durationMs: totalDurationMs,
    tierBreakdown,
    results
  }

  if (options.json) {
    console.log(JSON.stringify(summary, null, 2))
  } else {
    console.log('\n======================================================================')
    console.log('  E2E Test Execution Summary')
    console.log('======================================================================')
    console.log(`  Total Tests:    ${summary.total}`)
    console.log(`  \x1b[32mPassed:         ${summary.passed}\x1b[0m`)
    console.log(`  \x1b[${summary.failed > 0 ? '31' : '90'}mFailed:         ${summary.failed}\x1b[0m`)
    console.log(`  Total Duration: ${summary.durationMs}ms\n`)

    console.log('  Tier Breakdown:')
    for (let t = 1; t <= 5; t++) {
      const stats = tierBreakdown[t]
      if (stats && stats.total > 0) {
        const tierName =
          t === 1 ? 'Feature Coverage' :
          t === 2 ? 'Boundary & Corner Cases' :
          t === 3 ? 'Cross-Feature Combinations' :
          t === 4 ? 'Real-World Scenarios' :
          'Adversarial & Stress'
        const statusColor = stats.failed === 0 ? '\x1b[32m' : '\x1b[31m'
        console.log(`    Tier ${t} (${tierName}): ${statusColor}${stats.passed}/${stats.total} passed\x1b[0m`)
      }
    }
    console.log('======================================================================\n')
  }

  return totalFailed === 0 ? 0 : 1
}

// Self-executing runner
if (require.main === module || !process.env.VITEST) {
  runSuite()
    .then((exitCode) => {
      process.exit(exitCode)
    })
    .catch((err) => {
      console.error('Fatal test runner error:', err)
      process.exit(1)
    })
}
