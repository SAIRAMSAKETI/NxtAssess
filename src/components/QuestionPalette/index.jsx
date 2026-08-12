import React from 'react'
import QuestionNumberItem from '../QuestionNumberItem'
import './index.css'

const QuestionPalette = ({
  questions,
  answers,
  activeIndex,
  onSelect,
}) => (
  <div>
    <p className="palette-title">Questions</p>

    <ul className="palette-grid">
      {questions.map((question, index) => (
        <li key={question.id}>
          <QuestionNumberItem
            number={index + 1}
            active={activeIndex === index}
            answered={Boolean(
              answers[question.id],
            )}
            onClick={() => onSelect(index)}
          />
        </li>
      ))}
    </ul>

    <div className="palette-legend">
      <span>
        <i className="legend active" />
        Current
      </span>

      <span>
        <i className="legend answered" />
        Answered
      </span>

      <span>
        <i className="legend unanswered" />
        Unanswered
      </span>
    </div>
  </div>
)

export default QuestionPalette