import { Link } from 'react-router-dom'
import { useFlashcards } from '../hooks/useFlashcards'
import '../QuizPage.css'

interface Card {
  character: string
  romanization: string
  name: string
  type: string
}

interface FlashcardPageProps {
  cards: Card[]
  title: string
  romanizationOnFront?: boolean
}

function speak(text: string) {
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ko-KR'
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}

export default function FlashcardPage({ cards, title, romanizationOnFront = false }: FlashcardPageProps) {
  const { card, deck, index, flipped, setFlipped, goTo, randomize, reversed, toggleReversed } = useFlashcards(cards)

  const badge = (
    <span className={`card-type-badge card-type-badge--${card.type.toLowerCase()}`}>
      {card.type}
    </span>
  )

  const front = reversed ? (
    <div className="card-face card-front">
      {badge}
      <p className="card-romanization-large">{card.romanization}</p>
      <p className="card-hint-text">Click to reveal</p>
    </div>
  ) : (
    <div className="card-face card-front">
      {badge}
      <p className="card-character">{card.character}</p>
      {romanizationOnFront && <p className="card-romanization-large">{card.romanization}</p>}
      <p className="card-hint-text">Click to reveal</p>
    </div>
  )

  const back = reversed ? (
    <div className="card-face card-back">
      {badge}
      <p className="card-character card-character--back">{card.character}</p>
      {romanizationOnFront && <p className="card-romanization-large">{card.romanization}</p>}
    </div>
  ) : (
    <div className="card-face card-back">
      {badge}
      {romanizationOnFront
        ? null
        : <>
            <p className="card-character card-character--back">{card.character}</p>
            <p className="card-romanization-large">{card.romanization}</p>
          </>
      }
    </div>
  )

  return (
    <div className="flashcards-page">
      <div className="flashcards-header">
        <Link to="/" className="back-link">← Back</Link>
        <h1>{title}</h1>
        <span className="card-count">{index + 1} / {deck.length}</span>
      </div>

      <div className="card-scene" onClick={() => setFlipped(f => !f)}>
        <div className={`card ${flipped ? 'card--flipped' : ''}`}>
          {front}
          {back}
        </div>
      </div>

      <div className="card-nav">
        <button className="nav-btn" onClick={() => goTo(index - 1)} disabled={index === 0}>
          ← Previous
        </button>
        <button className="nav-btn" onClick={randomize}>
          Shuffle
        </button>
        <button className="nav-btn" onClick={() => goTo(index + 1)} disabled={index === deck.length - 1}>
          Next →
        </button>
        <button className={`nav-btn ${reversed ? 'nav-btn--active' : ''}`} onClick={toggleReversed}>
          Reverse
        </button>
        <button className="nav-btn" onClick={() => speak(card.character)} title="Play pronunciation">
          🔊
        </button>
      </div>
    </div>
  )
}
