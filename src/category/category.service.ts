import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateCategoryDto, UpdateDto } from "./categoryDto"
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
      return category
    } catch (error) {
      if (error.code === "500") {
        return "Error"
      }
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.prisma.category.findMany()
      if (!categories) {
        return null
      }
      return categories
    } catch (error) {
      throw new Error()
    }
  }

  async getSingleCategory(id: number): Promise<Category | null> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
      })
      if (!category) {
        throw new Error("Category not found")
      }
      return category
    } catch (error) {
      throw new Error()
    }
  }

  async updateCategory(
    id: number,
    updateDto: UpdateDto,
  ): Promise<Category | null> {
    try {
      const category = await this.prisma.category.update({
        data: updateDto,
        where: { id },
      })
      return category
    } catch (error) {
      throw new Error("User is not updated")
    }
  }
}
