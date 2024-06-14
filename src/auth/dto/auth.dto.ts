import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator"

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  first_name
  last_name
  photo

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email

  @IsStrongPassword()
  @IsNotEmpty()
  password

  @IsString()
  @IsNotEmpty()
  phone_number

  @IsNotEmpty()
  role_id
}
