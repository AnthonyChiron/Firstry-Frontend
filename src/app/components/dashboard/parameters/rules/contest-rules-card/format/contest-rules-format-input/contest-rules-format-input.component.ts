import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StepFormatModel } from 'src/app/models/stepFormat.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'contest-rules-format-input',
  templateUrl: './contest-rules-format-input.component.html',
  styleUrls: ['./contest-rules-format-input.component.scss'],
})
export class ContestRulesFormatInputComponent implements OnInit, OnDestroy {
  @Input() stepFormat: StepFormatModel = null;
  @Output() stepFormatChange = new EventEmitter<any>();
  @Input() edit: boolean = false;
  @Output() delete: EventEmitter<StepFormatModel> =
    new EventEmitter<StepFormatModel>();

  formatsOptions = [
    { label: 'Run', value: 'RUN' },
    { label: 'Jam', value: 'JAM' },
    { label: 'Best tricks', value: 'BEST_TRICKS' },
    // { label: 'Out', value: 'OUT' },
  ];

  runTimersOptions = [
    { label: '30s', value: 30 },
    { label: '35s', value: 35 },
    { label: '40s', value: 40 },
    { label: '45s', value: 45 },
    { label: '50s', value: 50 },
    { label: '55s', value: 55 },
    { label: '1 min', value: 60 },
  ];

  jamTimersOptions = [
    { label: '45s', value: 45 },
    { label: '1min', value: 60 },
    { label: '1m 15s', value: 75 },
    { label: '1m 30s', value: 90 },
    { label: '2m', value: 105 },
    { label: '2m 15s', value: 120 },
    { label: '2m 30s', value: 135 },
    { label: '2m 45s', value: 150 },
    { label: '3m', value: 175 },
  ];

  bestTricksOptions = [
    { label: '1 essai', value: 1 },
    { label: '2 essais', value: 2 },
    { label: '3 essais', value: 3 },
    { label: '4 essais', value: 4 },
    { label: '5 essais', value: 5 },
  ];

  form: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private rs: RulesService,
    private fb: FormBuilder,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      format: ['', Validators.required],
      runTimer: ['', null],
      jamTimer: ['', null],
      bestTricksCount: ['', null],
    });

    // UPDATE VALIDATORS ON FORMAT CHANGE
    this.form.get('format').valueChanges.subscribe((selectedFormat) => {
      if (selectedFormat === 'JAM') {
        this.form.get('jamTimer').setValidators([Validators.required]);
      } else {
        this.form.get('jamTimer').setValidators(null);
      }
      this.form.get('jamTimer').updateValueAndValidity();

      if (selectedFormat === 'RUN') {
        this.form.get('runTimer').setValidators([Validators.required]);
      } else {
        this.form.get('runTimer').setValidators(null);
      }
      this.form.get('runTimer').updateValueAndValidity();

      if (selectedFormat === 'BEST_TRICKS') {
        this.form.get('bestTricksCount').setValidators([Validators.required]);
      } else {
        this.form.get('bestTricksCount').setValidators(null);
      }
      this.form.get('bestTricksCount').updateValueAndValidity();
    });

    this.form.valueChanges.subscribe((values) => {
      if (this.form.valid) {
        console.log('Formulaire rempli:', values);
        this.stepFormatChange.emit(values);
      }
    });

    if (this.stepFormat.format != '') {
      this.form.patchValue({
        format: this.stepFormat.format,
        runTimer: this.stepFormat.runTimer,
        jamTimer: this.stepFormat.jamTimer,
        bestTricksCount: this.stepFormat.bestTricksCount,
      });
    } else {
      this.form.patchValue({
        format: this.formatsOptions[0].value,
        runTimer: this.runTimersOptions[3].value,
        jamTimer: this.jamTimersOptions[0].value,
        bestTricksCount: this.bestTricksOptions[0].value,
      });
      console.log(this.form.value);
    }
  }

  updateValue(newValue: StepFormatModel) {
    this.stepFormat = newValue;
    this.stepFormatChange.emit(newValue);
  }

  ngOnDestroy(): void {
    this.form.get('format').valueChanges.unsubscribe();
    this.form.valueChanges.unsubscribe();
  }

  getRunLabel() {
    return this.formatsOptions.find(
      (option) => option.value === this.form.value.format
    ).label;
  }

  getBestTricksLabel() {
    return this.bestTricksOptions.find(
      (option) => option.value === this.form.value.bestTricksCount
    ).label;
  }
}
