import React from 'react'
import './index.css'

const ImageOptionItem = ({option, selected, onClick}) => (
  <button
    type="button"
    className={`image-option ${selected ? 'selected' : ''}`}
    onClick={onClick}
    aria-label={option.text}
  >
    <img
      src={option.image_url || option.imageUrl || option.text}
      alt={option.text}
    />
    <span>{option.text}</span>
  </button>
)

export default ImageOptionItem