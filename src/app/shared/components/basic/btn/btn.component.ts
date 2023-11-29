import { ScreenSizeService } from './../../../services/screenSize/screen-size.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'btn',
  template: ` <button *ngIf="label != ''" class="{{ type }} {{ size }}">
      <i *ngIf="icon != '' && iconPos != 'right'" class="left {{ icon }}"></i>
      <p>{{ label }}</p>
      <i *ngIf="icon != '' && iconPos == 'right'" class="right {{ icon }}"></i>
    </button>
    <button *ngIf="label == ''" class="{{ type }} iconOnly {{ size }}">
      <i *ngIf="icon != ''" class="{{ icon }}"></i>
    </button>`,
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  @Input() type: String = 'primary';
  @Input() label: String = '';
  @Input() icon: String = '';
  @Input() iconPos: String = 'left';
  @Input() size: String = 'm';

  isMobile: boolean = false;

  constructor() {}
}
