import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="page home-page">
    <Header />

    <main className="home-container">
      <section className="home-hero">
        <div className="home-content">
          <p className="eyebrow">NXT ASSESS</p>

          <h1>Instructions</h1>

          <ol className="instructions-list">
            <li>Total Questions: 10</li>
            <li>Types of Questions: MCQs</li>
            <li>Duration: 10 Mins</li>
            <li>Marking Scheme: Every Correct response, get 1 mark</li>
            <li>
              All the progress will be lost, if you reload during the assessment
            </li>
          </ol>

          <p className="home-description">
            Take the assessment and find out how much you know. Answer the
            questions before the timer ends.
          </p>

          <Link to="/assessment" className="start-assessment-link">
            <button type="button" className="primary-btn start-btn">
              Start Assessment
            </button>
          </Link>
        </div>

        <img
          src="/assessment.png"
          alt="assessment"
          className="assessment-image"
        />
      </section>
    </main>
  </div>
)

export default Home
