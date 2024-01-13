import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './demos/ipc'
import Homepage from './components/homepage/Homepage'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
