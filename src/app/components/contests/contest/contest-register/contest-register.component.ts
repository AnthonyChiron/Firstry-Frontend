import { formatsOptions } from './../../../../constants/rulesConstants';
import { is } from 'date-fns/locale';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { RiderModel } from 'src/app/models/rider.model';
import { PaymentService } from 'src/app/shared/data/PaymentService/payment.service';
import { CategoryRegistrationModelDTO } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/shared/data/CategoriesService/categories.service';

@Component({
  selector: 'app-contest-register',
  templateUrl: './contest-register.component.html',
  styleUrls: ['./contest-register.component.scss'],
})
export class ContestRegisterComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;
  contest: ContestModel = null;
  categories: CategoryRegistrationModelDTO[] = [];
  selectedCategory: any = null;
  registration: any = null;

  isLoginModalOpen: boolean = false;
  isLoggedin: boolean = false;
  isAlreadyRegistered: boolean = false;

  isPaymentStep: boolean = false;
  isPaymentSucceeded: boolean = false;
  isPaymentFailed: boolean = false;
  rider: RiderModel = null;
  clientSecret: string = null;

  formatsOptions = formatsOptions;

  constructor(
    private _screenSizeService: ScreenSizeService,
    private _contestService: ContestsService,
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _paymentService: PaymentService,
    private _registrationService: RegistrationsService,
    protected _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this._activatedRoute.parent.params.subscribe((params) => {
      if (params.id) {
        this._contestService.getById(params.id).subscribe((contest) => {
          this.contest = parseContestModel(contest);

          this._authService.isLoggedIn().subscribe((result) => {
            let user = this._authService.getCurrentUser();

            if (result && user.rider) {
              this.isLoggedin = true;
              this.rider = user.rider;
              this._registrationService
                .isRiderRegisteredToContest(user.rider._id, this.contest._id)
                .subscribe((result: boolean) => {
                  this.isAlreadyRegistered = result;
                });
            } else {
              this.isLoggedin = false;
            }
          });
          this._categoriesService
            .getAllCategoriesForRegistrations(this.contest._id)
            .subscribe((categories) => {
              console.log(categories);
              categories.forEach((category) => {
                if (category.NbRegistration < category.maxRiders)
                  this.categories.push(category);
              });

              if (this.categories.length > 0)
                this.selectedCategory = this.categories[0];
            });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (!this.isPaymentSucceeded && !this.isPaymentFailed)
      this.cancelRegistration();
  }

  selectCategory(category) {
    this.selectedCategory = category;
    if (this.isPaymentStep) {
      this.cancelRegistration();
      this.isPaymentStep = false;
    }
  }

  cancelRegistration() {
    if (this.registration)
      this._registrationService
        .cancelRiderRegistration(this.registration._id)
        .subscribe((result) => {
          console.log(result);
        });
  }

  register() {
    this._paymentService
      .createRegistrationPayment(
        this.selectedCategory.registerPrice * 100,
        this.contest.organizer,
        this.selectedCategory._id
      )
      .subscribe(({ clientSecret, registration }) => {
        this.registration = registration;
        this.isPaymentStep = true;
        this.clientSecret = clientSecret;
        console.log(clientSecret);
      });
  }

  getDateFromSteps(steps: number) {
    let date = new Date();
    date.setDate(date.getDate() + steps);
    return date;
  }

  getRunLabel(stepFormat) {
    if (stepFormat.formatType == 'BEST_TRICKS')
      return 'Best tricks - ' + stepFormat.bestTricksCount;
    if (stepFormat.formatType == 'JAM')
      return 'Jam - ' + stepFormat.jamTimer + 's';
    return 'Run - ' + stepFormat.runTimer + 's';
  }

  paymentSucceeded() {
    this.isPaymentStep = false;
    this.isPaymentSucceeded = true;

    // Update rider registration
    this._registrationService
      .pendingApprovalRiderRegistration(this.registration._id)
      .subscribe((result) => {
        console.log(result);
      });
  }

  paymentFailed() {
    this.isPaymentStep = false;
    this.isPaymentFailed = true;

    this._registrationService
      .paymentFailedRiderRegistration(this.rider._id, this.selectedCategory._id)
      .subscribe((result) => {
        console.log(result);
      });
  }

  downloadParentalAuthorization() {
    window.open(this.contest.parentalAuthorizationUrl, '_blank');
  }
}
