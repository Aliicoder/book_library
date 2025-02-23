import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'
import { IBook } from '@/utils/types'
interface IBookOverview {
  className: string
  book: IBook
}
const BookOverview = ({ className, book }: IBookOverview) => {
  return (
    <section className={className}>
      <div className={`gap-3 flex flex-col flex-1 text-light-100`}>
        <h1 className="text-fs-39 font-semibold md:text-fs-61">{book.title}</h1>
        <div className="gap-5 flex flex-row items-center flex-1 flex-wrap ">
          <p className="text-fs-20">
            By <span className={`text-light-200 font-semibold`}>{book.author}</span>
          </p>
          <p className="text-fs-20">
            Category <span className="font-bold">{book.genre}</span>
          </p>
          <div className="gap-1 flex flex-row items-center">
            <Image src={`/icons/star.svg`} alt="" width={20} height={20} />
            <p>{book.rating}</p>
          </div>
          <div className="text-fs-16 gap-4 mt-1 flex flex-row flex-wrap">
            <p>
              Total Books <span className="text-light-200">{book.total_copies}</span>
            </p>
            <p>
              Available Books <span className="text-light-200">{book.available_copies}</span>
            </p>
          </div>
          <p className="text-fs-20 mt-2 text-justify text-light-100">{book.description}</p>
          <Button className="my-4 w-full bg-primary text-dark-100 hover:bg-primary/90 md:w-fit !important">
            Borrow
          </Button>
        </div>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            bookCoverUrl={book.cover}
            bookColor={book.color}
          />
          <div className="absolute left-16 top-10 rotate-12  opacity-40 ">
            <BookCover
              variant="wide"
              className="z-10"
              bookCoverUrl={book.cover}
              bookColor={book.color}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverview
