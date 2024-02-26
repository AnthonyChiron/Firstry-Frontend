import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputChipsComponent),
      multi: true,
    },
  ],
})
export class InputChipsComponent implements ControlValueAccessor, OnInit {
  @Input() options: { label: string; value: any }[] = [];
  @Input() defaultValue: any;
  @Input() label: string = '';
  @Input() edit: boolean = true;
  @Input() error: boolean = true;
  @Input() isBinary: boolean = false;
  @Input() isValueDate: boolean = false;

  value: any;

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    if (Array.isArray(this.value) && this.value.length === 0) {
      this.value.push(this.options[0].value);
    }
  }

  toggleChip(chipValue: any) {
    if (this.isBinary) {
      // Pour la sélection unique
      this.value = this.value === chipValue ? null : chipValue;
    } else {
      // Pour la sélection multiple (comme avant)
      const index = this.value.indexOf(chipValue);
      if (index >= 0) {
        this.value.splice(index, 1);
      } else {
        this.value.push(chipValue);
      }
    }
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if (this.isBinary) {
      this.value = value;
    } else {
      this.value = Array.isArray(value) ? value : [];
    }
  }

  isSelected(chipValue: any): boolean {
    if (this.isBinary) {
      return this.isValueDate
        ? this.isSameDay(new Date(this.value), new Date(chipValue))
        : this.value === chipValue;
    } else {
      if (this.isValueDate) {
        return this.value.some((val: any) =>
          this.isSameDay(new Date(val), new Date(chipValue))
        );
      }
      return this.value.includes(chipValue);
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
