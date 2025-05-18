'use client'
import { IBook, IUser } from '@/utils/types'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Pickaxe, Trash, View, Ban } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getInitials } from '@/lib/utils'
import config from '@/utils/config'
import Image from 'next/image'
const UsersTable = ({ users, page, limit }: { limit: number; page: number; users: IUser[] }) => {
  const [selectedRowId, setSelectedRowId] = useState('')
  return (
    <table className="table">
      <thead>
        <tr className="text-primary-admin">
          <th></th>
          <th>Avatar</th>
          <th>Name</th>
          <th>University Id</th>
          <th>Email</th>
          <th>University Card</th>
          <th>Latest Activity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length > 0 &&
          users.map((user: IUser, i: number) => {
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
                    {new Date(user.lastActivityDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td>
                    <Button
                      onClick={() => setSelectedRowId((prev) => (prev == user.id ? '' : user.id))}
                      className="flex flex-row gap-3 h-9  bg-primary-admin text-white tracking-wider"
                    >
                      <Pickaxe /> Actions
                    </Button>
                  </td>
                </tr>
                {selectedRowId == user.id && (
                  <tr>
                    <td colSpan={8}>
                      <div className="flex w-full justify-center gap-3">
                        <Button className="flex flex-row gap-3 h-9 text-fs-13 bg-yellow-500 text-white tracking-wider">
                          <Ban /> Detain
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
  )
}

export default UsersTable
