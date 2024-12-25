import { createAgency } from '@/actions/agencies'
import { AgencyForm } from '@/app/dashboard/agencies/agency-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '创建机构',
}

export default async function CreateModelPage() {
  return (
    <div className={'flex justify-center'}>
      <AgencyForm createAction={createAgency} />
    </div>
  )
}
