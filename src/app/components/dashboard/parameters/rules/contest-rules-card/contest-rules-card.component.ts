import { StepFormatModel } from './../../../../../models/stepFormat.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestModel } from 'src/app/models/contest.model';
import { RulesModel } from 'src/app/models/rules.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'contest-rules-card',
  templateUrl: './contest-rules-card.component.html',
  styleUrls: ['./contest-rules-card.component.scss'],
})
export class ContestRulesCardComponent implements OnInit {
  @Input() contest: ContestModel;
  @Input() rules: RulesModel = {} as RulesModel;
  @Output() deleteRule: EventEmitter<RulesModel> =
    new EventEmitter<RulesModel>();

  private originalRules: RulesModel;

  edit: boolean = false;
  touched: boolean = false;
  form: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private rs: RulesService,
    private fb: FormBuilder,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.originalRules = JSON.parse(JSON.stringify(this.rules));

    this.form = this.fb.group({
      contestId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      format: ['', Validators.required],
      pointDistribution: ['', Validators.required],
    });

    if (this.rules) {
      this.form.patchValue({ ...this.rules });
    } else {
      this.form.patchValue({
        contestId: this.contest._id,
      });
    }
  }

  test() {
    console.log(this.originalRules.format);
    console.log(this.rules.format);
  }

  cancel() {
    this.edit = false;
    if (!this.rules._id) {
      this.deleteRule.emit(this.rules);
    } else {
      this.form.patchValue({ ...this.originalRules });
      console.log(this.form.value);
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    if (this.rules._id) {
      this.rs.update(this.rules._id, this.form.value).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.rs.create(this.form.value).subscribe((res) => {
        console.log(res);
      });
    }
    this.edit = false;
  }
}
