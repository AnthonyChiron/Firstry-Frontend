import { Component, Input } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options: any[] = [];
  showDropdown = false;
  selectedOption: string | null = null;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.showDropdown = false;
  }
}
