import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends CrudService<UserModel> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }

  getByGoogleId(googleId) {
    const url = `${this.baseUrl}/getUserByGoogleId/${googleId}`;
    return this.http.get<UserModel>(url);
  }
}
