import { db } from '@/database/drizzle'
import { books } from '@/database/schemas'
import { and, eq, ilike } from 'drizzle-orm'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url as string)
  const title = searchParams.get('title') || ''
  const bookId = searchParams.get('bookId') || ''

  let conditions = []
  if (title) conditions.push(ilike(books.title, `%${title}%`))
  if (bookId) conditions.push(eq(books.id, bookId))
  const filteredBooks =
    (await db
      .select()
      .from(books)
      .limit(5)
      .where(conditions.length > 0 ? and(...conditions) : undefined)) || []
  return Response.json({ books: filteredBooks })
}
