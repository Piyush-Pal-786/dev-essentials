import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-start">
      <button
        {...listeners}
        {...attributes}
        className="mt-3 cursor-grab active:cursor-grabbing p-1 text-slate-500 hover:text-slate-300 shrink-0 touch-none"
        title="Drag to reorder"
        tabIndex={-1}
      >
        {/* Grip dots icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9"  cy="5"  r="1.5" />
          <circle cx="15" cy="5"  r="1.5" />
          <circle cx="9"  cy="12" r="1.5" />
          <circle cx="15" cy="12" r="1.5" />
          <circle cx="9"  cy="19" r="1.5" />
          <circle cx="15" cy="19" r="1.5" />
        </svg>
      </button>
      <div className="flex-1">{children}</div>
    </div>
  )
}
