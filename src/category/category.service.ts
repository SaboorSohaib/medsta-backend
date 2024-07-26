import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateCategoryDto, UpdateCategoryDto } from "./categoryDto"
import { Category } from "@prisma/client"

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(categoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: {
          category_name: categoryDto.category_name,
          category_handle: categoryDto.category_handle,
          category_images: categoryDto.category_images,
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

  async getSingleCategory(id: number) {
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

  async updateCategory(id: number, updateDto: UpdateCategoryDto) {
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
