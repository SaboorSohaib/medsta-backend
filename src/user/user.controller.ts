import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from "@nestjs/common"
import { User } from "@prisma/client"
import { GetUser } from "src/auth/decorator"
import { JwtGurad } from "src/auth/guard"
import { PrismaService } from "src/prisma/prisma.service"
import { UserService } from "./user.service"
import { UpdateDto } from "src/auth/dto"
import { AuthenticatedGuard } from "src/auth/guard/authenticated.guard"

@Controller("user")
export class UserController {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtGurad)
  @Get("me")
  getme(@GetUser() user: User) {
    return user
  }

  @UseGuards(AuthenticatedGuard)
  @Get("all-users")
  async getAllUsers(): Promise<User[] | null> {
    try {
      const users = await this.userService.getAllUsers()
      if (!users || users.data.length === 0) {
        throw new NotFoundException("Users Not found")
      }
      return users.data
    } catch (error) {
      if (error) {
        throw new NotFoundException("Users Not Found")
      }
      return []
    }
  }

  @Get(":id")
  async getSingleUser(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<User | null> {
    try {
      const user = await this.userService.getSingleUser(id)
      if (!user) {
        throw new NotFoundException("User Not Found")
      }
      return user
    } catch (error) {
      throw new Error()
    }
  }

  @Put(":id")
  async updateSingleUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateDto,
  ) {
    try {
      const user = await this.userService.updateSingleUser(+id, updateDto)
      if (!id) {
        throw new NotFoundException(`User data with ${id} is not updated`)
      }
      return user
    } catch (error) {
      if (error) {
        throw new Error("User data is not updated")
      }
    }
  }
}
