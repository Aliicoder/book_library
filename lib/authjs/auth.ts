import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import config from '@/utils/config'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthConfig, User } from 'next-auth'
import NextAuth from 'next-auth'

export const authOptions: NextAuthConfig = {
  secret: config.env.auth_secret,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = (
          await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email.toString()))
            .limit(1)
        )[0]

        if (!user) return null
        console.log('user ', user)
        const isValidPassword = await compare(credentials.password.toString(), user.password)
        if (!isValidPassword) return null

        return {
          id: user.id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role!,
          avatar: user.avatar!,
        } satisfies User
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.role = user.role
        token.avatar = user.avatar
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.avatar = token.avatar as string
      }
      return session
    },
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
