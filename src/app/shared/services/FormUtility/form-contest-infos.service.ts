import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { FormUtilityService } from './form-utility.service';
import { CategoryModel, CategoryModelDTO } from 'src/app/models/category.model';
import { ContestModel } from 'src/app/models/contest.model';
import { RulesModel } from 'src/app/models/rules.model';
import { format } from 'date-fns';
import { FormatDateJJMMDirective } from '../../directives/format-date-jjmm.directive';

@Injectable({
  providedIn: 'root',
})
export class FormContestInfosService extends FormUtilityService {
  constructor(
    private formBuilder: FormBuilder,
    private fus: FormUtilityService
  ) {
    super();
  }
  startDate: FormControl;
  endDate: FormControl;

  createForm(contest: ContestModel) {
    return this.formBuilder.group(
      {
        name: [contest.name, Validators.required],
        description: [contest.description, Validators.required],
        sports: [contest.sports, Validators.required],
        startDate: [
          contest.startDate,
          [Validators.required, this.fus.startDateValidator],
        ],
        endDate: [contest.endDate, [Validators.required]],
        registrationEndDate: [contest.registrationEndDate, Validators.required],
        location: [contest.location, Validators.required],
        enablePayment: [contest.enablePayment, Validators.required],
      },
      { validators: [this.dateOrderValidator] }
    );
  }

  fillForm(form: FormGroup, contest: ContestModel) {
    form.patchValue({
      name: contest.name,
      description: contest.description,
      startDate: contest.startDate,
      endDate: contest.endDate,
      registrationEndDate: contest.registrationEndDate,
      sports: contest.sports,
      location: contest.location,
      enablePayment: contest.enablePayment,
    });

    this.startDate = form.get('startDate') as FormControl;
    this.endDate = form.get('endDate') as FormControl;
  }

  dateOrderValidator = (formGroup: FormGroup): ValidationErrors | null => {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;
    const registrationEndDate = formGroup.get('registrationEndDate')?.value;

    // Vérifie si les deux dates sont présentes et si la startDate est antérieure à la endDate
    if (!startDate || !endDate || !registrationEndDate) return null;

    if (new Date(startDate) > new Date(endDate))
      return { dateOrderInvalid: true };

    if (new Date(startDate) < new Date(registrationEndDate))
      return { dateOrderInvalid: true };

    return null;
  };
}
