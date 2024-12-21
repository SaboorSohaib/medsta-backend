import { IsString, IsNotEmpty } from "class-validator"

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  blog_title: string

  @IsNotEmpty()
  @IsString()
  blog_description: string

  @IsNotEmpty()
  @IsString()
  blog_photo: string

  @IsNotEmpty()
  @IsString()
  blog_author: string

  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsNotEmpty()
  @IsString()
  category_id: string
}

export class UpdateBlogDto {
  @IsNotEmpty()
  @IsString()
  blog_title: string

  @IsNotEmpty()
  @IsString()
  blog_description: string

  @IsNotEmpty()
  @IsString()
  blog_photo: string

  @IsNotEmpty()
  @IsString()
  blog_author: string

  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  category_id: string
}
