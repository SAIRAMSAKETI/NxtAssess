import React from 'react'
import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import {useEvaluation} from '../../context/EvaluationContext'

import './index.css'

const formatTime = totalSeconds => {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0)

  const hours = Math.floor(safeSeconds / 3600)

  const minutes = Math.floor((safeSeconds % 3600) / 60)

  const seconds = safeSeconds % 60

  return (
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}`
  )
}

const Results = () => {
  const navigate = useNavigate()

  const {score, timeTaken, submissionType, resetAssessment} = useEvaluation()

  const handleReattempt = () => {
    resetAssessment()
    navigate('/assessment', {replace: true})
  }

  const isTimeUp = submissionType === 'timeUp'

  return (
    <div className="page results-page">
      <Header />

      <main className="results-container">
        <section className="results-card">
          {isTimeUp ? (
            <>
              <img
                src="/submit.png"
                alt="time up"
                className="submit-image"
              />

              <h1>Time is up!</h1>

              <p>You did not complete the assessment within the time</p>
            </>
          ) : (
            <>
              <img
                src="/submit.png"
                alt="submit"
                className="submit-image"
              />

              <h1>Congrats! You completed the assessment</h1>

              <p>Assessment submitted successfully</p>
            </>
          )}

          <div className="results-details">
            <div>
              <p>Your score</p>
              <p>{score}</p>
            </div>

            <div>
              <p>Time Taken</p>
              <p>{formatTime(timeTaken)}</p>
            </div>
          </div>

          <button type="button" onClick={handleReattempt}>
            Reattempt
          </button>
        </section>
      </main>
    </div>
  )
}

export default Results