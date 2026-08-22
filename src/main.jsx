import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { installAuthInterceptor } from './api'

// Sends the user back to /login whenever the API rejects their token, from any
// page — previously only Dashboard handled that, and only by string-matching
// the error message.
installAuthInterceptor()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
