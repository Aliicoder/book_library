import BooksList from '@/components/BooksList'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import { signOut } from '@/lib/authjs/auth'

const page = () => {
  return (
    <>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button>logout</Button>
      </form>
      <BooksList title="Borrowed Books" books={sampleBooks} className={''} />
    </>
  )
}

export default page
