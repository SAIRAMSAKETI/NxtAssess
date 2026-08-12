import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {EvaluationProvider} from './context/EvaluationContext'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <EvaluationProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </EvaluationProvider>
  </BrowserRouter>
)

export default App
