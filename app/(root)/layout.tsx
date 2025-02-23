import Header from '@/components/Header'
import { db } from '@/database/drizzle'
import { users } from '@/database/schemas'
import { auth } from '@/lib/authjs/auth'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import React, { ReactNode } from 'react'
const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  if (!session) return redirect('/login')
  after(async () => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user?.id as string))
      .limit(1)
    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return
    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id as string))
  })
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
