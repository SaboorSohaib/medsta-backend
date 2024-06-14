import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { RoleController } from "./role/role.controller"
import { RoleService } from "./role/role.service"

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class AppModule {}
