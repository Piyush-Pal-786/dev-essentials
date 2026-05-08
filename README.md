# dev-essentials 🛠️

*A curated collection of open-source utilities for developers, testers, and integrators to streamline common project tasks.*

![License](https://img.shields.io/github/license/your-org/dev-essentials)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Tools](https://img.shields.io/badge/tools-1-blue)

---

## What is this?

**dev-essentials** is a community-driven repository that provides a set of simple, yet powerful, cross-platform tools designed to solve common problems faced during the software development lifecycle. Whether you're documenting a project, editing files, or managing assets, these tools aim to boost your productivity.

## Who is this for?

This collection is for anyone involved in software projects, including:
*   **Developers:** Who need to automate repetitive tasks.
*   **Testers:** Who require utilities for documentation and reporting.
*   **Integrators:** Who manage project structures and configurations.

## 🚀 Quick Start

1. Browse to the tool folder you need (e.g. [`ascii-tree-generator/`](ascii-tree-generator/)).
2. Download or clone the repository.
3. Open the tool's `.html` file directly in your browser — no installation, no server, no build step required.

```bash
git clone https://github.com/your-org/dev-essentials.git
cd dev-essentials/ascii-tree-generator
start ascii-tree-generator.html   # Windows
open  ascii-tree-generator.html   # macOS
xdg-open ascii-tree-generator.html # Linux
```

---

## What's Inside?

This repository currently includes the following tools:

| Tool | Folder | Description |
| :--- | :--- | :--- |
| **ASCII Tree Generator** | [`ascii-tree-generator/`](ascii-tree-generator/) | Converts an indented list into a formatted ASCII directory tree. Supports 6 styles, live search, 4 export formats, drag-and-drop import, and light/dark theme. |
| **In-Browser Markdown Editor** | *(coming soon)* | A quick and easy way to edit Markdown files directly in your web browser without any installation. `work-in-progress` |
| *...more to come!* | — | We are always looking to add more useful tools. |

## 📁 Repository Structure

```
dev-essentials
├── .github
│   ├── ISSUE_TEMPLATE
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── ascii-tree-generator
│   ├── CHANGELOG.md
│   ├── README.md
│   └── ascii-tree-generator.html
├── CONTRIBUTING.md
├── README.md
└── LICENSE
```

### Structure Explained

| Path | Type | Description |
| :--- | :--- | :--- |
| `.github/` | GitHub config | Issue templates and pull request template shown automatically by GitHub |
| `.github/ISSUE_TEMPLATE/bug_report.md` | Template | Pre-filled form for reporting bugs |
| `.github/ISSUE_TEMPLATE/feature_request.md` | Template | Pre-filled form for requesting features or new tools |
| `.github/PULL_REQUEST_TEMPLATE.md` | Template | Pre-filled checklist shown when opening a pull request |
| `ascii-tree-generator/` | Tool folder | Self-contained folder for the ASCII Tree Generator tool |
| `ascii-tree-generator/ascii-tree-generator.html` | App file | Single-file web app — open in any browser, no installation needed |
| `ascii-tree-generator/README.md` | Documentation | Full feature guide, usage instructions, and use cases for this tool |
| `ascii-tree-generator/CHANGELOG.md` | Changelog | Version history for the ASCII Tree Generator |
| `CONTRIBUTING.md` | Guidelines | How to contribute: adding tools, code style, commit format, PR process |
| `README.md` | Documentation | This file — project overview, quick start, tool index, and structure |
| `LICENSE` | License | Open-source license governing use and distribution of the project |

> Each tool lives in its own sub-folder and is fully self-contained. A tool folder always includes the app file, a `README.md`, and a `CHANGELOG.md`.

---

## 🤝 Contributing

Contributions are welcome! Whether you want to fix a bug, improve an existing tool, or add a brand-new utility — we'd love your help.

Please read [**CONTRIBUTING.md**](CONTRIBUTING.md) before opening a pull request. It covers:

- How to fork, branch, and submit a PR
- The required layout for new tool folders
- Commit message format and code style rules
- How to report bugs and request features

---
