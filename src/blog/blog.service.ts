import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateBlogDto, UpdateBlogDto } from "./blogDto"
import * as cuid from "cuid"
import { Pagination } from "src/pagination/pagination.dto"

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
      } // Ensure you have the `cuid` package installed
      const prefixedId = "blog_" + cuid()
      const blog = await this.prisma.blog.create({
        data: {
          id: prefixedId,
          blog_title,
          blog_description,
          blog_photo,
          blog_author,
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

  async getAllBlogs(paginationParams: Pagination): Promise<{
    success: boolean
    data?: any[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    try {
      const totalBlogs = await this.prisma.blog.count()
      const blogs = await this.prisma.blog.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: paginationParams.limit,
        skip: paginationParams.offset,
      })
      const categories = await this.prisma.category.findMany()
      const blogsWithCategory = blogs.map((blog: any) => {
        const category = categories.find(
          (cat: any) => cat.id === blog.category_id,
        )
        return {
          ...blog,
          category_id: category,
        }
      })
      return {
        success: true,
        data: blogsWithCategory,
        totalItems: totalBlogs,
        offset: paginationParams.page,
        limit: paginationParams.size,
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getSingleBlog(id: string) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id: id },
      })
      const categories = await this.prisma.category.findMany()
      const category = categories.find(
        (cat: any) => cat.id === blog.category_id,
      )
      return {
        success: true,
        data: {
          ...blog,
          category_id: category,
        },
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async updateSingleBlog(id: string, updateDto: UpdateBlogDto) {
    try {
      const {
        user_id,
        category_id,
        blog_title,
        blog_description,
        blog_photo,
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
