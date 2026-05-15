const STEPS = [
  'Personal',
  'Summary',
  'Experience',
  'Education',
  'Skills',
  'Projects',
  'Certifications',
  'Awards',
  'Activities',
  'Export',
]

export function StepperBar({ activeStep, onStepClick }) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto pb-1">
      {STEPS.map((label, i) => {
        const done    = i < activeStep
        const current = i === activeStep

        return (
          <div key={i} className="flex items-center">
            {/* Step dot + label — entire cell is clickable */}
            <button
              type="button"
              onClick={() => onStepClick?.(i)}
              title={`Go to ${label}`}
              className="flex flex-col items-center gap-1 px-1 bg-transparent border-0
                cursor-pointer focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-500 rounded-lg group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  transition-all shrink-0
                  group-hover:scale-110
                  ${done    ? 'bg-emerald-500 text-white'  : ''}
                  ${current ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900' : ''}
                  ${!done && !current ? 'bg-slate-700 text-slate-400 group-hover:bg-slate-600' : ''}`}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                className={`text-[10px] whitespace-nowrap hidden sm:block
                  ${current ? 'text-blue-400 font-semibold' : done ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}
              >
                {label}
              </span>
            </button>

            {/* Connector line (not after last) */}
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-5 sm:w-8 shrink-0 transition-colors
                  ${i < activeStep ? 'bg-emerald-500' : 'bg-slate-700'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
