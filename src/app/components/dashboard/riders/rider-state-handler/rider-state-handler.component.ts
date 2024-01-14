import { Component, Input } from '@angular/core';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';

@Component({
  selector: 'rider-state-handler',
  templateUrl: './rider-state-handler.component.html',
  styleUrls: ['./rider-state-handler.component.scss'],
})
export class RiderStateHandlerComponent {
  @Input() registrations: any[] = [];
  @Input() contest: any;

  constructor(private _registrationService: RegistrationsService) {}

  validRider(registrationId) {}

  refuseRider(registrationId) {}
}
