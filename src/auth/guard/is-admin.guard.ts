import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common"

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const role: string | undefined = request.user?.role
    return role === "admin"
  }
}
