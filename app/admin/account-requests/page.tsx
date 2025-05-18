import Paginator from '@/components/admin/Paginator'
import Searchbar from '@/components/admin/Searchbar'
import RequestsTable from '@/components/tables/RequestsTable'
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
    status: 'PENDING',
    universityId,
  })
  const res = await fetch(`${config.env.apiCurEndpoint}/api/users/paginatedUsers?${query}`)
  const { users, totalPages } = await res.json()
  return (
    <>
      <div className="flex w-full justify-between items-center mb-5">
        <h1 className="text-primary-admin font-semibold text-fs-20">All Registration Requests</h1>
        <Link className="mr-5 ml-auto" href={'/admin/account-requests'}>
          <RefreshCcw className="ml-auto mr-5" />
        </Link>
        <Searchbar
          api={`${config.env.apiCurEndpoint}/api/users/search`}
          to="/admin/account-requests"
          status="APPROVED" // not approved
        />
      </div>
      <RequestsTable page={currentPage} limit={limit} users={users} />
      <Paginator page={currentPage} totalPages={totalPages} />
    </>
  )
}

export default page
