import {
  IsEmail,
  IsNotEmpty,
  IsString,
  // IsStrongPassword,
} from "class-validator"

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  first_name
  last_name
  photo
  role

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email

  // @IsStrongPassword()
  @IsNotEmpty()
  password

  @IsString()
  @IsNotEmpty()
  phone_number

  // @IsNotEmpty()
  // role_id
}

export class SigninDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email

  @IsNotEmpty()
  password
}

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  first_name
  last_name
  photo
  role

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email

  // @IsStrongPassword()
  @IsNotEmpty()
  password

  @IsString()
  @IsNotEmpty()
  phone_number
}
