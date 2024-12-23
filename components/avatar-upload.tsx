'use client'

import React, { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { uploadImage } from '@/actions/file'

interface ImageUploadProps {
  onChange: (url: string) => void
  value?: string | null
}

export function AvatarUpload ({ value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return
    const { url } = await uploadImage(files[0], 'avatar')
    onChange?.(url)

  }

  return (
    <div>
      <Avatar className={'w-28 h-28 cursor-pointer'} onClick={() => fileInputRef.current?.click()}>
        <AvatarImage
          src={value || ''}
          alt="模特头像"
          width={200}
          height={200}
          className="rounded-full"/>
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={false}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

