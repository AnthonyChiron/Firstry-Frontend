import { ValidEmailComponent } from './../../../components/account/valid-email/valid-email.component';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormUtilityService } from './form-utility.service';
import { RiderModel } from 'src/app/models/rider.model';

@Injectable({
  providedIn: 'root',
})
export class FormSecurityService extends FormUtilityService {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  fillForm(form: FormGroup, data: RiderModel) {
    form.patchValue({});
  }
}
