import { IsString, IsNotEmpty, IsInt } from "class-validator"

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
  blog_category: string

  @IsNotEmpty()
  @IsInt()
  user_id: number

  @IsNotEmpty()
  @IsInt()
  category_id: number
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

  @IsNotEmpty()
  @IsString()
  blog_category: string

  @IsInt()
  @IsNotEmpty()
  user_id: number

  @IsInt()
  @IsNotEmpty()
  category_id: number
}
