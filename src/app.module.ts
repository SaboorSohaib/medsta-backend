import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { BlogController } from "./blog/blog.controller"
import { BlogService } from "./blog/blog.service"
import { BlogModule } from "./blog/blog.module"
import { CategoryModule } from "./category/category.module"
import { ProductController } from "./product/product.controller"
import { ProductModule } from "./product/product.module"
import { ProductService } from "./product/product.service"
import { ProductReviewService } from './product-review/product-review.service';
import { ProductReviewModule } from './product-review/product-review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    BlogModule,
    CategoryModule,
    ProductModule,
    ProductReviewModule,
  ],
  controllers: [BlogController, ProductController],
  providers: [BlogService, ProductService, ProductReviewService],
})
export class AppModule {}
