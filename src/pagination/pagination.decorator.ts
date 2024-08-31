import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common"
import { Request } from "express"

export interface Pagination {
  page: number
  size: number
  limit: number
  offset: number
}

export const PaginationParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest()
    const page = parseInt(req.query.page as string, 10) || 1
    const size = parseInt(req.query.size as string, 10) || 10

    if (isNaN(page) || page < 1) {
      throw new BadRequestException("Invalid page number")
    }
    if (isNaN(size) || size < 1 || size > 100) {
      throw new BadRequestException("Invalid page size (min 1, max 100)")
    }

    const limit = size
    const offset = (page - 1) * limit

    return { page, size, limit, offset }
  },
)
