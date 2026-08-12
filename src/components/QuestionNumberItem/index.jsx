import React from 'react'
import './index.css'

const QuestionNumberItem = ({
  number,
  active,
  answered,
  onClick,
}) => (
  <button
    type="button"
    className={`question-number ${active ? 'active' : ''} ${
      answered ? 'answered' : ''
    }`}
    onClick={onClick}
  >
    {number}
  </button>
)

export default QuestionNumberItem