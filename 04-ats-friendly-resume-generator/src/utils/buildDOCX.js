import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Packer,
  BorderStyle,
  AlignmentType,
  TabStopType,
  TabStopPosition,
  UnderlineType,
} from 'docx'
import { SECTION_LABELS } from '../data/schema'
import { parseInlineMarkdown } from './helpers'

const heading = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 24, color: '1e3a5f' })],
    border: { bottom: { color: '1e3a5f', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { before: 280, after: 80 },
  })

const subheading = (left, right) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: left, bold: true, size: 20 }),
      new TextRun({ text: '\t' + right, size: 18, color: '555555' }),
    ],
    spacing: { after: 40 },
  })

const bullet = (text) => {
  // Parse inline markdown; split on \n to emit separate paragraphs
  const lines = text.split('\n')
  return lines.map((line, li) => {
    const segs = parseInlineMarkdown(line)
    return new Paragraph({
      bullet: { level: 0 },
      children: segs.map((s) => new TextRun({
        text: s.text,
        bold: s.bold,
        italics: s.italic,
        underline: s.underline ? { type: UnderlineType.SINGLE } : undefined,
        size: 18,
      })),
      spacing: { after: li < lines.length - 1 ? 0 : 40 },
    })
  })
}

const contactLine = (fields) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: fields
      .filter(Boolean)
      .flatMap((f, i, arr) => [
        new TextRun({ text: f, size: 18, color: '333333' }),
        ...(i < arr.length - 1 ? [new TextRun({ text: '  |  ', size: 18, color: '999999' })] : []),
      ]),
    spacing: { after: 80 },
  })

export const buildDOCX = async (resumeData, sectionOrder) => {
  const { personal, summary } = resumeData

  const children = []

  // Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: personal.name || 'Your Name', bold: true, size: 48 })],
      spacing: { after: 60 },
    })
  )
  if (personal.title) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: personal.title, size: 24, italics: true, color: '1e3a5f' })],
        spacing: { after: 60 },
      })
    )
  }
  children.push(
    contactLine([
      personal.email,
      personal.phone,
      personal.location,
      personal.linkedin,
      personal.github,
      personal.website,
    ])
  )

  // Summary
  if (summary.trim()) {
    children.push(heading('Summary'))
    children.push(
      new Paragraph({
        children: [new TextRun({ text: summary, size: 18 })],
        spacing: { after: 80 },
      })
    )
  }

  // Dynamic sections
  for (const key of sectionOrder) {
    if (key === 'experience' && resumeData.experience.length) {
      children.push(heading(SECTION_LABELS.experience))
      for (const e of resumeData.experience) {
        children.push(
          subheading(
            [e.role, e.company].filter(Boolean).join(' — '),
            [e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' – ')
          )
        )
        for (const b of e.bullets.filter((b) => b.trim())) {
          children.push(...bullet(b))
        }
      }
    }

    if (key === 'education' && resumeData.education.length) {
      children.push(heading(SECTION_LABELS.education))
      for (const ed of resumeData.education) {
        const degreeStr = [ed.degree, ed.field].filter(Boolean).join(' in ')
        const dateStr = [ed.startDate, ed.endDate].filter(Boolean).join(' – ')
        children.push(subheading([degreeStr, ed.institution].filter(Boolean).join(', '), dateStr))
        if (ed.gpa) children.push(...bullet(`${ed.gpaType || 'GPA'}: ${ed.gpa}`))
      }
    }

    if (key === 'skills' && resumeData.skills.length) {
      children.push(heading(SECTION_LABELS.skills))
      for (const sk of resumeData.skills) {
        if (!sk.items.length) continue
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: sk.category ? `${sk.category}: ` : '', bold: true, size: 18 }),
              new TextRun({ text: sk.items.join(', '), size: 18 }),
            ],
            spacing: { after: 60 },
          })
        )
      }
    }

    if (key === 'projects' && resumeData.projects.length) {
      children.push(heading(SECTION_LABELS.projects))
      for (const p of resumeData.projects) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: p.name, bold: true, size: 20 })],
            spacing: { after: 40 },
          })
        )
        if (p.description) children.push(...bullet(p.description))
        if (p.techStack.length) children.push(...bullet(`Tech: ${p.techStack.join(', ')}`))
        if (p.url) children.push(...bullet(`URL: ${p.url}`))
      }
    }

    if (key === 'certifications' && resumeData.certifications.length) {
      children.push(heading(resumeData.certificationsLabel || SECTION_LABELS.certifications))
      for (const c of resumeData.certifications) {
        children.push(
          subheading(
            [c.name, c.issuer].filter(Boolean).join(', '),
            c.date || ''
          )
        )
      }
    }

    if (key === 'awards' && resumeData.awards?.items?.length) {
      children.push(heading(resumeData.awards.label || SECTION_LABELS.awards))
      for (const a of resumeData.awards.items) {
        children.push(subheading(a.title, a.subtitle || ''))
        for (const b of a.bullets.filter((b) => b.trim())) {
          children.push(...bullet(b))
        }
      }
    }

    if (key === 'activities' && resumeData.activities?.items?.length) {
      children.push(heading(resumeData.activities.label || SECTION_LABELS.activities))
      for (const a of resumeData.activities.items) {
        children.push(subheading(a.title, a.subtitle || ''))
        for (const b of a.bullets.filter((b) => b.trim())) {
          children.push(...bullet(b))
        }
      }
    }
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 18, color: '222222' },
          paragraph: { spacing: { line: 276 } },
        },
      },
    },
    sections: [{ properties: {}, children }],
  })

  return Packer.toBlob(doc)
}
