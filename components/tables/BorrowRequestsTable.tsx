'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Pickaxe, Trash, View, Check } from 'lucide-react'
import BookCover from '../BookCover'
import { IRecord } from '@/utils/types'
import { getInitials } from '@/lib/utils'
import ConfirmBorrowRequestModal from '../modals/ConfirmBorrowRequestModal'
import toast from 'react-hot-toast'
import { confirmBorrowRequestAction } from '@/app/api/actions/borrowRecords'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import config from '@/utils/config'
const BorrowRequestsTable = ({
  records,
  page,
  limit,
}: {
  limit: number
  page: number
  records: IRecord[]
}) => {
  const pathname = usePathname()
  const [selectedRowId, setSelectedRowId] = useState('')
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleConfirmBorrowRequestClick = async () => {
    setIsLoading(true)
    try {
      const response = await confirmBorrowRequestAction({ recordId: selectedRowId, path: pathname })
      if (response.status === 'success') {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch (error: any) {
      toast.error(error.message ?? 'Unknown error')
    } finally {
      setIsLoading(false)
      setIsShowConfirmModal(false)
    }
  }
  return (
    <>
      <ConfirmBorrowRequestModal
        handleConfirmBorrowRequestClick={handleConfirmBorrowRequestClick}
        isShowConfirmModal={isShowConfirmModal}
        setIsShowConfirmModal={setIsShowConfirmModal}
        isLoading={isLoading}
      />
      <table className="table">
        <thead>
          <tr className="text-primary-admin">
            <th></th>
            <th>Book</th>
            <th>User</th>
            <th>Status</th>
            <th>Available Copies</th>
            <th>Requested At</th>
            <th>User Records</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.length > 0 &&
            records.map((record: IRecord, i: number) => {
              return (
                <>
                  <tr key={i} className="relative">
                    <th>{(page - 1) * limit + i + 1}</th>
                    <td>
                      <div className="flex gap-3">
                        <BookCover
                          bookCoverUrl={record.books.coverUrl}
                          bookColor={record.books.coverColor}
                          variant="small"
                        />
                        <div className="gap-1 flex flex-col justify-center ">
                          <h1 className="text-start">{record.books.title} </h1>
                          <h1 className="text-fs-13">by {record.books.author} </h1>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-5">
                        <div className="relative w-10 h-10   flex justify-center items-center border-light-200 rounded-full border">
                          {record.users?.avatar ? (
                            <Image
                              src={`${config.env.imagekit.urlEndpoint}/${record.users.avatar}`}
                              fill
                              className="object-cover"
                              alt="Avatar"
                            />
                          ) : (
                            <h1>{record.users && getInitials(record.users?.fullName!)}</h1>
                          )}
                        </div>
                        <div className="gap-1 flex flex-col justify-center ">
                          <h1 className="text-start">{record.users.fullName} </h1>
                          <h1 className="text-fs-13">{record.users.universityId} </h1>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="line-clamp-2 w-[15ch]">{record.borrow_records.status}</div>
                    </td>

                    <td>{record.books.availableCopies}</td>

                    <td>
                      {' '}
                      {new Date(record.borrow_records.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>
                      <Link
                        href={`/admin/records?universityId=${record.users.universityId}`}
                        className="line-clamp-1 w-[15ch] flex gap-3 text-green-500 hover:underline cursor-pointer"
                      >
                        <View /> View
                      </Link>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          setSelectedRowId((prev) =>
                            prev == record.borrow_records.id ? '' : record.borrow_records.id
                          )
                        }
                        className="flex flex-row gap-3 h-9 text-fs-13 bg-primary-admin text-white tracking-wider"
                      >
                        <Pickaxe /> Actions
                      </Button>
                    </td>
                  </tr>
                  {selectedRowId == record.borrow_records.id && (
                    <tr>
                      <td colSpan={8}>
                        <div className="flex w-full justify-center gap-3">
                          <Button
                            onClick={() => setIsShowConfirmModal(true)}
                            className="flex flex-row gap-3 h-9 text-fs-13 bg-green-500 text-white tracking-wider"
                          >
                            <Check /> Confirm
                          </Button>
                          <Button className="flex flex-row gap-3 h-9 text-fs-13 bg-red-600 text-white tracking-wider">
                            <Trash /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default BorrowRequestsTable
