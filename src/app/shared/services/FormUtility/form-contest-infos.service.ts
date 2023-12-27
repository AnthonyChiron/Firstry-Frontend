import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  createForm(contest: ContestModel) {
    return this.formBuilder.group({
      name: [contest.name, Validators.required],
      description: [contest.description, Validators.required],
      sports: [contest.sports, Validators.required],
      startDate: [contest.startDate, Validators.required],
      endDate: [contest.endDate, Validators.required],
      registrationEndDate: [contest.registrationEndDate, Validators.required],
      location: [contest.location, Validators.required],
    });
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
    });
  }
}
