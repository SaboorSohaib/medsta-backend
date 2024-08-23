import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common"
import { User } from "@prisma/client"
import { GetUser } from "src/auth/decorator"
import { JwtGuard } from "src/auth/guard"
import { UserService } from "./user.service"
import { UpdateDto } from "src/auth/dto"
import { IsAdminGuard } from "src/auth/guard/is-admin.guard"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get("me")
  getme(@GetUser() user: User) {
    return user
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Get("get-all-users")
  async getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Get(":id")
  async getSingleUser(@Param("id") id: string) {
    return this.userService.getSingleUser(id)
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
