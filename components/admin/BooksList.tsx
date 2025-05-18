'use client'
import { IBook } from '@/utils/types'
import React from 'react'
import Scrollbar from 'react-scrollbars-custom'
import BookCover from '../BookCover'

const BooksList = ({ books }: { books: IBook[] }) => {
  return (
    <Scrollbar
      trackYProps={{
        style: {
          left: 'unset',
          right: 0,
          height: '200px',
          padding: '3px',
          borderRadius: '5px',
        },
      }}
      thumbYProps={{ style: { backgroundColor: '#25388c' } }}
      className=" flex flex-col h-full  pb-[200px]"
    >
      {books &&
        books.length > 0 &&
        books.map((book: IBook, i: number) => {
          return (
            <div key={i} className="gap-2 flex ml-4 ">
              <BookCover bookCoverUrl={book.coverUrl} bookColor={book.coverColor} variant="small" />
              <div className="p-4 flex flex-col h-full">
                <h1 className="text-xs font-semibold">{book.title}</h1>
                <div className="gap-4 flex text-xs">
                  <h1>by {book.author}</h1>
                  <h1>{'.'}</h1>
                  <h1>{book.genre}</h1>
                </div>
                <div className="gap-4 flex text-xs">
                  <h1 className="font-semibold">Added on :</h1>
                  <h1 className="text-xs">
                    {new Date(book?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </h1>
                </div>
              </div>
            </div>
          )
        })}
    </Scrollbar>
  )
}

export default BooksList
