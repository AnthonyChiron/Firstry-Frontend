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
import { FormRulesService } from 'src/app/shared/services/FormUtility/form-rules.service';

@Component({
  selector: 'contest-rules-format-form',
  templateUrl: './contest-rules-format-form.component.html',
  styleUrls: ['./contest-rules-format-form.component.scss'],
})
export class ContestRulesFormatFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() edit: boolean = false;

  stepFormatArray: FormArray;

  runTimersOptions = runTimersOptions;
  jamTimersOptions = jamTimersOptions;
  bestTricksOptions = bestTricksOptions;
  formatsOptions = formatsOptions;

  constructor(
    protected _formRulesService: FormRulesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initStepFormat();
  }

  ngOnChanges() {
    this.initStepFormat();
  }

  initStepFormat() {
    this.stepFormatArray = this.parentForm.get('stepFormats') as FormArray;
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
