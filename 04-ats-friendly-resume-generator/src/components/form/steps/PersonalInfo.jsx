import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'

export function PersonalInfo() {
  const { resumeData, setPersonal } = useResumeStore()
  const p = resumeData.personal

  const field = (label, key, placeholder, hint) => (
    <Input
      label={label}
      value={p[key] ?? ''}
      onChange={(e) => setPersonal(key, e.target.value)}
      placeholder={placeholder}
      hint={hint}
    />
  )

  const linkField = (label, nameKey, urlKey, namePlaceholder, urlPlaceholder) => (
    <div key={nameKey} className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Display Text"
          value={p[nameKey] ?? ''}
          onChange={(e) => setPersonal(nameKey, e.target.value)}
          placeholder={namePlaceholder}
        />
        <Input
          label="URL"
          value={p[urlKey] ?? ''}
          onChange={(e) => setPersonal(urlKey, e.target.value)}
          placeholder={urlPlaceholder}
          hint="Used as the hyperlink in PDF"
        />
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-slate-400">
        Fill in your contact details. These appear at the top of every resume template.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field('Full Name *', 'name', 'Jane Smith')}
        {field('Job Title / Headline *', 'title', 'Senior Software Engineer')}
        {field('Email *', 'email', 'jane@example.com')}
        {field('Phone *', 'phone', '+1 (555) 000-0000')}
        {field('Location', 'location', 'San Francisco, CA', 'City, State or Remote')}
      </div>

      <div className="flex flex-col gap-4">
        {linkField('LinkedIn', 'linkedin', 'linkedinUrl', 'linkedin.com/in/janesmith', 'https://linkedin.com/in/janesmith')}
        {linkField('GitHub', 'github', 'githubUrl', 'github.com/janesmith', 'https://github.com/janesmith')}
        {linkField('Website / Portfolio', 'website', 'websiteUrl', 'janesmith.dev', 'https://janesmith.dev')}
      </div>
    </div>
  )
}
