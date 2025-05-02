import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateProductDto, UpdateProductDto } from "./productDto"
import { Product } from "@prisma/client"
import * as cuid from "cuid"
import { Pagination } from "src/pagination/pagination.dto"

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createDto: CreateProductDto) {
    try {
      const categoryId = await this.prisma.category.findUnique({
        where: { id: createDto.category_id },
      })
      if (!categoryId) {
        throw new ForbiddenException("Category id does not exist")
      }
      const productTitle = await this.prisma.product.findUnique({
        where: { product_title: createDto.product_title },
      })
      if (productTitle) {
        throw new ForbiddenException("Product with given title already exist")
      }
      const prefixedId = "product_" + cuid()
      const product = await this.prisma.product.create({
        data: {
          id: prefixedId,
          product_title: createDto.product_title,
          product_description: createDto.product_description,
          product_handle: createDto.product_handle,
          product_photo: createDto.product_photo,
          product_price: createDto.product_price,
          product_type: createDto.product_type,
          product_status: createDto.product_status,
          life: createDto.life,
          manufacturing: createDto.manufacturing,
          category_id: createDto.category_id,
          in_stock: createDto.in_stock,
          product_before_off_price: createDto.product_before_off_price,
          product_rating: createDto.product_rating,
        },
      })
      return {
        success: true,
        data: product,
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async getAllProducts(paginationParams: Pagination): Promise<{
    success: boolean
    data?: any[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    try {
      const allProducts: Product[] = await this.prisma.product.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: paginationParams.limit,
        skip: paginationParams.offset,
      })
      const categories = await this.prisma.category.findMany()
      const productReviews = await this.prisma.productReview.findMany()

      const productReviewMap = new Map<
        string,
        { total: number; count: number }
      >()

      // Step 1: Group and sum ratings by product_id
      productReviews.forEach((review: any) => {
        const { product_id, review_rating } = review

        if (!productReviewMap.has(product_id)) {
          productReviewMap.set(product_id, { total: review_rating, count: 1 })
        } else {
          const current = productReviewMap.get(product_id)
          productReviewMap.set(product_id, {
            total: current.total + review_rating,
            count: current.count + 1,
          })
        }
      })

      // Step 2: Create a new Map of product_id -> average_rating
      const averageRatings = new Map(
        Array.from(productReviewMap.entries()).map(
          ([product_id, { total, count }]) => [
            product_id,
            parseFloat((total / count).toFixed(1)), // one decimal place
          ],
        ),
      )

      // Step 3: Merge into final product objects
      const productsWithCategory = allProducts.map((prod: any) => {
        const category = categories.find(
          (cat: any) => cat.id === prod.category_id,
        )

        const averageRating = averageRatings.get(prod.id) || 0 // default to 0 if no rating
        delete prod.product_rating
        return {
          ...prod,
          rating: averageRating,
          category: category, // or category_id if you want only the id
        }
      })
      const totalItems = await this.prisma.product.count()
      return {
        success: true,
        data: productsWithCategory,
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

  async getSingleProduct(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: id },
      })
      const category = await this.prisma.category.findUnique({
        where: { id: product?.category_id },
      })

      const singleProductReview = await this.prisma.productReview.findMany({
        where: { product_id: id },
      })

      const totalReviews = singleProductReview.length
      const totalRating = singleProductReview.reduce(
        (sum, review) => sum + review.review_rating,
        0,
      )
      const averageRating =
        totalReviews > 0
          ? parseFloat((totalRating / totalReviews).toFixed(1))
          : 0

      const productWithCategoryAndRating = {
        ...product,
        category: category,
        average_rating: averageRating,
      }

      if (productWithCategoryAndRating) {
        return { success: true, data: productWithCategoryAndRating }
      } else {
        return { success: false, data: {} }
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async serachProduct(query: string) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          OR: [
            {
              product_title: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      })
      const categories = await this.prisma.category.findMany()
      const productsWithCategory = products.map((prod: any) => {
        const category = categories.find(
          (cat: any) => cat.id === prod.category_id,
        )
        return {
          ...prod,
          category_id: category,
        }
      })
      if (products.length > 0) {
        return {
          success: true,
          data: productsWithCategory,
        }
      } else {
        return {
          success: false,
          data: [],
        }
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async updateProduct(id: string, updateDto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        data: updateDto,
        where: { id },
      })

      return { success: true, data: product }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }
}
