import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { CatchAsyncError } from '@/utils/Errors'
import { eq, and, sql } from 'drizzle-orm'
import { NextRequest } from 'next/server'

const allowedStatuses = ['PENDING', 'APPROVED', 'DETAINED'] as const
type UserStatus = (typeof allowedStatuses)[number]

export const GET = CatchAsyncError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url as string)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const universityId = searchParams.get('universityId')
  const rawStatus = searchParams.get('status')
  const offset = (page - 1) * limit

  const status = allowedStatuses.includes(rawStatus as UserStatus)
    ? (rawStatus as UserStatus)
    : undefined

  const conditions = []

  if (status) {
    conditions.push(eq(users.status, status))
  }

  if (universityId) {
    conditions.push(eq(users.universityId, universityId))
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  const usersList = await db.select().from(users).where(whereClause).limit(limit).offset(offset)

  const totalUsers = await db
    .select({ count: sql`count(*)` })
    .from(users)
    .where(whereClause)

  const total = Number(totalUsers[0]?.count || 0)

  return Response.json({
    users: usersList,
    totalUsers: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  })
})
