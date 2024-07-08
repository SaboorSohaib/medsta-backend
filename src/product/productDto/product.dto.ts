import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator"

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_title

  @IsNumber()
  @IsNotEmpty()
  product_price

  @IsString()
  @IsNotEmpty()
  product_photo

  @IsString()
  @IsNotEmpty()
  product_type

  @IsString()
  @IsNotEmpty()
  product_description

  @IsString()
  @IsNotEmpty()
  manufacturing

  @IsString()
  @IsNotEmpty()
  product_handle

  @IsNotEmpty()
  @IsNumber()
  category_id

  @IsBoolean()
  product_status

  @IsString()
  life

  in_stock
  product_before_off_price
  product_rating
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  product_title

  @IsNumber()
  @IsNotEmpty()
  product_price

  @IsString()
  @IsNotEmpty()
  product_photo

  @IsString()
  @IsNotEmpty()
  product_type

  @IsString()
  @IsNotEmpty()
  product_description

  @IsString()
  @IsNotEmpty()
  manufacturing

  @IsString()
  @IsNotEmpty()
  product_handle

  @IsNotEmpty()
  @IsNumber()
  category_id

  @IsBoolean()
  product_status

  @IsString()
  life
}
