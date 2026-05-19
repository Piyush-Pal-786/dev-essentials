import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { SortableItem } from '../../ui/SortableItem'

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
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-slate-400">Grade Type</span>
            {['GPA', 'CGPA', 'Percentage'].map((opt) => (
              <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-300">
                <input
                  type="radio"
                  name={`gpaType-${entry.id}`}
                  value={opt}
                  checked={(entry.gpaType || 'GPA') === opt}
                  onChange={() => onUpdate(entry.id, 'gpaType', opt)}
                  className="accent-blue-500"
                />
                {opt}
              </label>
            ))}
          </div>
          <Input
            label={`${entry.gpaType || 'GPA'} (optional)`}
            value={entry.gpa}
            onChange={u('gpa')}
            placeholder={entry.gpaType === 'CGPA' ? '8.5 / 10' : entry.gpaType === 'Percentage' ? '85.6%' : '3.8 / 4.0'}
          />
        </div>
        <Input label="Start Date" value={entry.startDate} onChange={u('startDate')} placeholder="Sep 2018" />
        <Input label="End Date" value={entry.endDate} onChange={u('endDate')} placeholder="May 2022" />
      </div>
    </div>
  )
}

export function Education() {
  const { resumeData, addEducation, updateEducation, removeEducation, reorderEducation } = useResumeStore()
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const items = resumeData.education
    reorderEducation(arrayMove(items, items.findIndex((x) => x.id === active.id), items.findIndex((x) => x.id === over.id)))
  }

  return (
    <div className="flex flex-col gap-4">
      {resumeData.education.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-6">
          No education added yet. Click below to add your first entry.
        </p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.education.map((x) => x.id)} strategy={verticalListSortingStrategy}>
          {resumeData.education.map((entry) => (
            <SortableItem key={entry.id} id={entry.id}>
              <EducationCard
                entry={entry}
                onUpdate={updateEducation}
                onRemove={() => removeEducation(entry.id)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button variant="secondary" onClick={addEducation} className="self-start">
        + Add Education
      </Button>
    </div>
  )
}
