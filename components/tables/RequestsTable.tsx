'use client'
import { IUser } from '@/utils/types'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Pickaxe, Trash, View, FileCheck } from 'lucide-react'
import { getInitials } from '@/lib/utils'
import config from '@/utils/config'
import ApproveAccountModal from '../modals/ApproveAccountModal'
import toast from 'react-hot-toast'
import { approveAccount } from '@/app/api/actions/user'
import Image from 'next/image'
const RequestsTable = ({ users, page, limit }: { limit: number; page: number; users: IUser[] }) => {
  const [selectedRowId, setSelectedRowId] = useState('')
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isShowApproveModal, setIsShowApproveModal] = useState(false)
  const handleAccountApproval = (userId: string) => {
    setUserId(userId)
    setIsShowApproveModal(true)
  }
  const handleApproveAccountRequestClick = async () => {
    setIsLoading(true)
    try {
      const response = await approveAccount({ userId })
      if (response.status === 'success') {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch (error: any) {
      toast.error(error.message ?? 'Unknown error')
    } finally {
      setIsLoading(false)
      setIsShowApproveModal(false)
    }
  }
  return (
    <>
      <ApproveAccountModal
        isShowApproveModal={isShowApproveModal}
        setIsShowApproveModal={setIsShowApproveModal}
        isLoading={isLoading}
        handleApproveAccountRequestClick={handleApproveAccountRequestClick}
      />
      <table className="table">
        <thead>
          <tr className="text-primary-admin">
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>University Id</th>
            <th>Email</th>
            <th>University Card</th>
            <th>Requested At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user: IUser, i: number) => {
              console.log('id ', user.universityCard)
              return (
                <>
                  <tr key={i} className="relative">
                    <th>{(page - 1) * limit + i + 1}</th>
                    <td>
                      <div className="relative w-10 h-10  flex justify-center items-center border-light-200 rounded-full border">
                        {user?.avatar ? (
                          <Image
                            src={`${config.env.imagekit.urlEndpoint}/${user.avatar}`}
                            fill
                            className="object-cover"
                            alt="Avatar"
                          />
                        ) : (
                          <h1>{user && getInitials(user?.fullName!)}</h1>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="line-clamp-1 w-[15ch]">{user.fullName}</div>
                    </td>
                    <td>
                      <div className="line-clamp-1 w-[15ch]">{user.universityId}</div>
                    </td>
                    <td>
                      <div className="line-clamp-1 w-[15ch]">{user.email}</div>
                    </td>
                    <td>
                      <div
                        onClick={() =>
                          window.open(
                            `${config.env.imagekit.urlEndpoint}/${user.universityCard}`,
                            '_blank'
                          )
                        }
                        className="line-clamp-1 w-[15ch] flex gap-3 text-green-500 hover:underline cursor-pointer"
                      >
                        <View /> View ID Card
                      </div>
                    </td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>
                      <Button
                        onClick={() => setSelectedRowId((prev) => (prev == user.id ? '' : user.id))}
                        className="flex flex-row gap-3 h-9 text-fs-13 bg-primary-admin text-white tracking-wider"
                      >
                        <Pickaxe /> Actions
                      </Button>
                    </td>
                  </tr>
                  {selectedRowId == user.id && (
                    <tr>
                      <td colSpan={8}>
                        <div className="flex w-full justify-center gap-3">
                          <Button
                            onClick={() => handleAccountApproval(user.id)}
                            className="flex flex-row gap-3 h-9 text-fs-13 bg-green-500 text-white tracking-wider"
                          >
                            <FileCheck /> Approve
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

export default RequestsTable
