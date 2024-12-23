'use server'
import prisma from '@/lib/prisma'
import { Model } from '@prisma/client'

/**
 * 获取模型数据的函数
 * @param page - 页码，默认为 1
 * @param pageSize - 每页大小，默认为 10
 * @returns 返回分页查询后的模型数据
 */
export async function getModels (page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize
  const take = pageSize

  return prisma.model.findMany({
    skip,
    take,
  })
}

/**
 * 根据模型 ID 获取模型数据的函数
 * @param id - 模型 ID
 * @returns 返回查询到的模型数据
 */
export async function getModelById (id: string) {
  return prisma.model.findUnique({
    where: {
      id,
    },
  })
}

/**
 * 创建模特数据的函数
 * @param data - 模型数据
 * @returns 返回创建后的模型数据
 */
export async function createModel (data: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.model.create({
    data,
  })
}
