'use client'

import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map as MapIcon,
  PieChart,
  Plus,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react'
import type { ComponentProps } from 'react'

import { NavProjects } from '@/components/nav-projects'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'

const data = {
  user: {
    name: '刘浪',
    email: 'langliu1216@icloud.com',
    avatar: '/favicon.jpeg',
  },
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: '模特',
      url: '/dashboard/models',
      icon: Frame,
      actions: [
        {
          name: '创建',
          url: '/dashboard/models/create',
          icon: Plus,
        },
      ],
    },
    {
      name: '写真',
      url: '/dashboard/albums',
      icon: PieChart,
      actions: [
        {
          name: '创建',
          url: '/dashboard/albums/create',
          icon: Plus,
        },
      ],
    },
    {
      name: '机构',
      url: '/dashboard/agencies',
      icon: MapIcon,
      actions: [
        {
          name: '创建',
          url: '/dashboard/agencies/create',
          icon: Plus,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/dashboard'>
                <div className='flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  {/*<Command className='size-4' />*/}
                  <Image
                    src={'/favicon.jpeg'}
                    alt={''}
                    className={'size-8'}
                    width={32}
                    height={32}
                  />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>Asian Models</span>
                  <span className='truncate text-xs'>asian model collection</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/*<NavMain items={data.navMain} />*/}
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
