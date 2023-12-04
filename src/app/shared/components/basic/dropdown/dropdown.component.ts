import {
  Component,
  HostListener,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() options: any[] = [];
  @Input() routes: any[] = [];
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  showDropdown = false;
  selectedOption: any = { label: '', value: '' };

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.selected.emit(option);
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
