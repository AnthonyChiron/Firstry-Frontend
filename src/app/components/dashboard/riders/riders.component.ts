import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { RegistrationModel } from 'src/app/models/registration.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
})
export class RidersComponent implements OnInit {
  contest: ContestModel;
  registrations: RegistrationModel[] = [];
  pendingApprovalRegistrations: RegistrationModel[] = [];

  constructor(
    private _registrationService: RegistrationsService,
    private _contestService: ContestsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params) => {
      this._contestService.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);

        console.log(this.contest);
        this._registrationService
          .getRegistrationsByContestId(contest._id)
          .subscribe((result: any) => {
            this.registrations = result;
            this.pendingApprovalRegistrations = this.registrations.filter(
              (registration) => registration.state === 'pending_approval'
            );
          });
      });
    });
  }
}
