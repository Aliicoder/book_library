import { auth } from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import './admin.css'
import Sidebar from '@/components/admin/Sidebar'
import toast from 'react-hot-toast'
const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  if (!session || session?.user?.role != 'ADMIN') {
    toast.error('unauthorized access detected')
    return redirect('/login')
  }
  return (
    <main className="flex flex-row flex-l">
      <Sidebar />
      <div className="flex flex-grow">{children}</div>
    </main>
  )
}

export default Layout
