import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpService,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SecurityGuard implements CanActivate {
  logger = new Logger(SecurityGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private httpService:HttpService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authUrl = `${process.env.AUTH_URL}`;
    let isValid = false;
    const scopes: string[] = this.reflector.get<string[]>(
      "scopes",
      context.getHandler()
    );
    if (!scopes) {      
      this.logger.debug(`Scopes not required for this method. Allowing access.`);
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) return false;
    this.logger.debug(`Checking scopes (${scopes.join(',')}) in ${authUrl}`)

    try {
      
      const info = await this.httpService.get<{data: {payload: {scopes: Array<string>}}}>(authUrl,   {
        headers: { Authorization: authorizationHeader }
      }).toPromise();        
      if (!info?.data) return false;
      if (info.status != 200) return false;
      
      this.logger.debug(`User Scopes: ${info.data?.data?.payload?.scopes} , needed scopes: ${scopes?.join(',')}`)
      scopes.forEach(scope => {
        if (info.data?.data?.payload?.scopes?.indexOf(scope) >= 0){
          this.logger.debug(`At least one scope was found. Allowing access.`);
          isValid = true;
        }
      })

    }catch(ex){
      this.logger.error(ex);
      return false;
    }


    if (!isValid){
      this.logger.debug(`Any scope matching requirements. Denying access.`);      
    }


    return isValid;
  }
}
