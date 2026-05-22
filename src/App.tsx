import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Flashcards from './pages/Flashcards'
import Numbers from './pages/Numbers'
import NativeNumbers from './pages/NativeNumbers'
import HangulQuiz from './pages/HangulQuiz'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/native-numbers" element={<NativeNumbers />} />
        <Route path="/hangul-quiz" element={<HangulQuiz />} />
      </Routes>
    </BrowserRouter>
  )
}
