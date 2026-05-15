import { useResumeStore } from '../../store/useResumeStore'
import { getATSChecks } from '../../utils/helpers'

export function ATSScorePanel() {
  const resumeData = useResumeStore((s) => s.resumeData)
  const checks = getATSChecks(resumeData)
  const passed  = checks.filter((c) => c.pass).length
  const score   = Math.round((passed / checks.length) * 100)

  const color =
    score >= 80 ? 'text-emerald-400' :
    score >= 60 ? 'text-yellow-400'  : 'text-red-400'

  const ringColor =
    score >= 80 ? 'stroke-emerald-500' :
    score >= 60 ? 'stroke-yellow-500'  : 'stroke-red-500'

  const r = 20
  const circ = 2 * Math.PI * r
  const dash = circ * (score / 100)

  return (
    <div className="px-4 py-3 border-t border-slate-700">
      {/* Score header */}
      <div className="flex items-center gap-3 mb-3">
        <svg width="52" height="52" className="-rotate-90">
          <circle cx="26" cy="26" r={r} fill="none" stroke="#334155" strokeWidth="4" />
          <circle
            cx="26" cy="26" r={r} fill="none"
            strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            className={ringColor}
          />
        </svg>
        <div>
          <p className={`text-2xl font-bold leading-none ${color}`}>{score}<span className="text-sm font-normal">%</span></p>
          <p className="text-xs text-slate-400">ATS Score</p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed ml-auto max-w-[120px] text-right">
          {score >= 80 ? 'Great! Your resume is ATS-ready.' :
           score >= 60 ? 'Getting there — address issues below.' :
           'Several gaps found — see checklist.'}
        </p>
      </div>

      {/* Checklist */}
      <div className="flex flex-col gap-1 max-h-44 overflow-y-auto">
        {checks.map((c, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`text-sm leading-none mt-0.5 ${c.pass ? 'text-emerald-400' : 'text-red-400'}`}>
              {c.pass ? '✓' : '✗'}
            </span>
            <span className={`text-xs ${c.pass ? 'text-slate-400' : 'text-slate-300'}`}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
