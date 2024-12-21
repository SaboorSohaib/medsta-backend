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
} from "@nestjs/common"
import { OrderService } from "./order.service"
import { CreateOrder, UpdateOrder } from "./orderDto"
import { JwtGuard } from "src/auth/guard"
import { PaginationParams } from "src/pagination/pagination.decorator"
import { GetDataDto, Pagination } from "src/pagination/pagination.dto"
import { IsAdminGuard } from "src/auth/guard/is-admin.guard"

@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Post("create-order")
  createProduct(@Body() createOrderDto: CreateOrder): Promise<any> {
    return this.orderService.createProduct(createOrderDto)
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Get("get-all-orders")
  async getAllProducts(
    @Query() getDataDto: GetDataDto,
    @PaginationParams() paginationParams: Pagination,
  ): Promise<{
    success: boolean
    data?: any[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    return await this.orderService.getAllOrders(paginationParams)
  }
  @Get(":id")
  async getSingleOrder(@Param("id") id: string) {
    return this.orderService.getSingleOrder(id)
  }

  @UseGuards(JwtGuard)
  @Get("getOrderByCountEmail/:email")
  async getOrderCountByEmail(@Param("email") email: string) {
    return this.orderService.getOrderCountByEmail(email)
  }

  @UseGuards(JwtGuard)
  @Get("getOrderByEmail/:email")
  async getOrderByEmail(
    @Query() getDataDto: GetDataDto,
    @PaginationParams() paginationParams: Pagination,
    @Param("email") email: string,
  ): Promise<{
    success: boolean
    data?: any[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    return await this.orderService.getOrderByEmail(paginationParams, email)
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Put(":id")
  async updateOrder(@Param("id") id: string, @Body() updateOrder: UpdateOrder) {
    return this.orderService.updateOrder(id, updateOrder)
  }
  catch(error) {
    if (error) {
      throw new NotFoundException(error.message)
    }
  }
}
