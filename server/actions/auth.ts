'use server'
import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { signIn } from '@/lib/authjs/auth'
import ratelimit from '@/lib/upstash/ratelimit'
import { workflowClient } from '@/lib/upstash/workflow'
import config from '@/utils/config'
import { AuthCredentials } from '@/utils/types'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
export const signinWithCredentials = async ({
  email,
  password,
}: Pick<AuthCredentials, 'email' | 'password'>) => {
  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  if (!success) return redirect('/too-fast')
  try {
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result.error)
      return { statusCode: 400, status: 'failed', message: `signin error : ${result.error}` }
    return { statusCode: 200, status: 'success', message: ' successfully logged in' }
  } catch (error) {
    return { statusCode: 400, status: 'failed', message: 'signin error' }
  }
}
export const signup = async (reqBody: AuthCredentials) => {
  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success, remaining } = await ratelimit.limit(ip)
  if (!success) return redirect('/too-fast')
  const { fullName, email, password, universityId, universityCard } = reqBody
  if (!fullName || !email || !password || !universityId || !universityCard)
    return { statusCode: 400, status: 'failed', message: 'invalid form submission' }
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existingUser.length > 0)
    return { statusCode: 400, status: 'failed', message: 'user already exists' }
  const hashedPassword = await hash(password, 10)
  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    })
  } catch (error) {
    return { statusCode: 400, status: 'failed', message: `signup error ${error} ` }
  }
  await workflowClient.trigger({
    url: `${config.env.apiEndpoint}`,
    body: {
      email,
      fullName,
    },
  })
  await signinWithCredentials({ email, password })
}
