import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

// import { environment } from '#environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      // if (!environment.production && !request.url.endsWith('CheckToken'))
      //     this.logger.debug(event);
    }, (response: any) => {
      if (response instanceof HttpErrorResponse) {


        if (response.error === undefined || response.error === null) {
          console.error('An error occurred.');
        }
        else {
          console.error(response.error);
        }

      }
    }));
  }
}
