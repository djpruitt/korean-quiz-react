import { useState } from 'react'

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function useFlashcards<T>(initialCards: T[]) {
  const [deck, setDeck] = useState(initialCards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reversed, setReversed] = useState(false)

  function goTo(next: number) {
    setFlipped(false)
    setTimeout(() => setIndex(next), 150)
  }

  function randomize() {
    setFlipped(false)
    setDeck(shuffle(deck))
    setIndex(0)
  }

  function toggleReversed() {
    setFlipped(false)
    setReversed(r => !r)
  }

  return { card: deck[index], deck, index, flipped, setFlipped, goTo, randomize, reversed, toggleReversed }
}
