import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { BaseHttpService } from '../../data/BaseHttpService/base-http.service';
import { Router } from '@angular/router';
import { SignUpModel } from 'src/app/models/signUp.model';
import jwt_decode from 'jwt-decode';
import { UploadEvent } from 'primeng/fileupload';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  constructor(private http: HttpClient, private route: Router) {
    super();
  }

  // Méthode pour enregistrer un utilisateur
  signUp(signUpForm: SignUpModel, photo: File) {
    const formData = new FormData();
    console.log(photo);
    formData.append('photo', photo, photo.name);
    formData.append('signUpForm', JSON.stringify(signUpForm));
    return this.http.post(`${this.baseUrl}auth/signup`, formData);
  }

  sendNewValidationEmail() {
    return this.http.post(
      `${this.baseUrl}auth/sendNewValidationEmail/${
        this.getCurrentUser()['_id']
      }`,
      {}
    );
  }

  validateEmail(token) {
    return this.http.post(
      `${this.baseUrl}auth/validateEmail/${this.getCurrentUser()['_id']}`,
      { token: token }
    );
  }

  // Méthode pour se connecter
  login(credentials: CredentialsModel): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/login`, credentials);
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('current-user');
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  isValid(): boolean {
    return (
      JSON.parse(localStorage.getItem('current-user') || '{}').isValid || false
    );
  }

  // Récupère l'utilisateur actuel
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('current-user') || '{}');
  }

  saveToken(token) {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('current-user', JSON.stringify(jwt_decode(token)));
  }
}
