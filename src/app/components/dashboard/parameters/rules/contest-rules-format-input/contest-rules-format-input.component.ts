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

  formats = [
    { label: 'Run', value: 'RUN' },
    { label: 'Jam', value: 'JAM' },
    { label: 'Best tricks', value: 'BEST_TRICKS' },
    // { label: 'Out', value: 'OUT' },
  ];
  selectedFormat: any = this.formats[0];

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
      this.form.patchValue({ format: this.formats[0] });
    }
  }

  updateValue(newValue: StepFormatModel) {
    this.stepFormat = newValue;
    this.stepFormatChange.emit(newValue);
  }

  onSelectedFormat(event: any) {
    this.selectedFormat = event;
    this.form.patchValue({ format: event.value });
    console.log(this.selectedFormat);
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.form.get('format').valueChanges.unsubscribe();
    this.form.valueChanges.unsubscribe();
  }
}
