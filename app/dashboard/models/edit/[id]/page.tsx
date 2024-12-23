import { getModelById, updateModel } from '@/actions/models'
import type { Metadata } from 'next'
import { ModelForm } from '../../model-form'

export const metadata: Metadata = {
  title: '编辑模特',
}

export default async function EditModelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const modelId = (await params).id
  const model = await getModelById(modelId)
  console.log('modelId', model)
  if (!model) {
    return null
  }

  return (
    <div className={'flex justify-center'}>
      <ModelForm initialValues={model} editAction={updateModel} />
    </div>
  )
}
