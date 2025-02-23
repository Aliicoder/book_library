'use client' // ✅ Ensure it's a client component

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
