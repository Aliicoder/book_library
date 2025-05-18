'use server'

import { signOut } from '@/lib/authjs/auth'

export async function logoutAction() {
  await signOut()
}
