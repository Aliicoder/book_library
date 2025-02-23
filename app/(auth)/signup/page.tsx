'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import ImageUpload from '@/components/ImageUpload'
import { signupValidation } from '@/utils/validations'
import { signup } from '@/server/actions/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
  })

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    try {
      const result: any = await signup(values)
      console.log('signup ', result?.message ?? 'request succeeded')
    } catch (error: any) {
      console.log('signup ', error)
      toast.error(error?.message ?? 'request failed')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input className="bg-light-100 text-black" placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-light-100 text-black" placeholder="" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="universityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University ID number</FormLabel>
              <FormControl>
                <Input className="bg-light-100 text-black" placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="bg-light-100 text-black" placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="universityCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload University ID Card </FormLabel>
              <FormControl>
                <ImageUpload onFileChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-3">
          <Button className="w-full text-black" type="submit">
            Sign up
          </Button>
        </div>
        <p className="text-center">
          do you have an account ?{' '}
          <Link className="underline text-light-200" href={'/login'}>
            Login
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default page
