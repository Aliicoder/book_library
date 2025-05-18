'use client'
import { redirect } from 'next/navigation'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  if (pathname === '/book') {
    redirect('/')
  }

  return <>{children}</>
}

export default Layout
