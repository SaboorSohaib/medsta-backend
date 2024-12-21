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
import * as cuid from "cuid"
import { Pagination } from "src/pagination/pagination.dto"

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
      const prefixedId = "prodReview_" + cuid()
      const productReview = await this.prisma.productReview.create({
        data: {
          id: prefixedId,
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

  async getAllProductReview(paginationParams: Pagination): Promise<{
    success: boolean
    data: any[]
    totalItems: number
    offset: number
    limit: number
  }> {
    try {
      const totalItems = await this.prisma.productReview.count()
      const allProductsReview = await this.prisma.productReview.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: paginationParams.limit,
        skip: paginationParams.offset,
      })
      const products = await this.prisma.product.findMany()
      const productReviewWithProduct = allProductsReview.map(
        (prodReview: any) => {
          const product = products.find(
            (prod: any) => prod?.id === prodReview?.product_id,
          )
          return {
            ...prodReview,
            product_id: product,
          }
        },
      )
      return {
        success: true,
        data: productReviewWithProduct,
        totalItems: totalItems,
        offset: paginationParams.page,
        limit: paginationParams.size,
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async getReviewsByProductId(
    id: string,
    paginationParams: Pagination,
  ): Promise<{
    success: boolean
    data: any[]
    totalItems: number
    offset: number
    limit: number
  }> {
    try {
      const whereCondition = { product_id: id }
      const totalReviews = await this.prisma.productReview.count({
        where: whereCondition,
      })

      const productReview = await this.prisma.productReview.findMany({
        where: whereCondition,
        take: paginationParams?.limit ?? totalReviews,
        skip: paginationParams?.offset ?? 0,
      })
      return {
        success: true,
        data: productReview,
        totalItems: totalReviews,
        offset: paginationParams.page,
        limit: paginationParams.size ?? totalReviews,
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async getSingleProductReview(id: string) {
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

  async updateProductRevoew(id: string, updateDto: UpdateProductReviewDto) {
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
