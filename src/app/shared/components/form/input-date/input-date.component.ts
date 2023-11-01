import { forwardRef, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() error: boolean = false;
  @Input() edit: boolean = true;

  value: Date;
  onChange: (value: Date) => void;
  onTouched: () => void;

  writeValue(value: Date): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(value: string): void {
    console.log(value);
    if (value.length > 7)
      this.value = new Date(
        Number(value.slice(4, 8)),
        Number(value.slice(2, 4)),
        Number(value.slice(0, 2))
      );
    console.log(this.value);
    this.onChange(this.value);
    this.onTouched();
  }
}
