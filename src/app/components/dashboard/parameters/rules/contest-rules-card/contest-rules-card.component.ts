import { StepFormatModel } from './../../../../../models/stepFormat.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContestModel } from 'src/app/models/contest.model';
import { pointCategoryModel } from 'src/app/models/pointCategory.model';
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
  @Output() updateRule: EventEmitter<RulesModel> =
    new EventEmitter<RulesModel>();

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
      contestId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      stepFormats: this.fb.array([]),
      pointCategories: this.fb.array([]),
    });

    this.loadData();
  }

  loadData() {
    if (this.rules._id) {
      this.form.patchValue({
        contestId: this.rules.contestId,
        name: this.rules.name,
        description: this.rules.description,
      });

      this.loadStepFormats(this.rules.stepFormats);
      this.loadPointCategories(this.rules.pointCategories);
    } else {
      this.edit = true;
      this.form.patchValue({
        contestId: this.contest._id,
      });
    }
  }

  loadStepFormats(stepFormats: StepFormatModel[]) {
    const stepFormatFormGroups = this.rules.stepFormats.map((stepFormat) =>
      this.fb.group({
        order: [stepFormat.order, Validators.required],
        formatType: [stepFormat.formatType, Validators.required],
        runTimer: [stepFormat.runTimer, Validators.required],
        jamTimer: [stepFormat.jamTimer, Validators.required],
        bestTricksCount: [stepFormat.bestTricksCount, Validators.required],
      })
    );

    const stepFormatArray = this.fb.array(stepFormatFormGroups);
    this.form.setControl('stepFormats', stepFormatArray);
  }

  loadPointCategories(pointCategories: pointCategoryModel[]) {
    const pointCategoriesFormGroups = this.rules.pointCategories.map(
      (pointCategory) =>
        this.fb.group({
          name: [pointCategory.name, Validators.required],
          description: [pointCategory.description, Validators.required],
          points: [pointCategory.points, Validators.required],
        })
    );

    const pointCategoriesArray = this.fb.array(pointCategoriesFormGroups);
    this.form.setControl('pointCategories', pointCategoriesArray);
  }

  cancel() {
    this.edit = false;

    if (!this.rules._id) {
      this.delete();
    } else {
      this.form.patchValue({ ...this.rules });
      console.log(this.form.value);
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.updateRule.emit({ _id: this.rules._id, ...this.form.value });
    this.edit = false;
  }

  delete() {
    this.deleteRule.emit(this.rules);
  }
}
