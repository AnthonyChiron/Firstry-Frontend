import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends CrudService<UserModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'users');
  }

  isEmailAvailable(email) {
    const url = `${this.baseUrl}/isEmailAvailable`;
    return this.http.post(url, { email: email });
  }

  updateEmail(userId, newEmail) {
    const url = `${this.baseUrl}/updateEmail/${userId}`;
    return this.http.post(url, { newEmail: newEmail });
  }

  updatePassword(userId, newPassword) {
    const url = `${this.baseUrl}/updatePassword/${userId}`;
    return this.http.post(url, { newPassword: newPassword });
  }

  validateNewEmail(token) {
    const url = `${this.baseUrl}/validateNewEmail/${token}`;
    return this.http.post(url, {});
  }

  validateNewPassword(token) {
    const url = `${this.baseUrl}/validateNewPassword/${token}`;
    return this.http.post(url, {});
  }

  resetPassword(email) {
    const url = `${this.baseUrl}/resetPassword/`;
    return this.http.post(url, { email: email });
  }

  checkResetPasswordToken(token) {
    const url = `${this.baseUrl}/checkResetPasswordToken/${token}`;
    return this.http.post(url, {});
  }

  updateResetPassword(token, newPassword) {
    const url = `${this.baseUrl}/resetPassword/${token}`;
    return this.http.post(url, { newPassword: newPassword });
  }

  getUserByRiderId(riderId) {
    const url = `${this.baseUrl}/getUserByRiderId/${riderId}`;
    return this.http.get(url, {});
  }
}
