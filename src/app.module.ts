import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { BlogController } from "./blog/blog.controller"
import { BlogService } from "./blog/blog.service"
import { BlogModule } from "./blog/blog.module"
import { CategoryModule } from "./category/category.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    BlogModule,
    CategoryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class AppModule {}
