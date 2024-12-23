import { getModels } from '@/actions/models'
import type { Metadata } from 'next'
import Link from 'next/link'
import { columns } from './columns'
import { DataTable } from './data-table'

export const metadata: Metadata = {
  title: '模特列表',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const models = await getModels()
  console.log(models)
  return (
    <div>
      <Link href={'/dashboard/models/create'}>Create</Link>
      <DataTable columns={columns} data={models} />
    </div>
  )
}
