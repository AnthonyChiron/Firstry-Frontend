import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { RegistrationModel } from 'src/app/models/registration.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class ResultsComponent implements OnInit {
  contest: ContestModel;
  registrations: any[] = [];
  pendingApprovalRegistrations: RegistrationModel[] = [];
  selectedCategory: CategoryModel;
  selectedRegistrations: any[];

  constructor(
    private _registrationService: RegistrationsService,
    private _contestService: ContestsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params) => {
      this._contestService.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);

        this.selectedCategory = this.contest.categories[0];
        this._registrationService
          .getRegistrationsByContestId(contest._id)
          .subscribe((result: any) => {
            console.log(result);
            this.registrations = result;
            // this.registrations.push(...this.registrations);
            // this.registrations.push(...this.registrations);
            // this.registrations.push(...this.registrations);
            // this.registrations.push(...this.registrations);
            this.pendingApprovalRegistrations = this.registrations.filter(
              (registration) => registration.state === 'pending_approval'
            );
            this.getRegistrations();
          });
      });
    });
  }

  onSelectedCategory(category: any) {
    this.selectedCategory = category;
    this.getRegistrations();
  }

  getRegistrations() {
    this.selectedRegistrations = this.registrations.filter(
      (registration) => registration.category._id === this.selectedCategory._id
    );
  }
}
