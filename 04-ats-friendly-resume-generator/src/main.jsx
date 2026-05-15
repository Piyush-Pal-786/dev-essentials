import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply stored theme before first render to avoid flash
const stored = (() => {
  try { return JSON.parse(localStorage.getItem('resume-storage') || '{}')?.ui?.theme } catch { return null }
})()
document.documentElement.classList.toggle('dark', stored !== 'light')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
