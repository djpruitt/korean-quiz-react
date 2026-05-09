import FlashcardPage from '../components/FlashcardPage'
import { nativeKoreanCards } from '../data/numbers'

export default function NativeNumbers() {
  return <FlashcardPage cards={nativeKoreanCards} title="Native Numbers" romanizationOnFront />
}
