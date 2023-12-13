import { StepFormatModel } from './../../../../../models/stepFormat.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestModel } from 'src/app/models/contest.model';
import { pointCategoryModel } from 'src/app/models/pointCategory.model';
import { RulesModel } from 'src/app/models/rules.model';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';
import { FormRulesService } from 'src/app/shared/services/FormUtility/form-rules.service';
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
  @Output() updateRule: EventEmitter<RulesModel> =
    new EventEmitter<RulesModel>();

  showDeleteModal: boolean = false;

  edit: boolean = false;
  rulesForm: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContestsService,
    private rs: RulesService,
    private fb: FormBuilder,
    private formRulesService: FormRulesService,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.rulesForm = this.formRulesService.createRulesForm();
    this.fus.setForm(this.rulesForm);

    this.formRulesService.fillRulesForm(
      this.rulesForm,
      this.rules,
      this.contest
    );

    if (!this.rules._id) this.edit = true;
  }

  cancel() {
    this.edit = false;

    if (!this.rules._id) {
      this.delete();
    } else {
      this.rulesForm.patchValue({ ...this.rules });
      console.log(this.rulesForm.value);
    }
  }

  submit() {
    this.rulesForm.markAllAsTouched();
    if (this.rulesForm.invalid) return;

    this.updateRule.emit({ _id: this.rules._id, ...this.rulesForm.value });
    this.edit = false;
  }

  delete() {
    this.deleteRule.emit(this.rules);
  }
}
