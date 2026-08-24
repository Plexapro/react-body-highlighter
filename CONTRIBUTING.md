# Contributing to @plexapro/react-body-highlighter

Thank you for your interest in contributing to **`@plexapro/react-body-highlighter`**! This open-source project is maintained by [Plexa](https://www.plexapro.com) and the community.

We welcome contributions of all kinds: bug reports, feature enhancements, documentation improvements, test additions, and showcase presets.

---

## 📜 Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for everyone, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristics. Please be respectful, constructive, and empathetic in all interactions across issues, pull requests, and discussions.

---

## 🛠️ Development Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **Yarn**: `v1.22+` (or Corepack Yarn / modern package managers)

### Initial Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/Plexapro/react-body-highlighter.git
cd react-body-highlighter

# 2. Install dependencies across workspaces
yarn install

# 3. Build the core package
yarn build:pkg

# 4. Start the interactive demo showcase
yarn dev
```

---

## 📂 Project Structure

This repository is organized as a monorepo:

```text
react_body_highlighter/
├── packages/
│   └── react-body-highlighter/    # Standalone React component library
│       ├── src/
│       │   ├── assets/             # Anatomical SVG polygon coordinates (anterior, posterior)
│       │   ├── components/         # Model, BodyVisualizer, HandSvg, FootSvg
│       │   ├── types/              # Muscle slugs, ModelType, interfaces
│       │   ├── utils/              # Color computation, data normalization, deduplication
│       │   └── index.ts            # Public entry point
│       └── tests/                  # Unit tests (Vitest + React Testing Library)
├── apps/
│   └── demo/                       # Interactive showcase playground (Vite + React 19 + Tailwind)
├── tests/
│   └── e2e/                        # Comprehensive E2E test runner (Tiers 1-5)
└── .github/                        # GitHub Actions CI workflows and templates
```

---

## 🌿 Git & Branching Strategy

- **Branch Naming**:
  - `feat/feature-name` — for new features
  - `fix/bug-description` — for bug fixes
  - `docs/topic-name` — for documentation updates
  - `refactor/scope` — for code refactoring
- **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(model): add customizable tooltip renderer prop`
  - `fix(svg): correct left-hand palmar viewBox alignment`
  - `docs(readme): add 42-muscle slug enumeration table`
  - `test(extremities): add tests for foot bilateral reflection`

---

## 🧪 Testing & Verification Guidelines

Before opening a pull request, ensure all local verification checks pass:

```bash
# Run ESLint across packages
yarn lint

# Run TypeScript typecheck across packages
yarn typecheck

# Run unit tests with coverage
yarn test

# Build package bundles (ESM, CJS, .d.ts)
yarn build:pkg

# Run full E2E test runner
npx tsx tests/e2e/runner.ts
```

---

## 🚀 Pull Request Process

1. **Create a branch** from `main` following our branch naming convention.
2. **Implement your changes** cleanly with appropriate TypeScript types and tests.
3. **Verify** all lint, typecheck, unit test, and build commands pass.
4. **Update documentation** (README.md, comments) if introducing new props or behaviors.
5. **Open a Pull Request** against `main` using the provided PR template.
6. A maintainer will review your PR and provide constructive feedback.

Thank you for helping make `@plexapro/react-body-highlighter` better!
