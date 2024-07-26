import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "src/prisma/prisma.service"
import { Request as RequestType } from "express"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get("JWT_SECRET"),
    })
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && "token" in req.cookies && req.cookies.token.length > 0) {
      return req.cookies.token
    }
    return null
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    })
    if (!user) {
      return null
    }
    return user
  }
}
