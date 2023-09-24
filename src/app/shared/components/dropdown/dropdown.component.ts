import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements OnInit {
  @Input() options: string[] = [];
  selected: any;
  filteredOptions: string[] = [];
  showDropdown = false;
  value: string;
  onChange: (value: string) => void;
  onTouched: () => void;

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  filterOptions(): void {
    const value = this.selected.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(value)
    );
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string): void {
    this.selected = option;
    this.showDropdown = false;
  }

  writeValue(value: string): void {
    this.value = value;
    console.log(value);
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
    this.onChange(value);
    this.onTouched();
  }
}
