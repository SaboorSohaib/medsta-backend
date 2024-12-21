import { Module } from "@nestjs/common"
import { ProductService } from "./product.service"
import { PrismaService } from "src/prisma/prisma.service"
import { ProductController } from "./product.controller"

@Module({
  providers: [PrismaService, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
