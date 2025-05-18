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
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signup } from '@/app/api/actions/auth'

const page = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
  })

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    try {
      console.log('values ', values)
      const result = await signup(values)
      if (result.status === 'success') {
        toast.success(result?.message)
        router.push('/')
      } else {
        toast.error(result?.message)
      }
    } catch (error: any) {
      toast.error(error?.message ?? 'unknown error')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 mx-auto py-10
        md:w-[350px] "
      >
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
              <FormControl>
                <ImageUpload
                  className=" w-full"
                  variant="dark"
                  type="image"
                  placeholder="upload cover image"
                  folder="ids"
                  accept="image/png,image/jpeg"
                  onFileChange={field.onChange}
                />
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
