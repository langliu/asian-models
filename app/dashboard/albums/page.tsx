import { getAlbums } from '@/actions'
import { DataTable } from '@/components/data-table'
import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'
import { columns } from './columns'
import { searchParamsCache } from './search-params'

export const metadata: Metadata = {
  title: '专辑列表',
}

export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const { pageIndex, pageSize } = await searchParamsCache.parse(searchParams)
  const { data = [], totalCount } = await getAlbums(pageIndex, pageSize)
  return (
    <div>
      <DataTable columns={columns} data={data} rowCount={totalCount} />
    </div>
  )
}
