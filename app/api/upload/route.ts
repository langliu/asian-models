import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

export async function POST (request: Request) {
  const { filename, contentType, uploadDir } = await request.json()

  try {
    const client = new S3Client({ region: process.env.AWS_REGION })
    const key = uploadDir ? [uploadDir, uuidv4()].join('/') : uuidv4()
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })
    console.log(url, fields)

    return Response.json({ url, fields })
  } catch (error) {
    return Response.json({ error: (error as Error).message })
  }
}
