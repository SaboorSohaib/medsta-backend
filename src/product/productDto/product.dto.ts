import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from "class-validator"

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
  product_handle: string

  @IsNotEmpty()
  @IsString()
  category_id: string

  @IsBoolean()
  product_status: boolean

  @IsOptional()
  @IsString()
  life?: string

  @IsOptional()
  @IsString()
  manufacturing?: string

  @IsOptional()
  @IsBoolean()
  in_stock?: boolean

  @IsOptional()
  @IsNumber()
  product_before_off_price?: number

  @IsOptional()
  @IsNumber()
  product_rating?: number
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
  @IsOptional()
  manufacturing: string

  @IsString()
  @IsNotEmpty()
  product_handle: string

  @IsNotEmpty()
  @IsString()
  category_id: string

  @IsBoolean()
  product_status: boolean

  @IsOptional()
  life: string
}
