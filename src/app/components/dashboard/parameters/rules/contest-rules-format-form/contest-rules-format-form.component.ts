import { Component, Input, OnInit } from '@angular/core';
import { StepFormatModel } from 'src/app/models/stepFormat.model';

@Component({
  selector: 'contest-rules-format-form',
  templateUrl: './contest-rules-format-form.component.html',
  styleUrls: ['./contest-rules-format-form.component.scss'],
})
export class ContestRulesFormatFormComponent implements OnInit {
  @Input() stepFormats: StepFormatModel[] = [];
  @Input() edit: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  addStepFormat() {
    this.stepFormats.push({
      order: this.stepFormats.length + 1,
      format: '',
      jamTimer: 0,
      runTimer: 0,
      bestTricksTryCount: 0,
    });
    console.log(this.stepFormats);
  }

  deleteStepFormat(index: number) {
    this.stepFormats.splice(index, 1);
  }

  test() {
    console.log(this.stepFormats);
  }
}
