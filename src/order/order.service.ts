import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateOrder, UpdateOrder } from "./orderDto"
import * as cuid from "cuid"
import { Pagination } from "src/pagination/pagination.dto"
import { Order } from "@prisma/client"

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createOrderDto: CreateOrder) {
    try {
      const prefixedId = "order_" + cuid()
      const { products, user_address, total_products, total_price } =
        createOrderDto

      // A functon to check the total count of products and products comparing all products price to total price
      const validateOrder = (
        products: any[],
        total_products: number,
        total_price: number,
      ) => {
        if (total_products !== products.length) {
          throw new ForbiddenException(
            `Total products count does not match the products array length`,
          )
        }

        const calculatedPrice = products.reduce((sum, product) => {
          return sum + product.product_price * product.quantity
        }, 0)

        if (total_price !== calculatedPrice) {
          throw new ForbiddenException(
            `Total price does not match the sum of the products array price`,
          )
        }
      }
      validateOrder(products, total_products, total_price)

      // This is for checking product id if they are exist in the database
      const productIds = products.map((product) => product.id)
      const foundProducts = await this.prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        select: { id: true },
      })
      if (foundProducts.length !== productIds.length) {
        const foundProductIds = foundProducts.map((product) => product.id)
        const missingProductIds = productIds.filter(
          (id) => !foundProductIds.includes(id),
        )
        throw new ForbiddenException(
          `Products with IDs ${missingProductIds.join(", ")} do not exist`,
        )
      }

      // This is for checking the address Id
      const address = await this.prisma.address.findUnique({
        where: { id: user_address },
      })
      if (!address) {
        throw new ForbiddenException(
          `address with ${address} id does not exist`,
        )
      }
      const productsJson = JSON.stringify(products)
      const order = await this.prisma.order.create({
        data: {
          id: prefixedId,
          products: productsJson,
          first_name: createOrderDto.first_name,
          last_name: createOrderDto.last_name,
          phone_number: createOrderDto.phone_number,
          email: createOrderDto.email,
          total_price: createOrderDto.total_price,
          total_product: createOrderDto.total_products,
          order_status: createOrderDto.order_status || "pending",
          user_address: createOrderDto.user_address,
        },
      })
      return {
        success: true,
        data: {
          ...order,
          products:
            typeof order.products === "string"
              ? JSON.parse(order.products as string)
              : [],
        },
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async getAllOrders(paginationParams: Pagination): Promise<{
    success: boolean
    data?: any[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    try {
      const allOrders: Order[] = await this.prisma.order.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: paginationParams.limit,
        skip: paginationParams.offset,
      })
      const userAddressIds = allOrders.map((order) => order.user_address)
      const addresses = await this.prisma.address.findMany({
        where: {
          id: {
            in: userAddressIds,
          },
        },
      })
      const addressMap = addresses.reduce((map, address) => {
        map[address.id] = address
        return map
      }, {})
      const formattedOrders = allOrders.map((order) => ({
        ...order,
        user_address: addressMap[order.user_address],
        products:
          typeof order.products === "string"
            ? JSON.parse(order.products as string)
            : [],
      }))
      const totalItems = await this.prisma.order.count()
      return {
        success: true,
        data: formattedOrders,
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

  async getSingleOrder(id: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: id },
      })
      const address = await this.prisma.address.findUnique({
        where: { id: order?.user_address },
      })
      const orderWithAddress = {
        ...order,
        user_address: address,
        products:
          typeof order.products === "string"
            ? JSON.parse(order.products as string)
            : [],
      }
      return {
        success: true,
        data: orderWithAddress,
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async getOrderByEmail(
    paginationParams: Pagination,
    email: string,
  ): Promise<{
    success: boolean
    data?: any[]
    totalItems?: number
    offset?: number
    limit?: number
    error?: string
  }> {
    try {
      const orders = await this.prisma.order.findMany({
        where: { email: email },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: paginationParams.limit,
        skip: paginationParams.offset,
      })
      const totalItems = await this.prisma.order.count({
        where: { email: email },
      })
      const formattedOrders = orders.map((order) => ({
        ...order,
        products:
          typeof order.products === "string"
            ? JSON.parse(order.products as string)
            : [],
      }))
      return {
        success: true,
        data: formattedOrders,
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

  async getOrderCountByEmail(email: string) {
    try {
      const orders = await this.prisma.order.findMany({
        where: { email: email },
      })
      const pending = orders.filter((order: any) => {
        return order.order_status === "pending"
      })
      const processing = orders.filter((order: any) => {
        return order.order_status === "processed"
      })
      const picked = orders.filter((order: any) => {
        return order.order_status === "picked"
      })
      const complete = orders.filter((order: any) => {
        return order.order_status === "complete"
      })
      const products = [
        { pending: pending.length },
        { processing: processing.length },
        { picked: picked.length },
        { complete: complete.length },
      ]
      return {
        success: true,
        data: products,
      }
    } catch (error: any) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }

  async updateOrder(id: string, updateDto: UpdateOrder) {
    try {
      const fieldsToUpdate = Object.keys(updateDto)
      if (fieldsToUpdate.length > 1) {
        const firstField = fieldsToUpdate[0]
        const extraFields = fieldsToUpdate.slice(1)
        throw new BadRequestException(
          `Only one column can be updated at a time. You tried to update: ${extraFields.join(", ")} in addition to ${firstField}.`,
        )
      }
      if (!id) {
        throw new BadRequestException(`${id} is not exist`)
      }
      const order = await this.prisma.order.update({
        data: updateDto,
        where: { id },
      })

      return {
        success: true,
        data: {
          ...order,
          products:
            typeof order.products === "string"
              ? JSON.parse(order.products as string)
              : [],
        },
      }
    } catch (error) {
      if (error) {
        throw new NotFoundException(error.message)
      }
    }
  }
}
