import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { sendEmail } from '@/lib/upstash/workflow'
import { serve } from '@upstash/workflow/nextjs'
import { eq } from 'drizzle-orm'
type UserState = 'non-active' | 'active'
type InitialData = {
  fullName: string
  email: string
}
const DAYS = {
  ONE_DAY_IN_MS: 1 * 24 * 60 * 60 * 1000,
  TWO_DAYS_IN_MS: 2 * 24 * 60 * 60 * 1000,
  THREE_DAYS_IN_MS: 3 * 24 * 60 * 60 * 1000,
}
const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select({ lastActivityDate: users.lastActivityDate })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  if (user.length === 0 || !user[0].lastActivityDate) return 'non-active'
  const lastActivityDate = new Date(user[0].lastActivityDate!)
  const daysInactive = (Date.now() - lastActivityDate.getTime()) / DAYS.ONE_DAY_IN_MS
  if (daysInactive > 3) return 'non-active'
  return 'active'
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  await context.run('new-signup', async () => {
    await sendEmail({
      email,
      subject: 'welcome message',
      message: `welcome to bookWise ${fullName}`,
    })
  })

  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3)

  // Stop checking after 6 months (to prevent infinite loop)
  const maxChecks = 6
  let checks = 0

  while (checks < maxChecks) {
    const state = await context.run('check-user-state', async () => getUserState(email))

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: 'New Books Available!',
          message: `Check out the latest books on BookWise, ${fullName}.`,
        })
      })
    } else {
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: 'Welcome Back!',
          message: `Glad to see you again on BookWise, ${fullName}!`,
        })
      })
    }

    checks++
    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30)
  }
})
