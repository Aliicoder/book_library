'use client'
import React, { useEffect, useState } from 'react'
import { Search, LibraryBig } from 'lucide-react' // or any icon library
import config from '@/utils/config'
import { IBook } from '@/utils/types'
import Link from 'next/link'

const Searchbar = () => {
  const [value, setValue] = useState('')
  const [books, setBooks] = useState([])
  const handleSearchbarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || event.target.value) {
      const { value } = event.target
      setValue(value)
    }
  }
  const searchBooks = async (value: string) => {
    const response = await fetch(`${config.env.apiCurEndpoint}/api/books/search?title=${value}`)
    const result = await response.json()
    setBooks(result?.books ?? [])
  }
  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (value.trim() !== '') {
        searchBooks(value)
      } else {
        setBooks([])
      }
    }, 500)
    return () => clearTimeout(delayBounce)
  }, [value])
  return (
    <div className="flex items-center gap-8">
      <div className="relative z-40 w-[400px] ">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          onChange={handleSearchbarChange}
          className="bg-[#FFFFFF20] outline outline-primary rounded-md w-full p-1.5 pl-10 "
          value={value}
          type="text"
          placeholder="Search books"
        />
        {books.length > 0 && (
          <div className="absolute top-full w-full left-0 mt-4 bg-gray-900 rounded-md bg-top border ">
            {books.map((book: IBook, i) => {
              return (
                <Link
                  onClick={() => {
                    setValue('')
                    setBooks([])
                  }}
                  href={`/book/${book.id}`}
                  className="p-4 border-t border-gray-400 flex items-center gap-4 
                  first-of-type:border-t-0 "
                >
                  <div>
                    <Search className=" text-gray-400" size={20} />
                  </div>
                  <div>
                    <h1>{book.title}</h1>
                    <p className="line-clamp-1">
                      by <span>{book.author}</span>
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <Link
        className="px-3 py-2 flex gap-2 items-center 
        rounded-md w-full bg-primary text-dark-100 hover:bg-primary/90 md:w-fit "
        href={'/library'}
      >
        Library
        <LibraryBig className="size-5" />
      </Link>
    </div>
  )
}

export default Searchbar
