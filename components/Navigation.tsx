'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Navigation() {
  const pathname = usePathname()

  return (
    <ul className="gap-8 flex flex-col items-center">
      <li>
        <Link
          href={`/library`}
          className={cn(
            'text-base capitalize cursor-pointer',
            pathname === '/library' ? 'text-light-200' : 'text-light-100'
          )}
        >
          Library
        </Link>
      </li>
    </ul>
  )
}

export default Navigation
