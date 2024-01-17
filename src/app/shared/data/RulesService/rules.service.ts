import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { RulesModel } from 'src/app/models/rules.model';
import { AuthService } from '../../services/AuthService/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RulesService extends CrudService<RulesModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'rules');
  }

  // Récupérer toutes les entités
  getAllByContestId(contestId): Observable<RulesModel[]> {
    return this.http.get<RulesModel[]>(
      this.baseUrl + '/getAllByContestId/' + contestId
    );
  }
}
