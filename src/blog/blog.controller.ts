import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common"
import { BlogService } from "./blog.service"
import { CreateBlogDto, UpdateBlogDto } from "./blogDto"

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post("create-blog")
  crateBlog(@Body() createBlog: CreateBlogDto): Promise<any> {
    return this.blogService.createBlog(createBlog)
  }

  @Get("get-all-blogs")
  getAllBlogs() {
    return this.blogService.getAllBlogs()
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
