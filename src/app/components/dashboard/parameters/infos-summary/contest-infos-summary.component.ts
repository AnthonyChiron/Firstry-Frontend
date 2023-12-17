import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'contest-infos-summary',
  templateUrl: './contest-infos-summary.component.html',
  styleUrls: ['./contest-infos-summary.component.scss'],
})
export class ContestInfosSummaryComponent implements OnInit, OnChanges {
  @Input() contest: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
