import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import AssessmentConfiguration from '../AssessmentConfiguration'
import Timer from '../Timer'
import QuestionPalette from '../QuestionPalette'
import Question from '../Question'

import {useEvaluation} from '../../context/EvaluationContext'

import './index.css'

const QUESTIONS_API_URL = 'https://apis.ccbp.in/assess/questions'
const DURATION_SECONDS = 10 * 60

const Assessment = () => {
  const navigate = useNavigate()

  const {
    questions,
    answers,
    startAssessment,
    selectAnswer,
    setScore,
    setTimeTaken,
    setSubmissionType,
    calculateScore,
  } = useEvaluation()

  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [failure, setFailure] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(DURATION_SECONDS)

  const [displaySeconds, setDisplaySeconds] = useState(DURATION_SECONDS)

  const hasFinishedRef = useRef(false)

  const fetchQuestions = useCallback(async () => {
    setLoading(true)
    setFailure(false)
    hasFinishedRef.current = false
    setRemainingSeconds(DURATION_SECONDS)
    setDisplaySeconds(DURATION_SECONDS)

    try {
      const response = await fetch(QUESTIONS_API_URL)

      if (!response.ok) {
        throw new Error('Unable to fetch questions')
      }

      const data = await response.json()

      const list = Array.isArray(data.questions) ? data.questions : []

      startAssessment(list)
      setActiveIndex(0)
    } catch (error) {
      setFailure(true)
    } finally {
      setLoading(false)
    }
  }, [startAssessment])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const finishAssessment = useCallback(
    timeUsed => {
      if (hasFinishedRef.current) {
        return
      }

      hasFinishedRef.current = true

      const finalScore = calculateScore()

      setScore(finalScore)
      setTimeTaken(Math.max(0, Math.floor(timeUsed)))

      if (timeUsed >= DURATION_SECONDS) {
        setSubmissionType('timeUp')
      } else {
        setSubmissionType('submitted')
      }

      navigate('/results', {replace: true})
    },
    [calculateScore, navigate, setScore, setTimeTaken, setSubmissionType],
  )

  /*
   * Countdown timer.
   *
   * After one second:
   * 10:00 -> 09:59
   */
  useEffect(() => {
    if (loading || failure || questions.length === 0) {
      return undefined
    }

    const timerId = setInterval(() => {
      setRemainingSeconds(previousSeconds => {
        if (previousSeconds <= 1) {
          clearInterval(timerId)
          setDisplaySeconds(0)
          return 0
        }

        const nextSeconds = previousSeconds - 1

        setDisplaySeconds(nextSeconds)

        return nextSeconds
      })
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [loading, failure, questions.length])

  /*
   * When timer reaches zero, submit as time-up.
   */
  useEffect(() => {
    if (
      loading ||
      failure ||
      questions.length === 0 ||
      remainingSeconds !== 0
    ) {
      return
    }

    finishAssessment(DURATION_SECONDS)
  }, [remainingSeconds, loading, failure, questions.length, finishAssessment])

  const answeredCount = useMemo(
    () => questions.filter(question => Boolean(answers[question.id])).length,
    [questions, answers],
  )

  const unansweredCount = questions.length - answeredCount

  const activeQuestion = questions[activeIndex]

  const handleNext = () => {
    if (activeIndex < questions.length - 1) {
      setActiveIndex(previousIndex => previousIndex + 1)
    }
  }

  const handleSubmit = () => {
    const timeUsed = DURATION_SECONDS - remainingSeconds

    finishAssessment(timeUsed)
  }

  const handleQuestionSelect = index => {
    const selectedQuestion = questions[index]

    if (
      selectedQuestion &&
      String(selectedQuestion.options_type || '').toUpperCase() ===
        'SINGLE_SELECT' &&
      !answers[selectedQuestion.id] &&
      selectedQuestion.options?.length > 0
    ) {
      selectAnswer(selectedQuestion.id, selectedQuestion.options[0])
    }

    setActiveIndex(index)
  }

  if (loading) {
    return (
      <div className="page assessment-page">
        <Header />

        <div data-testid="loader" className="loader-container">
          <p>Loading Questions...</p>
        </div>
      </div>
    )
  }

  if (failure) {
    return (
      <div className="page assessment-page">
        <Header />

        <main className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-view.png"
            alt="failure view"
          />

          <h1>Oops! Something Went Wrong</h1>

          <p>We are having some trouble while fetching the questions.</p>

          <button type="button" onClick={fetchQuestions}>
            Retry
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="page assessment-page">
      <Header />

      <main className="assessment-container">
        <AssessmentConfiguration
          answeredCount={answeredCount}
          unansweredCount={unansweredCount}
          total={questions.length}
        />

        <div className="assessment-layout">
          <section className="question-section">
            <div className="timer-row">
              <div>
                <h1>Questions ({questions.length})</h1>
              </div>

              <div className="timer-container">
                <p>Time Left</p>
                <Timer seconds={displaySeconds} />
              </div>
            </div>

            {activeQuestion && (
              <Question
                question={activeQuestion}
                selectedOption={answers[activeQuestion.id]}
                onSelect={option => selectAnswer(activeQuestion.id, option)}
              />
            )}

            <div className="question-actions">
              {activeIndex < questions.length - 1 && (
                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleNext}
                >
                  Next Question
                </button>
              )}

              <button
                type="button"
                className="submit-assessment-btn"
                onClick={handleSubmit}
              >
                Submit Assessment
              </button>
            </div>
          </section>

          <aside className="palette-card">
            <QuestionPalette
              questions={questions}
              answers={answers}
              activeIndex={activeIndex}
              onSelect={handleQuestionSelect}
            />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Assessment
