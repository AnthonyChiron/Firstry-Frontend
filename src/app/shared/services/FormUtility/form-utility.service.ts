import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilityService {
  private form: FormGroup;

  setForm(form: FormGroup) {
    this.form = form;
  }

  public isFieldInvalid(field) {
    const formField = this.form.get(field);
    return formField?.invalid && formField?.touched;
  }
}
