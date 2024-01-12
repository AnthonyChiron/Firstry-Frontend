import { formatsOptions } from './../../../../constants/rulesConstants';
import { is } from 'date-fns/locale';
import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { ActivatedRoute } from '@angular/router';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'app-contest-register',
  templateUrl: './contest-register.component.html',
  styleUrls: ['./contest-register.component.scss'],
})
export class ContestRegisterComponent implements OnInit {
  isMobile: boolean = false;
  contest: ContestModel = null;
  selectedCategory: any = null;
  isLoginModalOpen: boolean = false;
  isLoggedin: boolean = false;
  isPaymentStep: boolean = false;
  isPaymentSucceeded: boolean = false;
  isPaymentFailed: boolean = false;

  formatsOptions = formatsOptions;

  constructor(
    private _screenSizeService: ScreenSizeService,
    private _contestService: ContestsService,
    private _activatedRoute: ActivatedRoute,
    protected _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this._authService.isLoggedIn().subscribe((result) => {
      this.isLoggedin = result;
    });

    this._activatedRoute.parent.params.subscribe((params) => {
      if (params.id) {
        this._contestService.getById(params.id).subscribe((contest) => {
          this.contest = parseContestModel(contest);
          console.log(this.contest);
          if (this.contest.categories.length > 0)
            this.selectedCategory = this.contest.categories[0];
        });
      }
    });
  }

  register() {
    this.isPaymentStep = true;
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
      return 'Best tricks - ' + stepFormat.jamTimer + 's';
    return 'Best tricks - ' + stepFormat.runTimer + 's';
  }

  paymentSucceeded() {
    this.isPaymentStep = false;
    this.isPaymentSucceeded = true;
  }

  paymentFailed() {
    this.isPaymentStep = false;
    this.isPaymentFailed = true;
  }
}
