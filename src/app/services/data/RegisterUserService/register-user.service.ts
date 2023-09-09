import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from 'src/app/models/register.model';
import { CrudService } from '../CRUDService/crud.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService extends CrudService<RegisterModel> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
