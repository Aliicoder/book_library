import { books } from '@/database/schemas'
import dummyBooks from '@/dummybooks.json'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import ImageKit from 'imagekit'

config({ path: '.env.local' })

const imageKit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
})

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
  try {
    const response = await imageKit.upload({
      file: url,
      fileName,
      folder,
    })
    return response.filePath
  } catch (error) {
    console.error(`error uploading to imageKit  :`, error)
  }
}

const sql = neon(process.env.DATA_BASE_URL!)
const db = drizzle({ client: sql })
const seed = async () => {
  console.log('seeding books ...')
  try {
    for (let book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        '/book/covers'
      )) as string
      await db.insert(books).values({
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
        totalCopies: book.totalCopies,
        rating: book.rating,
        coverColor: book.coverColor,
        coverUrl,
        availableCopies: book.availableCopies,
      })
    }
    console.log('... books seeded successfully')
  } catch (error) {
    console.error(`error occurred: `, error)
  }
}
seed()
