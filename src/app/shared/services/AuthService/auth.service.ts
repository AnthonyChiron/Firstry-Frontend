import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private loggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private route: Router) {
    super();
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  }

  // Méthode pour enregistrer un utilisateur
  signUp(signUpForm: SignUpModel, photo) {
    const formData = new FormData();
    formData.append('photo', photo);
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

  validateEmail(token, userId) {
    return this.http.post(`${this.baseUrl}auth/validateEmail/${userId}`, {
      token: token,
    });
  }

  // Méthode pour se connecter
  login(credentials: CredentialsModel): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/login`, credentials);
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('current-user');
    this.loggedInSubject.next(false);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  getToken(): string {
    return localStorage.getItem('auth-token') || '';
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
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

  isCurrentUserRider(): boolean {
    return this.getCurrentUser().role == 'rider';
  }

  isCurrentUserOrganizer(): boolean {
    return this.getCurrentUser().role == 'organizer';
  }

  saveToken(token) {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('current-user', JSON.stringify(jwt_decode(token)));
    this.loggedInSubject.next(true);
  }

  updateRider(rider) {
    let newUser = JSON.parse(localStorage.getItem('current-user'));
    newUser.rider = rider;
    localStorage.setItem('current-user', JSON.stringify(newUser));
  }

  updateOrganizer(organizer) {
    let newUser = JSON.parse(localStorage.getItem('current-user'));
    newUser.organizer = organizer;
    localStorage.setItem('current-user', JSON.stringify(newUser));
  }

  updateUserNewEmail(user) {
    let newUser = JSON.parse(localStorage.getItem('current-user'));
    newUser.email = user.email;
    newUser.newEmail = null;
    localStorage.setItem('current-user', JSON.stringify(newUser));
  }
}
