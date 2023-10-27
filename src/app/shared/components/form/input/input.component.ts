import {
  AfterContentInit,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-text',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() error: boolean = false;
  @Input() edit: boolean = true;

  value: any;
  onChange: (value: any) => void;
  onTouched: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(value: string): void {
    console.log(value);
    if (this.type === 'date' && value.length === 8) {
      this.value = new Date(
        Number(value.slice(4, 8)),
        Number(value.slice(2, 4)),
        Number(value.slice(0, 2))
      );
      console.log(this.value);
    } else {
      this.value = value;
    }
    this.onChange(this.value);
    this.onTouched();
  }
}
