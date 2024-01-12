import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormUtilityService } from './form-utility.service';
import { CategoryModel, CategoryModelDTO } from 'src/app/models/category.model';
import { ContestModel } from 'src/app/models/contest.model';
import { RulesModel } from 'src/app/models/rules.model';
import { StepFormatModel } from 'src/app/models/stepFormat.model';
import { pointCategoryModel } from 'src/app/models/pointCategory.model';
import {
  runTimersOptions,
  bestTricksOptions,
  jamTimersOptions,
  formatsOptions,
} from 'src/app/constants/rulesConstants';

@Injectable({
  providedIn: 'root',
})
export class FormRulesService extends FormUtilityService {
  constructor(private formBuilder: FormBuilder) {
    super();
  }
  runTimersOptions = runTimersOptions;
  jamTimersOptions = jamTimersOptions;
  bestTricksOptions = bestTricksOptions;
  formatsOptions = formatsOptions;

  createRulesForm(): FormGroup {
    return this.formBuilder.group({
      contestId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      stepFormats: this.formBuilder.array([]),
      pointCategories: this.formBuilder.array([]),
    });
  }

  fillRulesForm(
    rulesForm: FormGroup,
    rules: RulesModel,
    contest: ContestModel
  ) {
    rulesForm.patchValue({
      contestId: rules.contestId || contest._id,
      name: rules.name,
      description: rules.description,
    });

    this.loadStepFormats(rulesForm, rules.stepFormats);
    this.loadPointCategories(rulesForm, rules.pointCategories);
  }

  loadStepFormats(rulesForm: FormGroup, stepFormats) {
    if (!stepFormats) return;
    const stepFormatFormGroups = stepFormats.map((stepFormat) =>
      this.formBuilder.group({
        order: [stepFormat.order, Validators.required],
        formatType: [stepFormat.formatType, Validators.required],
        runTimer: [stepFormat.runTimer, Validators.required],
        jamTimer: [stepFormat.jamTimer, Validators.required],
        bestTricksCount: [stepFormat.bestTricksCount, Validators.required],
      })
    );

    const stepFormatArray = this.formBuilder.array(stepFormatFormGroups);
    rulesForm.setControl('stepFormats', stepFormatArray);
  }

  loadPointCategories(
    rulesForm: FormGroup,
    pointCategories: pointCategoryModel[]
  ) {
    if (!pointCategories) return;
    const pointCategoriesFormGroups = pointCategories.map((pointCategory) =>
      this.formBuilder.group({
        name: [pointCategory.name, Validators.required],
        description: [pointCategory.description, Validators.required],
        points: [pointCategory.points, Validators.required],
      })
    );
    console.log(pointCategoriesFormGroups);

    const pointCategoriesArray = this.formBuilder.array(
      pointCategoriesFormGroups
    );

    rulesForm.setControl('pointCategories', pointCategoriesArray);
  }

  addPointCategory(pointCategoriesArray: FormArray) {
    const pointCategoryGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      points: [0, [Validators.required, Validators.min(1)]],
    });

    pointCategoryGroup.patchValue({
      name: '',
      description: '',
      points: 10,
    });

    pointCategoriesArray.push(pointCategoryGroup);
  }

  deletePointCategory(pointCategoriesArray: FormArray, index: number) {
    pointCategoriesArray.removeAt(index);
  }

  addStepFormat(stepFormatArray: FormArray) {
    const stepFormatGroup = this.formBuilder.group({
      order: [stepFormatArray.length],
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

    stepFormatArray.push(stepFormatGroup);
  }

  deleteStepFormat(stepFormatArray: FormArray, index: number) {
    stepFormatArray.removeAt(index);
  }

  //   parseFormToRules(form: FormGroup): RulesModel {
  //     return;
  //   }
}
