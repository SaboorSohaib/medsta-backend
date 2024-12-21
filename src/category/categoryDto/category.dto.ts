import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name: string

  @IsNotEmpty()
  @IsString()
  category_handle: string

  @IsNotEmpty()
  @IsString()
  category_photo: string
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name: string

  @IsNotEmpty()
  @IsString()
  category_handle: string

  @IsNotEmpty()
  @IsString()
  category_photo: string
}
