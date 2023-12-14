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
  selector: 'input-title',
  templateUrl: './input-title.component.html',
  styleUrls: ['./input-title.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTitleComponent),
      multi: true,
    },
  ],
})
export class InputTitleComponent {
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
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }
}
