import BookOverview from '@/components/BookOverview'
import BooksList from '@/components/BooksList'
import { db } from '@/database/drizzle'
import { books } from '@/database/schemas'
import { eq, ne } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: {
    id: string
  }
}
const Page = async ({ params }: PageProps) => {
  const { id } = params

  const book = (await db.select().from(books).where(eq(books.id, id)))[0]
  if (!book) return redirect('/not-found')
  const booksList = await db.select().from(books).where(ne(books.id, id)).limit(10)
  return (
    <>
      <BookOverview className="mt-8" book={book} />
      <BooksList className="gap-8 flex flex-col" title="On Our Shelves" books={booksList} />
    </>
  )
}

export default Page
