import FlashcardPage from '../components/FlashcardPage'
import { hangulCards } from '../data/hangul'

export default function Flashcards() {
  return <FlashcardPage cards={hangulCards} title="Hangul" />
}
