import { is } from 'date-fns/locale';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PoolsService } from 'src/app/shared/data/PoolsService/pools.service';

@Component({
  selector: 'result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit, OnChanges {
  @Input() category: any;
  results: any[];
  stepsOptions: any[] = [];
  currentStep: any;
  missings: any[];

  constructor(private _poolsService: PoolsService) {}

  ngOnInit() {
    if (this.category) {
      this.initStepOptions();
      if (this.currentStep.isResultPublished) this.getResults();
      else this.results = [];
    }
  }

  ngOnChanges() {
    if (this.category) {
      this.initStepOptions();
      if (this.currentStep.isResultPublished) {
        this.getResults();
        this.initResults();
      } else {
        this.results = [];
        this.missings = [];
      }
    }
  }

  getResults() {
    this.results = [];
    this.missings = [];

    if (this.currentStep.isResultPublished)
      this._poolsService
        .getPoolsByStepId(this.currentStep._id)
        .subscribe((pools) => {
          this.results = this.formatPoolsToResults(pools);
          this.initResults();
        });
  }

  initResults() {
    this.results.sort((a, b) => {
      if (a.score > b.score) return -1;
      else if (a.score < b.score) return 1;
      else return 0;
    });

    // remove missing riders from results
    this.missings = this.results.filter((result) => result.isMissing);
    this.results = this.results.filter((result) => !result.isMissing);
  }

  formatPoolsToResults(poolsEntries: any[]) {
    let results = [];

    poolsEntries.forEach((pool) => {
      results.push({
        rider: pool.registration.rider,
        score: pool.score,
        isQualified: pool.isQualified,
        isMissing: pool.isMissing,
        rank: pool.rank,
      });
    });

    return results;
  }

  initStepOptions() {
    this.stepsOptions = this.category.steps.map((step) => {
      return { label: step.name, value: step._id };
    });
    this.currentStep = this.category.steps[0];
  }

  selectStep(event) {
    this.currentStep = this.category.steps.find((step) => step._id === event);
    this.getResults();
  }
}
