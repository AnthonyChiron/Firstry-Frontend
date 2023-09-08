import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  template: ` <button class="primary-btn">
    <i class="fa-solid  fa-{{ icon }}"></i>
    {{ content }}
  </button>`,
  styleUrls: ['./btn-primary.component.scss'],
})
export class BtnPrimaryComponent {
  @Input() content: String = '';
  @Input() icon: String = '';

  constructor() {}
}
