import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from 'src/app/models/category.model';
import { AuthService } from '../../services/AuthService/auth.service';
import { StepModel } from 'src/app/models/step.model';

@Injectable({
  providedIn: 'root',
})
export class StepsService extends CrudService<StepModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'steps');
  }
}
