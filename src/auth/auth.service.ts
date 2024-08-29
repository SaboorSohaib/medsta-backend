import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { AuthDto, SigninDto } from "./dto"
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { UserService } from "src/user/user.service"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import * as cuid from "cuid"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async Signup(dto: AuthDto, res: any) {
    try {
      const prefixedId = "user_" + cuid()
      const password = await argon.hash(dto.password)
      const userCount = await this.prisma.user.count()
      const user = await this.prisma.user.create({
        data: {
          id: prefixedId,
          email: dto.email,
          password,
          first_name: dto.first_name,
          last_name: dto.last_name,
          photo: dto.photo,
          phone_number: dto.phone_number,
          role:
            userCount === 0
              ? "admin"
              : userCount > 1 && dto.role === ""
                ? "user"
                : "user",
        },
      })
      return this.SignInToken(user.id, user.email, user.role, res)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credential already Taken")
        }
      }
      return error
    }
  }

  async Signin(dto: SigninDto, res) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      })
      if (!user) {
        throw new ForbiddenException("Email is incorect")
      }

      const passwordComparison = await argon.verify(user.password, dto.password)
      if (!passwordComparison) {
        throw new ForbiddenException("Credentials is incorrect")
      }
      return this.SignInToken(user.id, user.email, user.role, res)
    } catch (error) {
      if (error) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.userService.getSingleUser(payload.sub)
    if (user) {
      return user
    }
    return null
  }

  async SignInToken(
    userId: string,
    email: string,
    role: string,
    res: any,
  ): Promise<{ success: boolean; data: any }> {
    const payload = {
      sub: userId,
      email,
      role,
    }
    const secret = this.config.get("JWT_SECRET")
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "180m",
      secret: secret,
    })
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 7200000), // 1 hour
    })
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    delete user.password
    return {
      success: true,
      data: user,
    }
  }
}
