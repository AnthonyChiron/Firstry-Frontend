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
  selector: 'slide-input',
  templateUrl: './slide-input.component.html',
  styleUrls: ['./slide-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideInputComponent),
      multi: true,
    },
  ],
})
export class SlideInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() name: string;

  value: any;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

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
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }
}
