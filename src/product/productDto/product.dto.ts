import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator"

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_title: string

  @IsNumber()
  @IsNotEmpty()
  product_price: number

  @IsString()
  @IsNotEmpty()
  product_photo: string

  @IsString()
  @IsNotEmpty()
  product_type: string

  @IsString()
  @IsNotEmpty()
  product_description: string

  @IsString()
  @IsNotEmpty()
  manufacturing: string

  @IsString()
  @IsNotEmpty()
  product_handle: string

  @IsNotEmpty()
  @IsNumber()
  category_id: number

  @IsBoolean()
  product_status

  @IsString()
  life: string

  in_stock
  product_before_off_price
  product_rating
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  product_title: string

  @IsNumber()
  @IsNotEmpty()
  product_price: number

  @IsString()
  @IsNotEmpty()
  product_photo: string

  @IsString()
  @IsNotEmpty()
  product_type: string

  @IsString()
  @IsNotEmpty()
  product_description: string

  @IsString()
  @IsNotEmpty()
  manufacturing: string

  @IsString()
  @IsNotEmpty()
  product_handle: string

  @IsNotEmpty()
  @IsNumber()
  category_id: number

  @IsBoolean()
  product_status

  @IsString()
  life: string
}
