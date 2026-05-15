import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { TextArea } from '../../ui/TextArea'
import { Button } from '../../ui/Button'
import { parseInlineMarkdown } from '../../../utils/helpers'

/** Renders a bullet string with inline markdown formatting as a React preview */
function MarkdownPreview({ text }) {
  const segments = parseInlineMarkdown(text)
  const hasFormatting = segments.some((s) => s.bold || s.italic || s.underline)
  if (!hasFormatting) return null
  return (
    <p className="mt-1 px-1 text-sm text-slate-300 leading-relaxed break-words">
      {segments.map((s, i) => {
        let cls = ''
        if (s.bold && s.italic) cls = 'font-bold italic'
        else if (s.bold)        cls = 'font-bold'
        else if (s.italic)      cls = 'italic'
        if (s.underline) cls += ' underline'
        return s.text.split('\n').map((line, li, arr) => (
          <span key={`${i}-${li}`}>
            <span className={cls}>{line}</span>
            {li < arr.length - 1 && <br />}
          </span>
        ))
      })}
    </p>
  )
}

function BulletList({ bullets, onChange }) {
  const update = (i, val) => {
    const next = [...bullets]
    next[i] = val
    onChange(next)
  }
  const add = () => onChange([...bullets, ''])
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i))

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        Bullet Points (responsibilities / achievements)
      </label>
      <p className="text-[10px] text-slate-500">
        Supports inline markdown: <code className="text-blue-400">**bold**</code>{' '}
        <code className="text-blue-400">*italic*</code>{' '}
        <code className="text-blue-400">__underline__</code>{' '}
        <code className="text-blue-400">***bold italic***</code>
      </p>
      {bullets.map((b, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <div className="flex gap-2 items-start">
            <span className="mt-2.5 text-slate-500 text-sm">•</span>
            <input
              value={b}
              onChange={(e) => update(i, e.target.value)}
              placeholder="Developed a feature that reduced load time by 40%…"
              className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm
                text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500
                focus:ring-1 focus:ring-blue-500"
            />
            {bullets.length > 1 && (
              <Button variant="danger" size="icon" onClick={() => remove(i)} title="Remove bullet">
                ×
              </Button>
            )}
          </div>
          <MarkdownPreview text={b} />
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={add} className="self-start mt-1">
        + Add bullet
      </Button>
    </div>
  )
}

function ExperienceCard({ entry, onUpdate, onRemove }) {
  const u = (field) => (e) => onUpdate(entry.id, field, e.target.value)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-200">
          {entry.role || entry.company ? `${entry.role} @ ${entry.company}` : 'New Experience'}
        </h4>
        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Job Title / Role *" value={entry.role} onChange={u('role')} placeholder="Software Engineer" />
        <Input label="Company *" value={entry.company} onChange={u('company')} placeholder="Acme Corp" />
        <Input label="Start Date" value={entry.startDate} onChange={u('startDate')} placeholder="Jan 2021" />
        <div className="flex flex-col gap-1">
          <Input
            label="End Date"
            value={entry.current ? 'Present' : entry.endDate}
            onChange={u('endDate')}
            placeholder="Dec 2023"
            disabled={entry.current}
          />
          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer mt-1">
            <input
              type="checkbox"
              checked={entry.current}
              onChange={(e) => onUpdate(entry.id, 'current', e.target.checked)}
              className="accent-blue-500"
            />
            Currently working here
          </label>
        </div>
      </div>

      <BulletList
        bullets={entry.bullets}
        onChange={(val) => onUpdate(entry.id, 'bullets', val)}
      />
    </div>
  )
}

export function WorkExperience() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore()

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-blue-600/10 border border-blue-600/20 p-3 text-xs text-blue-300">
        <strong>ATS tip:</strong> Use strong action verbs (Developed, Led, Reduced, Increased).
        Quantify achievements wherever possible (%, $, time saved).
      </div>

      {resumeData.experience.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-6">
          No experience added yet. Click below to add your first entry.
        </p>
      )}

      {resumeData.experience.map((entry) => (
        <ExperienceCard
          key={entry.id}
          entry={entry}
          onUpdate={updateExperience}
          onRemove={() => removeExperience(entry.id)}
        />
      ))}

      <Button variant="secondary" onClick={addExperience} className="self-start">
        + Add Experience
      </Button>
    </div>
  )
}
