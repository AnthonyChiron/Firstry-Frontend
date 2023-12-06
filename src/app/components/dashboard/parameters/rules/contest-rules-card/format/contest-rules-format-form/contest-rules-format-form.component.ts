import { Component, Input, OnInit } from '@angular/core';
import { StepFormatModel } from 'src/app/models/stepFormat.model';

@Component({
  selector: 'contest-rules-format-form',
  templateUrl: './contest-rules-format-form.component.html',
  styleUrls: ['./contest-rules-format-form.component.scss'],
})
export class ContestRulesFormatFormComponent implements OnInit {
  @Input() stepFormats: StepFormatModel[] = [
    {
      order: 1,
      format: 'RUN',
      jamTimer: 45,
      runTimer: 45,
      bestTricksCount: 1,
    },
    {
      order: 2,
      format: 'RUN',
      jamTimer: 45,
      runTimer: 50,
      bestTricksCount: 1,
    },
    {
      order: 3,
      format: 'BEST_TRICKS',
      jamTimer: 45,
      runTimer: 45,
      bestTricksCount: 3,
    },
  ];
  @Input() edit: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  addStepFormat() {
    this.stepFormats.push({
      order: this.stepFormats.length + 1,
      format: '',
      jamTimer: 0,
      runTimer: 0,
      bestTricksCount: 0,
    });
    console.log(this.stepFormats);
  }

  deleteStepFormat(index: number) {
    this.stepFormats.splice(index, 1);
  }

  updateStepFormat(stepFormat: StepFormatModel, index: number) {
    this.stepFormats[index].runTimer = stepFormat.runTimer;
    this.stepFormats[index].jamTimer = stepFormat.jamTimer;
    this.stepFormats[index].bestTricksCount = stepFormat.bestTricksCount;
    this.stepFormats[index].format = stepFormat.format;
  }

  test() {
    console.log(this.stepFormats);
  }
}
