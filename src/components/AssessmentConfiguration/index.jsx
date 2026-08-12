import React from 'react'
import './index.css'

const AssessmentConfiguration = ({
  answeredCount,
  unansweredCount,
}) => (
  <section className="assessment-config">
    <div>
      <p>Answered Questions</p>
      <p className="answered-number">{answeredCount}</p>
    </div>

    <div>
      <p>Unanswered Questions</p>
      <p className="unanswered-number">{unansweredCount}</p>
    </div>

    <div>
      <p>Duration</p>
      <p>10 min</p>
    </div>
  </section>
)

export default AssessmentConfiguration