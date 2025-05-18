import { db } from '@/database/drizzle'
import { books } from '@/database/schemas'
import { and, eq, sql } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const bookId = searchParams.get('bookId')
  const offset = (page - 1) * limit

  const conditions = []
  if (bookId) conditions.push(eq(books.id, bookId))

  const booksList = await db
    .select()
    .from(books)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset)

  const countResult = await db
    .select({ count: sql`count(*)` })
    .from(books)
    .where(conditions.length > 0 ? and(...conditions) : undefined)

  const totalBooks = Number(countResult[0]?.count || 0)

  return Response.json({
    books: booksList,
    totalBooks,
    totalPages: Math.ceil(totalBooks / limit),
    currentPage: page,
  })
}
