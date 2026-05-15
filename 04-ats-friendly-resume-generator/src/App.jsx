import { useState } from 'react'
import { useResumeStore } from './store/useResumeStore'
import { FormWizard } from './components/form/FormWizard'
import { PreviewPane } from './components/preview/PreviewPane'
import { ATSScorePanel } from './components/ats/ATSScorePanel'
import { ExportModal } from './components/export/ExportModal'
import { Button } from './components/ui/Button'

function Header({ onExport }) {
  const { ui, setUI, resetResume } = useResumeStore()
  const isDark = ui.theme === 'dark'

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark'
    setUI('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const handleReset = () => {
    if (window.confirm('Clear all resume data? This cannot be undone.')) {
      resetResume()
    }
  }

  return (
    <header className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700 bg-slate-900 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <span className="text-xl">📋</span>
        <div>
          <h1 className="text-sm font-bold text-slate-100 leading-none">ATS Resume Generator</h1>
          <p className="text-[10px] text-slate-500 leading-none mt-0.5">Free · Offline · No data leaves your browser</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleReset} title="Clear all data">
          🗑 Reset
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
          {isDark ? '☀' : '🌙'}
        </Button>
        <Button variant="success" size="sm" onClick={onExport}>
          ⬇ Export
        </Button>
      </div>
    </header>
  )
}

function PreviewToggle({ show, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed bottom-4 right-4 z-30 rounded-full bg-blue-600 hover:bg-blue-500
        text-white shadow-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2"
    >
      {show ? '📝 Form' : '👁 Preview'}
    </button>
  )
}

export default function App() {
  const [exportOpen, setExportOpen]   = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Header onExport={() => setExportOpen(true)} />

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: Form Wizard ── */}
        <div
          className={`w-full lg:w-[52%] xl:w-[48%] flex flex-col border-r border-slate-700
            bg-slate-900 overflow-hidden
            ${showPreview ? 'hidden lg:flex' : 'flex'}`}
        >
          <FormWizard onOpenExport={() => setExportOpen(true)} />
        </div>

        {/* ── Right: Preview + ATS ── */}
        <div
          className={`w-full lg:w-[48%] xl:w-[52%] flex flex-col overflow-hidden bg-slate-950
            ${showPreview ? 'flex' : 'hidden lg:flex'}`}
        >
          {/* PDF Preview */}
          <div className="flex-1 overflow-hidden">
            <PreviewPane />
          </div>

          {/* ATS Score Panel */}
          <ATSScorePanel />
        </div>
      </div>

      {/* Mobile preview toggle */}
      <PreviewToggle show={showPreview} onToggle={() => setShowPreview((v) => !v)} />

      {/* Export / Import modal */}
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  )
}
