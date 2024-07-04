import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CreateCategoryDto, UpdateDto } from "./categoryDto"
import { Category } from "@prisma/client"

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post("create-category")
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoryService.createCategory(createCategoryDto)
  }

  @Get("get-all-categories")
  async getAllCategories(): Promise<Category[] | null> {
    try {
      const allCategories = await this.categoryService.getAllCategories()
      if (!allCategories) {
        throw new NotFoundException("Categories not found")
      }
      return allCategories
    } catch (error) {
      if (error) {
        throw new NotFoundException("Categories not found")
      }
    }
  }

  @Get(":id")
  async getSingleCategory(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Category | null> {
    try {
      const category = await this.categoryService.getSingleCategory(id)
      if (!category) {
        throw new NotFoundException(`Category with ${id} not found`)
      }
      return category
    } catch (error) {
      if (error) {
        throw new NotFoundException("Category not found")
      }
    }
  }

  @Put(":id")
  async updateCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateDto,
  ) {
    try {
      const updateCategory = await this.categoryService.updateCategory(
        +id,
        updateDto,
      )
      if (!id) {
        throw new NotFoundException(`Category data with ${id} does not exist`)
      }
      return updateCategory
    } catch (error) {
      if (error) {
        throw new NotFoundException("Category is not updated")
      }
    }
  }
}
