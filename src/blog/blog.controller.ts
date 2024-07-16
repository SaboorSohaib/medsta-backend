import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common"
import { BlogService } from "./blog.service"
import { CreateBlogDto, UpdateBlogDto } from "./blogDto"
import { Blog } from "@prisma/client"
import e from "express"

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post("create-blog")
  crateBlog(@Body() createBlog: CreateBlogDto): Promise<any> {
    return this.blogService.createBlog(createBlog)
  }

  @Get("all-blogs")
  getAllBlogs() {
    return this.blogService.getAllBlogs()
  }

  @Get(":id")
  getSingleBlog(@Param("id", ParseIntPipe) id: number): Promise<Blog | null> {
    return this.blogService.getSingleBlog(id)
  }

  @Put(":id")
  async updateSingleBlog(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateBlogDto,
  ): Promise<Blog | null> {
    try {
      const updatedBlog = await this.blogService.updateSingleBlog(
        +id,
        updateDto,
      )
      if (updatedBlog) {
        return updatedBlog
      } else {
        return null
      }
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
