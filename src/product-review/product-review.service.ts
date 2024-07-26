import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from "./product-reviewDto"

@Injectable()
export class ProductReviewService {
  constructor(private prisma: PrismaService) {}

  async createProductReview(createDto: CreateProductReviewDto) {
    try {
      const productId = await this.prisma.product.findUnique({
        where: { id: createDto.product_id },
      })
      if (!productId) {
        throw new NotFoundException("Product id does not exsist")
      }
      const productReview = await this.prisma.productReview.create({
        data: {
          reviewer_name: createDto.reviewer_name,
          reviewer_email: createDto.reviewer_email,
          reviewer_photo: createDto.reviewer_photo,
          review_description: createDto.review_description,
          review_rating: createDto.review_rating,
          product_id: createDto.product_id,
        },
      })

      return { success: true, data: productReview }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getAllProductReview() {
    try {
      const allProductsReview = await this.prisma.productReview.findMany()
      if (allProductsReview) {
        return { success: true, data: allProductsReview }
      } else {
        return { success: false, data: [] }
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async getSingleProductReview(id: number) {
    try {
      const productReview = await this.prisma.productReview.findUnique({
        where: {
          id: id,
        },
      })
      if (productReview) {
        return { success: true, data: productReview }
      } else {
        return { success: false, data: [] }
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async updateProductRevoew(id: number, updateDto: UpdateProductReviewDto) {
    try {
      const updateProductReview = await this.prisma.productReview.update({
        where: { id },
        data: updateDto,
      })
      if (updateProductReview) {
        return { success: true, data: updateProductReview }
      } else {
        return { success: false, data: [] }
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }
}
