import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { OrganizerModel } from 'src/app/models/organizer.model';
import { AuthService } from '../../services/AuthService/auth.service';
import { BaseHttpService } from '../BaseHttpService/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseHttpService {
  constructor(protected http: HttpClient, protected authService: AuthService) {
    super();
    this.baseUrl += 'payment';
  }

  createPayment(amount) {
    return this.http.post<PaymentInterface>(`${this.baseUrl}/createPayment`, {
      user: this.authService.getCurrentUser(),
      amount: amount,
    });
  }

  createLoginLink() {
    return this.http.get(
      `${this.baseUrl}/createLoginLink/${
        this.authService.getCurrentUser().organizer.stripeAccountId
      }`
    );
  }
}

interface PaymentInterface {
  clientSecret: string;
}
