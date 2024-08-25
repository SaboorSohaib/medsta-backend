import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { ProductReviewService } from "./product-review.service"
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from "./product-reviewDto"
import { IsAdminGuard } from "src/auth/guard/is-admin.guard"
import { JwtGuard } from "src/auth/guard"

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

  @Get("get-all-products-review")
  async getAllProductsReview() {
    return this.productReviewService.getAllProductReview()
  }

  @Get(":id")
  async getSingleProductReview(@Param("id") id: string) {
    return this.productReviewService.getSingleProductReview(id)
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Put(":id")
  async updateProductReview(
    @Param("id") id: string,
    @Body() updateDto: UpdateProductReviewDto,
  ) {
    try {
      const updateProductReview =
        await this.productReviewService.updateProductRevoew(id, updateDto)
      if (updateProductReview) {
        return updateProductReview
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        if (error) {
          throw new NotFoundException(error.message)
        }
      }
    }
  }
}
