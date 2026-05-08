# Contributing to dev-essentials

Thank you for your interest in contributing! This document explains how to get started, what we expect, and how to submit your work.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Adding a New Tool](#adding-a-new-tool)
- [Improving an Existing Tool](#improving-an-existing-tool)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Code of Conduct

Be respectful and constructive in all interactions. We welcome contributors of all experience levels. Harassment, discrimination, or personal attacks of any kind will not be tolerated.

---

## Ways to Contribute

| Type | Examples |
| :--- | :--- |
| **Bug fix** | Fix broken layout, incorrect output, parsing edge case |
| **New feature** | Add a new option, export format, or UI control to an existing tool |
| **New tool** | Contribute a brand-new self-contained utility to the collection |
| **Documentation** | Improve a README, fix a typo, add a usage example |
| **Accessibility / UX** | Keyboard navigation, screen-reader support, responsive layout fixes |

---

## Getting Started

1. **Fork** this repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/dev-essentials.git
   cd dev-essentials
   ```
3. Create a **feature branch** from `main`:
   ```bash
   git checkout -b feat/my-improvement
   ```
4. Make your changes (see guidelines below).
5. **Test** your changes by opening the relevant `.html` file in a browser — no build step needed.
6. **Commit** and **push** your branch:
   ```bash
   git push origin feat/my-improvement
   ```
7. Open a **Pull Request** against the `main` branch of this repository.

---

## Adding a New Tool

Every new tool must be self-contained in its own folder under the repository root.

### Required folder layout

```
<tool-name>/
├── <tool-name>.html    ← the complete single-file app
├── README.md           ← feature guide, use cases, usage instructions
└── CHANGELOG.md        ← version history (start at v1.0.0)
```

### Naming rules

- Use **`kebab-case`** for the folder name and the HTML file name.
- The HTML file **must** share the folder name (e.g. `json-formatter/json-formatter.html`).
- No spaces, no uppercase letters, no underscores in folder or file names.

### Self-contained requirement

- **No external CDN links** — the tool must work fully offline once downloaded.
- **No build tools** required — pure HTML, CSS, and vanilla JavaScript only.
- **No cookies, no localStorage writes** beyond ephemeral session state.
- **No network requests** at runtime.

### Checklist before opening a PR for a new tool

- [ ] Tool folder follows the required layout above
- [ ] HTML file is named after the tool folder
- [ ] Tool works in Chrome, Edge, and Firefox without errors in the browser console
- [ ] `README.md` includes: purpose, features, usage instructions, and browser compatibility
- [ ] `CHANGELOG.md` has a `[1.0.0]` entry describing everything that was added
- [ ] Main `README.md` at the repo root has an entry for the tool in the **What's Inside** table
- [ ] Main `README.md` repository structure tree has been updated

---

## Improving an Existing Tool

- Open an issue first if the change is significant so it can be discussed before you invest time.
- For small fixes (typos, minor bugs), a PR without a prior issue is fine.
- Update the tool's `CHANGELOG.md` under the `[Unreleased]` section describing what changed.
- If the change warrants a version bump, move the `[Unreleased]` block to a new versioned entry.

---

## Commit Message Guidelines

Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format:

```
<type>(<scope>): <short summary>
```

| Type | When to use |
| :--- | :--- |
| `feat` | A new feature or new tool |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace, no logic change |
| `refactor` | Code restructure with no behaviour change |
| `chore` | Maintenance tasks (renaming files, updating meta) |

**Examples:**

```
feat(ascii-tree-generator): add JSON export format
fix(ascii-tree-generator): correct leaf count when root is hidden
docs(ascii-tree-generator): add troubleshooting section to README
feat(repo): add json-formatter tool
```

Scope is the tool folder name, or `repo` for repository-wide changes.

---

## Pull Request Process

1. Fill in the pull request template completely.
2. Link any related issues using `Closes #<issue-number>` in the PR description.
3. Keep PRs focused — one logical change per PR.
4. Ensure the browser console is clean (no errors or warnings) before submitting.
5. A maintainer will review and may request changes. Address feedback by pushing new commits to the same branch — do not close and re-open the PR.
6. Once approved, a maintainer will squash-merge the PR.

---

## Code Style

These rules apply to all HTML/CSS/JS in this repository:

- **Indentation:** 2 spaces (no tabs in source files).
- **Formatting:** Keep HTML, CSS, and JS readable inside the single-file app — do not minify source.
- **JavaScript:** Use `"use strict"`. Prefer `const` and `let`. No `var`. No external frameworks.
- **CSS:** Use CSS custom properties (`--var`) for all colours and theme-sensitive values.
- **Accessibility:** All interactive controls must be keyboard-reachable and have visible focus indicators.
- **Security:** Never use `innerHTML` with un-sanitised user input. Always escape HTML before inserting into the DOM.

---

## Reporting Bugs

Use the **Bug Report** issue template. Include:

- The tool name and version (check the tool's `CHANGELOG.md`).
- Browser name and version.
- Steps to reproduce the issue.
- What you expected to happen.
- What actually happened.
- A screenshot if helpful.

---

## Requesting Features

Use the **Feature Request** issue template. Include:

- Which tool (or whether it is a new tool idea).
- The problem you are trying to solve.
- Your proposed solution or behaviour.
- Any alternative approaches you have considered.
