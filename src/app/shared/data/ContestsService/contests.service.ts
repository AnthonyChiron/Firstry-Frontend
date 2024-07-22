import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { ContestModel } from 'src/app/models/contest.model';
import { AuthService } from '../../services/AuthService/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContestsService extends CrudService<ContestModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'contests');
  }

  // Récupérer toutes les entités
  getOrganizerContests(): Observable<ContestModel[]> {
    return this.http.get<ContestModel[]>(
      this.baseUrl + '/getOrganizerContests'
    );
  }

  getContestCategories(contestId: string): Observable<any> {
    return this.http.get<ContestModel[]>(
      this.baseUrl + '/getContestCategories/' + contestId
    );
  }

  uploadContestBrandImage(
    contestId: string,
    file: File,
    type
  ): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(
      this.baseUrl + '/uploadBrandImage/' + contestId + '/' + type,
      formData
    );
  }

  uploadParentalAuthorizationFile(
    contestId: string,
    file: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      this.baseUrl + '/uploadParentalAuthorizationFile/' + contestId,
      formData
    );
  }

  uploadRulesFile(contestId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      this.baseUrl + '/uploadRulesFile/' + contestId,
      formData
    );
  }

  publish(contestId: string): Observable<any> {
    return this.http.get(this.baseUrl + '/publishContest/' + contestId);
  }

  isContestPublishable(contestId: string): Observable<any> {
    return this.http.get(this.baseUrl + '/isContestPublishable/' + contestId);
  }

  toggleIsFederalById(id) {
    return this.http.put(`${this.baseUrl}/toggleIsFederalById/${id}`, {});
  }
}

export interface ContestPublishableStatus {
  isValid: boolean;
  errors: [string];
}
