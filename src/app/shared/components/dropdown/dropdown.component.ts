import {
  Component,
  forwardRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dropdown',
  template: `
    <div class="dropdown">
      <div class="selected-option" (click)="toggleDropdown()">
        {{ selectedLabel }}
      </div>
      <div class="options" *ngIf="showOptions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  selectedLabel: string = 'Select an option';
  showOptions: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  toggleDropdown() {
    this.showOptions = !this.showOptions;
  }

  writeValue(value: any): void {
    // Implement your logic to update the value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement this method to disable the dropdown if needed
  }
}
