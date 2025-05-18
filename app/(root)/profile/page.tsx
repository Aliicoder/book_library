import BookCover from '@/components/BookCover'
import BooksList from '@/components/BooksList'
import IdCard from '@/components/IdCard'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schemas'
import { auth } from '@/lib/authjs/auth'
import { and, eq } from 'drizzle-orm'
import Image from 'next/image'

const page = async () => {
  const user = await auth().then((data) => data?.user)
  const userDetails = (await db.select().from(users).where(eq(users.id, user?.id!)).limit(1))[0]
  const recordsList = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .where(and(eq(users.id, user?.id!)))
  const booksList = recordsList
    .filter((record) => record.borrow_records.status === 'BORROWED')
    .map((record) => {
      record.books.returnDate = record.borrow_records.returnDate
      return record.books
    })
  const borrowRequests = recordsList.filter((record) => {
    if (record.borrow_records.status === 'PENDING') return record
  })
  return (
    <>
      <div className="gap-8 flex">
        <div className="gap-8 w-9/12 flex flex-col">
          {borrowRequests && borrowRequests.length > 0 && (
            <div className="gap-4 flex flex-col">
              <h1 className="font-bebas-neue text-light-100 text-4xl">Borrow Requests</h1>
              {borrowRequests.map((record) => {
                return (
                  <div className="gap-3 p-5 mr-36 border-light-100/25 flex items-center border rounded">
                    <BookCover
                      className="z-10 hover:-translate-x-10 "
                      bookCoverUrl={record.books.coverUrl}
                      bookColor={record.books.coverColor}
                      variant="small"
                    />
                    <div className="flex flex-col">
                      <h1 className="mb-2 font-bold ">{record.books.title}</h1>
                      <h1 className="flex gap-2 text-sm">
                        by <span className="font-bold">{record.books.author}</span>
                      </h1>
                      <h1 className="flex gap-2  text-sm">
                        genre <span className="font-semibold">{record.books.genre}</span>
                      </h1>
                    </div>
                    <div
                      className="ml-auto leading-[1]  rounded flex items-center justify-center text-sm
                   text-light-200 px-3 py-2 "
                    >
                      {record.borrow_records.status}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <BooksList title="Borrowed Books" books={booksList} className={'gap-5 flex flex-col'} />
        </div>
        <IdCard user={userDetails} />
      </div>
    </>
  )
}

export default page
