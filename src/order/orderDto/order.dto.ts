import { Type } from "class-transformer"
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator"

class Product {
  @IsString()
  id: string

  @IsString()
  product_title: string

  @IsString()
  product_photo: string

  @IsNumber()
  quantity: number

  @IsNumber()
  product_price: number
}
export class CreateOrder {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsString()
  @IsNotEmpty()
  phone_number: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsNumber()
  @IsNotEmpty()
  total_price: number

  @IsNumber()
  @IsNotEmpty()
  total_products: number

  @IsString()
  @IsNotEmpty()
  user_address: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[]

  order_notes: string
  order_status: string
}

export class UpdateOrder {
  order_status: string
}
