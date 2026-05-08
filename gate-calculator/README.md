# Scientific Gate Calculator

A fully self-contained, single-page scientific calculator built with pure HTML, CSS, and vanilla JavaScript — no external dependencies, no build tools, no frameworks required.

## Live Demo

Open `index.html` directly in any modern browser to use the calculator.

---

## Features

### Basic Arithmetic
- Addition, Subtraction, Multiplication, Division
- Modulus (`mod`)
- Percentage (`%`)

### Scientific Functions
| Category | Functions |
|---|---|
| Power & Roots | `x²`, `x³`, `xʸ`, `√x`, `∛x`, `ʸ√x` |
| Logarithms | `ln`, `log` (base 10), `log₂x`, `logᵧx` |
| Exponential | `eˣ`, `10ˣ`, `Exp` (scientific notation) |
| Trigonometric | `sin`, `cos`, `tan` and their inverses (`sin⁻¹`, `cos⁻¹`, `tan⁻¹`) |
| Hyperbolic | `sinh`, `cosh`, `tanh` and their inverses (`sinh⁻¹`, `cosh⁻¹`, `tanh⁻¹`) |
| Other | `n!` (factorial), `1/x` (reciprocal), `\|x\|` (absolute value), `+/-` (sign toggle) |

### Constants
- **π** (Pi) — `3.14159265358979...`
- **e** (Euler's number) — `2.71828182845904...`

### Memory Operations
| Button | Action |
|---|---|
| `MS` | Store current value in memory |
| `MR` | Recall value from memory |
| `M+` | Add current value to memory |
| `M-` | Subtract current value from memory |
| `MC` | Clear memory |

An **M** indicator appears when a value is stored in memory.

### Angle Mode
- **Deg** (Degrees) — default
- **Rad** (Radians)

Select the angle unit before performing any trigonometric calculation.

### Expression Display
- A secondary display shows the running expression as you build it, so you can follow each step of your calculation.

### Parentheses Support
- Group sub-expressions using `(` and `)` to control operator precedence.

### Keyboard / Other Controls
| Button | Action |
|---|---|
| `←` | Backspace — delete last digit |
| `C` | All clear — reset calculator |
| `=` | Evaluate the current expression |
| `−` (header) | Minimize / restore the calculator body |
| **Help?** | Toggle the built-in instructions panel |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/gate-calculator.git

# Open the calculator
cd gate-calculator
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

No installation, no dependencies.

---

## File Structure

```
gate-calculator/
└── index.html   # Complete self-contained application (HTML + CSS + JS)
```

All styles and logic are inlined in a single file for maximum portability.

---

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Edge, Safari). No polyfills needed.

---

## Limitations

- Keyboard input is disabled; use the on-screen buttons only.
- Factorial results are precise up to 14 digits.
- Logarithmic and hyperbolic results are precise up to 5 decimal places.
- Modulus on decimal numbers with 15+ digits may lose precision.
- Supported numeric range: `10⁻³²³` to `10³⁰⁸`.

---

## License

MIT — free to use, modify, and distribute.
