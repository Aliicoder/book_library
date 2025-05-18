'use client'
import React from 'react'
import BookCover from '../BookCover'
import { IRecord } from '@/utils/types'
import Scrollbar from 'react-scrollbars-custom'

const BorrowRequestsList = ({ borrowRequests }: { borrowRequests: IRecord[] }) => {
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
      className="flex flex-col h-full"
    >
      {borrowRequests &&
        borrowRequests.length > 0 &&
        borrowRequests.map((borrowRequest: IRecord, i: number) => {
          return (
            <div key={i} className="gap-4 flex items-center">
              <BookCover
                bookCoverUrl={borrowRequest.books.coverUrl}
                bookColor={borrowRequest.books.coverColor}
                variant="small"
              />
              <div className="p-4 flex flex-col h-full">
                <h1 className="font-semibold">{borrowRequest.books.title}</h1>
                <div className="gap-2 flex text-xs">
                  <h1>by {borrowRequest.books.author}</h1>
                  <h1>{'.'}</h1>
                  <h1>{borrowRequest.books.genre}</h1>
                </div>
                <div className="gap-4 flex text-xs">
                  <h1 className="font-semibold">Request from :</h1>
                  <h1 className="">{borrowRequest.users.fullName}</h1>
                </div>
                <div className="gap-4 flex text-xs">
                  <h1 className="font-semibold">University ID :</h1>
                  <h1>{borrowRequest.users.universityId}</h1>
                </div>
              </div>
            </div>
          )
        })}
    </Scrollbar>
  )
}

export default BorrowRequestsList
