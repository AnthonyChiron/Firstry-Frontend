import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepFormatModel } from 'src/app/models/stepFormat.model';
import {
  runTimersOptions,
  bestTricksOptions,
  jamTimersOptions,
  formatsOptions,
} from 'src/app/constants/rulesConstants';

@Component({
  selector: 'contest-rules-format-form',
  templateUrl: './contest-rules-format-form.component.html',
  styleUrls: ['./contest-rules-format-form.component.scss'],
})
export class ContestRulesFormatFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() edit: boolean = false;
  @Input() touched: boolean = false;

  stepFormatArray: FormArray;

  runTimersOptions = runTimersOptions;
  jamTimersOptions = jamTimersOptions;
  bestTricksOptions = bestTricksOptions;
  formatsOptions = formatsOptions;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.stepFormatArray = this.parentForm.get('stepFormats') as FormArray;
  }

  addStepFormat() {
    const stepFormatGroup = this.fb.group({
      order: [this.stepFormatArray.length],
      formatType: ['', Validators.required],
      runTimer: [0],
      jamTimer: [0],
      bestTricksCount: [0],
    });

    stepFormatGroup.patchValue({
      formatType: this.formatsOptions[0].value,
      runTimer: this.runTimersOptions[0].value,
      jamTimer: this.jamTimersOptions[0].value,
      bestTricksCount: this.bestTricksOptions[0].value,
    });

    this.stepFormatArray.push(stepFormatGroup);
    console.log(this.stepFormatArray);
  }

  deleteStepFormat(index: number) {
    this.stepFormatArray.removeAt(index);
  }

  getRunLabel(stepFormat) {
    const option = this.formatsOptions.find(
      (option) => option.value == stepFormat.value.formatType
    );
    return option ? option.label : '';
  }

  getBestTricksLabel(stepFormat) {
    const option = this.bestTricksOptions.find(
      (option) => option.value == stepFormat.value.bestTricksCount
    );
    return option ? option.label : '';
  }
}
