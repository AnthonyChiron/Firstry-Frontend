import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
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
    if (!this.form) return false;
    if (!this.form.get(field)) return false;
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

  public startDateValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    if (!control.value) {
      return null; // Si aucune date n'est définie, on ne valide pas
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour la comparaison des dates uniquement

    const startDate = new Date(control.value);
    startDate.setHours(0, 0, 0, 0); // Assurez-vous de réinitialiser l'heure pour la date de début également

    return startDate >= today ? null : { startDateInvalid: true };
  }

  public startEndDateValidator = (
    formGroup: FormGroup
  ): ValidationErrors | null => {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    // Vérifie si les deux dates sont présentes et si la startDate est antérieure à la endDate
    if (!startDate || !endDate) return null;

    if (new Date(startDate) > new Date(endDate))
      return { dateOrderInvalid: true };

    return null;
  };
}
