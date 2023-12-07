import {
  Component,
  forwardRef,
  HostListener,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() routes: any[] = [];
  @Input() fitContent: boolean = false;
  @Input() width: string = '';
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  showDropdown = false;
  selectedOption: any = { label: '', value: '' };

  value: any;
  onChange: (value: any) => void;
  onTouched: () => void;

  writeValue(value: string): void {
    this.selectedOption = this.options.find((option) => option.value === value);
    if (!this.selectedOption) {
      this.selectedOption = this.options[0];
    }
    this.value = this.selectedOption.value;
    console.log(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.options);
    if (
      this.options.length > 0 &&
      !this.options.find((option) => option.value === this.value)
    )
      this.registerOnChange(this.options[0].value);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.onChange(option.value); // Notifie Angular de la modification
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
