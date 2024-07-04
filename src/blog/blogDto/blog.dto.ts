import { IsString, IsNotEmpty } from "class-validator"

export class BlogDto {
  id

  @IsNotEmpty()
  @IsString()
  blog_title
  blog_description
}
