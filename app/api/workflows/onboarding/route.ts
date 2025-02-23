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
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (user.length === 0) return 'non-active'
  const lastActivityDate = new Date(user[0].lastActivityDate!)
  const timeDifference = new Date().getTime() - lastActivityDate.getTime()
  if (timeDifference > DAYS.THREE_DAYS_IN_MS) return 'non-active'
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

  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email)
    })

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: 'new books available for you',
          message: `check out bookWise new books ${fullName}`,
        })
      })
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: 'welcome back',
          message: `welcome back to bookWise ${fullName}`,
        })
      })
    }
    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30)
  }
})
