# ATS-Friendly Resume Generator

*Build a polished, ATS-optimised resume in minutes — no Word, no LaTeX, no formatting headaches.*

---

## What is this?

A free, browser-based resume builder that works like a Google Form. Fill in your information step by step, pick a template, tune the colours and fonts, then export to **PDF** or **DOCX** in one click. Resume data is saved automatically in your browser and can be exported as JSON to edit later.

**Why ATS-friendly?** The PDF this tool generates contains real, selectable text — not a canvas image. Applicant Tracking Systems (ATS) can actually parse your name, skills, and experience. Most "pretty" resume builders produce image-PDF screenshots that ATS software cannot read at all.

---

## Features

- **3 templates** — Classic (safest ATS), Modern (two-column), Minimalist (typography-focused)
- **Live preview** — see your resume update as you type, debounced for performance
- **ATS score panel** — real-time checklist showing what is missing or complete
- **Section reordering** — drag sections to match what the job posting emphasises
- **Accent colour & font picker** — personalise without breaking ATS compliance
- **Export to PDF** — real-text PDF, text is selectable and ATS-parseable
- **Export to DOCX** — opens in Microsoft Word and LibreOffice
- **Save / Load JSON** — export your resume data and re-import it anytime
- **Auto-save** — all data is saved in your browser's localStorage automatically
- **PWA** — installable to your desktop from the browser, works fully offline after first visit
- **Dark / light theme**

---

## How to Use

### Option 1 — Hosted (recommended, zero install)

Visit the live URL: *(deploy to GitHub Pages or Netlify and paste the URL here)*

### Option 2 — Local with one click (Windows)

1. Install [Node.js](https://nodejs.org) (one-time, if not already installed)
2. Download or clone this folder
3. Double-click **`start.bat`**
4. Your browser opens at `http://localhost:5173` automatically

### Option 3 — Local (Mac / Linux)

```bash
# One-time: make the script executable
chmod +x start.sh

./start.sh
```

### Option 4 — Manual

```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Option 5 — Pre-built, Python only (no Node.js required)

If the `dist/` folder is present in the repo:

```bash
cd dist
python -m http.server 8080
# Open http://localhost:8080
```

---

## Build for Deployment

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

Deploy the `dist/` folder to any static host (GitHub Pages, Netlify, Vercel, etc.).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| PDF generation | `@react-pdf/renderer` — produces real-text PDFs |
| DOCX generation | `docx` |
| State | Zustand (with localStorage persistence) |
| Drag & drop | `@dnd-kit` |
| PWA | `vite-plugin-pwa` |

---

## Project Structure

```
04-ats-friendly-resume-generator/
├── src/
│   ├── components/
│   │   ├── ats/         ← ATS score panel
│   │   ├── export/      ← Export / import modal
│   │   ├── form/        ← Multi-step form wizard + 8 step components
│   │   ├── preview/     ← Live PDF preview pane
│   │   ├── templates/   ← Classic, Modern, Minimalist PDF templates
│   │   └── ui/          ← Button, Input, TextArea, TagInput, Modal
│   ├── data/            ← Resume schema, template registry
│   ├── store/           ← Zustand store
│   └── utils/           ← Helpers, DOCX builder
├── start.bat            ← Windows one-click launcher
├── start.sh             ← Mac/Linux one-click launcher
├── vite.config.js
└── package.json
```

---

## Privacy

All data stays in your browser. Nothing is sent to any server. The app works fully offline once loaded or installed as a PWA.

## Install as a Progressive Web App (PWA)

The app is PWA-ready out of the box. Once installed it runs in its own window with no browser chrome, loads instantly, and works fully offline.

### What you need

- A **production build** served over HTTPS (or `localhost`). The install prompt does **not** appear during `npm run dev` — `vite-plugin-pwa` intentionally disables service workers in dev mode to avoid stale-cache issues.

### Step 1 — Serve a production build locally

```bash
npm run build          # compiles everything into dist/
npx serve dist         # serves dist/ on http://localhost:3000
```
