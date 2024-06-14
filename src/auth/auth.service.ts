import { ForbiddenException, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "src/prisma/prisma.service"
import { AuthDto } from "./dto"
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async Signup(dto: AuthDto) {
    try {
      const password = await argon.hash(dto.password)
      const roleId = await this.prisma.role.findUnique({
        where: { id: dto.role_id },
      })
      if (!roleId) {
        throw new ForbiddenException("Role id does not exist")
      }
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          first_name: dto.first_name,
          last_name: dto.last_name,
          photo: dto.photo,
          phone_number: dto.phone_number,
          role_id: dto.role_id,
        },
      })
      return this.SignInToken(user.id, user.email)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credential already Taken")
        }
      }
      return error
    }
  }

  async SignInToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    }
    const secret = this.config.get("JWT_SECRET")
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "60m",
      secret: secret,
    })

    return {
      access_token: token,
    }
  }
}
