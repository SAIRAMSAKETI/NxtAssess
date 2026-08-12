import React from 'react'
import './index.css'

const Select = ({options, value, onChange}) => {
  const selectedValue =
    value?.id || options?.[0]?.id || ''

  return (
    <div className="select-options">
      <label htmlFor="answer-select">
        Select an answer
      </label>

      <select
        id="answer-select"
        value={selectedValue}
        onChange={event => {
          const option = options.find(
            item =>
              item.id === event.target.value,
          )

          if (option) {
            onChange(option)
          }
        }}
      >
        {options.map(option => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.text}
          </option>
        ))}
      </select>

      <p>First option is selected by default</p>
    </div>
  )
}

export default Select