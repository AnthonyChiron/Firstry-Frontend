import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilityService {
  private form: FormGroup;

  setForm(form: FormGroup) {
    this.form = form;
  }

  public isFieldInvalid(field) {
    return null;
    return this.form.get(field).invalid && this.form.get(field).touched;
  }

  // Validateur personnalisé pour vérifier que le champ n'est pas vide
  public notEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isNotEmpty = (control.value || '').trim().length > 0;
      return !isNotEmpty ? { notEmpty: { value: control.value } } : null;
    };
  }

  // Validateur personnalisé pour vérifier que la valeur est un nombre
  public numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Vérifie si la valeur est un nombre
      const isNumber =
        !isNaN(parseFloat(control.value)) && isFinite(control.value);
      return !isNumber ? { notNumber: { value: control.value } } : null;
    };
  }
}
