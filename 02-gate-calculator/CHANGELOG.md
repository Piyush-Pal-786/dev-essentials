
All notable changes to this tool will be documented in this file.

This file follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html): `MAJOR.MINOR.PATCH`.

---

## [Unreleased]

> Changes staged for the next release will appear here.

---

## [1.0.0] — 2026-05-08

### Added — Core Calculator Engine

- **Expression parser** — builds an in-memory expression stack supporting full operator precedence and parenthesised sub-expressions.
- **Dual display** — a secondary expression bar shows the running expression as it is built; the primary display shows the current value or result.
- **Angle mode selector** — Degrees (default) / Radians radio toggle; affects all trigonometric and inverse-trigonometric calculations.
- **Memory indicator** — an `M` badge appears on the display whenever a non-zero value is stored in memory.

### Added — Basic Arithmetic

- Addition (`+`), Subtraction (`−`), Multiplication (`×`), Division (`/`)
- Modulus (`mod`) — remainder of integer or floating-point division
- Percentage (`%`) — converts the current value to a percentage

### Added — Scientific Functions

| Category | Functions |
|---|---|
| Power & Roots | `x²`, `x³`, `xʸ`, `√x`, `∛x`, `ʸ√x` |
| Logarithms | `ln`, `log` (base 10), `log₂x`, `logᵧx` |
| Exponential | `eˣ`, `10ˣ`, `Exp` (scientific notation entry) |
| Trigonometric | `sin`, `cos`, `tan` |
| Inverse Trig | `sin⁻¹`, `cos⁻¹`, `tan⁻¹` |
| Hyperbolic | `sinh`, `cosh`, `tanh` |
| Inverse Hyperbolic | `sinh⁻¹`, `cosh⁻¹`, `tanh⁻¹` |
| Other | `n!` (factorial with Gamma extension for non-integers), `1/x`, `\|x\|`, `+/−` |

### Added — Constants

- **π** (Pi) — `3.14159265358979...`
- **e** (Euler's number) — `2.71828182845904...`

### Added — Memory Operations

| Button | Action |
|---|---|
| `MS` | Store current display value in memory |
| `MR` | Recall memory value to display |
| `M+` | Add current display value to memory |
| `M-` | Subtract current display value from memory |
| `MC` | Clear memory to zero |

### Added — Parentheses Support

- `(` and `)` buttons allow grouping of sub-expressions to control operator precedence.
- Unbalanced parentheses produce a `Math Error` on evaluation.

### Added — Scratch Pad

- A companion **Scratch Pad** panel rendered beside the calculator.
- Free-text `<textarea>` for noting intermediate values, reminders, or working steps.
- **Minimize / restore** toggle button to collapse the panel when not needed.
- **Clear** button to wipe the scratch pad content in one click.
- Completely independent from calculator state — scratch pad content does not affect any calculation.

### Added — Controls

| Button | Action |
|---|---|
| `←` | Backspace — delete the last entered digit or character |
| `C` | All Clear — reset the entire calculator state |
| `=` | Evaluate the current expression |
| `−` (header) | Minimize / restore the calculator body |
| **Help?** | Toggle the built-in instructions panel |

### Added — Help Panel

- Inline collapsible help section listing Do's, Don'ts, and Limitations.
- Accessible via the **Help?** button in the header; a **Keypad** button returns to the calculator.

### Added — Project Files

- `gate-calculator.html` — complete self-contained single-file application (HTML + CSS + JS, no external dependencies).
- `README.md` — full documentation covering features, getting started, file structure, browser compatibility, and limitations.
- `CHANGELOG.md` — this file.

---

## Version Guide

| Bump | When to use |
|---|---|
| `PATCH` (x.x.**1**) | Bug fixes, typo corrections, minor style or layout tweaks |
| `MINOR` (x.**1**.0) | New features added in a backward-compatible way |
| `MAJOR` (**2**.0.0) | Breaking changes, full redesigns, or removal of existing features |

---

[Unreleased]: https://github.com/your-org/dev-essentials/compare/gate-calculator-v1.0.0...HEAD
[1.0.0]: https://github.com/your-org/dev-essentials/releases/tag/gate-calculator-v1.0.0
