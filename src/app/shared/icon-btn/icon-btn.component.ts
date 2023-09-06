import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-btn',
  template: `
    <button>
      <i class="fa-solid fa-2xl {{ class }}"></i>
    </button>
  `,
  styleUrls: ['./icon-btn.component.scss'],
})
export class IconBtnComponent implements OnInit {
  @Input() icon: String = 'home';
  class: String[] = [];

  constructor() {}

  ngOnInit(): void {
    this.class.push('fa-' + this.icon);
  }
}
