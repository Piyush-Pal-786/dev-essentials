import { useState, useEffect, useCallback } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useResumeStore } from '../../store/useResumeStore'
import { TEMPLATES } from '../templates'

export function PreviewPane() {
  const resumeData = useResumeStore((s) => s.resumeData)
  const ui         = useResumeStore((s) => s.ui)

  const [pdfUrl,      setPdfUrl]      = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  const containerClass = isFullscreen
    ? 'fixed inset-0 z-50 flex flex-col bg-slate-900'
    : 'relative w-full h-full flex flex-col bg-slate-900'

  return (
    <div className={containerClass}>
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

      {/* Toolbar row — sits directly above the PDF viewer's native toolbar */}
      <div className="flex justify-end px-2 py-1 bg-slate-800 border-b border-slate-700 shrink-0">
        <button
          onClick={() => setIsFullscreen((v) => !v)}
          title={isFullscreen ? 'Minimize preview' : 'Fullscreen preview'}
          className="flex items-center justify-center w-7 h-7 rounded hover:bg-slate-600 text-slate-300 transition-colors"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="10" y1="14" x2="3" y2="21" />
              <line x1="21" y1="3" x2="14" y2="10" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          )}
        </button>
      </div>

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
