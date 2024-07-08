import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateProductDto, UpdateProductDto } from "./productDto"
import { Product } from "@prisma/client"
import { dot } from "node:test/reporters"

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
      const product = await this.prisma.product.create({
        data: {
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
      return product
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }

  async getAllProducts(): Promise<Product[] | null> {
    try {
      const allProducts = await this.prisma.product.findMany()
      if (allProducts) {
        return allProducts
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }

  async getSingleProduct(id: number): Promise<Product | null> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: id },
      })
      if (product) {
        return product
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }

  async updateProduct(
    id: number,
    updateDto: UpdateProductDto,
  ): Promise<Product | null> {
    try {
      const product = await this.prisma.product.update({
        data: updateDto,
        where: { id },
      })

      return product
    } catch (error) {
      if (error) {
        throw new Error()
      }
    }
  }
}
