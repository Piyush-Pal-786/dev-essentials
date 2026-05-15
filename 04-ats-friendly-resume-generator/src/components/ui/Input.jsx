export function Input({ label, hint, error, className = '', wrapperClass = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${wrapperClass}`}>
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100
          placeholder-slate-500 outline-none transition-colors
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          dark:border-slate-600 dark:bg-slate-800
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
