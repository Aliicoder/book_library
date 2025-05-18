import BookOverview from '@/components/BookOverview'
import BooksList from '@/components/BooksList'
import { db } from '@/database/drizzle'
import { books } from '@/database/schemas'
const Home = async () => {
  const booksList = await db.select().from(books).limit(10)
  return (
    <>
      <BookOverview book={booksList[0]} />
      <BooksList className={`gap-8 flex flex-col `} title={'On Our Shelves'} books={booksList} />
    </>
  )
}

export default Home
