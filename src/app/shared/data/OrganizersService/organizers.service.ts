import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { OrganizerModel } from 'src/app/models/organizer.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizersService extends CrudService<OrganizerModel> {
  constructor(http: HttpClient) {
    super(http, 'organizer');
  }
}
