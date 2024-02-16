import { filter } from 'rxjs';
import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RiderModel } from 'src/app/models/rider.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RidersService extends CrudService<RiderModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'riders');
  }

  // Récupérer par page
  getFilteredByPage(pageIndex, limit, filters) {
    // Créer un objet HttpParams pour passer les filtres en tant que paramètres d'URL
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key] != null) {
        // Assurez-vous que la valeur n'est pas null
        params = params.append(key, filters[key]);
      }
    });

    return this.http.get(
      this.baseUrl + '/getFilteredRidersByPage/' + pageIndex + '/' + limit,
      { params }
    );
  }

  updatePhoto(riderId, photo) {
    const formData = new FormData();
    formData.append('photo', photo);
    console.log(this.baseUrl);
    return this.http.put(`${this.baseUrl}/updatePhoto/${riderId}`, formData);
  }

  toggleVerification(id) {
    return this.http.put(`${this.baseUrl}/toggleVerification/${id}`, {});
  }
}
