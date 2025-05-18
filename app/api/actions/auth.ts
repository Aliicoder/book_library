'use server'
import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { signIn } from '@/lib/authjs/auth'
import { workflowClient } from '@/lib/upstash/workflow'
import config from '@/utils/config'
import { CatchAsyncError, ExtendedError } from '@/utils/Errors'
import { AuthCredentials } from '@/utils/types'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'

export const signinWithCredentials = CatchAsyncError(
  async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
    const { email, password } = params
    try {
      await signIn('credentials', { email, password, redirect: false })
    } catch (error) {
      throw new ExtendedError('Signin error - Invalid email or password', 401)
    }
    return { statusCode: 200, status: 'success', message: 'Login succeeded' }
  }
)

export const signup = CatchAsyncError(async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params
  if (!fullName || !email || !password || !universityId || !universityCard) {
    throw new ExtendedError('Signup error - Invalid form submission', 400)
  }

  const existingUser = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0]
  if (existingUser) {
    throw new ExtendedError('Signup error - User already exists', 400)
  }

  const hashedPassword = await hash(password, 10)
  await db
    .insert(users)
    .values({ fullName, email, password: hashedPassword, universityId, universityCard })
  await workflowClient.trigger({
    url: `${config.env.apiPubEndpoint}/workflows/onboarding`,
    body: { email, fullName },
  })
  return signinWithCredentials({ email, password })
})
