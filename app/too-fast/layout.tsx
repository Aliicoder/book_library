import React, { ReactNode } from 'react'
const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main
      className="flex min-h-screen flex-1 flex-col justify-center bg-pattern bg-cover bg-top bg-dark-100 px-10 text-white 
      md:px-16"
    >
      <div className="container mx-auto ">
        <div className="gap-20 h-full flex flex-col items-center justify-center">{children}</div>
      </div>
    </main>
  )
}

export default Layout
