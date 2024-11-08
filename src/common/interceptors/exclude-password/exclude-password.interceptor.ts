import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data.data) {
          data.data = data.data.map(user => {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
          });
        }
        else if (data && data.password){
          const {password, ...userWithoutPassword} = data;
          return userWithoutPassword;
        }
        return data;
      })
    );
  }
}