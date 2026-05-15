/** Trigger a browser file download from a Blob */
export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Sanitise a string for use in a filename */
export const safeFilename = (name) =>
  (name || 'resume').replace(/[^a-z0-9_\-. ]/gi, '_').trim() || 'resume'

/**
 * Parse a subset of inline Markdown into a flat list of styled segments.
 * Supported syntax:
 *   ***bold italic***  →  bold + italic
 *   **bold**           →  bold
 *   *italic* _italic_  →  italic
 *   __underline__      →  underline
 * Newlines (\n) are preserved as-is in each segment's text.
 * Returns an array of { text, bold, italic, underline }.
 */
export const parseInlineMarkdown = (text) => {
  const segments = []
  // Order matters: *** before ** before __ before * and _
  const re = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|__(.+?)__|\*(.+?)\*|_(.+?)_/g
  let last = 0
  let match
  while ((match = re.exec(text)) !== null) {
    if (match.index > last)
      segments.push({ text: text.slice(last, match.index), bold: false, italic: false, underline: false })
    if      (match[1] !== undefined) segments.push({ text: match[1], bold: true,  italic: true,  underline: false })
    else if (match[2] !== undefined) segments.push({ text: match[2], bold: true,  italic: false, underline: false })
    else if (match[3] !== undefined) segments.push({ text: match[3], bold: false, italic: false, underline: true  })
    else if (match[4] !== undefined) segments.push({ text: match[4], bold: false, italic: true,  underline: false })
    else if (match[5] !== undefined) segments.push({ text: match[5], bold: false, italic: true,  underline: false })
    last = match.index + match[0].length
  }
  if (last < text.length)
    segments.push({ text: text.slice(last), bold: false, italic: false, underline: false })
  return segments.length ? segments : [{ text, bold: false, italic: false, underline: false }]
}

/** Compute ATS score items from resumeData */
export const getATSChecks = (resumeData) => {
  const { personal, summary, experience, education, skills, projects } = resumeData
  return [
    { label: 'Full name provided',           pass: !!personal.name.trim() },
    { label: 'Job title / headline',         pass: !!personal.title.trim() },
    { label: 'Email address',                pass: !!personal.email.trim() },
    { label: 'Phone number',                 pass: !!personal.phone.trim() },
    { label: 'Location',                     pass: !!personal.location.trim() },
    { label: 'Summary / objective (50+ chars)', pass: summary.trim().length >= 50 },
    { label: 'At least one work experience', pass: experience.length > 0 },
    { label: 'Experience has bullet points', pass: experience.some((e) => e.bullets.some((b) => b.trim())) },
    { label: 'At least one education entry', pass: education.length > 0 },
    { label: 'Skills section present',       pass: skills.length > 0 && skills.some((s) => s.items.length > 0) },
    { label: 'Projects section present',     pass: projects.length > 0 },
    { label: 'No images in output (always)', pass: true },
    { label: 'Real text PDF (not image)',    pass: true },
  ]
}
