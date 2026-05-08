# ⛶ ASCII Tree Generator

A fully client-side, zero-dependency web app that converts any indented text list into a beautifully formatted ASCII directory tree — instantly, in the browser.

> No installation. No server. No sign-up. Just open `index.html` and start typing.

---

## Screenshot

```
project_root
├── Makefile
├── components
│   ├── component_a
│   │   ├── src
│   │   │   ├── main.c
│   │   │   └── utils.c
│   │   └── include
│   │       └── component_a.h
│   └── component_b
│       └── src
│           └── driver.c
└── docs
    ├── conf.py
    └── index.rst
```

---

## Features

### Core

| Feature | Description |
|---|---|
| **Live preview** | Output updates instantly as you type — no button press needed |
| **Resizable panels** | Drag the divider between editor and output to adjust split |
| **Tab key support** | Pressing Tab in the editor inserts the correct indentation automatically |
| **Pre-loaded example** | Opens with a realistic embedded project structure ready to use |

### Tree Styles

Choose from **6 connector styles** to match your documentation context:

| Style | Connectors |
|---|---|
| Classic | `├──` `└──` |
| Rounded | `├──` `╰──` |
| Double | `╠══` `╚══` |
| Simple | `+--` `` `-- `` |
| Star | `*──` `*──` |
| Arrow | `↣──` `↳──` |

### Indent Options

| Mode | Description |
|---|---|
| 2 spaces | Common in JSON, YAML, JavaScript projects |
| 4 spaces (default) | Standard Python, C, embedded projects |
| Tab | Makefile and tab-indented sources |

### Output Options

Toggle any combination of these:

- **Trailing `/`** — appends `/` to all parent (non-leaf) nodes
- **Show root** — prints each top-level node name as its own header line
- **Full paths** — every node shows its complete path from root (e.g. `project/src/main.c`)
- **Line numbers** — prefixes each output line with a sequential number
- **MD fence** — automatically wraps the output in a Markdown ` ``` ` code fence

### Search & Highlight

- Live search as you type in the search box
- Highlights all matching substrings in the output
- Case-sensitive mode toggle
- Shows total match count

### Export Formats

| Format | Output |
|---|---|
| Plain text | Raw ASCII tree as-is |
| Markdown block | Wrapped in ` ```plain ``` ` code fence |
| HTML `<pre>` | Ready to paste into an HTML file |
| JSON tree | Structured `{ name, children }` tree object |

### Copy & Download

- **Copy** — copies in the chosen export format
- **Copy as Markdown** — one-click Markdown block copy
- **Copy as JSON** — one-click JSON tree copy
- **Download** — saves to file with the correct extension (`.txt`, `.md`, `.html`, `.json`)

### Import

- **Import button** — load any `.txt` or `.md` file as input
- **Drag and drop** — drag a file directly onto the editor

### Stats Bar

Displays live statistics at a glance:

| Stat | Meaning |
|---|---|
| Nodes | Total number of named nodes in the tree |
| Depth | Maximum nesting depth |
| Leaves | Nodes with no children |
| Output lines | Number of lines in the current output |
| Characters | Total character count of the output |

### Light / Dark Theme

Toggle between a dark (default) and light theme with a single button click.

---

## Advantages

- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript; nothing to install or update
- **Works offline** — no internet connection required after download
- **Privacy-safe** — input never leaves your machine; no network requests are made
- **Fast** — renders trees of hundreds of nodes instantly
- **Portable** — single `index.html` file; share or embed anywhere
- **Keyboard-friendly** — Tab indentation works naturally in the editor
- **Flexible output** — multiple formats mean you can paste directly into GitHub READMEs, Sphinx docs, Confluence, HTML pages, or code comments

---

## Use Cases

### Software Documentation

Generate clean directory structures for README files, Sphinx documentation pages, or Confluence wiki pages.

```
project/
├── src/
│   ├── main.py
│   └── utils.py
├── tests/
└── docs/
```

### Embedded / Firmware Projects

Document component layouts for multi-component embedded platforms with deep folder hierarchies.

```
ecu_platform
├── components
│   ├── ABS_Controller
│   │   ├── src
│   │   └── include
│   └── BrakeForceDistribution
│       ├── src
│       └── doc
└── build
```

### Sphinx Documentation Layout

Visualize your full Sphinx documentation folder before building it.

```
docs
├── conf.py
├── index.rst
├── architecture
│   ├── overview.rst
│   └── interfaces.rst
└── user_guide
    ├── getting_started.rst
    └── troubleshooting.rst
```

### GitHub README / Wiki

Embed folder structure diagrams directly in Markdown documents by using **Copy as Markdown**.

### Database Schema or System Architecture

Represent entity hierarchies, service trees, or deployment structures in plain text.

```
microservices
├── api_gateway
├── auth_service
│   └── token_store
├── user_service
└── notification_service
    ├── email
    └── push
```

### Pull Request Descriptions

Quickly show reviewers which files or folders a PR touches or adds.

### Meeting Notes / Planning

Sketch out module decomposition or WBS (Work Breakdown Structure) in a readable format during planning sessions.

---

## How to Use

1. Open `index.html` in any modern browser.
2. Type (or paste) an indented list in the **Input** panel on the left.
3. The ASCII tree appears instantly in the **Output** panel on the right.
4. Adjust style, indent size, and toggle options in the toolbar.
5. Use **Copy** or **Download** to export the result.

### Input Format

Each line is a node. Indentation controls nesting. Use consistent spaces or tabs.

```
root
    child_a
        grandchild_1
        grandchild_2
    child_b
```

### Supported Indent Units

- Two spaces per level
- Four spaces per level (default)
- One tab per level

---

## File Structure

```
ascii-tree-generator/
├── index.html     ← entire app (self-contained)
└── README.md      ← this file
```

---

## Browser Compatibility

Works in all modern browsers:

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

No polyfills required.

---

## License

MIT — free to use, modify, and distribute.
