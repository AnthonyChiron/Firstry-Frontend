import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent,
} from '@angular/animations';

@Component({
  selector: 'scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrls: ['./scrolling-text.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('in', style({ transform: 'translateX(-100%)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('in => out', [animate('10s linear')]),
      transition('out => in', [animate('0s')]),
    ]),
  ],
})
export class ScrollingTextComponent {
  @Input() text: string;
  animationState = 'in';

  constructor() {
    this.animationState = 'out';
    this.resetAnimation();
  }

  resetAnimation() {
    setInterval(() => {
      this.animationState = 'in';
      setTimeout(() => {
        this.animationState = 'out';
      });
    }, 10000);
  }

  animationDone(event: AnimationEvent) {
    if (event.toState === 'out') {
      this.animationState = 'in';
    }
  }
}
