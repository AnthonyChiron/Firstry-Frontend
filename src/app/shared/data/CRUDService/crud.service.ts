import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../BaseHttpService/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> extends BaseHttpService {
  constructor(private http: HttpClient, route: String) {
    super();
    this.baseUrl += route;
    console.log(this.baseUrl);
  }

  // Créer une nouvelle entité
  create(entity: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity);
  }

  // Récupérer toutes les entités
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  // Récupérer une entité par ID
  getById(id: number): Observable<T> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<T>(url);
  }

  // Mettre à jour une entité
  update(id: number, entity: T): Observable<T> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<T>(url, entity);
  }

  // Supprimer une entité par ID
  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
