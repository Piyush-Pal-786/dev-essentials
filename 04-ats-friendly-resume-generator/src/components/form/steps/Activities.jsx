import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { parseInlineMarkdown } from '../../../utils/helpers'

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
  const update = (i, val) => { const next = [...bullets]; next[i] = val; onChange(next) }
  const add    = () => onChange([...bullets, ''])
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i))

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        Bullet Points (optional)
      </label>
      <p className="text-[10px] text-slate-500">
        Supports: <code className="text-blue-400">**bold**</code>{' '}
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
              placeholder="Brief description or context…"
              className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm
                text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500
                focus:ring-1 focus:ring-blue-500"
            />
            {bullets.length > 1 && (
              <Button variant="danger" size="icon" onClick={() => remove(i)} title="Remove bullet">×</Button>
            )}
          </div>
          <MarkdownPreview text={b} />
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={add} className="self-start mt-1">+ Add bullet</Button>
    </div>
  )
}

function ActivityCard({ entry, onUpdate, onRemove }) {
  const u = (field) => (e) => onUpdate(entry.id, field, e.target.value)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-200">
          {entry.title || 'New Activity'}
        </h4>
        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Title (optional)" value={entry.title} onChange={u('title')} placeholder="Open Source Contributor" />
        <Input label="Subtitle / Date" value={entry.subtitle} onChange={u('subtitle')} placeholder="React community · 2022 – Present" />
      </div>

      <BulletList
        bullets={entry.bullets}
        onChange={(next) => onUpdate(entry.id, 'bullets', next)}
      />
    </div>
  )
}

export function Activities() {
  const { resumeData, setActivitiesLabel, addActivity, updateActivity, removeActivity } = useResumeStore()
  const activities = resumeData.activities ?? { label: 'Activities', items: [] }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-3">
        <Input
          label="Section Heading"
          value={activities.label}
          onChange={(e) => setActivitiesLabel(e.target.value)}
          placeholder="Activities"
          hint="This label appears as the section title in your resume"
        />
      </div>

      {activities.items.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-6">
          No activities added yet. Click below to add one.
        </p>
      )}

      {activities.items.map((entry) => (
        <ActivityCard
          key={entry.id}
          entry={entry}
          onUpdate={updateActivity}
          onRemove={() => removeActivity(entry.id)}
        />
      ))}

      <Button variant="secondary" onClick={addActivity} className="self-start">
        + Add Activity
      </Button>
    </div>
  )
}
