import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpModel } from 'src/app/models/signUp.model';
import { CrudService } from '../CRUDService/crud.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService extends CrudService<SignUpModel> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
