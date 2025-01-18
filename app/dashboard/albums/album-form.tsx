'use client'
import { getAgencies, getModels, getTags } from '@/actions'
import { AvatarUpload } from '@/components/avatar-upload'
import { ImageUpload } from '@/components/image-upload'
import { MultiSelect } from '@/components/multi-select'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { emptyStringToNull } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { AgeGrading, type Album, type Model } from '@prisma/client'
import { useDebounceFn, useRequest } from 'ahooks'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string({ required_error: '请输入写真名称' }),
  cover: z.string().nullable().transform(emptyStringToNull),
  ageGrading: z.nativeEnum(AgeGrading).nullable(),
  imageCount: z.coerce
    .number()
    .int()
    .transform((value) => Number(value)),
  videoCount: z.coerce
    .number()
    .int()
    .transform((value) => Number(value)),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  models: z.array(z.string()).default([]),
  agencyId: z.string().nullable().transform(emptyStringToNull),
})

export type ModelFormProps = {
  initialValues?: Model
  editAction?: (
    values: z.infer<typeof formSchema> & {
      id: string
    },
  ) => Promise<Model>
  createAction?: (values: z.infer<typeof formSchema>) => Promise<Album>
  fetchAgencies?: () => Promise<any>
}

export function AlbumForm({
  initialValues,
  createAction,
  editAction,
  fetchAgencies,
}: ModelFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
      cover: null,
      ageGrading: AgeGrading.G,
      agencyId: '',
      imageCount: 0,
      videoCount: 0,
      images: [],
      tags: [],
      models: [],
    },
  })

  const { data } = useRequest(getAgencies, {
    onSuccess: (data) => {
      console.log(data)
    },
  })
  const { data: models } = useRequest(() => getModels(1, 100), {
    onSuccess: (data) => {
      console.log('models', data)
    },
  })
  const { data: tags } = useRequest(() => getTags(1, 100), {
    onSuccess: (data) => {
      console.log('models', data)
    },
  })

  const { run: handleSubmit } = useDebounceFn(
    async (values: z.infer<typeof formSchema>) => {
      try {
        console.log('formData', values)
        if (initialValues) {
          // editAction?.({ ...values, id: initialValues.id })
        } else {
          createAction?.(values)
        }
        // router.back()
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
            name='avatar'
            render={({ field }) => (
              <FormItem>
                <FormLabel>头像</FormLabel>
                <FormControl>
                  <AvatarUpload {...field} />
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
                <FormLabel>专辑名称</FormLabel>
                <FormControl>
                  <Input placeholder='请输入专辑名称' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageCount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>图片数量</FormLabel>
                <FormControl>
                  <Input type={'number'} placeholder='请输入图片数量' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='videoCount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>视频数量</FormLabel>
                <FormControl>
                  <Input type={'number'} placeholder='请输入视频数量' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='ageGrading'
            render={({ field }) => (
              <FormItem>
                <FormLabel>分级</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || AgeGrading.G}
                    value={field.value || AgeGrading.G}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='G'>{AgeGrading.G}</SelectItem>
                      <SelectItem value='PG'>{AgeGrading.PG}</SelectItem>
                      <SelectItem value='R'>{AgeGrading.R}</SelectItem>
                      <SelectItem value='RR'>{AgeGrading.RR}</SelectItem>
                      <SelectItem value='RRR'>{AgeGrading.RRR}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  模特分级，分为5个等级，G为无限制，PG为13+，R为18+，RR为半裸，RRR为全裸
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='agencyId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>出版机构</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ''}
                    value={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='请选择出版机构' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.data?.map((agency) => (
                        <SelectItem key={agency.id} value={agency.id}>
                          {agency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>本写真的出版机构</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='models'
            render={({ field }) => (
              <FormItem>
                <FormLabel>出镜模特</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder='请输入模特个人主页'
                    {...field}
                    value={field.value || ''}
                    options={
                      models?.data.map((model) => ({
                        value: model.id,
                        label: model.name,
                      })) || []
                    }
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>模特个人主页</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>标签</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder='请选择专辑标签'
                    {...field}
                    value={field.value || ''}
                    options={
                      tags?.data.map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                      })) || []
                    }
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>专辑标签</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>专辑内容</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    value={field.value}
                    multiple
                    maxFiles={100}
                  />
                </FormControl>
                <FormDescription>专辑下包含的图片</FormDescription>
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
