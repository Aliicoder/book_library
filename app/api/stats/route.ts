import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schemas'
import { CatchAsyncError } from '@/utils/Errors'
import { eq, ne, sql, sum } from 'drizzle-orm'

export const GET = CatchAsyncError(async () => {
  const usersCount = await db
    .select({ count: sql`count(*)` })
    .from(users)
    .where(ne(users.status, 'PENDING'))
  const booksCopiesCount = await db.select({ copies: sql`SUM(${books.totalCopies})` }).from(books)
  const borrowedBooksCount = await db
    .select({ count: sql`count(*)` })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, 'BORROWED'))
  return Response.json({
    usersCount: usersCount[0].count,
    booksCopiesCount: booksCopiesCount[0].copies,
    borrowedBooksCount: borrowedBooksCount[0].count,
  })
})
