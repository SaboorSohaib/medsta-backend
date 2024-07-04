import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto, SigninDto } from "./dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  Signup(@Body() dto: AuthDto) {
    return this.authService.Signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  Signin(@Body() dto: SigninDto) {
    return this.authService.Signin(dto)
  }
}
