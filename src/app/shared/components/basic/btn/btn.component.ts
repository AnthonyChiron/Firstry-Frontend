import { ScreenSizeService } from './../../../services/screenSize/screen-size.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'btn',
  template: ` <button *ngIf="label != ''" class="{{ type }}">
      <i *ngIf="icon != '' && iconPos != 'right'" class="left {{ icon }}"></i>
      <p>{{ label }}</p>
      <i *ngIf="icon != '' && iconPos == 'right'" class="right {{ icon }}"></i>
    </button>
    <button *ngIf="label == ''" class="{{ type }} iconOnly">
      <i *ngIf="icon != ''" class="{{ icon }}"></i>
    </button>`,
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  @Input() type: String = 'primary';
  @Input() label: String = '';
  @Input() icon: String = '';
  @Input() iconPos: String = 'left';
  isMobile: boolean = false;

  constructor() {}
}
