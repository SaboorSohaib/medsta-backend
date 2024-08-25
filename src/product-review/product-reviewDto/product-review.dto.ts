import { Transform } from "class-transformer"
import { IsNotEmpty, IsString, IsDate, Min, Max, IsInt } from "class-validator"

export class CreateProductReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewer_name: string

  @IsNotEmpty()
  @IsString()
  reviewer_email: string

  @IsNotEmpty()
  @IsString()
  reviewer_photo: string

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  review_post_date: Date

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  review_rating: number

  @IsNotEmpty()
  @IsString()
  review_description: string

  @IsNotEmpty()
  @IsString()
  product_id: string
}

export class UpdateProductReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewer_name: string

  @IsNotEmpty()
  @IsString()
  reviewer_email: string

  @IsNotEmpty()
  @IsString()
  reviewer_photo: string

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  review_post_date: Date

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  review_rating: number

  @IsNotEmpty()
  @IsString()
  review_description: string

  @IsNotEmpty()
  @IsString()
  product_id: string
}
