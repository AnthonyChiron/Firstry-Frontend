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
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'contest-rules-format-input',
  templateUrl: './contest-rules-format-input.component.html',
  styleUrls: ['./contest-rules-format-input.component.scss'],
})
export class ContestRulesFormatInputComponent implements OnInit, OnDestroy {
  @Input() stepFormat: any = null;
  @Input() edit: boolean = false;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  selectedFormat: any = null;

  form: any;

  formats = [
    { label: 'Run', value: 'RUN' },
    { label: 'Jam', value: 'JAM' },
    { label: 'Best tricks', value: 'BEST_TRICKS' },
    // { label: 'Out', value: 'OUT' },
  ];

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
      bestTricksTryCount: ['', null],
    });

    if (this.stepFormat) {
      this.form.patchValue({
        format: this.stepFormat.format,
        runTimer: this.stepFormat.runTimer,
        jamTimer: this.stepFormat.jamTimer,
        bestTricksCount: this.stepFormat.bestTricksCount,
      });
    } else {
      this.selectedFormat = this.formats[0];
    }

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
        this.form
          .get('bestTricksTryCount')
          .setValidators([Validators.required]);
      } else {
        this.form.get('bestTricksTryCount').setValidators(null);
      }
      this.form.get('bestTricksTryCount').updateValueAndValidity();
    });
  }

  onSelectedFormat(event: any) {
    this.selectedFormat = event;
    this.form.patchValue({ format: event.value });
  }

  ngOnDestroy(): void {
    this.form.get('format').valueChanges.unsubscribe();
  }
}
