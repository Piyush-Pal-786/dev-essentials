// Default shape for a blank resume — shared by the store and JSON import validation
export const defaultResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
}

export const defaultUI = {
  activeStep: 0,
  selectedTemplate: 'classic',
  theme: 'dark',
  accentColor: '#3b82f6',
  font: 'Helvetica',
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications'],
}

// Human-readable labels for section keys (used in reorder UI & PDF headers)
export const SECTION_LABELS = {
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
}

// Font options (all built into @react-pdf/renderer — no CDN required)
export const FONT_OPTIONS = [
  { value: 'Helvetica',   label: 'Helvetica (Modern, ATS-safe)' },
  { value: 'Times-Roman', label: 'Times Roman (Traditional, ATS-safe)' },
  { value: 'Courier',     label: 'Courier (Monospace, ATS-safe)' },
]

// Bold variant map for @react-pdf/renderer built-in fonts
export const FONT_BOLD = {
  'Helvetica':   'Helvetica-Bold',
  'Times-Roman': 'Times-Bold',
  'Courier':     'Courier-Bold',
}

// Italic variant map
export const FONT_ITALIC = {
  'Helvetica':   'Helvetica-Oblique',
  'Times-Roman': 'Times-Italic',
  'Courier':     'Courier-Oblique',
}

// Bold-italic variant map
export const FONT_BOLD_ITALIC = {
  'Helvetica':   'Helvetica-BoldOblique',
  'Times-Roman': 'Times-BoldItalic',
  'Courier':     'Courier-BoldOblique',
}
