import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import {
  CategoryModel,
  CategoryRegistrationModelDTO,
} from 'src/app/models/category.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends CrudService<CategoryModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'categories');
  }

  // Récupérer toutes les entités
  getAllByContestId(contestId): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(
      this.baseUrl + '/getAllByContestId/' + contestId
    );
  }

  getAllCategoriesForRegistrations(
    contestId
  ): Observable<CategoryRegistrationModelDTO[]> {
    return this.http.get<CategoryRegistrationModelDTO[]>(
      this.baseUrl + '/getAllCategoriesForRegistrations/' + contestId
    );
  }

  createCategory(category: any): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.baseUrl + '/', category);
  }

  updateCategory(id: string, category: any): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(this.baseUrl + '/' + id, category);
  }
}
