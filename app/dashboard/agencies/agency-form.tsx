'use client'
import { AvatarUpload } from '@/components/avatar-upload'
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
import { useToast } from '@/hooks/use-toast'
import { emptyStringToNull } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Agency } from '@prisma/client'
import { useDebounceFn } from 'ahooks'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string({ required_error: '请输入机构名称' }).min(1, '请输入机构名称'),
  logo: z.string().nullable().transform(emptyStringToNull),
  x: z.string().nullable().transform(emptyStringToNull),
  instagram: z.string().nullable().transform(emptyStringToNull),
  homepage: z.string().nullable().transform(emptyStringToNull),
})

export type AgencyFormProps = {
  initialValues?: Agency
  editAction?: (
    values: z.infer<typeof formSchema> & {
      id: string
    },
  ) => Promise<Agency>
  createAction?: (values: z.infer<typeof formSchema>) => Promise<Agency>
}

export function AgencyForm({ initialValues, createAction, editAction }: AgencyFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
      logo: null,
      x: '',
      instagram: '',
      homepage: '',
    },
  })

  const { run: handleSubmit } = useDebounceFn(
    async (values: z.infer<typeof formSchema>) => {
      try {
        if (initialValues) {
          editAction?.({ ...values, id: initialValues.id })
        } else {
          createAction?.(values)
        }
        router.back()
      } catch (e) {
        toast({
          title: '提交失败',
          description: (e as Error).message,
        })
      }
    },
    {
      wait: 1000,
    },
  )

  return (
    <div className={clsx('flex w-[600px] flex-col sm:w-[800px] sm:max-w-full')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex flex-1 flex-col space-y-4 px-0.5'
        >
          <FormField
            control={form.control}
            name='logo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>LOGO</FormLabel>
                <FormControl>
                  <AvatarUpload {...field} dir={'agencies'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>机构名称</FormLabel>
                <FormControl>
                  <Input placeholder='请输入机构名称' {...field} />
                </FormControl>
                <FormDescription>机构名称</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='homepage'
            render={({ field }) => (
              <FormItem>
                <FormLabel>机构主页</FormLabel>
                <FormControl>
                  <Input placeholder='请输入机构主页' {...field} value={field.value || ''} />
                </FormControl>
                <FormDescription>机构主页</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='x'
            render={({ field }) => (
              <FormItem>
                <FormLabel>X</FormLabel>
                <FormControl>
                  <Input placeholder='请输入机构X连接' {...field} value={field.value || ''} />
                </FormControl>
                <FormDescription>X的链接地址，用于统计社交媒体</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='instagram'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder='请输入机构Instagram连接'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>Instagram的链接地址，用于统计社交媒体</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type='submit' className='px-8'>
              提交
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
