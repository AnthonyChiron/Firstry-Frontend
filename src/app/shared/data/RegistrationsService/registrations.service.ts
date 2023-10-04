import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from 'src/app/models/registration.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService extends CrudService<RegistrationModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'registrations');
  }
}
