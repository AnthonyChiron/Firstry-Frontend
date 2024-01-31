import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { OrganizerModel } from 'src/app/models/organizer.model';
import { AuthService } from '../../services/AuthService/auth.service';
import { BaseHttpService } from '../BaseHttpService/base-http.service';
import { RegistrationModel } from 'src/app/models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseHttpService {
  constructor(protected http: HttpClient, protected authService: AuthService) {
    super();
    this.baseUrl += 'payment';
  }

  createRegistrationPayment(amount, organizer, categoryId) {
    return this.http.post<PaymentInterface>(
      `${this.baseUrl}/createRegistrationPayment`,
      {
        user: this.authService.getCurrentUser(),
        amount: amount,
        organizer: organizer,
        categoryId: categoryId,
      }
    );
  }

  createOnboardingLink() {
    return this.http.get(
      `${this.baseUrl}/createOnboardingLink/${
        this.authService.getCurrentUser().organizer.stripeAccountId
      }`
    );
  }

  createLoginLink() {
    return this.http.get(
      `${this.baseUrl}/createLoginLink/${
        this.authService.getCurrentUser().organizer.stripeAccountId
      }`
    );
  }

  isStripeAccountUsable() {
    return this.http.get(
      `${this.baseUrl}/isStripeAccountUsable/${
        this.authService.getCurrentUser().organizer.stripeAccountId
      }`
    );
  }
}

interface PaymentInterface {
  clientSecret: string;
  registration: RegistrationModel;
}
