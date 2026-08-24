# Security Policy

## Supported Versions

We provide security updates and patches for the following versions of `@plexapro/react-body-highlighter`:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

---

## Reporting a Vulnerability

If you discover a potential security vulnerability within `@plexapro/react-body-highlighter`, please **do not** report it through a public GitHub issue or pull request.

Instead, please report security issues directly to the Plexa security team by emailing:

📧 **security@plexapro.com**

### What to Include in Your Report
To help us triage and resolve the issue quickly, please provide:
1. **Description**: A clear overview of the potential vulnerability.
2. **Steps to Reproduce**: Minimal reproduction steps, sample code, or a Proof of Concept (PoC).
3. **Impact**: Potential security impact, severity, or attack vector.
4. **Environment**: Affected package version, React version, browser/Node runtime, and operating system.

---

## Response Timeline & Disclosure Policy

- **Initial Response**: Our security team will acknowledge receipt of your vulnerability report within **48 hours**.
- **Assessment**: We will investigate and assess the vulnerability within **5 business days**.
- **Remediation**: Once validated, we will develop and test a patch across supported versions.
- **Coordinated Disclosure**: We will coordinate with the reporter on a public release date and credit the researcher in our release notes and changelog (unless anonymity is requested).

---

## Security Best Practices for Consumers

- Keep your dependencies updated to the latest minor/patch release of `@plexapro/react-body-highlighter`.
- When rendering user-provided tooltip strings or SVG overlay attributes, ensure proper sanitization if embedding arbitrary HTML content.
- Use lockfiles (`yarn.lock` or `package-lock.json`) and automated vulnerability scanners (such as `yarn audit` or Dependabot) in your CI/CD pipelines.

Thank you for helping keep Plexa open-source software and the developer ecosystem secure!
