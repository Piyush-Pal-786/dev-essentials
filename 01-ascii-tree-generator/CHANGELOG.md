# Changelog — ASCII Tree Generator

All notable changes to this tool will be documented in this file.

This file follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html): `MAJOR.MINOR.PATCH`.

---

## [Unreleased]

> Changes staged for the next release will appear here.

---

## [1.0.0] — 2026-05-08

### Added — Core Engine

- **Live parser** — converts indented plain text into a structured ASCII tree in real time as the user types; no button press required.
- **Indent detection** — supports three indent modes: 2 spaces, 4 spaces (default), and tab character.
- **Tree builder** — constructs an in-memory node tree from parsed input, correctly handling arbitrary nesting depth.
- **Stats bar** — displays live statistics: total node count, maximum depth, leaf count, output line count, and output character count.

### Added — Tree Connector Styles

Six distinct visual connector styles are available via a dropdown:

| Style | Branch | Last child |
|---|---|---|
| Classic | `├──` | `└──` |
| Rounded | `├──` | `╰──` |
| Double | `╠══` | `╚══` |
| Simple | `+--` | `` `-- `` |
| Star | `*──` | `*──` |
| Arrow | `↣──` | `↳──` |

### Added — Output Options

- **Trailing `/`** — appends a forward slash to every parent (non-leaf) node name.
- **Show root** — prints each top-level node label as a standalone header line before its children.
- **Full paths** — renders the complete path from root for every node (e.g. `project/src/main.c`).
- **Line numbers** — prefixes every output line with a left-padded sequential number.
- **Markdown fence** — wraps the entire output in a Markdown triple-backtick code fence automatically.

### Added — Search & Highlight

- Live search field in the output panel; highlights all matching substrings as the user types.
- Case-sensitive search toggle.
- Live match count display (e.g. "4 matches", "no matches").
- HTML-safe escaping used throughout to prevent XSS in the highlight path.

### Added — Export Formats

Four export formats are selectable via a dropdown:

| Format | Output |
|---|---|
| Plain text | Raw ASCII tree |
| Markdown block | Tree wrapped in a ` ``` ` code fence |
| HTML `<pre>` | HTML-escaped tree inside a `<pre>` element |
| JSON tree | Structured `{ name, children }` recursive object |

### Added — Copy & Download

- **Copy** button — copies output in the currently selected export format.
- **Copy as Markdown** button — one-click Markdown block copy regardless of selected format.
- **Copy as JSON** button — one-click JSON tree copy regardless of selected format.
- **Download** button — saves output to disk with the correct extension (`.txt`, `.md`, `.html`, `.json`).
- Clipboard fallback using `execCommand` for environments without `navigator.clipboard`.
- "Copied!" flash message with auto-dismiss after 1.8 seconds.

### Added — Import

- **Import button** — opens a file picker accepting `.txt` and `.md` files; loads content directly into the editor.
- **Drag and drop** — drag a text file onto the editor area to load it instantly.

### Added — UI & Usability

- **Resizable split panels** — drag the vertical divider to adjust the width ratio between the input and output panels; constrained to 20%–80%.
- **Tab key support** — pressing Tab in the editor inserts the correct indent string (spaces or tab) at the cursor position instead of moving focus.
- **Light / Dark theme toggle** — switches between a dark Catppuccin-inspired theme and a light theme; persists for the session.
- **Pre-loaded example** — the editor opens with a realistic embedded-project folder structure as a starter example.
- **Indent badge** — a small label in the input panel header always shows the currently active indent mode.

### Added — Project Files

- `ascii-tree-generator.html` — complete self-contained single-file application (HTML + CSS + JS, no external dependencies).
- `README.md` — full documentation covering features, advantages, use cases, input format, browser compatibility, and file structure.
- `CHANGELOG.md` — this file.

---

## Version Guide

| Bump | When to use |
|---|---|
| `PATCH` (x.x.**1**) | Bug fixes, typo corrections, minor style or layout tweaks |
| `MINOR` (x.**1**.0) | New features added in a backward-compatible way |
| `MAJOR` (**2**.0.0) | Breaking changes, full redesigns, or removal of existing features |

---

[Unreleased]: https://github.com/your-org/dev-essentials/compare/ascii-tree-generator-v1.0.0...HEAD
[1.0.0]: https://github.com/your-org/dev-essentials/releases/tag/ascii-tree-generator-v1.0.0
