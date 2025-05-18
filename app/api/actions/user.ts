'use server'
import { CatchAsyncError, ExtendedError } from '@/utils/Errors'
import { handleRateLimit } from './auth'
import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const approveAccount = CatchAsyncError(async ({ userId }: { userId: string }) => {
  if (!userId) {
    throw new ExtendedError('invalid request', 403)
  }

  await handleRateLimit()

  const user = (await db.select().from(users).where(eq(users.id, userId)).limit(1))[0]

  if (!user) {
    throw new ExtendedError('User not found', 404)
  }

  if (user.status === 'APPROVED') {
    return {
      statusCode: 200,
      status: 'success',
      message: 'Account already approved',
    }
  }

  await db.update(users).set({ status: 'APPROVED' }).where(eq(users.id, userId))
  revalidatePath(`/admin/accounts-requests`)
  return {
    statusCode: 200,
    status: 'success',
    message: 'Account approved',
  }
})
