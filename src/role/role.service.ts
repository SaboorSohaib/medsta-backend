import { Injectable } from "@nestjs/common"
import { RoleDto } from "./roleDto"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(dto: RoleDto) {
    try {
      const role = await this.prisma.role.create({
        data: {
          role_name: dto.role_name,
        },
      })
      return role
    } catch (error) {
      throw error
    }
  }
}
