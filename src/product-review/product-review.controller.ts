import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
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
import { GetDataDto, Pagination } from "src/pagination/pagination.dto"
import { PaginationParams } from "src/pagination/pagination.decorator"

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
  async getAllProductsReview(
    @Query() getDataDto: GetDataDto,
    @PaginationParams() paginationParams: Pagination,
  ): Promise<{
    success: boolean
    data: any[]
    totalItems: number
    offset: number
    limit: number
  }> {
    return await this.productReviewService.getAllProductReview(paginationParams)
  }

  @Get(":id")
  async getReviewsByProductId(
    @Param("id") id: string,
    @Query() getDataDto: GetDataDto,
    @PaginationParams() paginationParams: Pagination,
  ): Promise<{
    success: boolean
    data: any[]
    totalItems: number
    offset: number
    limit: number
  }> {
    return this.productReviewService.getReviewsByProductId(id, paginationParams)
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
