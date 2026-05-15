import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'

function CertCard({ cert, onUpdate, onRemove }) {
  const u = (field) => (e) => onUpdate(cert.id, field, e.target.value)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-200">
          {cert.name || 'New Certification'}
        </h4>
        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input label="Certification Name *" value={cert.name} onChange={u('name')} placeholder="AWS Certified Developer" />
        <Input label="Issuing Organisation" value={cert.issuer} onChange={u('issuer')} placeholder="Amazon Web Services" />
        <Input label="Date" value={cert.date} onChange={u('date')} placeholder="Mar 2024" />
      </div>
    </div>
  )
}

export function Certifications() {
  const { resumeData, setCertificationsLabel, addCertification, updateCertification, removeCertification } = useResumeStore()

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-3">
        <Input
          label="Section Heading"
          value={resumeData.certificationsLabel ?? 'Certifications'}
          onChange={(e) => setCertificationsLabel(e.target.value)}
          placeholder="Certifications"
          hint="This label appears as the section title in your resume"
        />
      </div>

      {resumeData.certifications.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-6">
          No certifications added yet. Click below to add one.
        </p>
      )}

      {resumeData.certifications.map((c) => (
        <CertCard
          key={c.id}
          cert={c}
          onUpdate={updateCertification}
          onRemove={() => removeCertification(c.id)}
        />
      ))}

      <Button variant="secondary" onClick={addCertification} className="self-start">
        + Add Certification
      </Button>
    </div>
  )
}
