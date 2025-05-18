'use server'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schemas'
import { IBook } from '@/utils/types'
import { and, eq } from 'drizzle-orm'
import dayjs from 'dayjs'
import { CatchAsyncError, ExtendedError } from '@/utils/Errors'
export const raiseBorrowRequest = CatchAsyncError(
  async ({ bookId, userId }: { bookId: string; userId: string }) => {
    if (!bookId || !userId) {
      throw new ExtendedError('invalid request', 403)
    }
    const user = (await db.select().from(users).where(eq(users.id, userId)).limit(1))[0]
    if (user.status != 'APPROVED') {
      throw new ExtendedError('wait for account approval', 403)
    }
    const book = (
      await db
        .select({ availableCopies: books.availableCopies })
        .from(books)
        .where(eq(books.id, bookId))
        .limit(1)
    )[0]

    if (!book || book.availableCopies <= 0) {
      throw new ExtendedError('Book not available', 404)
    }

    const isAlreadyRequested = (
      await db
        .select()
        .from(borrowRecords)
        .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId)))
        .limit(1)
    )[0]

    if (isAlreadyRequested) {
      throw new ExtendedError('Borrow request already exists', 400)
    }

    const dueDate = dayjs().add(7, 'day').toDate().toDateString()

    await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: 'PENDING',
    })

    await db
      .update(books)
      .set({ availableCopies: book.availableCopies - 1 })
      .where(eq(books.id, bookId))

    return {
      statusCode: 200,
      status: 'success',
      message: 'Borrow book request succeeded',
    }
  }
)
export const createBookAction = CatchAsyncError(
  async ({
    title,
    author,
    genre,
    description,
    totalCopies,
    rating,
    coverColor,
    coverUrl,
  }: Pick<
    IBook,
    | 'title'
    | 'author'
    | 'genre'
    | 'description'
    | 'totalCopies'
    | 'rating'
    | 'coverColor'
    | 'coverUrl'
  >) => {
    const book = await db
      .insert(books)
      .values({
        title,
        author,
        genre,
        description,
        totalCopies,
        rating,
        coverColor,
        coverUrl,
      })
      .returning()
    if (!book) {
      throw new ExtendedError('cant create a book', 400)
    }
    return { statusCode: 201, status: 'success', message: 'book created successfully' }
  }
)
