import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    role: string
    avatar: string
  }

  interface Session {
    user: User
  }

  interface JWT {
    id: string
    name: string
    email: string
    role: string
  }
}
