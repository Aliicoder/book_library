import Paginator from '@/components/admin/Paginator'
import Searchbar from '@/components/admin/Searchbar'
import RecordsTable from '@/components/tables/RecordsTable'
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
    `${config.env.apiCurEndpoint}/api/borrowRecords/paginatedBorrowRecords?${query}`
  )
  let { borrowRecords, totalPages } = await res.json()
  console.log('borrowRecords ', borrowRecords)

  return (
    <>
      <div className="flex w-full justify-between items-center mb-5">
        <h1 className="text-primary-admin font-semibold text-fs-20">All Borrow Records</h1>
        <Link className="mr-5 ml-auto" href={'/admin/records'}>
          <RefreshCcw className="ml-auto mr-5" />
        </Link>
        <Searchbar
          api={`${config.env.apiCurEndpoint}/api/users/search`}
          to="/admin/records"
          status="PENDING"
        />
      </div>
      <RecordsTable page={currentPage} limit={limit} records={borrowRecords} />
      <Paginator page={currentPage} totalPages={totalPages} />
    </>
  )
}

export default page
