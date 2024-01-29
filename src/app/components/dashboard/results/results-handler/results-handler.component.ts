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
  pools: PoolResultDTOModel[][] = [];
  edit: boolean = false;
  editPoolIndex: number = 0;
  currentStep: any;
  table: any[];
  stepsOptions: any[] = [];

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

    this._poolsService
      .getPoolsByStepId(this.currentStep._id)
      .subscribe((result: any[]) => {
        this.pools = this._poolUtilityService.formatPoolsFromDb(result);
        this.poolsTable();
      });
  }

  editPool(editPoolIndex: number) {
    this.edit = true;
    this.editPoolIndex = editPoolIndex;
  }

  selectStep(event) {
    console.log(this.category.steps);
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
      };
    });
  }

  validResult() {
    console.log(this.pools[this.editPoolIndex]);
    this.edit = false;
    this._poolsService
      .updatePoolResult(this.pools[this.editPoolIndex], this.currentStep._id)
      .subscribe((result) => {
        console.log(result);
        this.pools = this._poolUtilityService.formatPoolsFromDb(result);
        this.poolsTable();
      });
  }

  publishResult() {
    this._poolsService
      .publishResult(this.currentStep._id)
      .subscribe((result) => {
        console.log(result);
        this.pools = this._poolUtilityService.formatPoolsFromDb(result);
        this.poolsTable();
      });
  }

  unpublishResult() {}
}
