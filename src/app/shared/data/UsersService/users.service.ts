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

  updatePassword(userId, password) {
    const url = `${this.baseUrl}/updatePassword/${userId}`;
    return this.http.post(url, { newPassword: password });
  }
}
