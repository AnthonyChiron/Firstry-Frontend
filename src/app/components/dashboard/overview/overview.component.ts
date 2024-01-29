import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { RegistrationModel } from 'src/app/models/registration.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class OverviewComponent implements OnInit {
  contest: ContestModel;
  isMobile: boolean;
  registrations: RegistrationModel[] = [];
  pendingRegistrations: RegistrationModel[] = [];
  nbMaxRegistrations: number = 0;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private _screenSize: ScreenSizeService,
    private _registrationsService: RegistrationsService
  ) {}

  ngOnInit(): void {
    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this._activatedRoute.parent.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);
        console.log(this.contest);
        this._registrationsService
          .getRegistrationsByContestId(this.contest._id)
          .subscribe((registrations: RegistrationModel[]) => {
            this.registrations = registrations;
            console.log(this.registrations);
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
      });
    });
  }
}
