import { IsNotEmpty, IsString } from "class-validator"

export class sendEmailDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  message: string
}
