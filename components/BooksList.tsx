import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import { IBook } from '@/utils/types'
import { cn } from '@/lib/utils'
interface IBooksList {
  className?: string
  title?: string
  books: IBook[]
}
const BooksList = ({ className, title, books }: IBooksList) => {
  return (
    <>
      {books && books.length > 0 && (
        <section className={cn(className)}>
          <h1 className="font-bebas-neue text-light-100 text-4xl">{title}</h1>
          <ul className="gap-4 grid grid-cols-3 md:grid-cols-6 ">
            {books.map((book) => (
              <li key={book.id}>
                <Link className="flex flex-col flex-1" href={`/book/${book.id}`}>
                  <BookCover
                    className="z-10 hover:-translate-x-4 "
                    bookCoverUrl={book.coverUrl}
                    bookColor={book.coverColor}
                  />
                  <p className="mt-2 line-clamp-1 text-light-100 tracking-wide">{book.title}</p>
                  <p className="mb-2 line-clamp-1 tracking-wide ">{book.genre}</p>
                  {book?.returnDate && (
                    <p className="text-sm line-clamp-1 ">
                      <span className="font-semibold mr-3 text-primary">return in </span>
                      <span className="">
                        {new Date(book.returnDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default BooksList
