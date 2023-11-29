import { ScreenSizeService } from './../../../services/screenSize/screen-size.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'nav-btn',
  template: ` <button
      routerLink="{{ routerLink }}"
      routerLinkActive="active"
      *ngIf="label != ''"
      [class]="type + ' ' + size"
    >
      <i *ngIf="icon != '' && iconPos != 'right'" class="left {{ icon }}"></i>
      <p>{{ label }}</p>
      <i *ngIf="icon != '' && iconPos == 'right'" class="right {{ icon }}"></i>
    </button>
    <button *ngIf="label == ''" class="{{ type }} iconOnly">
      <i *ngIf="icon != ''" class="{{ icon }}"></i>
    </button>`,
  styleUrls: ['./nav-btn.component.scss'],
})
export class NavBtnComponent {
  @Input() type: String = 'primary';
  @Input() label: String = '';
  @Input() icon: String = '';
  @Input() iconPos: String = 'left';
  @Input() size: String = 'm';
  @Input() routerLink: String = '';

  isMobile: boolean = false;

  constructor() {}
}
