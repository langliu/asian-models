import { getModels } from '@/actions/models'
import { columns } from './columns'
import { DataTable } from './data-table'
import Link from 'next/link'

export default async function Page () {
  const models = await getModels()
  console.log(models)
  return (
    <div>
      <Link href={'/dashboard/models/create'}>Create</Link>
      <DataTable columns={columns} data={models}/>
    </div>
  )
}
