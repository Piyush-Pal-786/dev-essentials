import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { parseInlineMarkdown } from '../../../utils/helpers'
import { SortableItem } from '../../ui/SortableItem'

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

function SortableBullet({ id, value, showRemove, onUpdate, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }
  return (
    <div ref={setNodeRef} style={style} className="flex flex-col gap-0.5">
      <div className="flex gap-2 items-start">
        <button
          {...listeners}
          {...attributes}
          className="mt-2.5 cursor-grab active:cursor-grabbing p-0.5 text-slate-500 hover:text-slate-300 shrink-0 touch-none"
          tabIndex={-1}
          title="Drag to reorder"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
          </svg>
        </button>
        <input
          value={value}
          onChange={onUpdate}
          placeholder="Brief description or context…"
          className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm
            text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500
            focus:ring-1 focus:ring-blue-500"
        />
        {showRemove && <Button variant="danger" size="icon" onClick={onRemove} title="Remove bullet">×</Button>}
      </div>
      <MarkdownPreview text={value} />
    </div>
  )
}

function BulletList({ bullets, onChange }) {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))
  const update = (i, val) => { const next = [...bullets]; next[i] = val; onChange(next) }
  const add    = () => onChange([...bullets, ''])
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    onChange(arrayMove(bullets, Number(active.id), Number(over.id)))
  }

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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={bullets.map((_, i) => String(i))} strategy={verticalListSortingStrategy}>
          {bullets.map((b, i) => (
            <SortableBullet
              key={i}
              id={String(i)}
              value={b}
              showRemove={bullets.length > 1}
              onUpdate={(e) => update(i, e.target.value)}
              onRemove={() => remove(i)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button variant="ghost" size="sm" onClick={add} className="self-start mt-1">+ Add bullet</Button>
    </div>
  )
}

function AwardCard({ entry, onUpdate, onRemove }) {
  const u = (field) => (e) => onUpdate(entry.id, field, e.target.value)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-200">
          {entry.title || 'New Award / Honor'}
        </h4>
        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Title (optional)" value={entry.title} onChange={u('title')} placeholder="Best Paper Award" />
        <Input label="Subtitle / Date" value={entry.subtitle} onChange={u('subtitle')} placeholder="IEEE Conference · 2023" />
      </div>

      <BulletList
        bullets={entry.bullets}
        onChange={(next) => onUpdate(entry.id, 'bullets', next)}
      />
    </div>
  )
}

export function Awards() {
  const { resumeData, setAwardsLabel, addAward, updateAward, removeAward, reorderAwards } = useResumeStore()
  const awards = resumeData.awards ?? { label: 'Awards & Honors', items: [] }
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const items = awards.items
    reorderAwards(arrayMove(items, items.findIndex((x) => x.id === active.id), items.findIndex((x) => x.id === over.id)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 p-3">
        <Input
          label="Section Heading"
          value={awards.label}
          onChange={(e) => setAwardsLabel(e.target.value)}
          placeholder="Awards & Honors"
          hint="This label appears as the section title in your resume"
        />
      </div>

      {awards.items.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-6">
          No awards or honors added yet. Click below to add one.
        </p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={awards.items.map((x) => x.id)} strategy={verticalListSortingStrategy}>
          {awards.items.map((entry) => (
            <SortableItem key={entry.id} id={entry.id}>
              <AwardCard
                entry={entry}
                onUpdate={updateAward}
                onRemove={() => removeAward(entry.id)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button variant="secondary" onClick={addAward} className="self-start">
        + Add Award / Honor
      </Button>
    </div>
  )
}
