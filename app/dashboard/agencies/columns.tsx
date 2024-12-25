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
import { SiInstagram, SiX } from '@icons-pack/react-simple-icons'
import type { Agency } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Home, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<Agency>[] = [
  {
    accessorKey: 'logo',
    header: 'LOGO',
    cell: ({ row }) => {
      const agency = row.original
      return (
        <Avatar className={'h-20 w-20'}>
          <AvatarImage src={agency.logo || ''} />
          <AvatarFallback>LOGO</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          名称
          <ArrowUpDown className='ml-2 h-4 w-4' />
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
        <div className={'flex gap-3'}>
          {model.homepage && (
            <Link href={model.homepage} target='_blank' rel='noopener noreferrer'>
              <Home size={26} />
            </Link>
          )}
          {model.instagram && (
            <Link href={model.instagram} target='_blank' rel='noopener noreferrer'>
              <SiInstagram />
            </Link>
          )}
          {model.x && (
            <Link href={model.x} target='_blank' rel='noopener noreferrer'>
              <SiX />
            </Link>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => {
      const agency = row.original
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(agency.name)}>
              复制机构名称
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/agencies/edit/${agency.id}`}>
              <DropdownMenuItem>编辑</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>查看详情</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
