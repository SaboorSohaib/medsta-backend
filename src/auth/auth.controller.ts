import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto, SigninDto } from "./dto"
import { JwtService } from "@nestjs/jwt"

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post("signup")
  Signup(@Body() dto: AuthDto) {
    return this.authService.Signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  Signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res) {
    res.cookie("token", this.jwtService.sign(dto), {
      expires: new Date(Date.now() + 3600000),
    })
    return this.authService.Signin(dto)
  }

  @Get("signout")
  async signout(@Res({ passthrough: true }) res) {
    res.cookie("token", "", { expires: new Date() })
    return {}
  }
}
