import Image from 'next/image'
import React from 'react'
import BookCoverSvg from './svgs/BookCoverSvg'
import { cn } from '@/lib/utils'
import config from '@/utils/config'
type BookCoverVariants = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide'
const variantStyles: Record<BookCoverVariants, string> = {
  extraSmall: 'w-[28.95px] h-10',
  small: 'w-[55px] h-[76px]',
  medium: 'w-[144px] h-[199px]',
  regular: 'xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]',
  wide: 'xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]',
}
interface IBookCover {
  variant?: BookCoverVariants
  className?: string
  bookCoverUrl: string
  bookColor: string
}
const BookCover = ({
  variant = 'regular',
  className,
  bookColor = '#012B48',
  bookCoverUrl = 'https://placehold.co/400*600.png',
}: IBookCover) => {
  return (
    <div className={cn('relative transition-all duration-300', variantStyles[variant], className)}>
      <BookCoverSvg coverColor={bookColor} />
      <div style={{ left: '12%', width: '87.5%', height: '85%' }} className="absolute z-10">
        <Image
          src={`${config.env.imagekit.urlEndpoint}/${bookCoverUrl}`}
          alt="book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  )
}

export default BookCover
