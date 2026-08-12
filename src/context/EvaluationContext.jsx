import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const EvaluationContext = createContext(null)

export const EvaluationProvider = ({children}) => {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const [submissionType, setSubmissionType] = useState('submitted')
  const [startedAt, setStartedAt] = useState(null)

  const startAssessment = useCallback(questionList => {
    const list = Array.isArray(questionList) ? questionList : []

    setQuestions(list)
    setAnswers({})
    setScore(0)
    setTimeTaken(0)
    setSubmissionType('submitted')
    setStartedAt(Date.now())
  }, [])

  const selectAnswer = useCallback((questionId, option) => {
    setAnswers(previous => ({
      ...previous,
      [questionId]: option,
    }))
  }, [])

  const resetAssessment = useCallback(() => {
    setQuestions([])
    setAnswers({})
    setScore(0)
    setTimeTaken(0)
    setSubmissionType('submitted')
    setStartedAt(null)
  }, [])

  const calculateScore = useCallback(() => {
    let total = 0

    questions.forEach(question => {
      const answer = answers[question.id]

      if (!answer) {
        return
      }

      if (
        answer.is_correct === true ||
        answer.isCorrect === true ||
        answer.correct === true ||
        answer.is_correct === 'true'
      ) {
        total += 1
      }
    })

    return total
  }, [questions, answers])

  const value = useMemo(
    () => ({
      questions,
      answers,
      score,
      timeTaken,
      submissionType,
      startedAt,
      startAssessment,
      selectAnswer,
      setScore,
      setTimeTaken,
      setSubmissionType,
      calculateScore,
      resetAssessment,
    }),
    [
      questions,
      answers,
      score,
      timeTaken,
      submissionType,
      startedAt,
      startAssessment,
      selectAnswer,
      calculateScore,
      resetAssessment,
    ],
  )

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  )
}

export const useEvaluation = () => useContext(EvaluationContext)

export default EvaluationContext
