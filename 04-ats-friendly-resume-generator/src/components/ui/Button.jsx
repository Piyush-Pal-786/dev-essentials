const variants = {
  primary:   'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 dark:bg-slate-600 dark:hover:bg-slate-500',
  danger:    'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/40',
  ghost:     'hover:bg-slate-700/50 text-slate-400 hover:text-slate-100',
  success:   'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm',
}

const sizes = {
  sm:  'px-2.5 py-1 text-xs',
  md:  'px-4 py-2 text-sm',
  lg:  'px-5 py-2.5 text-base',
  icon:'p-2',
}

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
