import { filter } from 'rxjs';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { RegistrationModel } from 'src/app/models/registration.model';
import { ContestModel } from 'src/app/models/contest.model';

@Component({
  selector: 'overview-registrations',
  templateUrl: './overview-registrations.component.html',
  styleUrls: ['./overview-registrations.component.scss'],
})
export class OverviewRegistrationsComponent implements OnInit, OnChanges {
  @Input() nbMaxRegistrations: number = 0;
  @Input() registrations: RegistrationModel[] = [];
  @Input() pendingRegistrations: RegistrationModel[] = [];
  @Input() contest: ContestModel;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
