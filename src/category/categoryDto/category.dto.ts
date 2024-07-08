import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name

  @IsNotEmpty()
  @IsString()
  category_handle

  @IsNotEmpty()
  @IsString()
  category_images
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name

  @IsNotEmpty()
  @IsString()
  category_handle

  @IsNotEmpty()
  @IsString()
  category_images
}
