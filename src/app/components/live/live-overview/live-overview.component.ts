import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';
import { ContestModel, parseContestModel } from 'src/app/models/contest.model';
import { RegistrationModel } from 'src/app/models/registration.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { PoolsService } from 'src/app/shared/data/PoolsService/pools.service';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { StepsService } from 'src/app/shared/data/StepsService/steps-service.service';
import { LiveService } from 'src/app/shared/services/LiveService/live.service';

@Component({
  selector: 'app-live-overview',
  templateUrl: './live-overview.component.html',
  styleUrls: ['./live-overview.component.scss'],
})
export class LiveOverviewComponent implements OnInit {
  contest: ContestModel;
  registrations: RegistrationModel[];
  categories: any[] = [];

  currentCategory: any;
  currentStep: any;
  currentPools: any[][] = [];
  currentPoolNumber: number = 0;
  currentRiders: any[] = [];
  currentRiderNumber: any;
  currentRider: any;
  currentStepFormat: any;

  isWaitingDisplayed: boolean = true;
  isMainDisplayed: boolean = false;

  categoryOptions: any[] = [];
  stepsOptions: any[] = [];
  StepFormatOptions: any[] = [];

  waitingTimerOptions: any[] = [
    { label: '1', value: '60' },
    { label: '2', value: '120' },
    { label: '3', value: '180' },
    { label: '4', value: '240' },
    { label: '5', value: '300' },
    { label: '10', value: '600' },
    { label: '15', value: '900' },
    { label: '20', value: '1200' },
    { label: '25', value: '1500' },
    { label: '30', value: '1800' },
    { label: '35', value: '2100' },
    { label: '40', value: '2400' },
    { label: '45', value: '2700' },
    { label: '50', value: '3000' },
    { label: '55', value: '3300' },
    { label: '60', value: '3600' },
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private _poolService: PoolsService,
    private _stepsService: StepsService,
    private _liveService: LiveService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params) => {
      this.cs.getById(params.contestId).subscribe((contest) => {
        this.contest = parseContestModel(contest);
        this.categories = this.contest.categories;
        if (this.contest.categories.length > 0) {
          this.selectCategory({ value: this.contest.categories[0]._id });
          this.initCategoryOptions(this.contest.categories);
          console.log(this.categories);
        }
        console.log(this.contest);
      });
    });
  }

  selectCategory(selectedCategory) {
    this.currentCategory = this.categories.find(
      (category) => category._id == selectedCategory.value
    );
    this._liveService.updateCurrentCategory(this.currentCategory.shortName);
    this.initStepsOptions();
  }

  selectStep(selectedStep) {
    this.currentStep = this.currentCategory.steps.find(
      (step) => step._id == selectedStep.value
    );
    this.initPools();
    this._liveService.updateCurrentStep(this.currentStep.name);
  }

  selectPool(selectedPool) {
    this.currentPoolNumber = selectedPool;
    this.initRider();
  }

  selectStepFormat(stepFormat) {
    this.currentStepFormat = stepFormat;
    this._liveService.updateCurrentStepFormat(this.currentStepFormat);
  }

  prevPool() {
    if (this.currentPoolNumber > 1) this.currentPoolNumber--;
    else this.currentPoolNumber = this.currentPools.length;
    this.initRider();
  }

  nextPool() {
    if (this.currentPoolNumber < this.currentPools.length)
      this.currentPoolNumber++;
    else this.currentPoolNumber = 1;
    this.initRider();
  }

  prevRider() {
    if (this.currentRiderNumber > 1) this.currentRiderNumber--;
    else
      this.currentRiderNumber =
        this.currentPools[this.currentPoolNumber].length;
    this.currentRider =
      this.currentPools[this.currentPoolNumber - 1][
        this.currentRiderNumber - 1
      ];
    this._liveService.updateCurrentRider(this.currentRider);
  }

  nextRider() {
    if (
      this.currentRiderNumber < this.currentPools[this.currentPoolNumber].length
    )
      this.currentRiderNumber++;
    else this.currentRiderNumber = 1;

    this.currentRider =
      this.currentPools[this.currentPoolNumber - 1][
        this.currentRiderNumber - 1
      ];
    this._liveService.updateCurrentRider(this.currentRider);
  }

  initCategoryOptions(categories) {
    this.categoryOptions = categories.map((category) => {
      return { label: category.shortName, value: category._id };
    });
  }

  initStepsOptions() {
    this.stepsOptions = this.currentCategory.steps.map((step) => {
      return { label: step.name, value: step._id };
    });
    this._liveService.updateCurrentStep(this.currentCategory.steps[0].name);
    this.currentStep = this.currentCategory.steps[0];
    this.initPools();
  }

  initPools() {
    this._poolService
      .getPoolsByStepId(this.currentStep._id)
      .subscribe((pools: any) => {
        // format pools to [][] based on poolNumber
        this.currentPools = [];
        pools.forEach((pool) => {
          if (!this.currentPools[pool.poolNumber - 1]) {
            this.currentPools[pool.poolNumber - 1] = [];
          }
          this.currentPools[pool.poolNumber - 1].push(pool);
        });

        this.currentPoolNumber = 1;

        if (this.currentPools.length > 0) {
          this.currentRider = this.currentPools[0][0];

          this._liveService.updateNbPools(this.currentPools.length);
          this._liveService.updateCurrentRiders(this.currentPools[0]);
          this._liveService.updateCurrentRider(this.currentRider);
        }
      });
  }

  initRider() {
    this.currentRiderNumber = 1;
    this.currentRider = this.currentPools[this.currentPoolNumber - 1][0];
    this._liveService.updateCurrentRiders(
      this.currentPools[this.currentPoolNumber - 1]
    );
    this._liveService.updateCurrentRider(this.currentRider);
  }

  toggleWaiting() {
    this.isWaitingDisplayed = !this.isWaitingDisplayed;
    this._liveService.updateIsWaitingDisplayed(!this.isWaitingDisplayed);
  }

  toggleMain() {
    this.isMainDisplayed = !this.isMainDisplayed;
    this._liveService.updateIsMainDisplayed(!this.isMainDisplayed);
  }

  selectWaitingTimer(waitingTimer) {
    this._liveService.updateWaitingTimer(waitingTimer);
  }

  start() {
    this._liveService.startWaitingTimer();
  }

  stop() {
    this._liveService.stopWaitingTimer();
  }

  reset() {
    this._liveService.resetWaitingTimer();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.key === 'F13') this.prevPool();

    if (event.key === 'F14') this.nextPool();

    if (event.key === 'F15') this.prevRider();

    if (event.key === 'F16') this.nextRider();

    if (event.key === 'F17') this.selectStepFormat('RUN 1');

    if (event.key === 'F18') this.selectStepFormat('RUN 2');

    if (event.key === 'F19') this.selectStepFormat('JAM');

    if (event.key === 'F20') this.selectStepFormat('BEST TRICK');

    if (event.key === 'F21') this._liveService.startTimer();

    if (event.key === 'F22') this._liveService.stopTimer();

    if (event.key === 'F23') this._liveService.resetTimer();
  }
}
