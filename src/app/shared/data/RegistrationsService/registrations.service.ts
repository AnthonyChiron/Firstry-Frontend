import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from 'src/app/models/registration.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService extends CrudService<RegistrationModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'registrations');
  }

  getRegistrationsByContestId(contestId) {
    return this.http.get(
      `${this.baseUrl}/getRegistrationsByContestId/${contestId}`
    );
  }

  isRiderRegisteredToContest(riderId, contestId) {
    return this.http.get(
      `${this.baseUrl}/isRiderRegisteredToContest/${riderId}/${contestId}`
    );
  }

  getRiderRegistrations(riderId) {
    return this.http.get(`${this.baseUrl}/getRiderRegistrations/${riderId}`);
  }

  refuseRiderRegistration(registrationId) {
    return this.http.get(
      `${this.baseUrl}/refuseRiderRegistration/${registrationId}`
    );
  }

  validRiderRegistration(registrationId) {
    return this.http.get(
      `${this.baseUrl}/validRiderRegistration/${registrationId}`
    );
  }

  pendingApprovalRiderRegistration(riderId, categoryId) {
    return this.http.get(
      `${this.baseUrl}/pendingApprovalRiderRegistration/${riderId}/${categoryId}`
    );
  }

  cancelRiderRegistration(registrationId) {
    return this.http.get(
      `${this.baseUrl}/cancelRiderRegistration/${registrationId}`
    );
  }

  paymentFailedRiderRegistration(riderId, categoryId) {
    return this.http.get(
      `${this.baseUrl}/paymentFailedRiderRegistration/${riderId}/${categoryId}`
    );
  }
}
