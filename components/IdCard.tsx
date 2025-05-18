'use client'
import { cn, getInitials } from '@/lib/utils'
import { IUser } from '@/utils/types'
import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Edit2, LogOut, Trash } from 'lucide-react'
import Image from 'next/image'
import config from '@/utils/config'
import ImageUpload from './ImageUpload'
import { signOut } from '@/lib/authjs/auth'
import { logoutAction } from '@/app/api/actions/logout'

const StatusStyles: Record<'APPROVED' | 'PENDING' | 'DETAINED', string> = {
  APPROVED: 'text-green-500',
  PENDING: 'text-red',
  DETAINED: 'text-red',
}

const IdCard = ({ user }: { user: IUser }) => {
  const [avatar, setAvatar] = useState<string | null>(user.avatar || null)
  const [universityCard, setUniversityCard] = useState<string | null>(user.universityCard || null)
  const [loading, setLoading] = useState(false)

  const uploadIdRef = useRef<HTMLImageElement>(null)

  const updateAvatar = async (newImage: string | null) => {
    try {
      setLoading(true)
      const res = await fetch('/api/users/updateAvatar', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: newImage }),
      })
      if (!res.ok) throw new Error('Failed to update avatar')
      setAvatar(newImage)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateUniversityCardImage = async (newImage: string | null) => {
    try {
      setLoading(true)
      const res = await fetch('/api/users/updateUniversityCard', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ universityCard: newImage }),
      })
      if (!res.ok) throw new Error('Failed to update university card')
      setUniversityCard(newImage)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const handleDeleteAvatar = async () => {
    await updateAvatar(null)
  }

  return (
    <div className="w-3/12">
      <div className="sticky top-28 gap-4 flex h-fit flex-col items-center rounded-lg border border-[#FFFFFF20] overflow-hidden bg-[#080a1280]">
        {/* AVATAR IMAGE */}
        <div className="relative w-full h-[200px] flex justify-center items-center bg-[#25388c50] group">
          {avatar ? (
            <>
              <Image
                src={`${config.env.imagekit.urlEndpoint}/${avatar}`}
                fill
                className="object-cover"
                alt="Avatar"
              />
              <Button
                type="button"
                size="icon"
                className="absolute top-2 right-2 z-30 bg-red-500 hover:bg-red-600"
                onClick={handleDeleteAvatar}
                disabled={loading}
              >
                <Trash size={16} />
              </Button>
            </>
          ) : (
            <h1 className="text-6xl z-10">{getInitials(user?.fullName!)}</h1>
          )}
          <div className="absolute bottom-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <ImageUpload
              className="w-full"
              variant="dark"
              type="image"
              placeholder="Upload avatar"
              folder="ids"
              accept="image/png,image/jpeg"
              onFileChange={updateAvatar}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="mt-4 font-ibm-plex-sans capitalize font-semibold">{user?.fullName}</h1>
          <h1 className="text-fs-20 font-ibm-plex-sans font-semibold">{user?.universityId}</h1>
          <h1 className="mt-8 flex flex-col items-center font-ibm-plex-sans font-semibold">
            <span>STATUS</span>
            <span className={cn(StatusStyles[user?.status as keyof typeof StatusStyles])}>
              {user?.status}
            </span>
          </h1>
        </div>

        <div className="relative w-full h-[200px]  group">
          {universityCard ? (
            <>
              <Image
                className=" object-cover"
                fill
                src={`${config.env.imagekit.urlEndpoint}/${universityCard}`}
                alt="University ID Card"
              />
              <ImageUpload
                className="absolute gap-0 border-0 top-2 right-2 z-30 bg-red-500 hover:bg-red-600"
                variant="dark"
                type="image"
                icon={<Edit2 />}
                folder="ids"
                accept="image/png,image/jpeg"
                onFileChange={updateUniversityCardImage}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-[#1e1e1e] rounded">
              <span className="text-white text-sm">No University Card Uploaded</span>
            </div>
          )}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <form action={logoutAction} className="w-full bg-red rounded-b-lg">
          <Button className="w-full gap-3 py-5 flex items-center bg-transparent">
            <LogOut className="scale-x-[-1]" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}

export default IdCard
