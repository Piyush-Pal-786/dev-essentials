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
