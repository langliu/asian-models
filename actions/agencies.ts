'use server'
import prisma from '@/lib/prisma'
import type { Agency } from '@prisma/client'

export async function createAgency(data: Omit<Agency, 'createdAt' | 'id' | 'updatedAt'>) {
  return prisma.agency.create({
    data: data,
  })
}

export async function updateAgency(data: Omit<Agency, 'createdAt' | 'updatedAt'>) {
  return prisma.agency.update({
    where: {
      id: data.id,
    },
    data: data,
  })
}

export async function getAgencyById(id: string) {
  return prisma.agency.findUnique({
    where: {
      id,
    },
  })
}

/**
 * 获取模型数据的函数
 * @param page - 页码，默认为 1
 * @param pageSize - 每页大小，默认为 10
 * @returns 返回分页查询后的模型数据
 */
export async function getAgencies(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize
  const take = pageSize

  const [models, totalCount] = await prisma.$transaction([
    prisma.agency.findMany({
      skip,
      take,
      orderBy: {
        updatedAt: 'desc',
      },
    }),
    prisma.agency.count(),
  ])

  return {
    data: models,
    totalPage: Math.ceil(totalCount / pageSize),
    totalCount,
    pageIndex: page,
    pageSize,
  }
}
