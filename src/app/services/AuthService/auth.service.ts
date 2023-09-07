import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../BaseHttpService/base-http.service';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private invalidLogin: Boolean = false;
  constructor(private HttpClient: HttpClient, private router: Router) {
    super();
    this.baseUrl += 'auth';
  }

  login(credentials: CredentialsModel) {
    return this.HttpClient.post(this.baseUrl, credentials);
  }
}
