import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common"
import { User } from "@prisma/client"
import { GetUser } from "src/auth/decorator"
import { JwtGuard } from "src/auth/guard"
import { UserService } from "./user.service"
import { UpdateDto, UpdatePassword } from "src/auth/dto"
import { GetDataDto, Pagination } from "src/pagination/pagination.dto"
import { IsAdminGuard } from "src/auth/guard/is-admin.guard"
import { PaginationParams } from "../pagination/pagination.decorator"
import { PrismaService } from "src/prisma/prisma.service"

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(JwtGuard)
  @Get("me")
  async getme(@GetUser() user: User) {
    delete user.password
    const userAddress = await this.prisma.address.findUnique({
      where: { user_id: user.id },
    })
    const userData = { ...user, address: userAddress }
    return { success: true, data: userData }
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Get("get-all-users")
  async getAllUsers(
    @Query() getUsersDto: GetDataDto,
    @PaginationParams() paginationParams: Pagination,
  ): Promise<{
    success: boolean
    data?: User[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    return await this.userService.getAllUsers(paginationParams)
  }

  @Get(":id")
  async getSingleUser(@Param("id") id: string) {
    return this.userService.getSingleUser(id)
  }

  @Put("update-password/:id")
  async updateUserPassword(
    @Param("id") id: string,
    @Body() updatePassword: UpdatePassword,
  ) {
    return this.userService.updatePassword(id, updatePassword)
  }

  @Put(":id")
  async updateSingleUser(
    @Param("id") id: string,
    @Body() updateDto: UpdateDto,
  ) {
    try {
      const user = await this.userService.updateSingleUser(id, updateDto)
      if (!id) {
        throw new NotFoundException(`User data with ${id} is not updated`)
      }
      return user
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
