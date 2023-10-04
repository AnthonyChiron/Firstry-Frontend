import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { PoolModel } from 'src/app/models/pool.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PoolsService extends CrudService<PoolModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'pools');
  }
}
