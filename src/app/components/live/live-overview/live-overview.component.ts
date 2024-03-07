import { Component, OnInit } from '@angular/core';
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
  currentPools: any[] = [];
  currentRiders: any[] = [];

  categoryOptions: any[] = [];
  stepsOptions: any[] = [];

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
        }
        console.log(this.contest);
      });
    });
  }

  selectCategory(selectedCategory) {
    this.currentCategory = this.categories.find(
      (category) => category._id == selectedCategory.value
    );
    this._liveService.updateCurrentCategory(this.currentCategory.name);
    this.initStepsOptions();
  }

  selectStep(selectedStep) {
    console.log(selectedStep);
    this.currentStep = this.currentCategory.steps.find(
      (step) => step._id == selectedStep.value
    );
    console.log(this.currentStep);
    this._liveService.updateCurrentStep(this.currentStep.name);
  }

  initCategoryOptions(categories) {
    this.categoryOptions = categories.map((category) => {
      return { label: category.name, value: category._id };
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
      .subscribe((pools) => {
        console.log(pools);
      });
  }
}
