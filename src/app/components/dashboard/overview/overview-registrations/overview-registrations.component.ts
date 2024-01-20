import { filter } from 'rxjs';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { RegistrationModel } from 'src/app/models/registration.model';

@Component({
  selector: 'overview-registrations',
  templateUrl: './overview-registrations.component.html',
  styleUrls: ['./overview-registrations.component.scss'],
})
export class OverviewRegistrationsComponent implements OnInit, OnChanges {
  @Input() contest: any;
  nbMaxRegistrations: number = 0;
  registrations: RegistrationModel[] = [];
  pendingRegistrations: RegistrationModel[] = [];

  constructor(private _registrationsService: RegistrationsService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.contest);
    if (this.contest) {
      this._registrationsService
        .getRegistrationsByContestId(this.contest._id)
        .subscribe((registrations: RegistrationModel[]) => {
          this.registrations = registrations;
          this.registrations = this.registrations.filter(
            (registration) =>
              registration.state === 'pending_approval' ||
              registration.state === 'validated'
          );
          this.pendingRegistrations = this.registrations.filter(
            (registration) => registration.state === 'pending_approval'
          );
          console.log(this.registrations);
          console.log(this.pendingRegistrations.length);
        });

      this.contest.categories.forEach((category) => {
        this.nbMaxRegistrations += category.maxRiders;
      });
      console.log(this.nbMaxRegistrations);
    }
  }
}
