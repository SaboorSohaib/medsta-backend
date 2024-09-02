import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsString()
  @IsNotEmpty()
  photo: string

  role: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  phone_number: string
}

export class SigninDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsString()
  @IsNotEmpty()
  photo: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  phone_number: string
}

export class UpdatePassword {
  @IsString()
  @IsNotEmpty()
  password: string
}
