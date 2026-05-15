import { useState, useEffect, useCallback } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useResumeStore } from '../../store/useResumeStore'
import { TEMPLATES } from '../templates'

export function PreviewPane() {
  const resumeData = useResumeStore((s) => s.resumeData)
  const ui         = useResumeStore((s) => s.ui)

  const [pdfUrl,  setPdfUrl]  = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const generate = useCallback(async () => {
    setLoading(true)
    setError(null)
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
      const url = URL.createObjectURL(blob)
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return url
      })
    } catch (e) {
      setError('Preview failed — ' + e.message)
    } finally {
      setLoading(false)
    }
  }, [resumeData, ui.selectedTemplate, ui.accentColor, ui.font, ui.sectionOrder])

  // Debounce: regenerate 500 ms after last change
  useEffect(() => {
    const t = setTimeout(generate, 500)
    return () => clearTimeout(t)
  }, [generate])

  // Cleanup URL on unmount
  useEffect(() => () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl) }, [])

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-900">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400">Rendering preview…</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <p className="text-xs text-red-400 text-center">{error}</p>
        </div>
      )}

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="Resume Preview"
          className="w-full flex-1 border-0"
        />
      )}

      {!pdfUrl && !loading && !error && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-slate-500">Start filling in your details to see the preview.</p>
        </div>
      )}
    </div>
  )
}
