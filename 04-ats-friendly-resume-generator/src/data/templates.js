// Template registry — each entry links to the React-PDF component
// Thumbnails are inline SVG data URIs (no external files needed)

export const TEMPLATE_REGISTRY = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Single-column, clean. Best ATS compatibility.',
    badge: 'Best for ATS',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column with sidebar for skills & contact.',
    badge: 'Popular',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Typography-focused with generous white space.',
    badge: 'Clean',
  },
]
