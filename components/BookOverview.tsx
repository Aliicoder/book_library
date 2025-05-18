import Image from 'next/image'
import React from 'react'
import BookCover from './BookCover'
import { IBook } from '@/utils/types'
import BorrowRequest from './BorrowRequest'
import { usePrivateAuth } from '@/hooks/usePrivateAuth'
import { cn } from '@/lib/utils'
interface IBookOverview {
  book: IBook
  className?: string
}
const BookOverview = async ({ book, className }: IBookOverview) => {
  const user = await usePrivateAuth()
  return (
    <section className={cn(`mt-10 flex gap-8`)}>
      <div className="gap-4 flex flex-col flex-1 text-light-100">
        <h1 className="text-6xl font-semibold leading-tight tracking-normal">{book.title}</h1>
        <div className="gap-4 flex flex-row items-center flex-1 flex-wrap  ">
          <div className="gap-x-4 gap-y-2 flex flex-wrap font-bold">
            <p className="gap-2 flex">
              By <span className={`text-light-200 font-semibold`}>{book.author}</span>
            </p>
            <p className="gap-2 flex">
              Category <span className="text-light-200">{book.genre}</span>
            </p>
            <div className="gap-1 flex flex-row items-center">
              <Image src={`/icons/star.svg`} alt="" width={20} height={20} />
              <p className="text-light-200">{book.rating}</p>
            </div>
            <p className="gap-2 flex">
              Total Books <span className="text-light-200">{book.totalCopies}</span>
            </p>
            <p className="gap-2 flex">
              Available Books <span className="text-light-200">{book.availableCopies}</span>
            </p>
          </div>
          <p className="text-justify font-normal text-light-100 leading-relaxed tracking-wide">
            {book.description}
          </p>
          <BorrowRequest bookId={book.id} userId={user?.id!} />
        </div>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            bookCoverUrl={book.coverUrl}
            bookColor={book.coverColor}
          />
          <div className="absolute left-16 top-10 rotate-12  opacity-40 ">
            <BookCover
              variant="wide"
              className="z-10"
              bookCoverUrl={book.coverUrl}
              bookColor={book.coverColor}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverview
