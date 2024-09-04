import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common"
import { BlogService } from "./blog.service"
import { CreateBlogDto, UpdateBlogDto } from "./blogDto"
import { GetDataDto, Pagination } from "src/pagination/pagination.dto"
import { PaginationParams } from "src/pagination/pagination.decorator"

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post("create-blog")
  crateBlog(@Body() createBlog: CreateBlogDto): Promise<any> {
    return this.blogService.createBlog(createBlog)
  }

  @Get("get-all-blogs")
  async getAllBlogs(
    @Query() getDataDto: GetDataDto,
    @PaginationParams() paginationParams: Pagination,
  ): Promise<{
    success: boolean
    data?: any[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    return await this.blogService.getAllBlogs(paginationParams)
  }

  @Get(":id")
  getSingleBlog(@Param("id") id: string) {
    return this.blogService.getSingleBlog(id)
  }

  @Put(":id")
  async updateSingleBlog(
    @Param("id") id: string,
    @Body() updateDto: UpdateBlogDto,
  ) {
    try {
      const updatedBlog = await this.blogService.updateSingleBlog(id, updateDto)
      return updatedBlog
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
