// import React from 'react'
// import {createRoot} from 'react-dom/client'
// import {BrowserRouter} from 'react-router'

// import App from './App'

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import {BrowserRouter} from 'react-router-dom'
// import App from './App'
// import {EvaluationProvider} from './context/EvaluationContext'
// import './App.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <EvaluationProvider>
//         <App />
//       </EvaluationProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
