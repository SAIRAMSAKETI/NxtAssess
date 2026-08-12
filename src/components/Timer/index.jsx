import React from 'react'
import './index.css'

const Timer = ({seconds}) => {
  const safeSeconds = Math.max(0, Number(seconds) || 0)

  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const remainingSeconds = safeSeconds % 60

  const formattedTime =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(remainingSeconds).padStart(2, '0')}`

  return (
    <p className={`timer ${safeSeconds <= 60 ? 'timer-warning' : ''}`}>
      {formattedTime}
    </p>
  )
}

export default Timer
