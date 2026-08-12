import React from 'react'
import ButtonOptionItem from '../ButtonOptionItem'
import ImageOptionItem from '../ImageOptionItem'
import Select from '../Select'
import './index.css'

const normalizeType = value =>
  String(value || 'DEFAULT').toUpperCase()

const Question = ({
  question,
  selectedOption,
  onSelect,
}) => {
  const type = normalizeType(
    question.options_type,
  )

  return (
    <div className="question-container">
      <p className="question-text">
        {question.question_text}
      </p>

      {type === 'IMAGE' && (
        <ul className="image-options">
          {question.options?.map(option => (
            <li key={option.id}>
              <ImageOptionItem
                option={option}
                selected={
                  selectedOption?.id ===
                  option.id
                }
                onClick={() =>
                  onSelect(option)
                }
              />
            </li>
          ))}
        </ul>
      )}

      {type === 'SINGLE_SELECT' && (
        <Select
          options={question.options || []}
          value={selectedOption}
          onChange={onSelect}
        />
      )}

      {type === 'DEFAULT' && (
        <ul className="default-options">
          {question.options?.map(option => (
            <li key={option.id}>
              <ButtonOptionItem
                option={option}
                selected={
                  selectedOption?.id ===
                  option.id
                }
                onClick={() =>
                  onSelect(option)
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Question