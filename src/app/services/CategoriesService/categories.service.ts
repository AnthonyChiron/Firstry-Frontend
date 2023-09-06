import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends CrudService<CategoryModel> {
  constructor(http: HttpClient) {
    super(http, 'categories');
  }
}
