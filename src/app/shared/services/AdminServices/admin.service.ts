import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { BaseHttpService } from '../../data/BaseHttpService/base-http.service';
import { Router } from '@angular/router';
import { SignUpModel } from 'src/app/models/signUp.model';
import jwt_decode from 'jwt-decode';
import { UploadEvent } from 'primeng/fileupload';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseHttpService {
  private loggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private route: Router) {
    super();
  }

  getRidersStats() {
    return this.http.get(`${this.baseUrl}riders/getAdminStats`);
  }

  getOrganizersStats() {
    return this.http.get(`${this.baseUrl}organizers/getAdminStats`);
  }
}
