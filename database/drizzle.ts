import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import config from '@/utils/config'

const sql = neon(config.env.dataBaseUrl)
export const db = drizzle({ client: sql })
