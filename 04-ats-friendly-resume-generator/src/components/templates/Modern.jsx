import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { SECTION_LABELS, FONT_BOLD, FONT_ITALIC, FONT_BOLD_ITALIC } from '../../data/schema'
import { parseInlineMarkdown } from '../../utils/helpers'

const mk = (font, accent) =>
  StyleSheet.create({
    page: {
      flexDirection: 'row', fontFamily: font, fontSize: 9.5,
    },
    sidebar: {
      width: '32%', backgroundColor: accent,
      paddingHorizontal: 14, paddingTop: 36, paddingBottom: 36,
      color: '#ffffff',
    },
    main: {
      width: '68%', paddingHorizontal: 20, paddingTop: 36, paddingBottom: 36,
      color: '#1f2937',
    },
    name: {
      fontSize: 20, fontFamily: FONT_BOLD[font], color: '#ffffff',
      marginBottom: 3, lineHeight: 1.2,
    },
    sideTitle: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
    sideSectionHeader: {
      fontFamily: FONT_BOLD[font], fontSize: 9, color: '#ffffff',
      borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.4)',
      paddingBottom: 2, marginTop: 12, marginBottom: 5,
      textTransform: 'uppercase', letterSpacing: 0.6,
    },
    sideItem: { fontSize: 8.5, color: 'rgba(255,255,255,0.9)', marginBottom: 2 },
    sideLabel: { fontFamily: FONT_BOLD[font], fontSize: 8, color: 'rgba(255,255,255,0.65)', marginBottom: 1 },
    skillChip: {
      backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 3,
      paddingHorizontal: 5, paddingVertical: 2,
      fontSize: 8, color: '#fff', marginBottom: 3, marginRight: 3,
    },
    skillsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
    mainSectionHeader: {
      fontSize: 11, fontFamily: FONT_BOLD[font], color: accent,
      borderBottomWidth: 1.2, borderBottomColor: accent,
      paddingBottom: 2, marginTop: 14, marginBottom: 6,
      textTransform: 'uppercase', letterSpacing: 0.7,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
    bold: { fontFamily: FONT_BOLD[font] },
    dates: { fontSize: 8.5, color: '#6b7280' },
    bulletRow: { flexDirection: 'row', marginBottom: 2, marginLeft: 4 },
    bulletDot: { width: 10, color: accent },
    bulletText: { flex: 1, fontSize: 9 },
    summaryText: { fontSize: 9.5, color: '#374151', lineHeight: 1.45, marginBottom: 4 },
    projName: { fontFamily: FONT_BOLD[font], fontSize: 10, marginBottom: 1 },
    projDesc: { fontSize: 9, color: '#4b5563', marginBottom: 1 },
    projMeta: { fontSize: 8.5, color: '#6b7280' },
  })

