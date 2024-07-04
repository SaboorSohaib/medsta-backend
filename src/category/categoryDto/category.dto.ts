import { IsNotEmpty, IsString } from "class-validator"
import exp from "constants"

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name
  category_handle
  category_images
}

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  category_name
  category_handle
  category_images
}
