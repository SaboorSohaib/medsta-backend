import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateCategoryDto, UpdateCategoryDto } from "./categoryDto"
import * as cuid from "cuid"
import { Pagination } from "src/pagination/pagination.dto"
import { Category } from "@prisma/client"

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(categoryDto: CreateCategoryDto) {
    try {
      const prefixedId = "category_" + cuid()
      const category = await this.prisma.category.create({
        data: {
          id: prefixedId,
          category_name: categoryDto.category_name,
          category_handle: categoryDto.category_handle,
          category_photo: categoryDto.category_photo,
        },
      })
      return { success: true, data: category }
    } catch (error) {
      if (error) {
        if (error) {
          throw new ForbiddenException(error.message)
        }
      }
    }
  }

  async getAllCategories(paginationParams: Pagination): Promise<{
    success: boolean
    data?: Category[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    try {
      const totalCategories = await this.prisma.category.count()
      const categories = await this.prisma.category.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: paginationParams.limit,
        skip: paginationParams.offset,
      })
      return {
        success: true,
        data: categories,
        totalItems: totalCategories,
        offset: paginationParams.page,
        limit: paginationParams.size,
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async getSingleCategory(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
      })
      if (!category) {
        return { success: false, data: [] }
      }
      return { success: true, data: category }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async topCategories() {
    try {
      const topCategories = await this.prisma.category.findMany({
        take: 5,
        orderBy: {
          products: {
            _count: "desc",
          },
        },
        include: {
          _count: {
            select: { products: true },
          },
        },
      })

      const count = topCategories.map((category: any) => {
        return {
          category_name: category.category_name,
          product_count: category._count.products,
        }
      })
      return {
        success: true,
        data: count,
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async updateCategory(id: string, updateDto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.update({
        data: updateDto,
        where: { id },
      })
      return { success: true, data: category }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }
}
