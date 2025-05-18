import { NextResponse } from 'next/server'
import { auth } from '@/lib/authjs/auth' // auth middleware/session function
import { eq } from 'drizzle-orm'
import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { CatchAsyncError } from '@/utils/Errors'

export const PATCH = CatchAsyncError(async (req: Request) => {
  const session = await auth()
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized', status: 401 })
  }
  const { universityCard } = await req.json()
  await db.update(users).set({ universityCard }).where(eq(users.id, session.user.id))

  return NextResponse.json({
    status: 'success',
    message: 'universityCard updated',
    statusCode: 200,
  })
})
