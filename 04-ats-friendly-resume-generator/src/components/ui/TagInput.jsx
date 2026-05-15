import { useState, useRef } from 'react'

/**
 * Tag / chip input. Value is string[], onChange receives the new array.
 * Press Enter or comma to add a tag; click × to remove.
 */
export function TagInput({ label, value = [], onChange, placeholder = 'Type and press Enter…' }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const addTag = (raw) => {
    const tag = raw.trim().replace(/,+$/, '').trim()
    if (tag && !value.includes(tag)) {
      onChange([...value, tag])
    }
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (idx) => onChange(value.filter((_, i) => i !== idx))

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div
        className="flex flex-wrap gap-1.5 rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-2
          focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 rounded-md bg-blue-600/20 border border-blue-500/30
              px-2 py-0.5 text-xs font-medium text-blue-300"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-blue-400 hover:text-red-400 transition-colors leading-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input.trim() && addTag(input)}
          placeholder={value.length ? '' : placeholder}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500
            outline-none"
        />
      </div>
      <p className="text-xs text-slate-500">Press Enter or comma to add</p>
    </div>
  )
}
