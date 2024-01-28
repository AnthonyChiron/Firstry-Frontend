import { CategoryModel } from 'src/app/models/category.model';
import { PoolsService } from './../../../../shared/data/PoolsService/pools.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PoolUtilityService } from 'src/app/shared/services/PoolUtilityService/poolUtilityService.service';
import { ContestModel } from 'src/app/models/contest.model';
import { PoolModel } from 'src/app/models/pool.model';

@Component({
  selector: 'results-handler',
  templateUrl: './results-handler.component.html',
  styleUrls: ['./results-handler.component.scss'],
})
export class ResultsHandlerComponent implements OnInit, OnChanges {
  @Input() category: CategoryModel;
  @Input() contest: ContestModel;
  pools: PoolModel[][] = [];
  edit: boolean = false;
  currentStep: any;

  constructor(
    private _poolsService: PoolsService,
    private _poolUtilityService: PoolUtilityService
  ) {}

  ngOnInit(): void {
    this.getPools();
  }

  ngOnChanges() {
    this.getPools();
  }

  getPools() {
    this.currentStep = this._poolUtilityService.getResultCurrentStep(
      this.category.steps
    );

    console.log(this.currentStep);
    if (!this.currentStep) return;

    this._poolsService
      .getPoolsByStepId(this.currentStep._id)
      .subscribe((result: PoolModel[]) => {
        this.pools = this._poolUtilityService.formatPoolsFromDb(result);
        console.log(this.pools);
      });
  }
}
