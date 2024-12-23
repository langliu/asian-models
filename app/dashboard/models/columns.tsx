'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Model } from '@prisma/client'
import { ArrowUpDown, MoreHorizontal, Instagram, Home, Twitter ,Link2} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import Link from 'next/link'

export const columns: ColumnDef<Model>[] = [
  {
    accessorKey: 'avatar',
    header: '头像',
    cell: ({ row }) => {
      const model = row.original
      return (
        <Avatar className={'w-20 h-20'}>
          <AvatarImage src={model.avatar || ''}/>
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      )
    }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          名称
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: 'homepage',
    header: '社交媒体',
    cell: ({ row }) => {
      const model = row.original
      return (
        <div className={'flex gap-2'}>
          {model.homepage && <Link href={model.homepage}><Home/></Link>}
          {model.instagram && <Link href={model.instagram}><Instagram/></Link>}
          {model.x && <Link href={model.x}><Twitter/></Link>}
          {model.onlyfans && <Link href={model.onlyfans}><Link2 /></Link>}
        </div>
      )
    }
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
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>查看详情</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
