import { StrictMode } from 'react'
import { I18nProvider } from 'react-aria-components'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <I18nProvider locale="en">
          <App />
        </I18nProvider>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
