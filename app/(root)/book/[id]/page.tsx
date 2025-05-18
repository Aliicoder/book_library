import BookOverview from '@/components/BookOverview'
import BooksList from '@/components/BooksList'
import { db } from '@/database/drizzle'
import { books } from '@/database/schemas'
import { eq, ne } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const book = (await db.select().from(books).where(eq(books.id, id)))[0]
  if (!book) return redirect('/not-found')
  const booksList = await db.select().from(books).where(ne(books.id, id))
  return (
    <>
      <BookOverview className="mt-8" book={book} />
      <BooksList className="gap-8 flex flex-col" title="On Our Shelves" books={booksList} />
    </>
  )
}

export default Page
