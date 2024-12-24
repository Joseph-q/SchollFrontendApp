import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';
import { ResponseErr } from './interface/responseError.interface';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Error desconocido';

      // Verificamos si el error tiene un cuerpo
      if (error.error && error.error.message) {
        // Si el error tiene la estructura ResponseErr, extraemos el mensaje
        const responseError: ResponseErr = error.error;
        errorMessage = responseError.message || 'Error sin mensaje detallado';
      } else if (error.status === 0) {
        errorMessage = 'Error de red: No se pudo conectar';
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage = `Error en la solicitud: ${error.message}`;
      } else if (error.status >= 500) {
        errorMessage = `Error en el servidor: ${error.message}`;
      }

      // Muestra la notificación con el mensaje adecuado
      notificationService.sendErrorMessage(errorMessage);

      return throwError(() => error); // Propaga el error
    })
  );
};
