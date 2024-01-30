import { CategoryModel } from 'src/app/models/category.model';
import { PoolsService } from './../../../../shared/data/PoolsService/pools.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PoolUtilityService } from 'src/app/shared/services/PoolUtilityService/poolUtilityService.service';
import { ContestModel } from 'src/app/models/contest.model';
import { PoolModel, PoolResultDTOModel } from 'src/app/models/pool.model';

@Component({
  selector: 'results-handler',
  templateUrl: './results-handler.component.html',
  styleUrls: ['./results-handler.component.scss'],
})
export class ResultsHandlerComponent implements OnInit, OnChanges {
  @Input() category: CategoryModel;
  @Input() contest: ContestModel;
  originalPools: any[] = [];
  pools: PoolResultDTOModel[][] = [];
  edit: boolean = false;
  editPoolIndex: number = -1;

  isLoading: boolean = false;

  currentStep: any;
  table: any[];
  stepsOptions: any[] = [];

  isUnpublishConfirmationModalOpen: boolean = false;
  isPublishConfirmationModalOpen: boolean = false;

  constructor(
    private _poolsService: PoolsService,
    private _poolUtilityService: PoolUtilityService
  ) {}

  ngOnInit(): void {
    this.stepsOptions = this.category.steps.map((step) => {
      return { label: step.name, value: step._id };
    });

    this.currentStep = this._poolUtilityService.getResultCurrentStep(
      this.category.steps
    );

    this.getPools();
  }

  ngOnChanges() {
    this.stepsOptions = this.category.steps.map((step) => {
      return { label: step.name, value: step._id };
    });

    this.currentStep = this._poolUtilityService.getResultCurrentStep(
      this.category.steps
    );
    console.log(this.currentStep);

    this.getPools();
  }

  getPools() {
    if (!this.currentStep) return;
    this.isLoading = true;
    this._poolsService
      .getPoolsByStepId(this.currentStep._id)
      .subscribe((result: any) => {
        this.originalPools = result.map((pool) => ({ ...pool }));
        this.pools = this._poolUtilityService.formatPoolsFromDb([...result]);
        this.poolsTable();
        this.isLoading = false;
      });
  }

  editPool(editPoolIndex: number) {
    this.edit = true;
    this.editPoolIndex = editPoolIndex;
  }

  selectStep(event) {
    this.edit = false;
    this.currentStep = this.category.steps.find((step) => step._id === event);

    this.getPools();
  }

  poolsTable() {
    // flat double table
    let table = this.pools.reduce((acc, pool) => {
      return [...acc, ...pool];
    }, []);

    this.table = table.map((pool) => {
      return {
        name:
          pool.registration.rider.firstName +
          ' ' +
          pool.registration.rider.lastName,
        score: pool.score ? pool.score : 0,
        rank: pool.rank ? pool.rank : '-',
        isQualified: pool.isQualified ? pool.isQualified : false,
      };
    });
  }

  cancel() {
    this.edit = false;
    this.editPoolIndex = -1;
    this.pools = this._poolUtilityService.formatPoolsFromDb(
      this.originalPools.map((pool) => ({ ...pool }))
    );
    this.poolsTable();
    console.log(this.pools);
  }

  validResult() {
    this.isLoading = true;
    this.edit = false;
    console.log(this.pools[this.editPoolIndex]);
    this._poolsService
      .updatePoolResult(this.pools[this.editPoolIndex], this.currentStep._id)
      .subscribe((result) => {
        this.originalPools = result.map((pool) => ({ ...pool }));
        this.pools = this._poolUtilityService.formatPoolsFromDb(result);
        this.poolsTable();
        this.isLoading = false;
        this.editPoolIndex = -1;
      });
  }

  publishResult() {
    this.isLoading = true;

    this._poolsService
      .publishResult(this.currentStep._id)
      .subscribe((result) => {
        console.log(result);
        this.isPublishConfirmationModalOpen = false;
        this.category.steps.find(
          (step) => step._id === this.currentStep._id
        ).isResultPublished = true;

        this.currentStep = this._poolUtilityService.getResultCurrentStep(
          this.category.steps
        );

        this.getPools();
        this.poolsTable();
        this.isLoading = false;
      });
  }

  unpublishResult() {
    this.isLoading = true;
    this._poolsService
      .unpublishResult(this.currentStep._id)
      .subscribe((result) => {
        console.log(result);
        this.isUnpublishConfirmationModalOpen = false;
        this.category.steps.find(
          (step) => step._id === this.currentStep._id
        ).isResultPublished = false;

        this.currentStep = this._poolUtilityService.getResultCurrentStep(
          this.category.steps
        );

        this.pools = this._poolUtilityService.formatPoolsFromDb(result);
        this.poolsTable();
        this.isLoading = false;
      });
  }

  isResultPublishable() {
    return (
      this.pools.length > 0 &&
      this._poolUtilityService.checkIfAllPoolsHaveResults(this.pools.flat()) &&
      !this.currentStep.isResultPublished
    );
  }
}
