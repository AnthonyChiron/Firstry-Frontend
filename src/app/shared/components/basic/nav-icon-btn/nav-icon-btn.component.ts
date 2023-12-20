import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav-icon-btn',
  template: `
    <button class="{{ type }}">
      <i class="fa-solid {{ class }}"></i>
    </button>
  `,
  styleUrls: ['./nav-icon-btn.component.scss'],
})
export class NavIconBtnComponent implements OnInit {
  @Input() icon: String = 'home';
  @Input() type: String = 'primary';
  class: String[] = [];

  constructor() {}

  ngOnInit(): void {
    this.class.push('fa-' + this.icon);
  }
}
