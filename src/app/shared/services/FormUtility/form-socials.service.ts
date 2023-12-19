import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilityService } from './form-utility.service';

@Injectable({
  providedIn: 'root',
})
export class FormSocialsService extends FormUtilityService {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      instagram: [''],
      twitter: [''],
      youtube: [''],
    });
  }

  fillForm(form: FormGroup, data) {
    if (data) {
      form.patchValue({
        instagram: data.instagram,
        twitter: data.twitter,
        youtube: data.youtube,
      });
    }
  }
}
