'use server'

import prisma from '@/lib/prisma'
import type { Album } from '@prisma/client'

export async function createAlbum(
  data: Omit<Album, 'id' | 'createdAt' | 'updatedAt'> & {
    models: string[]
    tags: string[]
  },
) {
  return prisma.album.create({
    data: {
      ...data,
      tags: {
        create: (data.tags || []).map((tag) => ({
          tag: {
            connect: {
              id: tag,
            },
          },
        })),
      },
      models: {
        create:
          (data.models || []).map((model) => ({
            model: {
              connect: {
                id: model,
              },
            },
          })) || [],
      },
    },
    include: {
      models: {
        include: {
          model: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
}

/**
 * 分页获取专辑
 * @param page
 * @param pageSize
 */
export async function getAlbums(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize
  const take = pageSize
  const [models, totalCount] = await prisma.$transaction([
    prisma.album.findMany({
      skip,
      take,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        models: {
          include: {
            model: true,
          },
        },
      },
    }),
    prisma.album.count(),
  ])

  return {
    data: models,
    totalPage: Math.ceil(totalCount / pageSize),
    totalCount,
    pageIndex: page,
    pageSize,
  }
}
