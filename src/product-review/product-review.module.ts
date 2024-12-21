import { Module } from "@nestjs/common"
import { ProductReviewController } from "./product-review.controller"
import { ProductReviewService } from "./product-review.service"
import { PrismaService } from "src/prisma/prisma.service"

@Module({
  providers: [ProductReviewService, PrismaService],
  controllers: [ProductReviewController],
})
export class ProductReviewModule {}
