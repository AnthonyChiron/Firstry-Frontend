import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { RulesModel } from 'src/app/models/rules.model';

@Injectable({
  providedIn: 'root',
})
export class RulesService extends CrudService<RulesModel> {
  constructor(http: HttpClient) {
    super(http, 'rules');
  }
}
