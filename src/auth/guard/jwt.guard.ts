import { ExecutionContext } from "@nestjs/common"
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
      return false
    }
    return super.canActivate(context)
  }
}
