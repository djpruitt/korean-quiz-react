import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="landing-flag">🇰🇷</div>
        <h1 className="landing-title">한국어 퀴즈</h1>
        <p className="landing-subtitle">Korean Language Quiz</p>
        <p className="landing-description">
          Learn to read and write Korean with interactive flashcards and quizzes.
        </p>
      </div>

      <div className="landing-cards">
        <Link to="/flashcards" className="mode-card">
          <div className="mode-card-icon">🃏</div>
          <h2>Hangul</h2>
          <p>Learn the Hangul alphabet — consonants and vowels with romanization.</p>
          <span className="mode-card-cta">Start Practice →</span>
        </Link>
        <Link to="/numbers" className="mode-card">
          <div className="mode-card-icon">🔢</div>
          <h2>Sino-Korean Numbers</h2>
          <p>Learn Sino-Korean numbers 1 through 10 with pronunciation and romanization.</p>
          <span className="mode-card-cta">Start Practice →</span>
        </Link>
        <Link to="/native-numbers" className="mode-card">
          <div className="mode-card-icon">🌿</div>
          <h2>Native Numbers</h2>
          <p>Learn Native Korean numbers 1 through 10 with pronunciation and romanization.</p>
          <span className="mode-card-cta">Start Practice →</span>
        </Link>
        <Link to="/hangul-quiz" className="mode-card">
          <div className="mode-card-icon">🎯</div>
          <h2>Hangul Quiz</h2>
          <p>Test your knowledge — identify the romanization for each Hangul character.</p>
          <span className="mode-card-cta">Start Quiz →</span>
        </Link>
      </div>
    </div>
  )
}
