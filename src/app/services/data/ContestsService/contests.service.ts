import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { ContestModel } from 'src/app/models/contest.model';

@Injectable({
  providedIn: 'root',
})
export class ContestsService extends CrudService<ContestModel> {
  constructor(http: HttpClient) {
    super(http, 'contests');
  }
}
