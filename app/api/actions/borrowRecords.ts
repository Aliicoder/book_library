'use server'
import { CatchAsyncError, ExtendedError } from '@/utils/Errors'
import { handleRateLimit } from './auth'
import { db } from '@/database/drizzle'
import { borrowRecords } from '@/database/schemas'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import dayjs from 'dayjs'

export const confirmBorrowRequestAction = CatchAsyncError(
  async ({ recordId, path }: { recordId: string; path: string }) => {
    await handleRateLimit()

    if (!recordId) {
      throw new ExtendedError('invalid request', 400)
    }
    const borrowRecord = (
      await db.select().from(borrowRecords).where(eq(borrowRecords.id, recordId)).limit(1)
    )[0]
    if (!borrowRecord) throw new ExtendedError('borrow request not found', 404)
    if (borrowRecord.status !== 'PENDING') throw new ExtendedError('request already confirmed', 404)

    const returnDate = dayjs().add(7, 'day').toISOString()

    await db
      .update(borrowRecords)
      .set({ status: 'BORROWED', returnDate })
      .where(eq(borrowRecords.id, recordId))
    revalidatePath(path)
    return {
      statusCode: 200,
      status: 'success',
      message: 'Borrow request confirmed',
    }
  }
)
export const deleteRecordAction = CatchAsyncError(
  async ({ recordId, path }: { recordId: string; path: string }) => {
    await handleRateLimit()

    if (!recordId) {
      throw new ExtendedError('invalid request', 400)
    }
    const borrowRecord = (
      await db.select().from(borrowRecords).where(eq(borrowRecords.id, recordId)).limit(1)
    )[0]
    if (!borrowRecord) throw new ExtendedError('record not found', 404)

    await db.delete(borrowRecords).where(eq(borrowRecords.id, recordId))
    revalidatePath(path)
    return {
      statusCode: 200,
      status: 'success',
      message: 'Record deleted successfully',
    }
  }
)
