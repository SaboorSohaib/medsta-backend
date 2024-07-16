import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class createAddressDto {
  @IsNotEmpty()
  @IsString()
  country: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsString()
  state: string

  @IsNumber()
  zip_code: number

  @IsNotEmpty()
  @IsNumber()
  user_id: number
}

export class UpdateAddressDto {
  @IsNotEmpty()
  @IsString()
  country: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsNumber()
  zip_code: number

  @IsNotEmpty()
  @IsNumber()
  user_id: number
}
