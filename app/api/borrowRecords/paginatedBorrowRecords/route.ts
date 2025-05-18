import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schemas'
import { CatchAsyncError } from '@/utils/Errors'
import { and, eq, ne, sql } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export const GET = CatchAsyncError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url as string)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const universityId = searchParams.get('universityId') || ''

  const offset = (page - 1) * limit

  const conditions = []

  if (universityId) {
    conditions.push(eq(users.universityId, universityId))
  }

  conditions.push(ne(borrowRecords.status, 'PENDING'))

  const borrowRecordsList = await db
    .select({
      borrow_records: borrowRecords,
      users: users,
      books: books,
    })
    .from(borrowRecords)
    .innerJoin(users, eq(users.id, borrowRecords.userId))
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset)

  const totalRecords = await db
    .select({ count: sql`count(*)` })
    .from(borrowRecords)
    .innerJoin(users, eq(users.id, borrowRecords.userId))
    .where(conditions.length > 0 ? and(...conditions) : undefined)

  const total = Number(totalRecords[0]?.count || 0)

  return Response.json({
    borrowRecords: borrowRecordsList,
    totalRecords: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  })
})
