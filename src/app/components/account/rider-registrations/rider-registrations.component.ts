import { Component, OnInit } from '@angular/core';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'rider-registrations',
  templateUrl: './rider-registrations.component.html',
  styleUrls: ['./rider-registrations.component.scss'],
})
export class RiderRegistrationsComponent implements OnInit {
  registrations: any[] = [];

  constructor(
    private _registrationService: RegistrationsService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._registrationService
      .getRiderRegistrations(this._authService.getCurrentUser().rider._id)
      .subscribe((result: any) => {
        this.registrations = result.filter(
          (registration) =>
            registration.state != 'cancelled_before_payment' &&
            registration.state != 'pending_payment' &&
            registration.state != 'payment_failed'
        );
      });
  }

  getState(state) {
    switch (state) {
      case 'pending_approval':
        return 'En attente de la validation du contest';
      case 'validated':
        return 'Validée';
      case 'refused':
        return 'Refusée';
      case 'payment_failed':
        return 'Paiement échoué';
      case 'refunded':
        return 'Inscription annulée & remboursée';
      default:
        return 'En attente';
    }
  }

  getStateColor(state) {
    switch (state) {
      case 'pending_approval':
        return 'yellow';
      case 'validated':
        return 'green';
      case 'refused':
        return 'red';
      case 'payment_failed':
        return 'red';
      case 'refunded':
        return 'red';
      default:
        return 'yellow';
    }
  }

  downloadFileInNewPage(file) {
    window.open(file);
  }

  cancelRegistration(registrationId) {}
}
