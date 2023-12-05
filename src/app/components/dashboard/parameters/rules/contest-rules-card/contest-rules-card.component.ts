import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'contest-rules-card',
  templateUrl: './contest-rules-card.component.html',
  styleUrls: ['./contest-rules-card.component.scss'],
})
export class ContestRulesCardComponent implements OnInit {
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
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      format: ['', Validators.required],
      pointDistribution: ['', Validators.required],
      jamTimer: ['', Validators.required],
      runTimer: ['', Validators.required],
    });
  }

  selectedFormat(event: any) {
    this.form.patchValue({ format: event.target.value });
  }
}
