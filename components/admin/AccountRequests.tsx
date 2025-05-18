import { getInitials } from '@/lib/utils'
import config from '@/utils/config'
import { IUser } from '@/utils/types'
import Image from 'next/image'
import React from 'react'

const AccountRequests = ({ users }: { users: IUser[] }) => {
  return (
    <div className="gap-3 p-3 grid grid-cols-3">
      {users &&
        users.length > 0 &&
        users.map((user: IUser, i: number) => {
          return (
            <div key={i} className=" gap-2 p-2 flex flex-col items-center w-full">
              <div className="relative w-10 h-10 bg-primary-admin text-white flex justify-center items-center border-light-200 rounded-full border">
                {user?.avatar ? (
                  <Image
                    src={`${config.env.imagekit.urlEndpoint}/${user.avatar}`}
                    fill
                    className="object-cover"
                    alt="Avatar"
                  />
                ) : (
                  <h1>{users && getInitials(user?.fullName!)}</h1>
                )}
              </div>
              <h1 className="mt-3 font-semibold text-fs-16 text-gray-800 font-ibm-plex-sans">
                {user.fullName}
              </h1>
              <h1 className=" text-fs-13 text-gray-700">{user.universityId}</h1>
            </div>
          )
        })}
    </div>
  )
}

export default AccountRequests
