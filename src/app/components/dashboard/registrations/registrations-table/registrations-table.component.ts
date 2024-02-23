import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';

@Component({
  selector: 'registrations-table',
  templateUrl: './registrations-table.component.html',
  styleUrls: ['./registrations-table.component.scss'],
})
export class RegistrationsTableComponent {
  @Input() registrations: any[] = [];
  @Input() header: boolean = true;
  @Input() label: string = '';
  @Output() validRegistration = new EventEmitter();
  @Output() refuseRegistration = new EventEmitter();
  @Output() refundRegistration = new EventEmitter();

  constructor() {}

  validRider(registrationId) {
    this.validRegistration.emit(registrationId);
  }

  refuseRider(registrationId) {
    this.refuseRegistration.emit(registrationId);
  }

  refundRider(registrationId) {
    this.refundRegistration.emit(registrationId);
  }
}
