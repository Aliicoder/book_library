import Paginator from '@/components/admin/Paginator'
import Searchbar from '@/components/admin/Searchbar'
import BorrowRequestsTable from '@/components/tables/BorrowRequestsTable'
import config from '@/utils/config'
import { RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
const limit = 5
type PageProps = {
  searchParams: {
    page: string
    universityId: string
  }
}
const page = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt(searchParams.page) || 1
  const universityId = searchParams?.universityId || ''
  const query = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
    universityId,
  })
  const res = await fetch(
    `${config.env.apiCurEndpoint}/api/borrowRecords/paginatedBorrowRequests?${query}`
  )
  let { borrowRequests, totalPages } = await res.json()
  return (
    <>
      <div className="flex w-full justify-between items-center mb-5">
        <h1 className="text-primary-admin font-semibold text-fs-20">All Borrow Requests</h1>
        <Link className="mr-5 ml-auto" href={'/admin/borrow-requests'}>
          <RefreshCcw className="ml-auto mr-5" />
        </Link>
        <Searchbar
          api={`${config.env.apiCurEndpoint}/api/users/search`}
          to="/admin/borrow-requests"
          status="PENDING"
        />
      </div>
      <BorrowRequestsTable page={currentPage} limit={limit} records={borrowRequests} />
      <Paginator page={currentPage} totalPages={totalPages} />
    </>
  )
}

export default page
