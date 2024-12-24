'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CheckCircle, ChevronLeft, ChevronRight, Upload, X, XCircle } from 'lucide-react'
import Image from 'next/image'
import { type ChangeEvent, type DragEvent, useCallback, useEffect, useRef, useState } from 'react'

interface ImageUploadProps {
  multiple?: boolean
  maxFiles?: number
  onChange: (files: File[]) => void
}

interface ImageStatus {
  url: string
  status: 'idle' | 'uploading' | 'success' | 'error'
}

// 模拟上传API
const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        // 70% 成功率
        resolve(`https://api.example.com/images/${file.name}`)
      } else {
        reject(new Error('Upload failed'))
      }
    }, 2000)
  })
}

export function ImageUpload({ multiple = false, maxFiles = 5, onChange }: ImageUploadProps) {
  const [imageStatuses, setImageStatuses] = useState<ImageStatus[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (multiple && files.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`)
      return
    }

    const newFiles = multiple ? files : [files[0]]
    onChange(newFiles)

    const newStatuses = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      status: 'idle' as const,
    }))

    setImageStatuses((prevStatuses) => [...prevStatuses, ...newStatuses])

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      const index = imageStatuses.length + i
      setImageStatuses((prevStatuses) =>
        prevStatuses.map((status, idx) =>
          idx === index ? { ...status, status: 'uploading' } : status,
        ),
      )

      try {
        await uploadImage(file)
        setImageStatuses((prevStatuses) =>
          prevStatuses.map((status, idx) =>
            idx === index ? { ...status, status: 'success' } : status,
          ),
        )
      } catch (error) {
        setImageStatuses((prevStatuses) =>
          prevStatuses.map((status, idx) =>
            idx === index ? { ...status, status: 'error' } : status,
          ),
        )
      }
    }
  }

  const removeImage = (index: number) => {
    setImageStatuses((prevStatuses) => prevStatuses.filter((_, i) => i !== index))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    // onChange(
    //   imageStatuses
    //     .filter((_, i) => i !== index)
    //     .map((status) => {
    //       const response = fetch(status.url)
    //       return new File([response], 'image.jpg', { type: 'image/jpeg' })
    //     }),
    // )
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    if (multiple && files.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`)
      return
    }

    // handleFileChange({ target: { files } } as ChangeEvent<HTMLInputElement>)
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isDialogOpen || selectedImageIndex === null) return

      if (event.key === 'ArrowLeft') {
        setSelectedImageIndex((prevIndex) =>
          !!prevIndex && prevIndex > 0 ? prevIndex - 1 : imageStatuses.length - 1,
        )
      } else if (event.key === 'ArrowRight') {
        setSelectedImageIndex((prevIndex) =>
          !!prevIndex && prevIndex < imageStatuses.length - 1 ? prevIndex + 1 : 0,
        )
      }
    },
    [isDialogOpen, selectedImageIndex, imageStatuses.length],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : imageStatuses.length - 1,
    )
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex !== null && prevIndex < imageStatuses.length - 1 ? prevIndex + 1 : 0,
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Upload</CardTitle>
        <CardDescription>
          {multiple ? `Upload up to ${maxFiles} images` : 'Upload an image'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className='cursor-pointer rounded-lg border-2 border-gray-300 border-dashed p-4 text-center'
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className='mx-auto h-12 w-12 text-gray-400' />
          <p className='mt-1 text-gray-600 text-sm'>
            Drag and drop your {multiple ? 'images' : 'image'} here, or click to select{' '}
            {multiple ? 'files' : 'a file'}
          </p>
        </div>
        <Input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          multiple={multiple}
          className='hidden'
          onChange={handleFileChange}
        />
        {imageStatuses.length > 0 && (
          <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
            {imageStatuses.map((status, index) => (
              <Dialog
                key={status.url}
                open={isDialogOpen && selectedImageIndex === index}
                onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (open) setSelectedImageIndex(index)
                }}
              >
                <DialogTrigger asChild>
                  <div className='group relative cursor-pointer'>
                    <Image
                      src={status.url}
                      alt={`Uploaded image ${index + 1}`}
                      width={200}
                      height={200}
                      className='rounded-lg object-cover'
                    />
                    <button
                      type={'button'}
                      className='absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage(index)
                      }}
                    >
                      <X className='h-4 w-4' />
                    </button>
                    {status.status === 'uploading' && (
                      <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50'>
                        <div className='h-8 w-8 animate-spin rounded-full border-white border-t-2 border-b-2' />
                      </div>
                    )}
                    {status.status === 'success' && (
                      <div className='absolute right-0 bottom-0 rounded-tl-lg bg-green-500 p-1'>
                        <CheckCircle className='h-4 w-4 text-white' />
                      </div>
                    )}
                    {status.status === 'error' && (
                      <div className='absolute right-0 bottom-0 rounded-tl-lg bg-red-500 p-1'>
                        <XCircle className='h-4 w-4 text-white' />
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-3xl'>
                  <div className='relative'>
                    <Image
                      src={status.url}
                      alt={`Uploaded image ${index + 1}`}
                      width={800}
                      height={600}
                      className='h-full w-full object-contain'
                    />
                    <button
                      type={'button'}
                      onClick={handlePrevImage}
                      className='-translate-y-1/2 absolute top-1/2 left-0 transform rounded-r bg-black bg-opacity-50 p-2 text-white'
                      aria-label='Previous image'
                    >
                      <ChevronLeft className='h-6 w-6' />
                    </button>
                    <button
                      type={'button'}
                      onClick={handleNextImage}
                      className='-translate-y-1/2 absolute top-1/2 right-0 transform rounded-l bg-black bg-opacity-50 p-2 text-white'
                      aria-label='Next image'
                    >
                      <ChevronRight className='h-6 w-6' />
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => fileInputRef.current?.click()}>
          Select {multiple ? 'Images' : 'Image'}
        </Button>
      </CardFooter>
    </Card>
  )
}
