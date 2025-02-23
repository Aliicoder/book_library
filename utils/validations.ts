import { z } from 'zod'

export const loginValidation = z.object({
  email: z.string(),
  password: z.string().min(1).min(3).max(15),
})

export const signupValidation = z.object({
  fullName: z.string().min(1).min(3).max(20),
  email: z.string().email(),
  universityId: z.string().nonempty(),
  password: z.string().min(1).min(8).max(12),
  universityCard: z.string().nonempty(),
})
