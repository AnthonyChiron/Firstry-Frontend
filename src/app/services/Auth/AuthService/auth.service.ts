import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../../data/BaseHttpService/base-http.service';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  constructor(private HttpClient: HttpClient, private router: Router) {
    super();
    this.baseUrl += 'auth';
  }

  login(credentials: CredentialsModel) {
    return this.HttpClient.post(this.baseUrl, credentials).pipe(
      map((result) => {
        if ('token' in result) {
          console.log('Succès:', result.token);
          localStorage.setItem('access_token', <string>result.token);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    // jwtHelper.decodeToken(<string>localStorage.getItem('access_token'));
    const isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('access_token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);
  }
}
