import { useState, useRef } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useResumeStore } from '../../store/useResumeStore'
import { TEMPLATES } from '../templates'
import { buildDOCX } from '../../utils/buildDOCX'
import { downloadBlob, safeFilename } from '../../utils/helpers'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

function ExportButton({ icon, label, description, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-start gap-3 w-full rounded-xl border border-slate-600 bg-slate-700/50
        hover:bg-slate-700 hover:border-slate-500 p-4 text-left transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <span className="text-2xl leading-none">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-slate-100">{loading ? 'Generating…' : label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
    </button>
  )
}

export function ExportModal({ open, onClose }) {
  const resumeData = useResumeStore((s) => s.resumeData)
  const ui         = useResumeStore((s) => s.ui)
  const loadResume = useResumeStore((s) => s.loadResume)
  const importRef  = useRef(null)

  const [loadingPDF,  setLoadingPDF]  = useState(false)
  const [loadingDOCX, setLoadingDOCX] = useState(false)
  const [importError, setImportError] = useState('')

  const filename = safeFilename(resumeData.personal.name)

  const handlePDF = async () => {
    setLoadingPDF(true)
    try {
      const Template = TEMPLATES[ui.selectedTemplate] || TEMPLATES.classic
      const blob = await pdf(
        <Template
          data={resumeData}
          accentColor={ui.accentColor}
          font={ui.font}
          sectionOrder={ui.sectionOrder}
        />
      ).toBlob()
      downloadBlob(blob, `${filename}.pdf`)
    } finally {
      setLoadingPDF(false)
    }
  }

  const handleDOCX = async () => {
    setLoadingDOCX(true)
    try {
      const blob = await buildDOCX(resumeData, ui.sectionOrder)
      downloadBlob(blob, `${filename}.docx`)
    } finally {
      setLoadingDOCX(false)
    }
  }

  const handleJSON = () => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' })
    downloadBlob(blob, `${filename}.resume.json`)
  }

  const handleImport = (e) => {
    setImportError('')
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        if (typeof data?.personal === 'object') {
          loadResume(data)
          onClose()
        } else {
          setImportError('Invalid resume JSON — missing expected fields.')
        }
      } catch {
        setImportError('Could not parse file. Make sure it is a valid .resume.json.')
      }
      // Reset so same file can be re-imported
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <Modal title="Export / Import Resume" open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="flex flex-col gap-3">
        <ExportButton
          icon="📄"
          label="Download PDF"
          description="Real-text PDF — ATS-parseable, text is selectable"
          onClick={handlePDF}
          loading={loadingPDF}
        />
        <ExportButton
          icon="📝"
          label="Download DOCX"
          description="Microsoft Word format — opens in Word & LibreOffice"
          onClick={handleDOCX}
          loading={loadingDOCX}
        />
        <ExportButton
          icon="💾"
          label="Save as JSON"
          description="Save your resume data to load and edit later"
          onClick={handleJSON}
          loading={false}
        />

        <div className="border-t border-slate-700 pt-3 mt-1">
          <p className="text-xs text-slate-400 mb-2">Import a previously saved <code>.resume.json</code> file:</p>
          <Button
            variant="secondary"
            onClick={() => importRef.current?.click()}
            className="w-full justify-center"
          >
            📂 Import JSON
          </Button>
          <input
            ref={importRef}
            type="file"
            accept=".json,.resume.json"
            onChange={handleImport}
            className="hidden"
          />
          {importError && <p className="text-xs text-red-400 mt-2">{importError}</p>}
        </div>
      </div>
    </Modal>
  )
}
