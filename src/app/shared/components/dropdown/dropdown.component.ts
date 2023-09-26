import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  forwardRef,
} from '@angular/core';
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
  @Input() options: any[] = [];
  @Input() optionTemplate: TemplateRef<any>;
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() error: boolean = false;
  input: string = '';
  value: any = {};
  filteredOptions: any[] = [];
  showDropdown = false;
  onChange: (value: string) => void;
  onTouched: () => void;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
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
      console.log(this.filteredOptions);
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    this.filterOptions();
  }

  selectOption(option: any): void {
    this.input = option.label;
    this.value = option;
    this.showDropdown = false;
    this.onChange(this.value); // Met à jour la valeur du formulaire
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      const correspondingOption = this.options.find(
        (opt) => opt.value === value
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
