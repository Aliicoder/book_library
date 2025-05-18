import { auth } from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'

export const usePrivateAuth = async () => {
  const user = (await auth())?.user
  if (!user) redirect('/unauthorized')
  return user
}
