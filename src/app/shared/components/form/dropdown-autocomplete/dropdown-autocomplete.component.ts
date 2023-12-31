import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tr } from 'date-fns/locale';

@Component({
  selector: 'dropdown-autocomplete',
  templateUrl: './dropdown-autocomplete.component.html',
  styleUrls: ['./dropdown-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownAutocompleteComponent),
      multi: true,
    },
  ],
})
export class DropdownAutocompleteComponent implements OnInit, OnChanges {
  @Input() options: any[] = [];
  @Input() optionTemplate: TemplateRef<any>;
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() error: boolean = false;
  @Input() edit: boolean = true;

  @Input() isCountry: boolean = true;

  input: string = '';
  value: any = {};
  filteredOptions: any[] = [];
  showDropdown = false;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(): void {
    const correspondingOption = this.options.find(
      (opt) => JSON.stringify(opt.value) === JSON.stringify(this.value)
    );
    if (correspondingOption) {
      this.writeValue(this.value);
    }
  }

  filterOptions(): void {
    const value = this.input.toLowerCase();
    if (value === '') {
      this.filteredOptions = [...this.options];
    } else {
      this.showDropdown = true;
      this.filteredOptions = this.options.filter((option) =>
        option.label.toLowerCase().includes(value)
      );
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    this.filterOptions();
  }

  selectOption(option: any): void {
    this.input = option.label;
    this.value = option.value;
    this.showDropdown = false;
    this.onChange(this.value); // Met à jour la valeur du formulaire
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      const correspondingOption = this.options.find(
        (opt) => JSON.stringify(opt.value) === JSON.stringify(this.value)
      );
      this.input = correspondingOption ? correspondingOption.label : '';
      this.value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && !this.value) {
      this.showDropdown = false;
      this.input = ''; // Réinitialisez la valeur de l'input
    }
  }
}
