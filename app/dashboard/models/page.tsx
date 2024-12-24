import { getModels } from '@/actions/models'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { SearchParams } from 'nuqs/server'
import { columns } from './columns'
import { DataTable } from './data-table'
import { searchParamsCache } from './search-params'

export const metadata: Metadata = {
  title: '模特列表',
}

export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const { pageIndex, pageSize } = await searchParamsCache.parse(searchParams)
  const { data: models = [], totalCount } = await getModels(pageIndex, pageSize)

  return (
    <div>
      <Link href={'/dashboard/models/create'}>Create</Link>
      <DataTable columns={columns} data={models} rowCount={totalCount} />
    </div>
  )
}
