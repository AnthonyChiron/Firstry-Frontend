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
export class ExportImportService extends BaseHttpService {
  constructor(private http: HttpClient, private route: Router) {
    super();
  }

  getRidersExport() {
    return this.http.get(`${this.baseUrl}export/exportRidersDataById`, {
      responseType: 'blob',
    });
  }

  importRiders(event: File, contestId: string) {
    const formData = new FormData();
    formData.append('file', event);
    console.log(event);
    return this.http.post(
      `${this.baseUrl}import/importRidersOnContest/` + contestId,
      formData
    );
  }

  reset() {
    return this.http.get(`${this.baseUrl}import/reset`);
  }
}
