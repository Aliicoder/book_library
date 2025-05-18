import Searchbar from '@/components/admin/books/Searchbar'
import Paginator from '@/components/admin/Paginator'
import BooksTable from '@/components/tables/BooksTable'
import config from '@/utils/config'
import { RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
const limit = 5
type PageProps = {
  searchParams: {
    page: string
    bookId: string
  }
}
const page = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt(searchParams.page) || 1
  const bookId = searchParams.bookId || ''
  console.log('bookId ', bookId)
  const query = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
    bookId,
  })
  const res = await fetch(`${config.env.apiCurEndpoint}/api/books/paginatedBooks?${query}`)
  const { books, totalPages } = await res.json()
  return (
    <>
      <div className="flex w-full justify-between items-center mb-5">
        <h1 className="text-primary-admin font-semibold text-fs-20">All Books</h1>
        <Link className="mr-5 ml-auto" href={'/admin/books'}>
          <RefreshCcw className="ml-auto mr-5" />
        </Link>
        <Searchbar api={`${config.env.apiCurEndpoint}/api/books/search`} to="/admin/books" />
      </div>
      <Link
        href={'/admin/books/add-book'}
        className="w-fit px-3 py-2 ml-auto rounded-md font-semibold border border-primary-admin text-primary-admin
         hover:bg-[#25388c20] bg-white"
      >
        + Add a new book
      </Link>
      <BooksTable page={currentPage} limit={limit} books={books} />
      <Paginator page={currentPage} totalPages={totalPages} />
    </>
  )
}

export default page
