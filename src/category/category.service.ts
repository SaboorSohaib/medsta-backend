import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateCategoryDto, UpdateCategoryDto } from "./categoryDto"
import * as cuid from "cuid"

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

  async getAllCategories() {
    try {
      const categories = await this.prisma.category.findMany()
      if (categories.length === 0) {
        return { success: false, data: [] }
      }
      return { success: true, data: categories }
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
