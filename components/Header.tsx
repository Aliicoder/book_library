'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { cn, getInitials } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Searchbar from './Searchbar'
import { LayoutDashboard } from 'lucide-react'
import config from '@/utils/config'
const rolesMap: Record<'ADMIN' | 'CLERK' | 'USER', string> = {
  ADMIN: 'admin',
  CLERK: 'clerk',
  USER: 'student',
}
const Header = () => {
  const user = useSession().data?.user
  console.log('user ', user)
  const router = useRouter()
  return (
    <header className="my-8 flex justify-between items-center">
      <Link className="gap-3  flex items-center " href={`/`}>
        <Image src={`/icons/logo.svg`} alt={''} width={40} height={40} />
        BookWise
      </Link>
      <Searchbar />
      <div className="gap-4 flex flex-row items-center">
        <div className="gap-4 p-3 px-5 flex items-center rounded-xl bg-[#080a1250] cursor-pointer">
          <div className="flex flex-col">
            <h1 className="tracking-wide capitalize">{user?.name}</h1>
            <h1 className="tracking-wide text-end text-light-200">
              {rolesMap[user?.role as keyof typeof rolesMap]}
            </h1>
          </div>
          <div
            onClick={() => router.push('/profile')}
            className="relative w-10 h-10  flex justify-center items-center border-light-200 rounded-full border"
          >
            {user?.avatar ? (
              <Image
                src={`${config.env.imagekit.urlEndpoint}/${user.avatar}`}
                fill
                className="object-cover"
                alt="Avatar"
              />
            ) : (
              <h1>{user && getInitials(user?.name!)}</h1>
            )}
          </div>
        </div>
        {user?.role == 'ADMIN' && (
          <Link
            className="px-3 py-2 flex gap-2 items-center 
        rounded-md w-full bg-primary text-dark-100 hover:bg-primary/90 md:w-fit !important"
            href={'/admin'}
          >
            Dashboard
            <LayoutDashboard className="size-5 scale-90" />
          </Link>
        )}
      </div>
    </header>
  )
}
export default Header
