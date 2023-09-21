import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-text',
  template: `<input
    type="text"
    [ngModel]="value"
    (ngModelChange)="onChange($event)"
  />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
    console.log(value);
  }

  registerOnChange(fn: any): void {
    console.log(fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
