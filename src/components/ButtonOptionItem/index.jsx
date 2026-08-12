import React from 'react'
import './index.css'

const ButtonOptionItem = ({option, selected, onClick}) => (
  <button
    type="button"
    className={`option-button ${selected ? 'selected' : ''}`}
    onClick={onClick}
    aria-label={option.text}
  >
    <span className="option-letter">
      {String.fromCharCode(65 + (Number(option.index) || 0))}
    </span>

    <span>{option.text}</span>
  </button>
)

export default ButtonOptionItem
