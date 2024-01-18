import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { AuthService } from '../../services/AuthService/auth.service'; // Importez votre AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken(); // Obtenez le token depuis AuthService
    if (!authToken) {
      return next.handle(req);
    }
    if (!(req.body instanceof FormData)) {
      req = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('x-auth-token', authToken),
      });
    } else {
      req = req.clone({
        headers: req.headers.set('x-auth-token', authToken),
      });
    }
    return next.handle(req);
  }
}
