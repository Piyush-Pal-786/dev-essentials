import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useResumeStore } from '../../../store/useResumeStore'
import { TEMPLATE_REGISTRY } from '../../../data/templates'
import { SECTION_LABELS, FONT_OPTIONS } from '../../../data/schema'

function SortableSection({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5
        cursor-grab active:cursor-grabbing select-none"
    >
      <span className="text-slate-500 text-sm">⠿</span>
      <span className="text-sm text-slate-200">{SECTION_LABELS[id]}</span>
    </div>
  )
}

export function TemplateExport({ onOpenExport }) {
  const { ui, setUI, setSectionOrder } = useResumeStore()
  const sensors = useSensors(useSensor(PointerSensor))

  // Ensure any newly-added section keys are present in the stored order
  const ALL_SECTIONS = Object.keys(SECTION_LABELS)
  const effectiveOrder = [
    ...ui.sectionOrder,
    ...ALL_SECTIONS.filter((k) => !ui.sectionOrder.includes(k)),
  ]

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIdx = effectiveOrder.indexOf(active.id)
      const newIdx = effectiveOrder.indexOf(over.id)
      setSectionOrder(arrayMove(effectiveOrder, oldIdx, newIdx))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Template selector */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
          Choose Template
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEMPLATE_REGISTRY.map((t) => (
            <button
              key={t.id}
              onClick={() => setUI('selectedTemplate', t.id)}
              className={`rounded-xl border-2 p-4 text-left cursor-pointer transition-all
                ${ui.selectedTemplate === t.id
                  ? 'border-blue-500 bg-blue-600/10'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-100">{t.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium
                  ${t.id === 'classic' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400">{t.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent colour */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Accent Colour</p>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={ui.accentColor}
            onChange={(e) => setUI('accentColor', e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border border-slate-600 bg-slate-800 p-0.5"
          />
          <span className="text-sm text-slate-300 font-mono">{ui.accentColor}</span>
          {['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#0f172a'].map((c) => (
            <button
              key={c}
              onClick={() => setUI('accentColor', c)}
              style={{ background: c }}
              className="w-6 h-6 rounded-full border-2 border-slate-600 hover:border-white transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Font</p>
        <div className="flex flex-col gap-2">
          {FONT_OPTIONS.map((f) => (
            <label key={f.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="font"
                value={f.value}
                checked={ui.font === f.value}
                onChange={() => setUI('font', f.value)}
                className="accent-blue-500"
              />
              <span className="text-sm text-slate-300">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section order */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
          Section Order (drag to reorder)
        </p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={effectiveOrder} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {effectiveOrder.map((id) => (
                <SortableSection key={id} id={id} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Export button */}
      <button
        onClick={onOpenExport}
        className="mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold
          py-3 px-6 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        ⬇ Export Resume
      </button>
    </div>
  )
}
