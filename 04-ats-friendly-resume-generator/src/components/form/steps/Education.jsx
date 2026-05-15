import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'

function EducationCard({ entry, onUpdate, onRemove }) {
  const u = (field) => (e) => onUpdate(entry.id, field, e.target.value)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-200">
          {entry.institution || 'New Education Entry'}
        </h4>
        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Institution *" value={entry.institution} onChange={u('institution')} placeholder="MIT" />
        <Input label="Degree *" value={entry.degree} onChange={u('degree')} placeholder="Bachelor of Science" />
        <Input label="Field of Study" value={entry.field} onChange={u('field')} placeholder="Computer Science" />
        <Input label="GPA (optional)" value={entry.gpa} onChange={u('gpa')} placeholder="3.8 / 4.0" />
        <Input label="Start Date" value={entry.startDate} onChange={u('startDate')} placeholder="Sep 2018" />
        <Input label="End Date" value={entry.endDate} onChange={u('endDate')} placeholder="May 2022" />
      </div>
    </div>
  )
}

export function Education() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore()

  return (
    <div className="flex flex-col gap-4">
      {resumeData.education.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-6">
          No education added yet. Click below to add your first entry.
        </p>
      )}

      {resumeData.education.map((entry) => (
        <EducationCard
          key={entry.id}
          entry={entry}
          onUpdate={updateEducation}
          onRemove={() => removeEducation(entry.id)}
        />
      ))}

      <Button variant="secondary" onClick={addEducation} className="self-start">
        + Add Education
      </Button>
    </div>
  )
}
