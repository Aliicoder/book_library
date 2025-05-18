import BooksList from '@/components/BooksList'
import Paginator from '@/components/Paginator'
import config from '@/utils/config'
import React from 'react'
const limit = 12
type PageProps = {
  searchParams: {
    page: string
  }
}
const page = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page) || 1
  const res = await fetch(
    `${config.env.apiCurEndpoint}/api/books/paginatedBooks?page=${page}&limit=${limit}`
  )
  const { books, totalPages } = await res.json()
  return (
    <div className="mt-16 gap-8 flex flex-col items-center">
      <BooksList books={books} />
      <Paginator page={page} totalPages={totalPages} />
    </div>
  )
}

export default page
