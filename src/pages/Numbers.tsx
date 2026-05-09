import FlashcardPage from '../components/FlashcardPage'
import { sinoKoreanCards } from '../data/numbers'

export default function Numbers() {
  return <FlashcardPage cards={sinoKoreanCards} title="Numbers" romanizationOnFront />
}
