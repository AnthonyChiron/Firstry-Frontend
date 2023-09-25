import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[Capitalize]',
})
export class CapitalizeDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    let content: string = this.el.nativeElement.innerText;
    this.el.nativeElement.innerText =
      content.charAt(0).toUpperCase() + content.slice(1);
  }
}
