import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { PoolModel } from 'src/app/models/pool.model';

@Injectable({
  providedIn: 'root',
})
export class PoolsService extends CrudService<PoolModel> {
  constructor(http: HttpClient) {
    super(http, 'pools');
  }
}
