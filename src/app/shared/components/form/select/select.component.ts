// custom-select.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'input-select',
  template: `
    <label *ngIf="label != ''">{{ label }}</label>
    <select [ngModel]="value" (ngModelChange)="onSelect($event)">
      >
      <option *ngFor="let option of options" [value]="option.value">
        {{ option.label }}
      </option>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
  styleUrls: ['./select.component.scss'],
})
export class InputSelectComponent implements ControlValueAccessor {
  @Input() options: any[];
  @Input() label: string;
  value: any;

  private onChange: Function = (value: any) => {};
  private onTouched: Function = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Appelée lors de la sélection d'une nouvelle valeur
  onSelect(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
