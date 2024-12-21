import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { User } from "@prisma/client"
import { Filtering, Pagination } from "src/pagination/pagination.dto"
import { UpdateDto, UpdatePassword } from "src/auth/dto"
import { PrismaService } from "src/prisma/prisma.service"
import { getWhere } from "src/pagination/pagination.dto"
import * as argon from "argon2"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(
    paginationParams: Pagination, // Includes page, size, limit, offset
    filter?: Filtering, // Filtering parameters
  ): Promise<{
    success: boolean
    data?: User[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    try {
      // Construct the 'where' clause for filtering
      const where = getWhere(filter)

      // Fetch users with pagination, sorting, and filtering
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: paginationParams.limit, // number of items per page
          skip: paginationParams.offset, // number of items to skip
        }),
        this.prisma.user.count({ where }), // count total users for pagination metadata
      ])

      return {
        success: true,
        data: users,
        totalItems: total, // total number of users
        offset: paginationParams.page, // current page
        limit: paginationParams.size, // number of items per page
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async getSingleUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      })
      if (user) {
        return { success: true, data: user }
      } else {
        return { success: false, data: [] }
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async updatePassword(id: string, updatePassword: UpdatePassword) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      })
      const isSamePassword = await argon.verify(
        user.password,
        updatePassword.password,
      )
      if (isSamePassword) {
        throw new BadRequestException(
          "New password cannot be the same as the old password.",
        )
      }
      const hashedPassword = await argon.hash(updatePassword.password)
      const updateUserPassword = await this.prisma.user.update({
        data: { password: hashedPassword },
        where: { id: id },
      })
      delete updateUserPassword.password
      return { success: true, data: updateUserPassword }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async updateSingleUser(id: string, updateData: UpdateDto) {
    try {
      const user = await this.prisma.user.update({
        data: updateData,
        where: {
          id,
        },
      })
      delete user.password
      return { success: true, data: user }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }
}
