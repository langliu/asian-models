'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SiInstagram, SiOnlyfans, SiSinaweibo, SiX } from '@icons-pack/react-simple-icons'
import type { Album } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Home, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<Album>[] = [
  {
    accessorKey: 'name',
    header: '专辑名称',
  },
  {
    accessorKey: 'models',
    header: '模特',
    cell: ({ row }) => {
      const album = row.original
      return (
        <div>
          {album.models?.map((model) => (
            <Avatar className={'h-10 w-10'} key={model.model.id}>
              <AvatarImage src={model.model.avatar || ''} />
              <AvatarFallback>{model.model.name}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'imageCount',
    header: '图片数量',
  },
  {
    accessorKey: 'videoCount',
    header: '视频数量',
  },
  {
    accessorKey: 'ageGrading',
    header: '年龄分级',
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.name)}>
              复制专辑名称
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/albums/edit/${payment.id}`}>
              <DropdownMenuItem>编辑</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>查看详情</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
