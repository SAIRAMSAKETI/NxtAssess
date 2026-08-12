import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import './index.css'

// const LOGIN_API_URL = 'https://apis.ccbp.in/login'

const LOGIN_API_URL = '/api/login'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken) {
      navigate('/', {replace: true})
    }
  }, [navigate])

  const submitLogin = async event => {
    event.preventDefault()

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
        })

        navigate('/', {replace: true})
      } else {
        setErrorMessage(data.error_msg || 'Invalid username or password')
      }
    } catch (error) {
      console.error('Login API Error:', error)

      setErrorMessage(
        'Unable to connect to the login server. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page login-page">
      <div className="login-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-login-img.png"
          alt="login website logo"
        />

        <h1>Login</h1>

        <form className="login-form" onSubmit={submitLogin}>
          <label htmlFor="username">USERNAME</label>

          <input
            id="username"
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={event => setUsername(event.target.value)}
          />

          <label htmlFor="password">PASSWORD</label>

          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Enter Password"
            onChange={event => setPassword(event.target.value)}
          />

          <label className="checkbox-label" htmlFor="showPassword">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={event => setShowPassword(event.target.checked)}
            />
            Show Password
          </label>

          {errorMessage && <p className="login-error">{errorMessage}</p>}

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
