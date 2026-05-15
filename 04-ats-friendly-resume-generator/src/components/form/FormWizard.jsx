import { useResumeStore } from '../../store/useResumeStore'
import { StepperBar } from './StepperBar'
import { Button } from '../ui/Button'
import { PersonalInfo } from './steps/PersonalInfo'
import { Summary } from './steps/Summary'
import { WorkExperience } from './steps/WorkExperience'
import { Education } from './steps/Education'
import { Skills } from './steps/Skills'
import { Projects } from './steps/Projects'
import { Certifications } from './steps/Certifications'
import { TemplateExport } from './steps/TemplateExport'

const STEPS = [
  { title: 'Personal Information',  Component: PersonalInfo },
  { title: 'Summary / Objective',   Component: Summary },
  { title: 'Work Experience',        Component: WorkExperience },
  { title: 'Education',              Component: Education },
  { title: 'Skills',                 Component: Skills },
  { title: 'Projects',               Component: Projects },
  { title: 'Certifications',         Component: Certifications },
  { title: 'Template & Export',      Component: null }, // handled below
]

export function FormWizard({ onOpenExport }) {
  const { ui, setUI } = useResumeStore()
  const step = ui.activeStep
  const isFirst = step === 0
  const isLast  = step === STEPS.length - 1

  const go = (n) => setUI('activeStep', Math.max(0, Math.min(STEPS.length - 1, step + n)))
  const goTo = (i) => setUI('activeStep', i)

  const { title, Component } = STEPS[step]

  return (
    <div className="flex flex-col h-full">
      {/* Stepper */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-700">
        <StepperBar activeStep={step} onStepClick={goTo} />
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h2 className="text-base font-semibold text-slate-100 mb-4">{title}</h2>
        {isLast
          ? <TemplateExport onOpenExport={onOpenExport} />
          : <Component />
        }
      </div>

      {/* Navigation — always visible so user can move freely between any steps */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700">
        <Button variant="secondary" onClick={() => go(-1)} disabled={isFirst}>
          ← Previous
        </Button>
        <span className="text-xs text-slate-500">{step + 1} / {STEPS.length}</span>
        <Button onClick={() => go(1)} disabled={isLast}>
          {step === STEPS.length - 2 ? 'Finish →' : 'Next →'}
        </Button>
      </div>
    </div>
  )
}
