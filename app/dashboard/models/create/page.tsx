'use client'
import { createModel } from '@/actions/models'
import { AvatarUpload } from '@/components/avatar-upload'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { AgeGrading } from '@prisma/client'
import { useDebounceFn } from 'ahooks'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string({ required_error: '请输入模特名称' }),
  introduction: z.string({ required_error: '请输入书籍简介' }).nullable(),
  avatar: z.string().nullable(),
  ageGrading: z.nativeEnum(AgeGrading).nullable(),
  x: z.string().nullable(),
  instagram: z.string().nullable(),
  weibo: z.string().nullable(),
  homepage: z.string().nullable(),
  onlyfans: z.string().nullable(),
})

export default function CreateModelPage () {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      introduction: '',
      avatar: null,
      ageGrading: AgeGrading.G,
      x: '',
      instagram: '',
      weibo: '',
      homepage: '',
      onlyfans: '',
    },
  })

  const { run: handleSubmit } = useDebounceFn(
    async (values: z.infer<typeof formSchema>) => {
      console.log(values)
      try {
        await createModel({
          ...values,
        })
        router.back()
      } catch (error) {
        console.error(error)
        toast({
          title: '编辑失败',
          description: (error as Error)?.message ?? '',
          variant: 'destructive',
        })
      }
    },
    {
      wait: 1000,
    },
  )

  return (
    <div
      className={clsx('flex w-[600px] flex-col sm:w-[800px] sm:max-w-full')}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col space-y-4 px-0.5"
        >
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>头像</FormLabel>
                <FormControl>
                  <AvatarUpload {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>模特名称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入模特名称" {...field} />
                </FormControl>
                <FormDescription>
                  模特名称将用于在网站上显示，模特可能有多个名称，用传播度最广的那个
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>模特简介</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="请输入模特简介"
                    className={clsx('h-32 leading-6 md:leading-6')}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ageGrading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分级</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="G">{AgeGrading.G}</SelectItem>
                      <SelectItem value="PG">{AgeGrading.PG}</SelectItem>
                      <SelectItem value="R">{AgeGrading.R}</SelectItem>
                      <SelectItem value="RR">{AgeGrading.RR}</SelectItem>
                      <SelectItem value="RRR">{AgeGrading.RRR}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  模特分级，分为5个等级，G为无限制，PG为13+，R为18+，RR为半裸，RRR为全裸
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homepage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>个人主页</FormLabel>
                <FormControl>
                  <Input placeholder="请输入模特个人主页" {...field} value={field.value || ''}/>
                </FormControl>
                <FormDescription>
                  模特个人主页
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="x"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X</FormLabel>
                <FormControl>
                  <Input placeholder="请输入模特X连接" {...field} value={field.value || ''}/>
                </FormControl>
                <FormDescription>
                  X的链接地址，用于统计社交媒体
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="请输入模特Instagram连接" {...field} value={field.value || ''} />
                </FormControl>
                <FormDescription>
                  Instagram的链接地址，用于统计社交媒体
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weibo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>微博</FormLabel>
                <FormControl>
                  <Input placeholder="请输入模特微博连接" {...field} value={field.value || ''}/>
                </FormControl>
                <FormDescription>
                  微博的链接地址，用于统计社交媒体
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="onlyfans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OnlyFans</FormLabel>
                <FormControl>
                  <Input placeholder="请输入模特OnlyFans连接" {...field} value={field.value || ''}/>
                </FormControl>
                <FormDescription>
                  OnlyFans的链接地址，用于统计社交媒体
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className="px-8">
              提交
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
