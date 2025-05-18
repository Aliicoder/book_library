'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const segments = usePathname().split('/').filter(Boolean)
  const pathname = segments.slice(1).join('/')

  return (
    <div className="container mx-auto flex flex-col size-full">
      <div className="px-6 mt-6 gap-5 flex flex-col">
        <div className="text-fs-13 flex flex-row items-center gap-3">
          {pathname && <span>{pathname}</span>}
          {segments.length > 2 && (
            <button onClick={() => router.back()} className="text-blue-500 underline">
              Back
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout
