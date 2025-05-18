import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { and, eq, ilike, ne } from 'drizzle-orm'
import { NextApiRequest } from 'next'

const allowedStatuses = ['PENDING', 'APPROVED', 'DETAINED'] as const
type UserStatus = (typeof allowedStatuses)[number]

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url as string)
  const universityId = searchParams.get('universityId') || ''
  const rawStatus = searchParams.get('status')

  const status = allowedStatuses.includes(rawStatus as UserStatus)
    ? (rawStatus as UserStatus)
    : undefined

  const conditions = []

  if (universityId) {
    conditions.push(ilike(users.universityId, `%${universityId}%`))
  }

  if (status) {
    conditions.push(ne(users.status, status))
  }

  const filteredUsers = await db
    .select()
    .from(users)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(5)

  return Response.json({ users: filteredUsers })
}
