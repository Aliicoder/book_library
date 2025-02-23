import BookWiseSvg from '@/components/svgs/BookWiseSvg'
import { auth } from '@/lib/authjs/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  if (session) redirect('/')
  return (
    <main
      className="relative flex flex-col-reverse text-light-100 
      sm:flex-row"
    >
      <section className=" flex min-h-screen flex-1 items-center bg-pattern bg-cover bg-top bg-dark-100 px-5 py-10">
        <div className="relative z-20 p-10 gap-6 mx-auto  gradient-vertical flex  flex-col  rounded-lg ">
          <div className="gap-5 flex flex-row items-center font-semibold text-fs-20">
            <BookWiseSvg className="text-fs-13" />
            BookWise
          </div>
          {children}
        </div>
      </section>
      <section
        className="absolute z-10 h-1/2 w-full backdrop-blur top-0
        md:static md:h-screen md:flex-1"
      >
        <Image
          src={'/images/auth-illustration.png'}
          alt="auth-illustration"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  )
}

export default Layout
