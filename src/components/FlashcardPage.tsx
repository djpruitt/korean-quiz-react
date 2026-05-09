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
  nameOnFront?: boolean
}

export default function FlashcardPage({ cards, title, romanizationOnFront = false, nameOnFront = false }: FlashcardPageProps) {
  const { card, deck, index, flipped, setFlipped, goTo, randomize, reversed, toggleReversed } = useFlashcards(cards)

  const badge = (
    <span className={`card-type-badge card-type-badge--${card.type.toLowerCase()}`}>
      {card.type}
    </span>
  )

  const front = reversed ? (
    <div className="card-face card-front">
      {badge}
      {romanizationOnFront
        ? <p className="card-name">{card.name}</p>
        : <p className="card-romanization-large">{card.romanization}</p>
      }
      <p className="card-hint-text">Click to reveal</p>
    </div>
  ) : (
    <div className="card-face card-front">
      {badge}
      <p className="card-character">{card.character}</p>
      {nameOnFront && <p className="card-name">{card.name}</p>}
      {romanizationOnFront && <p className="card-romanization-large">{card.romanization}</p>}
      <p className="card-hint-text">Click to reveal</p>
    </div>
  )

  const back = reversed ? (
    <div className="card-face card-back">
      {badge}
      <p className="card-character card-character--back">{card.character}</p>
      {nameOnFront && <p className="card-name">{card.name}</p>}
      {romanizationOnFront && <p className="card-romanization-large">{card.romanization}</p>}
    </div>
  ) : (
    <div className="card-face card-back">
      {badge}
      {romanizationOnFront
        ? <p className="card-name">{card.name}</p>
        : <>
            {!nameOnFront && <p className="card-character card-character--back">{card.character}</p>}
            {!nameOnFront && <p className="card-name">{card.name}</p>}
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
      </div>
    </div>
  )
}
