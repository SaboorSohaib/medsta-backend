import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { PrismaService } from "src/prisma/prisma.service"
import { JwtService } from "@nestjs/jwt"
import { AuthService } from "src/auth/auth.service"

@Module({
  providers: [JwtService, AuthService, UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
