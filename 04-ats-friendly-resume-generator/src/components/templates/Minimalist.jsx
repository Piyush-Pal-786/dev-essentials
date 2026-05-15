import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'
import { SECTION_LABELS, FONT_BOLD, FONT_ITALIC, FONT_BOLD_ITALIC } from '../../data/schema'
import { parseInlineMarkdown, normalizeUrl } from '../../utils/helpers'

const mk = (font, accent) =>
  StyleSheet.create({
    page: {
      paddingTop: 52, paddingBottom: 46, paddingHorizontal: 58,
      fontFamily: font, fontSize: 10, color: '#1a1a1a', lineHeight: 1.5,
    },
    name: {
      fontSize: 28, fontFamily: FONT_BOLD[font], color: '#111111',
      letterSpacing: 1, lineHeight: 1, marginBottom: 8,
    },
    jobTitle: { fontSize: 11, color: '#777777', letterSpacing: 0.3, lineHeight: 1, marginBottom: 10 },
    contactRow: {
      flexDirection: 'row', flexWrap: 'wrap', fontSize: 8.5,
      color: '#888888', marginBottom: 22,
    },
    contactSep: { marginHorizontal: 6, color: '#cccccc' },
    divider: {
      borderBottomWidth: 0.5, borderBottomColor: '#cccccc', marginBottom: 6,
    },
    sectionHeader: {
      fontSize: 8.5, fontFamily: FONT_BOLD[font], color: '#888888',
      textTransform: 'uppercase', letterSpacing: 1.5,
      marginTop: 16, marginBottom: 5,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0 },
    bold: { fontFamily: FONT_BOLD[font], fontSize: 10 },
    dates: { fontSize: 8.5, color: '#888888' },
    sub: { fontSize: 9, color: '#555555', marginBottom: 4 },
    bulletRow: { flexDirection: 'row', marginBottom: 2, marginLeft: 6, marginTop: 1 },
    bulletDot: { width: 10, color: accent, fontSize: 9 },
    bulletText: { flex: 1, fontSize: 9.5, color: '#333333' },
    summaryText: { fontSize: 9.5, color: '#333333', marginBottom: 4 },
    skillRow: { flexDirection: 'row', marginBottom: 3 },
    skillCat: { fontFamily: FONT_BOLD[font], width: 90, fontSize: 9.5, color: '#555' },
    skillItems: { flex: 1, fontSize: 9.5, color: '#444444' },
    accentLine: {
      width: 28, height: 2.5, backgroundColor: accent, marginBottom: 14,
    },
    projName: { fontFamily: FONT_BOLD[font], fontSize: 10, marginBottom: 1 },
    projDesc: { fontSize: 9.5, color: '#444444', marginBottom: 1 },
    projMeta: { fontSize: 8.5, color: '#888888' },
    certRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    certName: { fontFamily: FONT_BOLD[font], fontSize: 9.5 },
    certMeta: { fontSize: 8.5, color: '#888888' },
  })

