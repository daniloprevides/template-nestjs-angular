import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResultDTO } from "../dto/result.dto";

export interface Response<Any> {
  data: any;
}

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url;
    return next
      .handle()
      .pipe(
        map(
          (data) =>
            ({
              error: false,
              timestamp: new Date().toISOString(),
              path: url,
              data: data,
            } as ResultDTO<any>)
        )
      );
  }
}
