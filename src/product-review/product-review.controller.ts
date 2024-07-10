import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { ProductReviewService } from "./product-review.service"
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from "./product-reviewDto"
import { ProductReview } from "@prisma/client"

@Controller("product-review")
export class ProductReviewController {
  constructor(private productReviewService: ProductReviewService) {}

  @Post("create-product-review")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProductReview(
    @Body() createDto: CreateProductReviewDto,
  ): Promise<any> {
    return this.productReviewService.createProductReview(createDto)
  }

  @Get("all-products-review")
  async getAllProductsReview(): Promise<ProductReview[] | null> {
    try {
      const allProductsReview = this.productReviewService.getAllProductReview()
      if (allProductsReview) {
        return allProductsReview
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }

  @Get(":id")
  async getSingleProductReview(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ProductReview | null> {
    try {
      const singleProductReview =
        this.productReviewService.getSingleProductReview(id)
      if (singleProductReview) {
        return singleProductReview
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }

  @Put(":id")
  async updateProductReview(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductReviewDto,
  ): Promise<ProductReview | null> {
    try {
      const updateProductReview =
        await this.productReviewService.updateProductRevoew(+id, updateDto)
      if (updateProductReview) {
        return updateProductReview
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }
}
