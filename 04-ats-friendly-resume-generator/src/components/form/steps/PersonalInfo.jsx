import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'

export function PersonalInfo() {
  const { resumeData, setPersonal } = useResumeStore()
  const p = resumeData.personal

  const field = (label, key, placeholder, hint) => (
    <Input
      label={label}
      value={p[key]}
      onChange={(e) => setPersonal(key, e.target.value)}
      placeholder={placeholder}
      hint={hint}
    />
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
        {field('LinkedIn', 'linkedin', 'linkedin.com/in/janesmith')}
        {field('GitHub', 'github', 'github.com/janesmith')}
        {field('Website / Portfolio', 'website', 'janesmith.dev')}
      </div>
    </div>
  )
}
