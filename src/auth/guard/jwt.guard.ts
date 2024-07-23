import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Observable } from "rxjs"

export class JwtGuard extends AuthGuard("jwt") {
  constructor() {
    super()
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const cookieName = "token"
    if (!request.cookies || !request.cookies[cookieName]) {
      throw new UnauthorizedException(
        "You do not have the necessary permissions",
      )
    }
    return super.canActivate(context)
  }
}
