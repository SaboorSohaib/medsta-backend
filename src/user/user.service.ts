import { Injectable, NotFoundException } from "@nestjs/common"
import { Prisma, User } from "@prisma/client"
import { UpdateDto } from "src/auth/dto"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<{
    success: boolean
    data?: User[]
    error?: string
  }> {
    try {
      const users = await this.prisma.user.findMany()
      return { success: true, data: users }
    } catch (error) {
      return { success: false, data: error }
    }
  }

  async getSingleUser(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      })
      if (!user) {
        throw new Error("User not Found")
      }
      return user
    } catch (error) {
      throw new Error("Failed to fetch data")
    }
  }

  async getSingleUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: email },
      })
      if (!user) {
        throw new Error("User not Found")
      }
      return user
    } catch (error) {
      throw new Error("Failed to fetch data")
    }
  }

  async updateSingleUser(
    id: number,
    updateData: UpdateDto,
  ): Promise<User | null> {
    try {
      const user = await this.prisma.user.update({
        data: updateData,
        where: {
          id,
        },
      })
      return user
    } catch (error) {
      throw new Error("User Not Found")
    }
  }
}
