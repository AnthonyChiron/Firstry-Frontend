import { ScreenSizeService } from './../../../services/screenSize/screen-size.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'btn',
  template: ` <button
      [name]="name"
      *ngIf="label != ''"
      class="{{ type }} {{ size }}"
      [type]="inputType"
      [disabled]="disabled"
    >
      <i *ngIf="icon != '' && iconPos != 'right'" class="left {{ icon }}"></i>
      <p>{{ label }}</p>
      <i *ngIf="icon != '' && iconPos == 'right'" class="right {{ icon }}"></i>
    </button>
    <button
      [name]="name"
      *ngIf="label == ''"
      class="{{ type }} iconOnly {{ size }}"
      [type]="inputType"
      [disabled]="disabled"
    >
      <i *ngIf="icon != ''" class="{{ icon }}"></i>
    </button>`,
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent implements OnInit {
  @Input() name: String = '';
  @Input() type: String = 'primary';
  @Input() inputType: String = 'button';
  @Input() label: String = '';
  @Input() icon: String = '';
  @Input() iconPos: String = 'left';
  @Input() size: String = 'm';
  @Input() disabled: boolean = false;

  isMobile: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
