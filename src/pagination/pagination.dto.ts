import { Prisma } from "@prisma/client"
import { IsOptional, IsString } from "class-validator"

export class GetDataDto {
  @IsOptional()
  limit?: number

  @IsOptional()
  offset?: number

  @IsOptional()
  @IsString()
  sort?: string // e.g., "name:asc"

  @IsOptional()
  @IsString()
  filter?: string // e.g., "name:like:john"
}

export interface Pagination {
  page: number // Current page
  size: number // Number of items per page
  limit: number // Same as 'size'
  offset: number // Number of items to skip
}

export enum FilterRule {
  EQUALS = "eq",
  NOT_EQUALS = "neq",
  GREATER_THAN = "gt",
  GREATER_THAN_OR_EQUALS = "gte",
  LESS_THAN = "lt",
  LESS_THAN_OR_EQUALS = "lte",
  LIKE = "like",
  NOT_LIKE = "nlike",
  IN = "in",
  NOT_IN = "nin",
  IS_NULL = "isnull",
  IS_NOT_NULL = "isnotnull",
}
export interface Filtering {
  property: string // The field to filter by, e.g., 'name', 'email', etc.
  rule: FilterRule // The filtering rule (e.g., eq, like, gt, lt)
  value: string // The value to filter by
}

export const getWhere = (filter: Filtering): Prisma.UserWhereInput => {
  if (!filter) return {}

  const { property, rule, value } = filter

  switch (rule) {
    case FilterRule.EQUALS:
      return { [property]: value }
    case FilterRule.NOT_EQUALS:
      return { [property]: { not: value } }
    case FilterRule.GREATER_THAN:
      return { [property]: { gt: value } }
    case FilterRule.GREATER_THAN_OR_EQUALS:
      return { [property]: { gte: value } }
    case FilterRule.LESS_THAN:
      return { [property]: { lt: value } }
    case FilterRule.LESS_THAN_OR_EQUALS:
      return { [property]: { lte: value } }
    case FilterRule.LIKE:
      return { [property]: { contains: value, mode: "insensitive" } }
    case FilterRule.NOT_LIKE:
      return { [property]: { not: { contains: value, mode: "insensitive" } } }
    case FilterRule.IN:
      return { [property]: { in: value.split(",") } }
    case FilterRule.NOT_IN:
      return { [property]: { notIn: value.split(",") } }
    case FilterRule.IS_NULL:
      return { [property]: null }
    case FilterRule.IS_NOT_NULL:
      return { [property]: { not: null } }
    default:
      return {}
  }
}
