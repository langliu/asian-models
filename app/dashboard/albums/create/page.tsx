import { createAlbum, getAgencies } from '@/actions'
import { AlbumForm } from '@/app/dashboard/albums/album-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '创建专辑',
}

export default async function CreateModelPage() {
  return (
    <div className={'flex justify-center'}>
      <AlbumForm createAction={createAlbum} fetchAgencies={getAgencies} />
    </div>
  )
}
