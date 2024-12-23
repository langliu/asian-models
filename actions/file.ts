'use server'

export const uploadImage = async (file: File, uploadDir?: string) => {

  if (!file) {
    // alert('Please select a file to upload.')
    throw new Error('No file uploaded')
  }

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type, uploadDir }),
    }
  )

  if (response.ok) {
    const { url, fields } = await response.json()

    const formData = new FormData()
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
    formData.append('file', file)

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    console.log(url, fields)

    if (uploadResponse.ok) {
      return {
        url: `${url}${fields.key}`
      }
    } else {
      console.error('S3 Upload Error:', uploadResponse)
      // alert('Upload failed.')
      throw new Error('Upload Error')
    }
  } else {
    throw new Error('Failed to get pre-signed URL.')
  }

}
