import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { TagInput } from '../../ui/TagInput'
import { Button } from '../../ui/Button'
import { SortableItem } from '../../ui/SortableItem'

const SUGGESTED_CATEGORIES = ['Languages', 'Frameworks', 'Tools', 'Databases', 'Cloud', 'Soft Skills']

function SkillGroupCard({ group, onUpdate, onRemove }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Category (e.g. Languages)"
          value={group.category}
          onChange={(e) => onUpdate(group.id, 'category', e.target.value)}
          className="w-48"
        />
        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
      </div>
      <TagInput
        value={group.items}
        onChange={(v) => onUpdate(group.id, 'items', v)}
        placeholder="Python, React, AWS…"
      />
    </div>
  )
}

export function Skills() {
  const { resumeData, addSkillGroup, updateSkillGroup, removeSkillGroup, reorderSkills } = useResumeStore()
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  const addWithCategory = (cat) => {
    addSkillGroup()
    // The newly added group gets the category on next tick via state
    setTimeout(() => {
      const latest = useResumeStore.getState().resumeData.skills.at(-1)
      if (latest) updateSkillGroup(latest.id, 'category', cat)
    }, 0)
  }

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const items = resumeData.skills
    reorderSkills(arrayMove(items, items.findIndex((x) => x.id === active.id), items.findIndex((x) => x.id === over.id)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-blue-600/10 border border-blue-600/20 p-3 text-xs text-blue-300">
        <strong>ATS tip:</strong> Group skills by category — ATS parsers match your skills to
        job-description keywords more reliably when they are organised.
      </div>

      {resumeData.skills.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-4">
          No skill groups yet. Use the quick-add buttons or add manually.
        </p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.skills.map((x) => x.id)} strategy={verticalListSortingStrategy}>
          {resumeData.skills.map((group) => (
            <SortableItem key={group.id} id={group.id}>
              <SkillGroupCard
                group={group}
                onUpdate={updateSkillGroup}
                onRemove={() => removeSkillGroup(group.id)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex flex-wrap gap-2">
        {SUGGESTED_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => addWithCategory(cat)}
            className="rounded-full bg-slate-700 hover:bg-slate-600 border border-slate-600 px-3
              py-1 text-xs text-slate-300 cursor-pointer transition-colors"
          >
            + {cat}
          </button>
        ))}
        <Button variant="secondary" size="sm" onClick={addSkillGroup}>
          + Custom Category
        </Button>
      </div>
    </div>
  )
}
