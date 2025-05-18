'use client'
import React, { useEffect, useState } from 'react'
import { Search, LibraryBig } from 'lucide-react' // or any icon library
import config from '@/utils/config'
import { IUser } from '@/utils/types'
import Link from 'next/link'

const Searchbar = ({ api, to, status }: { api: string; to: string; status: string }) => {
  const [value, setValue] = useState('')
  const [result, setResult] = useState([])
  const handleSearchbarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || event.target.value) {
      const { value } = event.target
      setValue(value)
    }
  }
  const search = async (value: string) => {
    const response = await fetch(`${api}?universityId=${value}&&status=${status}`)
    const result = await response.json()
    setResult(result?.users ?? [])
  }
  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (value.trim() !== '') {
        search(value)
      } else {
        setResult([])
      }
    }, 500)
    return () => clearTimeout(delayBounce)
  }, [value])
  return (
    <div className="relative z-40 w-[400px] ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        onChange={handleSearchbarChange}
        className="bg-[#FFFFFF20] outline  rounded-md w-full p-2 pl-10"
        value={value}
        type="text"
        placeholder="University ID "
      />
      {result.length > 0 && (
        <div className="absolute top-full w-full left-0 mt-4 bg-white border border-gray-400 rounded-md bg-top ">
          {result.map((user: IUser, i) => {
            return (
              <Link
                onClick={() => {
                  setValue('')
                  setResult([])
                }}
                href={`${to}?universityId=${user.universityId}`}
                className="p-4 border-t border-gray-400 flex items-center gap-4 
                first-of-type:border-t-0 "
              >
                <div>
                  <Search className=" text-gray-400" size={20} />
                </div>
                <div>
                  <h1>{user.fullName}</h1>
                  <p className="line-clamp-1">
                    <span>{user.universityId}</span>
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Searchbar
