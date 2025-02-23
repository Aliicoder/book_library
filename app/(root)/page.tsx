import BookOverview from '@/components/BookOverview'
import BooksList from '@/components/BooksList'
import { sampleBooks } from '@/constants'
import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
const Home = async () => {
  return (
    <>
      <BookOverview
        className={`gap-20 flex flex-col-reverse
        md:gap-5 md:flex-row`}
        book={sampleBooks[0]}
      />
      <BooksList className={`gap-5 flex flex-col `} title={'popular books'} books={sampleBooks} />
    </>
  )
}

export default Home