function renderSection(key, data, styles, accent, font) {
  if (key === 'experience' && data.experience.length) {
    return (
      <View key="experience">
        <Text style={styles.sectionHeader}>{SECTION_LABELS.experience}</Text>
        <View style={styles.divider} />
        {data.experience.map((e) => (
          <View key={e.id} style={{ marginBottom: 9 }}>
            <View style={styles.row}>
              <Text style={styles.bold}>{e.role}{e.role && e.company ? ' · ' : ''}{e.company}</Text>
              <Text style={styles.dates}>
                {[e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' – ')}
              </Text>
            </View>
            {e.bullets.filter((b) => b.trim()).map((b, i) => {
              const segs = parseInlineMarkdown(b)
              return (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>–</Text>
                  <Text style={styles.bulletText}>
                    {segs.map((s, si) => (
                      <Text key={si} style={{
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
            })}
          </View>
        ))}
      </View>
    )
  }

  if (key === 'education' && data.education.length) {
    return (
      <View key="education">
        <Text style={styles.sectionHeader}>{SECTION_LABELS.education}</Text>
        <View style={styles.divider} />
        {data.education.map((ed) => (
          <View key={ed.id} style={{ marginBottom: 7 }}>
            <View style={styles.row}>
              <Text style={styles.bold}>{ed.institution}</Text>
              <Text style={styles.dates}>{[ed.startDate, ed.endDate].filter(Boolean).join(' – ')}</Text>
            </View>
            <Text style={styles.sub}>
              {[ed.degree, ed.field].filter(Boolean).join(' in ')}
              {ed.gpa ? `  ·  ${ed.gpaType || 'GPA'} ${ed.gpa}` : ''}
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
        <View style={styles.divider} />
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
        <View style={styles.divider} />
        {data.projects.map((p) => (
          <View key={p.id} style={{ marginBottom: 7 }}>
            <Text style={styles.projName}>{p.name}</Text>
            {p.description ? <Text style={styles.projDesc}>{p.description}</Text> : null}
            {p.techStack.length ? <Text style={styles.projMeta}>Tech: {p.techStack.join(', ')}</Text> : null}
            {p.url ? <Text style={{ ...styles.projMeta, color: accent }}>{p.url}</Text> : null}
          </View>
        ))}
      </View>
    )
  }

  if (key === 'certifications' && data.certifications.length) {
    return (
      <View key="certifications">
        <Text style={styles.sectionHeader}>{data.certificationsLabel || SECTION_LABELS.certifications}</Text>
        <View style={styles.divider} />
        {data.certifications.map((c) => (
          <View key={c.id} style={styles.certRow}>
            <Text style={styles.certName}>{c.name}</Text>
            <Text style={styles.certMeta}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</Text>
          </View>
        ))}
      </View>
    )
  }

  if (key === 'awards' && data.awards?.items?.length) {
    return (
      <View key="awards">
        <Text style={styles.sectionHeader}>{data.awards.label || 'Awards & Honors'}</Text>
        <View style={styles.divider} />
        {data.awards.items.map((a) => (
          <View key={a.id} style={{ marginBottom: 9 }}>
            <View style={styles.row}>
              <Text style={styles.bold}>{a.title}</Text>
              {a.subtitle ? <Text style={styles.dates}>{a.subtitle}</Text> : null}
            </View>
            {a.bullets.filter((b) => b.trim()).map((b, i) => {
              const segs = parseInlineMarkdown(b)
              return (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>–</Text>
                  <Text style={styles.bulletText}>
                    {segs.map((s, si) => (
                      <Text key={si} style={{
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
            })}
          </View>
        ))}
      </View>
    )
  }

  if (key === 'activities' && data.activities?.items?.length) {
    return (
      <View key="activities">
        <Text style={styles.sectionHeader}>{data.activities.label || 'Activities'}</Text>
        <View style={styles.divider} />
        {data.activities.items.map((a) => (
          <View key={a.id} style={{ marginBottom: 9 }}>
            <View style={styles.row}>
              <Text style={styles.bold}>{a.title}</Text>
              {a.subtitle ? <Text style={styles.dates}>{a.subtitle}</Text> : null}
            </View>
            {a.bullets.filter((b) => b.trim()).map((b, i) => {
              const segs = parseInlineMarkdown(b)
              return (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>–</Text>
                  <Text style={styles.bulletText}>
                    {segs.map((s, si) => (
                      <Text key={si} style={{
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
            })}
          </View>
        ))}
      </View>
    )
  }

  return null
}

export function MinimalistTemplate({ data, accentColor = '#2563eb', font = 'Helvetica', sectionOrder }) {
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
        <View style={styles.accentLine} />

        <View style={styles.contactRow}>
          {contactItems.map((c, i) => (
            <View key={i} style={{ flexDirection: 'row' }}>
              {c.href
                ? <Link src={c.href}><Text>{c.text}</Text></Link>
                : <Text>{c.text}</Text>
              }
              {i < contactItems.length - 1 ? <Text style={styles.contactSep}>·</Text> : null}
            </View>
          ))}
        </View>

        {/* Summary */}
        {summary.trim() ? (
          <View>
            <Text style={styles.sectionHeader}>Profile</Text>
            <View style={styles.divider} />
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Dynamic sections */}
        {order.map((key) => renderSection(key, data, styles, accentColor, font))}
      </Page>
    </Document>
  )
}
