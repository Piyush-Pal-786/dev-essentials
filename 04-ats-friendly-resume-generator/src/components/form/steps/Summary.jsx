import { useResumeStore } from '../../../store/useResumeStore'
import { TextArea } from '../../ui/TextArea'

const EXAMPLES = [
  'Results-driven software engineer with 5+ years of experience building scalable web applications.',
  'Detail-oriented data analyst skilled in Python, SQL, and Tableau with a proven track record of driving insights.',
]

export function Summary() {
  const { resumeData, setSummary } = useResumeStore()

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg bg-blue-600/10 border border-blue-600/20 p-3 text-xs text-blue-300">
        <strong>ATS tip:</strong> Write 2–4 sentences. Include your job title, years of experience,
        key skills, and what you bring to the role. Aim for 50–200 characters.
      </div>

      <TextArea
        label="Professional Summary / Objective"
        value={resumeData.summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={5}
        placeholder="Experienced software engineer with…"
        hint={`${resumeData.summary.length} characters`}
      />

      <div className="flex flex-col gap-2">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Examples to inspire:</p>
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => setSummary(ex)}
            className="text-left text-xs text-slate-400 hover:text-slate-200 p-2.5 rounded-lg
              border border-slate-700 hover:border-slate-500 transition-colors bg-slate-800/50"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
