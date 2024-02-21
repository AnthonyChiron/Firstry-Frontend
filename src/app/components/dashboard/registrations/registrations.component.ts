import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RegisterUserService } from 'src/app/shared/data/RegisterUserService/register-user.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent implements OnInit {
  contest: ContestModel = null;
  selectedCategory: any = null;
  registrations: any[] = [];

  selectedRegistrations: any[] = [];
  refusedRegistrations: any[] = [];
  validatedRegistrations: any[] = [];
  pendingRegistrations: any[] = [];

  currentActionRegistrationId: string = '';

  refuseRiderModal: boolean = false;
  refundRiderModal: boolean = false;
  validRiderModal: boolean = false;

  categoriesDdOptions: any[] = [];

  constructor(
    private _registrationsService: RegistrationsService,
    private _contestsService: ContestsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params) => {
      this._contestsService.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);
        console.log(this.contest);
        this.categoriesDdOptions = this.contest.categories.map((category) => {
          return {
            label: category.name,
            value: category._id,
          };
        });
        this.selectedCategory = this.contest.categories[0];
        this._registrationsService
          .getRegistrationsByContestId(contest._id)
          .subscribe((result: any) => {
            this.registrations = result.filter(
              (registration) =>
                registration.state === 'validated' ||
                registration.state === 'pending_approval' ||
                registration.state === 'refunded' ||
                registration.state === 'refused'
            );
            console.log(this.registrations);
            this.getRegistrations();
          });
      });
    });
  }

  getRegistrations() {
    this.selectedRegistrations = this.registrations.filter(
      (registration) => registration.category._id === this.selectedCategory._id
    );
    this.refusedRegistrations = this.selectedRegistrations.filter(
      (registration) =>
        registration.state === 'refused' || registration.state === 'refunded'
    );
    this.validatedRegistrations = this.selectedRegistrations.filter(
      (registration) => registration.state === 'validated'
    );
    this.pendingRegistrations = this.selectedRegistrations.filter(
      (registration) => registration.state === 'pending_approval'
    );
  }

  selectCategory(value) {
    this.selectedCategory = this.contest.categories.filter(
      (category) => category._id === value
    )[0];
    this.getRegistrations();
    console.log(this.selectedCategory);
  }

  validRegistration(registrationId) {
    this._registrationsService
      .validRiderRegistration(registrationId)
      .subscribe((res) => {
        console.log(res);
        let registration = this.registrations.filter(
          (registration) => registration._id == registrationId
        );
        registration[0].state = 'validated';
        this.getRegistrations();
      });
  }

  refuseRegistration(registrationId) {
    this._registrationsService
      .refuseRiderRegistration(registrationId)
      .subscribe((res) => {
        console.log(res);
        let registration = this.registrations.filter(
          (registration) => registration._id == registrationId
        );
        registration[0].state = 'refused';
        this.getRegistrations();
      });
  }

  refundRegistration(registrationId) {
    this._registrationsService
      .refundRiderRegistration(registrationId)
      .subscribe((res) => {
        console.log(res);
        let registration = this.registrations.filter(
          (registration) => registration._id == registrationId
        );
        registration[0].state = 'pending_approval';
        this.getRegistrations();
      });
  }

  actionRider(riderId, action) {
    this.currentActionRegistrationId = riderId;
    if (action === 'refuse') {
      this.refuseRiderModal = true;
    } else if (action === 'refund') {
      this.refundRiderModal = true;
    } else if (action === 'valid') {
      this.validRiderModal = true;
    }
  }
}
