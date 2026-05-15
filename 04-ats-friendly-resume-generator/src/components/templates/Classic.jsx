import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'
import { SECTION_LABELS, FONT_BOLD, FONT_ITALIC, FONT_BOLD_ITALIC } from '../../data/schema'
import { parseInlineMarkdown, normalizeUrl } from '../../utils/helpers'

const mk = (font, accent) =>
  StyleSheet.create({
    page: {
      paddingTop: 42, paddingBottom: 42, paddingHorizontal: 52,
      fontFamily: font, fontSize: 10, color: '#2d2d2d', lineHeight: 1.45,
    },
    name: {
      fontSize: 24, fontFamily: FONT_BOLD[font], color: '#111827',
      lineHeight: 1, marginBottom: 6,
    },
    jobTitle: { fontSize: 12, color: accent, lineHeight: 1, marginBottom: 10 },
    contactRow: {
      flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16,
      fontSize: 9, color: '#4b5563',
    },
    contactItem: { marginRight: 14 },
    sectionHeader: {
      fontSize: 10, fontFamily: FONT_BOLD[font], color: accent,
      borderBottomWidth: 1.2, borderBottomColor: accent,
      paddingBottom: 2, marginTop: 14, marginBottom: 6,
      textTransform: 'uppercase', letterSpacing: 0.8,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
    roleCompany: { fontFamily: FONT_BOLD[font], fontSize: 10 },
    dates: { fontSize: 9, color: '#6b7280' },
    institution: { fontFamily: FONT_BOLD[font], fontSize: 10 },
    degree: { fontSize: 9, color: '#4b5563', marginBottom: 4 },
    bulletRow: { flexDirection: 'row', marginBottom: 2, marginLeft: 4 },
    bulletDot: { width: 10, color: accent, fontSize: 10 },
    bulletText: { flex: 1, fontSize: 9.5 },
    skillRow: { flexDirection: 'row', marginBottom: 3 },
    skillCat: { fontFamily: FONT_BOLD[font], width: 88, fontSize: 9.5 },
    skillItems: { flex: 1, fontSize: 9.5, color: '#4b5563' },
    summaryText: { fontSize: 9.5, color: '#374151', marginBottom: 4 },
    certRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    certName: { fontFamily: FONT_BOLD[font], fontSize: 9.5 },
    certMeta: { fontSize: 9, color: '#6b7280' },
    projName: { fontFamily: FONT_BOLD[font], fontSize: 10, marginBottom: 1 },
    projDesc: { fontSize: 9.5, color: '#374151', marginBottom: 2 },
    projMeta: { fontSize: 9, color: '#6b7280' },
  })

const Bullet = ({ text, styles, font }) => {
  const segs = parseInlineMarkdown(text)
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>
        {segs.map((s, i) => (
          <Text key={i} style={{
            ...(s.bold && s.italic ? { fontFamily: FONT_BOLD_ITALIC[font] }
              : s.bold             ? { fontFamily: FONT_BOLD[font] }
              : s.italic           ? { fontFamily: FONT_ITALIC[font] }
              : {}),
            ...(s.underline ? { textDecoration: 'underline' } : {}),
          }}>{s.text}</Text>
        ))}
      </Text>
    </View>
  )
}

