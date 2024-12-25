import { getAgencyById, updateAgency } from '@/actions/agencies'
import type { Metadata } from 'next'
import { AgencyForm } from '../../agency-form'

export const metadata: Metadata = {
  title: '编辑机构',
}

export default async function EditModelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const agencyId = (await params).id
  const agency = await getAgencyById(agencyId)
  if (!agency) {
    return null
  }

  return (
    <div className={'flex justify-center'}>
      <AgencyForm initialValues={agency} editAction={updateAgency} />
    </div>
  )
}
