import { date, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
export const STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED', 'PENDING'])
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN'])
export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  universityId: text('university_id').notNull().unique(),
  universityCard: text('university_card').notNull(),
  role: ROLE_ENUM('role').default('USER'),
  status: STATUS_ENUM('status').default('PENDING'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})
