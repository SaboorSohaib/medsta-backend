import { Module } from "@nestjs/common"
import { AddressService } from "./address.service"
import { PrismaService } from "src/prisma/prisma.service"

@Module({
  providers: [PrismaService, AddressService],
})
export class AddressModule {}
