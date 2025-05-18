import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
interface IPaginatorProps {
  page: number
  totalPages: number
}
const Paginator = ({ page, totalPages }: IPaginatorProps) => {
  return (
    <div className="gap-4 flex items-center leading-[1]">
      {page > 1 && (
        <Link
          className="px-3 py-2 flex gap-1.5 items-center 
        rounded-md w-full bg-primary text-dark-100 hover:bg-primary/90 md:w-fit "
          href={`?page=${page - 1}`}
        >
          <ArrowLeft className="size-4 " />

          <span className="leading-[1]">Previous</span>
        </Link>
      )}
      <span>
        {' '}
        <span className="text-light-200">{page}</span> of {totalPages}{' '}
      </span>
      {page < totalPages && (
        <Link
          className="px-3 py-2 flex gap-1.5 items-center 
        rounded-md w-full bg-primary text-dark-100 hover:bg-primary/90 md:w-fit "
          href={`?page=${page + 1}`}
        >
          <span className="leading-[1]">Next</span>
          <ArrowRight className="size-4 " />
        </Link>
      )}
    </div>
  )
}

export default Paginator
