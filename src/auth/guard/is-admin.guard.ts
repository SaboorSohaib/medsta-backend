import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from "@nestjs/common"

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const role: string | undefined = request.user?.role
    if (role !== "admin") {
      throw new UnauthorizedException(
        "You do not have the necessary permissions",
      )
    }
    return true
  }
}
