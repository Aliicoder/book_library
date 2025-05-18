import config from '@/utils/config'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import BooksList from '@/components/admin/BooksList'
import BorrowRequestsList from '@/components/admin/BorrowRequestsList'
import Stats from '@/components/admin/Stats'
import AccountRequests from '@/components/admin/AccountRequests'
const booksLimit = 10
const borrowRequestsLimit = 5
const accountRequestsLimit = 5
const page = async () => {
  const booksResponse = await fetch(
    `${config.env.apiCurEndpoint}/api/books/paginatedBooks?limit=${booksLimit}`
  )
  const { books, totalBooks: booksCount } = await booksResponse.json()
  const borrowRequestsResponse = await fetch(
    `${config.env.apiCurEndpoint}/api/borrowRecords/paginatedBorrowRequests?limit=${borrowRequestsLimit}`
  )
  let { borrowRequests } = await borrowRequestsResponse.json()
  const accountRequestsResponse = await fetch(
    `${config.env.apiCurEndpoint}/api/users/paginatedUsers?&limit=${accountRequestsLimit}&status=PENDING`
  )
  const { users, totalUsers: accountRequestsCount } = await accountRequestsResponse.json()
  const statusResponse = await fetch(`${config.env.apiCurEndpoint}/api/stats`)
  const { borrowedBooksCount, booksCopiesCount, usersCount } = await statusResponse.json()
  return (
    <div className="p-5 w-full max-h-screen gap-5 mx-auto container flex flex-col overflow-hidden">
      <h1 className="text-primary-admin font-semibold text-fs-20"> Dashboard </h1>
      <Stats
        stats={{
          borrowedBooksCount,
          booksCopiesCount,
          usersCount,
          accountRequestsCount,
          booksCount,
        }}
      />
      <div className="flex gap-5 h-full">
        <div className="w-1/2 p-5 gap-8 flex flex-col  max-h-full">
          <div className="h-1/2 gap-5 flex flex-col overflow-hidden ">
            <div className="flex justify-between ">
              <h1 className="text-gray-700 font-semibold text-fs-16">Borrow Requests</h1>
              <Link
                className="text-fs-13 font-semibold tracking-wider text-primary-admin"
                href={'/admin/account-requests'}
              >
                view all
              </Link>
            </div>
            <BorrowRequestsList borrowRequests={borrowRequests} />
          </div>
          <div className="max-h-1/2 gap-5 flex flex-col grow">
            <div className="flex justify-between">
              <h1 className="text-gray-700 font-semibold text-fs-16">Accounts Requests</h1>
              <Link
                className="text-fs-13 font-semibold tracking-wider text-primary-admin"
                href={'/admin/borrow-requests'}
              >
                view all
              </Link>
            </div>
            <AccountRequests users={users} />
          </div>
        </div>
        <div className="w-1/2 p-5 gap-3 flex flex-col h-full">
          <div className="flex justify-between">
            <h1 className="text-gray-700 font-semibold text-fs-16">Recently Added Books</h1>
            <Link
              className="text-fs-13 font-semibold tracking-wider text-primary-admin"
              href={'/admin/books'}
            >
              view all
            </Link>
          </div>
          <Link
            className="p-10 gap-3 flex items-center text-primary-admin"
            href={'/admin/books/add-book'}
          >
            <Plus />
            <h1 className="font-bold">Add New Book</h1>
          </Link>
          <BooksList books={books} />
        </div>
      </div>
    </div>
  )
}

export default page
