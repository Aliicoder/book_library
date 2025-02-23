import Header from '@/components/Header'
import { auth } from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  if (!session) redirect('/login')
  return (
    <main
      className="flex min-h-screen flex-1 flex-col bg-pattern bg-cover bg-top bg-dark-100 px-10 text-white 
      md:px-16"
    >
      <div className="container mx-auto ">
        <Header className="my-10 flex justify-between items-center" />
        <div className="gap-20 flex flex-col">{children}</div>
      </div>
    </main>
  )
}

export default Layout
