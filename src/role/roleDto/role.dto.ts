import { IsString, IsNotEmpty } from "class-validator"

export class RoleDto {
  id
  @IsString()
  @IsNotEmpty()
  role_name
}
