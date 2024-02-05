import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../BaseHttpService/base-http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> extends BaseHttpService {
  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    route: String
  ) {
    super();
    this.baseUrl += route;
  }

  // Créer une nouvelle entité
  create(entity: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity);
  }

  // Récupérer toutes les entités
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  // Récupérer par page
  getByPage(pageIndex, limit): Observable<T[]> {
    return this.http.get<T[]>(
      this.baseUrl + '/getByPage/' + pageIndex + '/' + limit
    );
  }

  // Récupérer une entité par ID
  getById(id: string): Observable<T> {
    const url = `${this.baseUrl}/getById/${id}`;
    return this.http.get<T>(url);
  }

  // Mettre à jour une entité
  update(id: string, entity: T): Observable<T> {
    const url = `${this.baseUrl}/${id}`;
    console.log(url);
    return this.http.put<T>(url, entity);
  }

  // Supprimer une entité par ID
  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
