import { createModel } from '@/actions/models'
import { ModelForm } from '@/app/dashboard/models/model-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '创建模特',
}

export default async function CreateModelPage() {
  return (
    <div className={'flex justify-center'}>
      <ModelForm createAction={createModel} />
    </div>
  )
}
