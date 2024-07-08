import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Get,
  ParseIntPipe,
  Param,
  Put,
} from "@nestjs/common"
import { CreateProductDto, UpdateProductDto } from "./productDto"
import { ProductService } from "./product.service"
import { Product } from "@prisma/client"

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post("create-product")
  createProduct(@Body() createDto: CreateProductDto): Promise<any> {
    return this.productService.createProduct(createDto)
  }

  @Get("get-all-products")
  async getAllProducts(): Promise<Product[] | null> {
    try {
      const allProducts = this.productService.getAllProducts()
      if (allProducts) {
        return allProducts
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException("Products are not found")
      }
    }
  }

  @Get(":id")
  async getSingleProduct(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Product | null> {
    try {
      const product = await this.productService.getSingleProduct(id)
      if (product) {
        return product
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException("Product is not found")
      }
    }
  }

  @Put(":id")
  async updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body() UpdateProductDto: UpdateProductDto,
  ) {
    try {
      const updateSignleProduct = await this.productService.updateProduct(
        +id,
        UpdateProductDto,
      )
      if (updateSignleProduct) {
        return updateSignleProduct
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException("Product is not updated")
      }
    }
  }
}
