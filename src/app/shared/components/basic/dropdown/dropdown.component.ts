import {
  Component,
  forwardRef,
  HostListener,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
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
export class DropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() options: any[] = [];
  @Input() routes: any[] = [];
  @Input() fitContent: boolean = false;
  @Input() width: string = '';
  @Input() label: string = '';
  @Input() edit: boolean = true;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  showDropdown = false;
  selectedOption: any = { label: '', value: '' };

  @Input() value: any;

  private onChange: Function = (value: any) => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.selectedOption = this.options.find((option) => option.value === value);
    if (!this.selectedOption) {
      this.selectedOption = this.options[0];
    }
    if (!this.selectedOption) {
      this.selectedOption = '';
    }
    this.value = this.selectedOption.value;
    this.onChange(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (
      this.options.length > 0 &&
      !this.options.find((option) => option.value === this.value)
    )
      this.registerOnChange(this.options[0].value);
  }

  ngOnChanges(): void {
    this.writeValue(this.value);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: any) {
    this.selected.emit(option);
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
