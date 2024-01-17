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
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      }),
    });
    return next.handle(authReq);
  }
}
