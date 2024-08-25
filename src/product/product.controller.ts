import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Get,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common"
import { CreateProductDto, UpdateProductDto } from "./productDto"
import { ProductService } from "./product.service"
import { IsAdminGuard } from "src/auth/guard/is-admin.guard"
import { JwtGuard } from "src/auth/guard"

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Post("create-product")
  createProduct(@Body() createDto: CreateProductDto): Promise<any> {
    return this.productService.createProduct(createDto)
  }

  @Get("get-all-products")
  async getAllProducts() {
    return this.productService.getAllProducts()
  }

  @Get(":id")
  async getSingleProduct(@Param("id") id: string) {
    return this.productService.getSingleProduct(id)
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Put(":id")
  async updateProduct(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updateSignleProduct = await this.productService.updateProduct(
        id,
        updateProductDto,
      )
      if (updateSignleProduct) {
        return { success: true, data: updateSignleProduct }
      } else {
        return { success: false, data: {} }
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }
}
