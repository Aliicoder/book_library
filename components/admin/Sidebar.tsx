'use client'
import React from 'react'
import BookWiseSvg from '../svgs/BookWiseSvg'
import { adminSideBarLinks } from '@/constants'
import Link from 'next/link'
import { cn, getInitials } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import config from '@/utils/config'

const Sidebar = () => {
  const pathname = usePathname()
  const user = useSession().data?.user
  return (
    <div
      className={'px-4 pb-4 pt-16  left-0 top-0 h-dvh flex flex-col justify-between bg-slate-50'}
    >
      <div className="flex flex-row gap-2 items-center ">
        <div className="p-4 bg-[#25388c] rounded-full scale-75">
          <BookWiseSvg className="text-2xs" />
        </div>
        <h1 className="font-medium max-md:hidden">BookWise</h1>
      </div>
      <div className="gap-4 flex flex-col">
        {adminSideBarLinks.map((link) => {
          const selected =
            (pathname === '/admin' && pathname.startsWith(link.route)) ||
            (link.route != '/admin' && (pathname === link.route || pathname.startsWith(link.route)))
          return (
            <Link
              className={cn(
                'max-md:aspect-square max-md:justify-center',
                'p-3 gap-3 flex flex-row items-center rounded-md transition-all duration-500',
                selected && 'bg-primary-admin'
              )}
              key={link.route}
              href={link.route}
            >
              {React.cloneElement(link.icon, {
                color: selected ? '#FFFFFF' : '#4b5563',
              })}
              <h1
                className={cn(
                  'font-medium max-md:hidden',
                  selected ? 'text-white' : 'text-gray-600'
                )}
              >
                {link.text}
              </h1>
            </Link>
          )
        })}
      </div>
      <div className="p-4 gap-4 flex flex-row items-center md:border rounded-lg bg-white">
        <div className="relative w-10 h-10  flex justify-center items-center border-light-200 rounded-full border">
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
        <div className="flex flex-col font-medium max-md:hidden">
          <h1 className="w-[15ch] truncate">{user?.name}</h1>
          <h1 className="w-[15ch] truncate">{user?.email}</h1>
        </div>
        <Link className="cursor-pointer" href={'/'}>
          <LogOut className="scale-x-[-1] text-primary-admin" />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
