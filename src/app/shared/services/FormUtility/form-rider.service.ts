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
export class FormRiderService extends FormUtilityService {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      licenceNumber: [''],
      bio: [''],
      nationality: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', Validators.required],
      sports: [[], [Validators.required, Validators.minLength(1)]],
      socials: this.formBuilder.group({
        instagram: [''],
        twitter: [''],
        youtube: [''],
      }),
    });
  }

  fillForm(form: FormGroup, data: RiderModel) {
    form.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      licenceNumber: data.licenceNumber,
      bio: data.bio,
      nationality: data.nationality,
      city: data.city,
      birthDate: new Date(data.birthDate),
      sports: [...data.sports],
    });

    if (data.socials) {
      form.get('socials').patchValue({
        instagram: data.socials.instagram,
        twitter: data.socials.twitter,
        youtube: data.socials.youtube,
      });
    }
  }
}
