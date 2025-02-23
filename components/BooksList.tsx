import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import { IBook } from '@/utils/types'
interface IBooksList {
  className: string
  title: string
  books: IBook[]
}
const BooksList = ({ className, title, books }: IBooksList) => {
  return (
    <section className={className}>
      <h1 className="font-bebas-neue text-light-100 text-4xl">{title}</h1>
      <ul
        className="gap-5 grid grid-cols-3 
        max-xs:gap-1 max-xs  md:grid-cols-6 "
      >
        {books.map((book) => (
          <li key={book.id}>
            <Link className="flex flex-col flex-1" href={`/book/${book.id}`}>
              <BookCover
                className="z-10 hover:-translate-x-10 "
                bookCoverUrl={book.cover}
                bookColor={book.color}
              />
              <p className="mt-3 text-fs-16 line-clamp-1 text-light-100 font-semibold">
                {book.title}
              </p>
              <p className="text-fs-13 my-3 line-clamp-1 italic">{book.genre}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BooksList