function renderSection(key, data, styles, font) {
  if (key === 'experience' && data.experience.length) {
    return (
      <View key="experience">
        <Text style={styles.sectionHeader}>{SECTION_LABELS.experience}</Text>
        {data.experience.map((e) => (
          <View key={e.id} style={{ marginBottom: 8 }}>
            <View style={styles.row}>
              <Text style={styles.roleCompany}>{e.role}{e.role && e.company ? ' — ' : ''}{e.company}</Text>
              <Text style={styles.dates}>
                {[e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' – ')}
              </Text>
            </View>
            {e.bullets.filter((b) => b.trim()).map((b, i) => (
              <Bullet key={i} text={b} styles={styles} font={font} />
            ))}
          </View>
        ))}
      </View>
    )
  }

  if (key === 'education' && data.education.length) {
    return (
      <View key="education">
        <Text style={styles.sectionHeader}>{SECTION_LABELS.education}</Text>
        {data.education.map((ed) => (
          <View key={ed.id} style={{ marginBottom: 6 }}>
            <View style={styles.row}>
              <Text style={styles.institution}>{ed.institution}</Text>
              <Text style={styles.dates}>
                {[ed.startDate, ed.endDate].filter(Boolean).join(' – ')}
              </Text>
            </View>
            <Text style={styles.degree}>
              {[ed.degree, ed.field].filter(Boolean).join(' in ')}
              {ed.gpa ? `  ·  ${ed.gpaType || 'GPA'}: ${ed.gpa}` : ''}
            </Text>
          </View>
        ))}
      </View>
    )
  }

  if (key === 'skills' && data.skills.length) {
    return (
      <View key="skills">
        <Text style={styles.sectionHeader}>{SECTION_LABELS.skills}</Text>
        {data.skills.filter((s) => s.items.length).map((s) => (
          <View key={s.id} style={styles.skillRow}>
            <Text style={styles.skillCat}>{s.category || 'Skills'}</Text>
            <Text style={styles.skillItems}>{s.items.join(', ')}</Text>
          </View>
        ))}
      </View>
    )
  }

  if (key === 'projects' && data.projects.length) {
    return (
      <View key="projects">
        <Text style={styles.sectionHeader}>{SECTION_LABELS.projects}</Text>
        {data.projects.map((p) => (
          <View key={p.id} style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
              <Text style={styles.projName}>{p.name}</Text>
              {p.url ? (
                <Link src={p.url}>
                  <Text style={{ color: '#3b82f6', fontSize: 9 }}>{p.url}</Text>
                </Link>
              ) : null}
            </View>
            {p.description ? <Text style={styles.projDesc}>{p.description}</Text> : null}
            {p.techStack.length ? (
              <Text style={styles.projMeta}>Tech: {p.techStack.join(', ')}</Text>
            ) : null}
          </View>
        ))}
      </View>
    )
  }

  if (key === 'certifications' && data.certifications.length) {
    return (
      <View key="certifications">
        <Text style={styles.sectionHeader}>{data.certificationsLabel || SECTION_LABELS.certifications}</Text>
        {data.certifications.map((c) => (
          <View key={c.id} style={styles.certRow}>
            <Text style={styles.certName}>{c.name}</Text>
            <Text style={styles.certMeta}>
              {[c.issuer, c.date].filter(Boolean).join(' · ')}
            </Text>
          </View>
        ))}
      </View>
    )
  }

  if (key === 'awards' && data.awards?.items?.length) {
    return (
      <View key="awards">
        <Text style={styles.sectionHeader}>{data.awards.label || 'Awards & Honors'}</Text>
        {data.awards.items.map((a) => (
          <View key={a.id} style={{ marginBottom: 8 }}>
            <View style={styles.row}>
              <Text style={styles.roleCompany}>{a.title}</Text>
              {a.subtitle ? <Text style={styles.dates}>{a.subtitle}</Text> : null}
            </View>
            {a.bullets.filter((b) => b.trim()).map((b, i) => (
              <Bullet key={i} text={b} styles={styles} font={font} />
            ))}
          </View>
        ))}
      </View>
    )
  }

  if (key === 'activities' && data.activities?.items?.length) {
    return (
      <View key="activities">
        <Text style={styles.sectionHeader}>{data.activities.label || 'Activities'}</Text>
        {data.activities.items.map((a) => (
          <View key={a.id} style={{ marginBottom: 8 }}>
            <View style={styles.row}>
              <Text style={styles.roleCompany}>{a.title}</Text>
              {a.subtitle ? <Text style={styles.dates}>{a.subtitle}</Text> : null}
            </View>
            {a.bullets.filter((b) => b.trim()).map((b, i) => (
              <Bullet key={i} text={b} styles={styles} font={font} />
            ))}
          </View>
        ))}
      </View>
    )
  }

  return null
}

export function ClassicTemplate({ data, accentColor = '#2563eb', font = 'Helvetica', sectionOrder }) {
  const styles = mk(font, accentColor)
  const { personal, summary } = data
  const order = sectionOrder || ['experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'activities']

  const contactItems = [
    { text: personal.email },
    { text: personal.phone },
    { text: personal.location },
    personal.linkedin ? { text: personal.linkedin, href: normalizeUrl(personal.linkedinUrl) } : null,
    personal.github   ? { text: personal.github,   href: normalizeUrl(personal.githubUrl)   } : null,
    personal.website  ? { text: personal.website,  href: normalizeUrl(personal.websiteUrl)  } : null,
  ].filter((c) => c && c.text)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View><Text style={styles.name}>{personal.name || 'Your Name'}</Text></View>
        {personal.title
          ? <View><Text style={styles.jobTitle}>{personal.title}</Text></View>
          : null}
        <View style={styles.contactRow}>
          {contactItems.map((c, i) => (
            c.href
              ? <Link key={i} src={c.href} style={styles.contactItem}><Text>{c.text}</Text></Link>
              : <Text key={i} style={styles.contactItem}>{c.text}</Text>
          ))}
        </View>

        {/* Summary */}
        {summary.trim() ? (
          <View>
            <Text style={styles.sectionHeader}>Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Dynamic sections */}
        {order.map((key) => renderSection(key, data, styles, font))}
      </Page>
    </Document>
  )
}
