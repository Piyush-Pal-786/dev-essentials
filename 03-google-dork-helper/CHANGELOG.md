# Changelog — Google Dork Helper

All notable changes to this tool will be documented in this file.

This file follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html): `MAJOR.MINOR.PATCH`.

---

## [Unreleased]

> Changes staged for the next release will appear here.

---

## [1.0.0] — 2026-05-11

### Added — Core Application

- **Single-file HTML app** — zero dependencies, no installation, works offline by opening directly in any modern browser.
- **Dark / Light mode** — toggle button in the header; preference persisted in `localStorage` and restored on next visit. Dark mode is the default.
- **Tab-based navigation** — four top-level tabs: Builder, Advanced Form, Guide, and Saved Queries.

### Added — Query Builder Tab

- **Basic Search Terms card** — four input fields mapping to Google's standard query modifiers:
  - *All these words* — plain keyword AND logic
  - *Exact phrase* — automatically wraps input in double-quotes
  - *Any of these words* — joins words with `OR`
  - *None of these words* — prefixes each word with `-`
- **Core Operators panel** — 14 clickable operator chips, each expanding an inline input when activated:
  `site:`, `inurl:`, `intitle:`, `intext:`, `filetype:`, `ext:`, `cache:`, `related:`, `link:`, `allinurl:`, `allintitle:`, `allintext:`, `before:`, `after:`
- **Filetype quick-chips** — inside the `filetype:` operator, 10 one-click chips for common extensions: `pdf`, `xls`, `xlsx`, `doc`, `sql`, `env`, `log`, `xml`, `json`, `csv`.
- **OSINT Presets panel** — 20 ready-made dork templates across five categories:
  - *Exposed Credentials*: ENV files, SQL dumps, Git config, htpasswd, AWS keys, DB backup
  - *Open Directories*: Index of /, Open uploads, Backup dirs
  - *Login Panels*: Admin panels, phpMyAdmin, cPanel, Webmail
  - *Sensitive Documents*: Confidential PDFs, Password XLS, Network configs, Internal docs
  - *Recon*: Subdomain enum, Tech stack, Error messages
- **Manual Query Override** — textarea to paste or type a raw dork directly; overrides the builder fields while populated; can be cleared to resume the visual builder.
- **Live query preview** — generated query updates in real time as fields change; renders colour-coded tokens per operator type (site, inurl, intitle, intext, filetype, ext).
- **Multi-engine search** — dropdown to select Google, Bing, DuckDuckGo, Yandex, Yahoo, Startpage, or Brave Search; clicking **Search** opens results in a new browser tab.
- **Copy Query** — copies the generated query string to the clipboard.
- **Save Query** — prompts for a friendly name and persists the query to `localStorage`.
- **Clear All** — resets all Builder fields, deactivates all operator chips, and clears the manual override.

### Added — Advanced Form Tab

- Structured form mirroring the layout and field names of `google.com/advanced_search`.
- Fields: All these words, Exact word or phrase, Any of these words, None of these words, Numbers ranging (min..max), Site or domain, URL contains, Title contains, File type (dropdown with 20 options), Published after (date picker), Published before (date picker).
- Live query preview with the same colour-coded token renderer as the Builder.
- Same multi-engine search, copy, save, and clear actions as the Builder tab.

### Added — Guide Tab

- Inline reference guide covering:
  1. **What is Google Dorking?** — definition, origin, and how search indexing makes it possible
  2. **How it is useful for OSINT** — recon, pen testing, journalism, competitive research, and threat research use cases
  3. **Complete Operator Reference** — tables for basic modifiers (phrase, exclude, OR, wildcard, range, grouping) and all scope operators with descriptions, examples, and tips
  4. **Search Engines That Support Dorks** — compatibility matrix for Google, Bing, DuckDuckGo, Yandex, Yahoo, Startpage, and Brave Search
  5. **How to Use This Application** — step-by-step usage guide for the Builder, Advanced Form, and Saved tabs
  6. **Real-World Examples** — 15 example dork queries covering common OSINT and security research scenarios
  7. **Ethics & Legal Considerations** — relevant laws (CFAA, Computer Misuse Act, GDPR), responsible disclosure guidance, and best practices
- Table of Contents with anchor links to each section.
- Colour-coded callout blocks (info, warning, danger) for key notes.

### Added — Saved Queries Tab

- Displays all queries saved from the Builder or Advanced Form tabs.
- Each entry shows: friendly name, raw query string (monospace), and action buttons.
  - **Load** — loads the query into the Builder Manual Override and switches to the Builder tab
  - **Search** — opens the query in Google directly from the saved list
  - **Copy** — copies the raw query to clipboard
  - **Delete** — removes the individual entry
- **Clear All Saved** button to wipe all saved queries after a confirmation prompt.
- Empty-state message shown when no queries are saved.

### Added — Security & Safety

- All user-supplied strings are HTML-escaped via a dedicated `escHtml()` function before being rendered into the DOM to prevent XSS.
- The tokeniser used in the query preview operates on escaped strings only.
- External URLs are opened with `window.open(..., 'noopener,noreferrer')` to prevent tab-napping.
- No analytics, no external scripts, no network requests of any kind generated by the app itself.
- All query data and preferences are stored only in the browser's own `localStorage`.
