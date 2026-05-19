import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useResumeStore } from '../../../store/useResumeStore'
import { Input } from '../../ui/Input'
import { TextArea } from '../../ui/TextArea'
import { TagInput } from '../../ui/TagInput'
import { Button } from '../../ui/Button'
import { SortableItem } from '../../ui/SortableItem'

function ProjectCard({ project, onUpdate, onRemove }) {
  const u = (field) => (e) => onUpdate(project.id, field, e.target.value)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-200">
          {project.name || 'New Project'}
        </h4>
        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Project Name *" value={project.name} onChange={u('name')} placeholder="Portfolio Website" />
        <Input label="URL (optional)" value={project.url} onChange={u('url')} placeholder="github.com/you/project" />
      </div>

      <TextArea
        label="Description"
        value={project.description}
        onChange={u('description')}
        rows={3}
        placeholder="Brief description of what the project does and your role…"
      />

      <TagInput
        label="Tech Stack"
        value={project.techStack}
        onChange={(v) => onUpdate(project.id, 'techStack', v)}
        placeholder="React, Node.js, PostgreSQL…"
      />
    </div>
  )
}

export function Projects() {
  const { resumeData, addProject, updateProject, removeProject, reorderProjects } = useResumeStore()
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const items = resumeData.projects
    reorderProjects(arrayMove(items, items.findIndex((x) => x.id === active.id), items.findIndex((x) => x.id === over.id)))
  }

  return (
    <div className="flex flex-col gap-4">
      {resumeData.projects.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-6">
          No projects added yet. Click below to add one.
        </p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.projects.map((x) => x.id)} strategy={verticalListSortingStrategy}>
          {resumeData.projects.map((p) => (
            <SortableItem key={p.id} id={p.id}>
              <ProjectCard
                project={p}
                onUpdate={updateProject}
                onRemove={() => removeProject(p.id)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button variant="secondary" onClick={addProject} className="self-start">
        + Add Project
      </Button>
    </div>
  )
}