export function ModernTemplate({ data, accentColor = '#2563eb', font = 'Helvetica', sectionOrder }) {
  const styles = mk(font, accentColor)
  const { personal, summary } = data
  const order = sectionOrder || ['experience', 'education', 'skills', 'projects', 'certifications']

  // Sidebar holds: contact, skills, certifications
  // Main holds: summary, experience, education, projects
  const sidebarSections = order.filter((k) => ['skills', 'certifications'].includes(k))
  const mainSections    = order.filter((k) => !['skills', 'certifications'].includes(k))

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Sidebar ── */}
        <View style={styles.sidebar}>
          <Text style={styles.name}>{personal.name || 'Your Name'}</Text>
          {personal.title ? <Text style={styles.sideTitle}>{personal.title}</Text> : null}

          {/* Contact */}
          <Text style={styles.sideSectionHeader}>Contact</Text>
          {[
            { label: 'Email',    value: personal.email },
            { label: 'Phone',    value: personal.phone },
            { label: 'Location', value: personal.location },
            { label: 'LinkedIn', value: personal.linkedin },
            { label: 'GitHub',   value: personal.github },
            { label: 'Website',  value: personal.website },
          ].filter((c) => c.value).map((c) => (
            <View key={c.label} style={{ marginBottom: 5 }}>
              <Text style={styles.sideLabel}>{c.label}</Text>
              <Text style={styles.sideItem}>{c.value}</Text>
            </View>
          ))}

          {/* Skills & Certifications in sidebar */}
          {sidebarSections.map((key) => {
            if (key === 'skills' && data.skills.length) {
              return (
                <View key="skills">
                  <Text style={styles.sideSectionHeader}>Skills</Text>
                  {data.skills.filter((s) => s.items.length).map((s) => (
                    <View key={s.id} style={{ marginBottom: 5 }}>
                      {s.category ? (
                        <Text style={{ ...styles.sideLabel, marginBottom: 2 }}>{s.category}</Text>
                      ) : null}
                      <View style={styles.skillsWrap}>
                        {s.items.map((item, i) => (
                          <Text key={i} style={styles.skillChip}>{item}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              )
            }
            if (key === 'certifications' && data.certifications.length) {
              return (
                <View key="certifications">
                  <Text style={styles.sideSectionHeader}>Certifications</Text>
                  {data.certifications.map((c) => (
                    <View key={c.id} style={{ marginBottom: 4 }}>
                      <Text style={styles.sideItem}>{c.name}</Text>
                      {(c.issuer || c.date) ? (
                        <Text style={{ ...styles.sideLabel }}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              )
            }
            return null
          })}
        </View>

        {/* ── Main ── */}
        <View style={styles.main}>
          {summary.trim() ? (
            <View>
              <Text style={styles.mainSectionHeader}>Summary</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {mainSections.map((key) => {
            if (key === 'experience' && data.experience.length) {
              return (
                <View key="experience">
                  <Text style={styles.mainSectionHeader}>{SECTION_LABELS.experience}</Text>
                  {data.experience.map((e) => (
                    <View key={e.id} style={{ marginBottom: 8 }}>
                      <View style={styles.row}>
                        <Text style={styles.bold}>{e.role}{e.role && e.company ? ' — ' : ''}{e.company}</Text>
                        <Text style={styles.dates}>
                          {[e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' – ')}
                        </Text>
                      </View>
                      {e.bullets.filter((b) => b.trim()).map((b, i) => {
                          const segs = parseInlineMarkdown(b)
                          return (
                            <View key={i} style={styles.bulletRow}>
                              <Text style={styles.bulletDot}>•</Text>
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
                  <Text style={styles.mainSectionHeader}>{SECTION_LABELS.education}</Text>
                  {data.education.map((ed) => (
                    <View key={ed.id} style={{ marginBottom: 6 }}>
                      <View style={styles.row}>
                        <Text style={styles.bold}>{ed.institution}</Text>
                        <Text style={styles.dates}>{[ed.startDate, ed.endDate].filter(Boolean).join(' – ')}</Text>
                      </View>
                      <Text style={{ fontSize: 9, color: '#4b5563', marginBottom: 2 }}>
                        {[ed.degree, ed.field].filter(Boolean).join(' in ')}
                        {ed.gpa ? `  ·  GPA: ${ed.gpa}` : ''}
                      </Text>
                    </View>
                  ))}
                </View>
              )
            }
            if (key === 'projects' && data.projects.length) {
              return (
                <View key="projects">
                  <Text style={styles.mainSectionHeader}>{SECTION_LABELS.projects}</Text>
                  {data.projects.map((p) => (
                    <View key={p.id} style={{ marginBottom: 6 }}>
                      <Text style={styles.projName}>{p.name}</Text>
                      {p.description ? <Text style={styles.projDesc}>{p.description}</Text> : null}
                      {p.techStack.length ? (
                        <Text style={styles.projMeta}>Tech: {p.techStack.join(', ')}</Text>
                      ) : null}
                      {p.url ? <Text style={{ ...styles.projMeta, color: accentColor }}>{p.url}</Text> : null}
                    </View>
                  ))}
                </View>
              )
            }
            return null
          })}
        </View>
      </Page>
    </Document>
  )
}
