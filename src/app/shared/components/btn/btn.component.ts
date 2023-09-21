import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn',
  template: ` <button class="{{ type }}">
    <i *ngIf="icon != '' && iconPos != 'right'" class="left {{ icon }}"></i>
    <p>{{ label }}</p>
    <i *ngIf="icon != '' && iconPos == 'right'" class="right {{ icon }}"></i>
  </button>`,
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  @Input() type: String = 'primary';
  @Input() label: String = '';
  @Input() icon: String = '';
  @Input() iconPos: String = 'left';

  constructor() {}
}
