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
import { loginValidation } from '@/utils/validations'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signinWithCredentials } from '@/app/api/actions/auth'

const page = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
  })

  async function onSubmit(values: z.infer<typeof loginValidation>) {
    try {
      console.log(values)
      const result = await signinWithCredentials(values)
      console.log(result)
      if (result.status === 'success') {
        toast.success(result?.message)
        router.push('/')
      } else {
        toast.error(result?.message)
      }
    } catch (error: any) {
      console.log('login failed')
      toast.error(error?.message ?? 'unknown error')
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 py-10
      md:w-[350px]"
      >
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

        <div className="pt-6">
          <Button className="w-full text-black" type="submit">
            Login
          </Button>
        </div>
        <p className="text-center">
          don`t you have an account ?{' '}
          <Link className="underline text-light-200" href={'/signup'}>
            Signup
          </Link>
        </p>
      </form>
    </Form>
  )
}

export default page
