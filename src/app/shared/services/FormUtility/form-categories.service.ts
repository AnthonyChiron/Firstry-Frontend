import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormUtilityService } from './form-utility.service';
import { CategoryModel, CategoryModelDTO } from 'src/app/models/category.model';
import { ContestModel } from 'src/app/models/contest.model';

@Injectable({
  providedIn: 'root',
})
export class FormCategoriesService extends FormUtilityService {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  createCategoriesForm(): FormGroup {
    return this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      maxRiders: [
        '0',
        [Validators.required, Validators.min(1), this.numberValidator()],
      ],
      sports: ['', Validators.required],
      registerPrice: [
        '0',
        [Validators.required, Validators.min(1), this.numberValidator()],
      ],
      isQualificationStep: [true, Validators.required],
      isParentalAuthorizationRequired: [false],
      contestId: ['', Validators.required],
      stepQualif: this.createStepForm('QUALIFICATION'),
      stepFinal: this.createStepForm('FINALE'),
    });
  }

  createStepForm(type): FormGroup {
    let stepFormGroup = this.formBuilder.group({
      _id: [''],
      name: [type],
      startDate: ['', Validators.required],
      ridersQualifiedCount: [
        '8',
        [Validators.required, Validators.min(1), this.numberValidator()],
      ],
      rules: ['', Validators.required],
    });

    if (type === 'FINALE') stepFormGroup.removeControl('ridersQualifiedCount');
    return stepFormGroup;
  }

  fillCategoryForm(
    categoryForm: FormGroup,
    category: CategoryModel,
    contest: ContestModel
  ) {
    if (category._id) {
      // Récupère les steps de la catégorie
      let stepQualif = category.steps.find(
        (step) => step.name === 'QUALIFICATION'
      );
      let stepFinal = category.steps.find(
        (step) => step.name === 'FINALE' || step.name === ''
      );

      // Rempli le formulaire
      categoryForm.patchValue({
        _id: category._id,
        name: category.name,
        description: category.description,
        maxRiders: category.maxRiders,
        sports: category.sports,
        registerPrice: category.registerPrice,
        isQualificationStep: category.isQualificationStep,
        isParentalAuthorizationRequired:
          category.isParentalAuthorizationRequired,
        contestId: contest._id,
      });

      if (category.isQualificationStep) {
        categoryForm.get('stepQualif').patchValue({
          _id: stepQualif._id,
          startDate: new Date(stepQualif.startDate),
          ridersPerPool: stepQualif.ridersPerPool,
          ridersQualifiedCount: stepQualif.ridersQualifiedCount,
          rules:
            stepQualif.rules._id && stepQualif.rules._id.length > 0
              ? stepQualif.rules._id
              : stepQualif.rules,
        });
        categoryForm.get('stepQualif').value.rules =
          stepQualif.rules._id && stepQualif.rules._id.length > 0
            ? stepQualif.rules._id
            : stepQualif.rules;
      } else categoryForm.removeControl('stepQualif');

      categoryForm.get('stepFinal').patchValue({
        _id: stepFinal._id,
        startDate: new Date(stepFinal.startDate),
        ridersPerPool: stepFinal.ridersPerPool,
        rules:
          stepFinal.rules._id && stepFinal.rules._id.length > 0
            ? stepFinal.rules._id
            : stepFinal.rules,
      });
      categoryForm.get('stepFinal').value.rules =
        stepFinal.rules._id && stepFinal.rules._id.length > 0
          ? stepFinal.rules._id
          : stepFinal.rules;
    }
    return categoryForm;
  }

  fillNewCategoryForm(
    categoryForm: FormGroup,
    contest: ContestModel,
    rule: string
  ) {
    categoryForm.patchValue({
      contestId: contest._id,
    });

    let dates = this.getDatesFromContestAsOptions(contest);
    categoryForm.get('stepQualif').patchValue({
      rules: rule,
      startDate: dates[0].value,
    });

    categoryForm.get('stepFinal').patchValue({
      rules: rule,
      startDate: dates.length > 1 ? dates[1].value : dates[0].value,
    });

    return categoryForm;
  }

  parseFormToCategoryDTO(
    categoryForm: FormGroup,
    isNew: boolean
  ): CategoryModelDTO {
    let categoryDTO: CategoryModelDTO = {
      category: {
        name: categoryForm.get('name').value,
        description: categoryForm.get('description').value,
        maxRiders: Number(categoryForm.get('maxRiders').value),
        sports: categoryForm.get('sports').value,
        registerPrice: Number(categoryForm.get('registerPrice').value),
        isQualificationStep: categoryForm.get('isQualificationStep').value,
        isParentalAuthorizationRequired: categoryForm.get(
          'isParentalAuthorizationRequired'
        ).value,
        contestId: categoryForm.get('contestId').value,
      },
      steps: [],
      stepsId: [],
    };

    if (categoryForm.get('isQualificationStep').value) {
      categoryDTO.steps.push(categoryForm.get('stepQualif').value);
      categoryDTO.stepsId.push(categoryForm.get('stepQualif').get('_id').value);
    }
    categoryDTO.steps.push(categoryForm.get('stepFinal').value);
    categoryDTO.stepsId.push(categoryForm.get('stepFinal').get('_id').value);

    delete categoryDTO.steps[0]._id;
    if (categoryForm.get('isQualificationStep').value)
      delete categoryDTO.steps[1]._id;

    return categoryDTO;
  }

  removeQualificationStep(categoryForm: FormGroup) {
    categoryForm.removeControl('stepQualif');
    return categoryForm;
  }

  addQualificationStep(categoryForm: FormGroup) {
    categoryForm.addControl('stepQualif', this.createStepForm('QUALIFICATION'));
    return categoryForm;
  }

  getDatesFromContestAsOptions(contest: ContestModel) {
    // Récupère toutes les dates entre la date de début et la date de fin du contest
    let dates = [];
    let startDate = new Date(contest.startDate);
    let endDate = new Date(contest.endDate);

    while (startDate <= endDate) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    let datesOptions = dates.map((date, index) => {
      return {
        value: date,
        label: 'Jour ' + (index + 1),
      };
    });
    return datesOptions;
  }
}
