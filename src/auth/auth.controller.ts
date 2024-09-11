import {
  Body,
  Controller,
  Delete,
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
  Signup(@Body() dto: AuthDto, @Res({ passthrough: true }) res) {
    return this.authService.Signup(dto, res)
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  Signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res) {
    return this.authService.Signin(dto, res)
  }

  @Delete("signout")
  async signout(@Res({ passthrough: true }) res) {
    res.cookie("token", "", { expires: new Date() })
    return {}
  }
}
