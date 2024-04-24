import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as toastr from 'toastr';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  toastrMessage: string = '';
  constructor(private router: Router) {
    toastr.options.closeButton = false;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = false;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpEvent<any>, caught: Observable<HttpEvent<any>>) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toastrMessage = err.error.message;
            toastr.error(this.toastrMessage);

            console.log(err.error.message);
          } else if (err.status === 403) {
            this.toastrMessage = err.error.message;
            toastr.error(this.toastrMessage);
            console.log(err.error.message);
          } else if (err.status === 404) {
            console.log(err.error.message);
            this.toastrMessage = err.error.message;
            toastr.error(this.toastrMessage);
          } else if (err.status === 504) {
            // Timeout
            this.toastrMessage =
              'La operación se está demorando. Intente de nuevo en un momento.';
            toastr.info(this.toastrMessage);
            console.log(err.error.message);
          } else {
            /*   this.toastrMessage = "Ocurrio un error desconocido."; */
            this.toastrMessage = err.error.error;
            toastr.error(this.toastrMessage);
            console.log(err.error.message);
          }
        }
        return [];
      }),
      tap((response) => {
        if (response instanceof HttpResponse && response.status === 200) {
          if (response.body.message != undefined) {
            this.toastrMessage = response.body.message;
            toastr.success(this.toastrMessage);
          }
        }
      })
    );
  }
}
