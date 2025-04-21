import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Interactive from './Components/Interactive'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Interactive>
      <App />
    </Interactive>
  </StrictMode>,
)
