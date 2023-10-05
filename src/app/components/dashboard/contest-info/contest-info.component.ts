import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contest-info',
  templateUrl: './contest-info.component.html',
  styleUrls: ['./contest-info.component.scss'],
})
export class ContestInfoComponent implements OnInit {
  @Input() contest: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.contest);
  }
}
