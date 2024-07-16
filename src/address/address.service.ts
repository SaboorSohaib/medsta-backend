import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { UpdateAddressDto, createAddressDto } from "./addressDto"
import { Address } from "@prisma/client"

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
      const address = await this.prisma.address.create({
        data: {
          country: createDto.country,
          city: createDto.city,
          state: createDto.state,
          zip_code: createDto.zip_code,
          user_id: createDto.user_id,
        },
      })
      return address
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getAllAddreses(): Promise<Address[] | null> {
    try {
      const allAddreses = await this.prisma.address.findMany()
      if (allAddreses) {
        return allAddreses
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async getSingleAddress(id: number): Promise<Address | null> {
    try {
      const address = await this.prisma.address.findUnique({
        where: { id: id },
      })
      if (address) {
        return address
      } else {
        return null
      }
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async updateAddress(
    id: number,
    updateDto: UpdateAddressDto,
  ): Promise<Address | null> {
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

      return address
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
