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

  getByGoogleId(googleId) {
    const url = `${this.baseUrl}/getUserByGoogleId/${googleId}`;
    return this.http.get<UserModel>(url);
  }

  isEmailAvailable(email) {
    const url = `${this.baseUrl}/isEmailAvailable`;
    return this.http.post(url, { email: email });
  }
}
