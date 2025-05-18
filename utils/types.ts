export interface IBook {
  id: string
  title: string
  author: string
  genre: string
  description: string
  rating: number
  totalCopies: number
  availableCopies: number
  coverColor: string
  coverUrl: string
  createdAt: Date | null
}
export interface IBorrowRecord {
  id: string
  status: 'PENDING' | 'BORROWED' | 'RETURNED'
  createdAt: Date
  returnDate: Date
}
export interface IRecord {
  users: IUser
  borrow_records: IBorrowRecord
  books: IBook
}
export interface IUser {
  id: string
  avatar: string
  fullName: string
  email: string
  universityId: string
  universityCard: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  role: 'USER' | 'ADMIN' | 'CLERK'
  lastActivityDate: Date
  createdAt: Date
}

export interface AuthCredentials {
  fullName: string
  email: string
  password: string
  universityId: string
  universityCard: string
}
