import { useState } from 'react'
import { Link } from 'react-router-dom'
import { hangulCards } from '../data/hangul'
import '../QuizPage.css'
import '../HangulQuiz.css'

interface Question {
  character: string
  type: string
  correct: string
  options: string[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(): Question[] {
  return shuffle(hangulCards).map(card => {
    const wrongPool = hangulCards.filter(c => c.romanization !== card.romanization)
    const wrong = shuffle(wrongPool).slice(0, 3).map(c => c.romanization)
    return {
      character: card.character,
      type: card.type,
      correct: card.romanization,
      options: shuffle([card.romanization, ...wrong]),
    }
  })
}

export default function HangulQuiz() {
  const [questions, setQuestions] = useState<Question[]>(buildQuestions)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[index]

  function handleSelect(option: string) {
    if (selected !== null) return
    setSelected(option)
    if (option === q.correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      setFinished(true)
    } else {
      setIndex(i => i + 1)
      setSelected(null)
    }
  }

  function restart() {
    setQuestions(buildQuestions())
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    const message =
      pct === 100 ? 'Perfect score!' :
      pct >= 80 ? 'Great job!' :
      pct >= 50 ? 'Keep practicing!' :
      "Don't give up!"

    return (
      <div className="hq-page">
        <div className="hq-result">
          <div className="hq-result-score">
            {score}<span className="hq-result-total">/{questions.length}</span>
          </div>
          <p className="hq-result-pct">{pct}%</p>
          <p className="hq-result-msg">{message}</p>
          <div className="hq-result-actions">
            <Link to="/" className="hq-btn hq-btn--outline">← Home</Link>
            <button className="hq-btn hq-btn--primary" onClick={restart}>Try Again</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hq-page">
      <div className="hq-header">
        <Link to="/" className="hq-back">← Back</Link>
        <div className="hq-progress-bar">
          <div
            className="hq-progress-fill"
            style={{ width: `${(index / questions.length) * 100}%` }}
          />
        </div>
        <span className="hq-score-chip">{score} ✓</span>
      </div>

      <p className="hq-counter">{index + 1} / {questions.length}</p>

      <div className="hq-question">
        <span className={`card-type-badge card-type-badge--${q.type.toLowerCase()}`}>
          {q.type}
        </span>
        <p className="hq-character">{q.character}</p>
        <p className="hq-prompt">What is the romanization?</p>
      </div>

      <div className="hq-options">
        {q.options.map(option => {
          let cls = 'hq-option'
          if (selected !== null) {
            if (option === q.correct) cls += ' hq-option--correct'
            else if (option === selected) cls += ' hq-option--wrong'
            else cls += ' hq-option--dim'
          }
          return (
            <button key={option} className={cls} onClick={() => handleSelect(option)}>
              {option}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <button className="hq-btn hq-btn--primary hq-next-btn" onClick={handleNext}>
          {index + 1 >= questions.length ? 'See Results' : 'Next →'}
        </button>
      )}
    </div>
  )
}
