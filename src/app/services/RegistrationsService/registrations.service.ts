import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from 'src/app/models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService extends CrudService<RegistrationModel> {
  constructor(http: HttpClient) {
    super(http, 'registrations');
  }
}
