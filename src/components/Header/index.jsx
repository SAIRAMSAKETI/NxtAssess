import React from 'react'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-assess-logo.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <button type="button" className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
