import React from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
        alt="not found"
      />

      <h1>Page Not Found</h1>

      <p>
        We are sorry, the page you requested could not be found
      </p>

      <button
        type="button"
        className="primary-btn"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound