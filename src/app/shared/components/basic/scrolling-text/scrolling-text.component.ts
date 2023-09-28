// scrolling-text.component.ts
import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'scrolling-text',
  template: `<span #text [ngStyle]="{ 'width.px': 100 }">{{ content }}</span>`,
  styles: [
    `
      span {
        overflow: hidden;
      }
    `,
  ],
})
export class ScrollingTextComponent implements AfterViewInit {
  @Input() content: string;
  offset = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const text = this.el.nativeElement.querySelector('span');
    setInterval(() => {
      this.offset--;
      if (-this.offset >= text.offsetWidth) {
        this.offset = this.el.nativeElement.offsetWidth;
      }
      text.style.transform = `translateX(${this.offset}px)`;
    }, 30);
  }
}
