# Changelog — ATS-Friendly Resume Generator

All notable changes are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

---

## [1.0.0] — 2026-05-15

### Added
- 8-step form wizard: Personal Info, Summary, Work Experience, Education, Skills, Projects, Certifications, Template & Export
- Auto-save to localStorage on every keystroke — no data lost on refresh
- 3 resume templates: Classic (single-column, safest ATS), Modern (two-column sidebar), Minimalist (typography-focused)
- Live PDF preview pane with 500 ms debouncing
- ATS score panel — 13-point checklist with live pass/fail indicators and circular score meter
- Export to real-text PDF via `@react-pdf/renderer` (text is selectable; ATS-parseable)
- Export to DOCX via `docx` library
- Save resume data as `.resume.json`; re-import to continue editing
- Section reordering via drag-and-drop (`@dnd-kit`)
- Accent colour picker with 6 quick-select presets
- Font selector: Helvetica, Times Roman, Courier (all built-in, no CDN)
- Dark / light theme toggle with flash-prevention on load
- Mobile-responsive layout: toggle between form and preview on small screens
- PWA support via `vite-plugin-pwa` — installable from browser, works offline
- `start.bat` (Windows) and `start.sh` (Mac/Linux) one-click launchers
