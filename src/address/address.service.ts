import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { UpdateAddressDto, createAddressDto } from "./addressDto"
import cuid from "cuid"

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  async createAddress(createDto: createAddressDto) {
    try {
      const userId = await this.prisma.user.findUnique({
        where: { id: createDto.user_id },
      })
      if (!userId) {
        throw new ForbiddenException(`User id does not exist`)
      }
      const prefixedId = "address_" + cuid()
      const address = await this.prisma.address.create({
        data: {
          id: prefixedId,
          country: createDto.country,
          city: createDto.city,
          state: createDto.state,
          zip_code: createDto.zip_code,
          user_id: createDto.user_id,
        },
      })
      return { success: true, data: address }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getAllAddreses() {
    try {
      const allAddreses = await this.prisma.address.findMany()
      if (allAddreses) {
        return { success: true, data: allAddreses }
      } else {
        return { success: false, data: [] }
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getSingleAddress(id: string) {
    try {
      const address = await this.prisma.address.findUnique({
        where: { id: id },
      })
      if (address) {
        return { success: true, data: address }
      } else {
        return { success: false, data: {} }
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async updateAddress(id: string, updateDto: UpdateAddressDto) {
    try {
      const { user_id, country, city, zip_code, state } = updateDto
      const user = await this.prisma.user.findUnique({ where: { id: user_id } })
      if (!user) {
        throw new BadRequestException(`User with ID ${user_id} does not exist`)
      }
      const address = await this.prisma.address.update({
        data: {
          user_id,
          country,
          city,
          zip_code,
          state,
        },
        where: { id },
      })

      return { success: true, data: address }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
