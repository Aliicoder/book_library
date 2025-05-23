import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { auth } from '@/lib/authjs/auth'
import { Providers } from '@/components/providers/SessionProvider'

const ibmPlexSans = localFont({
  src: [
    { path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
})
const bebasNeue = localFont({
  src: [{ path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--bebas-neue',
})
export const metadata: Metadata = {
  title: 'Book wise',
  description: 'Book wise is a book borrowing university library management system',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  return (
    <html lang="en">
      <Providers session={session}>
        <body className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  )
}

export default RootLayout
