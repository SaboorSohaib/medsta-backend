import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common"
import { AddressService } from "./address.service"
import { UpdateAddressDto, createAddressDto } from "./addressDto"
import { JwtGuard } from "src/auth/guard"
import { IsAdminGuard } from "src/auth/guard/is-admin.guard"

@Controller("address")
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post("add-address")
  createAddress(@Body() createBlog: createAddressDto): Promise<any> {
    return this.addressService.createAddress(createBlog)
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  @Get("all-addreses")
  getAllAddreses() {
    return this.addressService.getAllAddreses()
  }

  @Get(":id")
  getSingleAddress(@Param("id") id: string) {
    return this.addressService.getSingleAddress(id)
  }

  @Put(":id")
  async updateSingleAddress(
    @Param("id") id: string,
    @Body() updateDto: UpdateAddressDto,
  ) {
    try {
      const updateAddress = await this.addressService.updateAddress(
        id,
        updateDto,
      )
      return updateAddress
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
