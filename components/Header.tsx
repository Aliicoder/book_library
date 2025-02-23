'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn, getInitials } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Header = ({ className }: { className: string }) => {
  const pathname = usePathname()
  const user = useSession().data?.user
  const router = useRouter()
  return (
    <header className={className}>
      <Link className="gap-3 flex flex-row items-center " href={`/`}>
        <Image src={`/icons/logo.svg`} alt={''} width={40} height={40} />
        BookWise
      </Link>
      <div className="gap-3 flex flex-row items-center">
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
        <div
          onClick={() => router.push('/profile')}
          className="w-10  aspect-square flex justify-center items-center border-light-200 rounded-full border"
        >
          <h1>{user && getInitials(user?.name!)}</h1>
        </div>
      </div>
    </header>
  )
}
export default Header
