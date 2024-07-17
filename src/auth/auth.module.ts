import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./strategy"
import { PrismaService } from "src/prisma/prisma.service"
import { UserService } from "src/user/user.service"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./strategy/local.strategy"
import { SessionSerializer } from "./session.serializer"

@Module({
  imports: [JwtModule.register({}), PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    PrismaService,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
