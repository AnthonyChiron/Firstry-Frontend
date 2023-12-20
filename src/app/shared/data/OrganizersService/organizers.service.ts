import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { OrganizerModel } from 'src/app/models/organizer.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizersService extends CrudService<OrganizerModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'organizers');
  }

  updatePhoto(organizerId, photo) {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.put(
      `${this.baseUrl}/updatePhoto/${organizerId}`,
      formData
    );
  }
}
