import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/context/main.tsx'

const root = document.getElementById('root')

if (!root) {
  createRoot(window.document.body).render(
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-5xl font-bold">
        <span className="text-red-600 capitalize">root</span> is not defined
      </p>
    </div>
  )
  throw new Error('root not found')
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <App />
    </ThemeProvider>
  </StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((e) => {
      console.error(e)
    })
  })
}
