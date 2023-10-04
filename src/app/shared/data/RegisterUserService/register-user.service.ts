import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpModel } from 'src/app/models/signUp.model';
import { CrudService } from '../CRUDService/crud.service';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService extends CrudService<SignUpModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'users');
  }
}
