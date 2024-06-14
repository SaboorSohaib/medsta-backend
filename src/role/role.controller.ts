import { Body, Controller, Post } from "@nestjs/common"
import { RoleService } from "./role.service"
import { RoleDto } from "./roleDto"

@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post("create-role")
  CreateRole(@Body() dto: RoleDto) {
    return this.roleService.createRole(dto)
  }
}
