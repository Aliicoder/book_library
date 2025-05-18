import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
interface IPaginatorProps {
  page: number
  totalPages: number
}
const Paginator = ({ page, totalPages }: IPaginatorProps) => {
  return (
    <div className="flex gap-4 ">
      {page > 1 && (
        <Link
          className="flex gap-1 items-center text-primary-admin font-semibold"
          href={`?page=${page - 1}`}
        >
          <ChevronRight className="size-5 mt-1 scale-x-[-1]" />
          Previous
        </Link>
      )}
      <span className="font-ibm-plex-sans">
        {' '}
        <span className="font-bold ">{page}</span> of {totalPages}{' '}
      </span>
      {page < totalPages && (
        <Link
          className="flex gap-1 items-center text-primary-admin font-semibold"
          href={`?page=${page + 1}`}
        >
          Next
          <ChevronRight className="size-5 mt-1" />
        </Link>
      )}
    </div>
  )
}

export default Paginator
