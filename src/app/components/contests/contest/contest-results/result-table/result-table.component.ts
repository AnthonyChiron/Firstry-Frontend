import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit, OnChanges {
  @Input() category: any;
  @Input() results: any[];
  missings: any[];

  constructor() {}

  ngOnInit() {
    if (this.results) this.initResults();
  }

  ngOnChanges() {
    if (this.results) this.initResults();
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

    console.log(this.missings);
    console.log(this.results);
  }
}
