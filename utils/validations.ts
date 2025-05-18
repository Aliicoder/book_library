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
export const bookValidation = z.object({
  title: z.string().nonempty().max(15),
  author: z.string().nonempty().max(15),
  genre: z.string().min(5).max(20),
  description: z.string().trim().min(10),
  rating: z.coerce.number().gte(1).lte(5),
  totalCopies: z.coerce.number().gte(1).lte(1000),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  coverUrl: z.string().nonempty(),
  videoUrl: z.string().nonempty(),
})
