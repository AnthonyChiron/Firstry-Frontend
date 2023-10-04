import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { RiderModel } from 'src/app/models/rider.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RidersService extends CrudService<RiderModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'riders');
  }
}
