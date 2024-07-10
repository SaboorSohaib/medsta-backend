import { Transform } from "class-transformer"
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  Min,
  Max,
  IsInt,
} from "class-validator"

export class CreateProductReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewer_name

  @IsNotEmpty()
  @IsString()
  reviewer_email

  @IsNotEmpty()
  @IsString()
  reviewer_photo

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  review_post_date: Date

  @IsNotEmpty()
  @IsNumber()
  review_rating

  @IsNotEmpty()
  @IsString()
  review_description

  @IsNotEmpty()
  @IsNumber()
  product_id
}

export class UpdateProductReviewDto {
  @IsNotEmpty()
  @IsString()
  reviewer_name

  @IsNotEmpty()
  @IsString()
  reviewer_email

  @IsNotEmpty()
  @IsString()
  reviewer_photo

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  review_post_date: Date

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  review_rating

  @IsNotEmpty()
  @IsString()
  review_description

  @IsNotEmpty()
  @IsInt()
  product_id
}
