import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from "./product-reviewDto"
import { ProductReview } from "@prisma/client"
import { response } from "express"

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
          review_post_date: createDto.review_post_date,
          review_description: createDto.review_description,
          review_rating: createDto.review_rating,
          product_id: createDto.product_id,
        },
      })

      return productReview
    } catch (error) {
      console.error(error, "......................")
      if (error) {
        return response
      }
    }
  }

  async getAllProductReview(): Promise<ProductReview[] | null> {
    try {
      const allProductsReview = await this.prisma.productReview.findMany()
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

  async getSingleProductReview(id: number): Promise<ProductReview | null> {
    try {
      const productReview = await this.prisma.productReview.findUnique({
        where: {
          id: id,
        },
      })
      if (productReview) {
        return productReview
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }

  async updateProductRevoew(
    id: number,
    updateDto: UpdateProductReviewDto,
  ): Promise<ProductReview | null> {
    try {
      const updateProductReview = await this.prisma.productReview.update({
        where: { id },
        data: updateDto,
      })
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
