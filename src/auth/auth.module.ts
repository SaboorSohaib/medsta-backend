import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./strategy"
import { PrismaService } from "src/prisma/prisma.service"
import { PassportModule } from "@nestjs/passport"
import { UserService } from "src/user/user.service"

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secret: "super-secret",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, PrismaService],
})
export class AuthModule {}
