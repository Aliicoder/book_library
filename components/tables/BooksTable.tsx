'use client'
import { IBook } from '@/utils/types'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Pickaxe, Trash, Pencil } from 'lucide-react'
import config from '@/utils/config'
import BookCover from '../BookCover'
const BooksTable = ({ books, page, limit }: { limit: number; page: number; books: IBook[] }) => {
  const [selectedRowId, setSelectedRowId] = useState('')
  return (
    <table className="table">
      <thead>
        <tr className="text-primary-admin">
          <th></th>
          <th>Image </th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Description</th>
          <th>Available copies</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books &&
          books.length > 0 &&
          books.map((book: IBook, i: number) => {
            return (
              <>
                <tr key={i} className="relative">
                  <th>{(page - 1) * limit + i + 1}</th>
                  <td>
                    <BookCover
                      bookCoverUrl={book.coverUrl}
                      bookColor={book.coverColor}
                      variant="small"
                    />
                  </td>
                  <td>
                    <div className="line-clamp-2 w-[15ch]">{book.title}</div>
                  </td>
                  <td>
                    <div className="line-clamp-2 w-[15ch]">{book.author}</div>
                  </td>
                  <td>
                    <div className="line-clamp-2 w-[15ch]">{book.genre}</div>
                  </td>
                  <td>
                    <div className="line-clamp-2 w-[15ch]">{book.description}</div>
                  </td>
                  <td>{book.availableCopies}</td>
                  <td>{book.rating}</td>
                  <td>
                    <Button
                      onClick={() => setSelectedRowId((prev) => (prev == book.id ? '' : book.id))}
                      className="flex flex-row gap-3 h-9 text-fs-13 bg-primary-admin text-white tracking-wider"
                    >
                      <Pickaxe /> Actions
                    </Button>
                  </td>
                </tr>
                {selectedRowId == book.id && (
                  <tr>
                    <td colSpan={8}>
                      <div className="flex w-full justify-center gap-3">
                        <Button className="flex flex-row gap-3 h-9 text-fs-13 bg-green-500 text-white tracking-wider">
                          <Pencil /> Edit
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

export default BooksTable
