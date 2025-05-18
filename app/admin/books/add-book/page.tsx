'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { bookValidation } from '@/utils/validations'
import ImageUpload from '@/components/ImageUpload'
import { createBookAction } from '@/app/api/actions/book'
import toast from 'react-hot-toast'

const page = () => {
  const form = useForm<z.infer<typeof bookValidation>>({
    resolver: zodResolver(bookValidation),
  })

  async function onSubmit(values: z.infer<typeof bookValidation>) {
    try {
      const response = await createBookAction(values)
      toast.success(response?.message ?? 'request succeeded')
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto p-10 my-10 space-y-8 max-w-3xl border border-slate-200 rounded-lg"
      >
        <div className="gap-5  flex flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>write over 10 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="totalCopies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Copies</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover color</FormLabel>
              <FormControl>
                <Input className="bg-light-600" type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  className="w-full"
                  variant="light"
                  type="video"
                  placeholder="upload book trailer"
                  folder="videos"
                  accept="video/mp4,video/avi,video/mov"
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  className=" w-full"
                  variant="light"
                  type="image"
                  placeholder="upload cover image"
                  folder="images"
                  accept="image/png,image/jpeg"
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-primary-admin text-white" type="submit">
          submit form
        </Button>
      </form>
    </Form>
  )
}

export default page
