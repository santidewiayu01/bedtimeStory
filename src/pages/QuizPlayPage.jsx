import { Link, useParams } from 'react-router-dom'
import QuizPlayer from '../components/quiz/QuizPlayer'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { MIXED_ID, getQuizCategory } from '../data/quiz'

/** /quiz/:categoryId — validates the id, then hands off to the player. */
function QuizPlayPage() {
  const { categoryId } = useParams()
  const valid = categoryId === MIXED_ID || Boolean(getQuizCategory(categoryId))

  if (!valid) {
    return (
      <section className="fx-scope flex min-h-[60vh] items-center bg-navy-950 py-20 text-white">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl font-bold">Planet ini belum ada di peta</h1>
          <p className="max-w-sm text-white/80">Sepertinya alamat yang kamu tuju salah. Yuk kembali ke peta petualangan.</p>
          <Button to="/quiz">Kembali ke Peta</Button>
          <Link to="/" className="text-sm font-semibold text-yellow-300 underline-offset-4 hover:underline">
            Ke Beranda
          </Link>
        </Container>
      </section>
    )
  }
  // key = remount (fresh shuffle) when jumping between categories
  return <QuizPlayer key={categoryId} categoryId={categoryId} />
}

export default QuizPlayPage
