import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateBlogDto, UpdateBlogDto } from "./blogDto"
import { Blog } from "@prisma/client"

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlog(createBlog: CreateBlogDto) {
    try {
      const {
        user_id,
        category_id,
        blog_title,
        blog_description,
        blog_photo,
        blog_author,
        blog_category,
      } = createBlog

      // Validate user_id
      const user = await this.prisma.user.findUnique({ where: { id: user_id } })
      if (!user) {
        throw new BadRequestException(`User with ID ${user_id} does not exist`)
      }

      // Validate category_id
      const category = await this.prisma.category.findUnique({
        where: { id: category_id },
      })
      if (!category) {
        throw new BadRequestException(
          `Category with ID ${category_id} does not exist`,
        )
      }
      const blog = await this.prisma.blog.create({
        data: {
          blog_title,
          blog_description,
          blog_photo,
          blog_author,
          blog_category,
          user_id,
          category_id,
        },
      })
      return { success: true, data: blog }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getAllBlogs() {
    try {
      const blogs = await this.prisma.blog.findMany()
      if (blogs) {
        return { success: true, data: blogs }
      } else {
        return { success: false, data: [] }
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getSingleBlog(id: number) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id: id },
      })
      if (blog) {
        return { success: true, data: blog }
      } else {
        return { success: false, data: [] }
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async updateSingleBlog(id: number, updateDto: UpdateBlogDto) {
    try {
      const {
        user_id,
        category_id,
        blog_title,
        blog_description,
        blog_photo,
        blog_category,
        blog_author,
      } = updateDto

      // Validate user_id
      const user = await this.prisma.user.findUnique({ where: { id: user_id } })
      if (!user) {
        throw new BadRequestException(`User with ID ${user_id} does not exist`)
      }

      // Validate category_id
      const category = await this.prisma.category.findUnique({
        where: { id: category_id },
      })
      if (!category) {
        throw new BadRequestException(
          `Category with ID ${category_id} does not exist`,
        )
      }
      const blog = await this.prisma.blog.update({
        where: { id },
        data: {
          blog_title,
          blog_description,
          blog_photo,
          blog_author,
          blog_category,
          user: { connect: { id: user_id } },
          category: { connect: { id: category_id } },
        },
      })

      return { success: true, data: blog }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
