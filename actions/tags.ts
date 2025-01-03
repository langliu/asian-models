'use server'
import prisma from '@/lib/prisma'

export async function getTags(page: 1, pageSize: 100) {
  const skip = (page - 1) * pageSize
  const take = pageSize

  const [models, totalCount] = await prisma.$transaction([
    prisma.tag.findMany({
      skip,
      take,
      orderBy: {
        updatedAt: 'desc',
      },
    }),
    prisma.tag.count(),
  ])

  return {
    data: models,
    totalPage: Math.ceil(totalCount / pageSize),
    totalCount,
    pageIndex: page,
    pageSize,
  }
}
