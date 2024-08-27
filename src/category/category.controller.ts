import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CreateCategoryDto, UpdateCategoryDto } from "./categoryDto"
import { IsAdminGuard } from "src/auth/guard/is-admin.guard"
import { JwtGuard } from "src/auth/guard"

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Post("create-category")
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoryService.createCategory(createCategoryDto)
  }

  @Get("get-all-categories")
  async getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Get(":id")
  async getSingleCategory(@Param("id") id: string) {
    return this.categoryService.getSingleCategory(id)
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Put(":id")
  async updateCategory(
    @Param("id") id: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    try {
      const updateCategory = await this.categoryService.updateCategory(
        id,
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
