import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 422:
            console.warn('[API] Error de validación:', error.error);
            break;
          case 404:
            console.warn('[API] Recurso no encontrado:', req.url);
            break;
          case 0:
            console.warn('[API] Sin conexión con el servidor:', req.url);
            break;
          default:
            console.error(`[API] Error ${error.status}:`, error.message);
        }
      }
      return throwError(() => error);
    }),
  );
};
