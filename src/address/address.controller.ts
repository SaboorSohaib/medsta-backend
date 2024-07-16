import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common"
import { AddressService } from "./address.service"
import { UpdateAddressDto, createAddressDto } from "./addressDto"
import { Address } from "@prisma/client"

@Controller("address")
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post("add-address")
  createAddress(@Body() createBlog: createAddressDto): Promise<any> {
    return this.addressService.createAddress(createBlog)
  }

  @Get("all-addreses")
  getAllAddreses() {
    return this.addressService.getAllAddreses()
  }

  @Get(":id")
  getSingleAddress(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Address | null> {
    return this.addressService.getSingleAddress(id)
  }

  @Put(":id")
  async updateSingleAddress(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateAddressDto,
  ): Promise<Address | null> {
    try {
      const updateAddress = await this.addressService.updateAddress(
        +id,
        updateDto,
      )
      if (updateAddress) {
        return updateAddress
      } else {
        return null
      }
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
