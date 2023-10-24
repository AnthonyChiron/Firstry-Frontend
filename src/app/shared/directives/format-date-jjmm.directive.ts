import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[FormatDateJJMM]',
})
export class FormatDateJJMMDirective implements OnInit {
  @Input('date') date: Date; // Prenez la date en entrée depuis le composant

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.date) {
      // Formatez la date en jj/mm
      const formattedDate = this.formatDate(new Date(this.date));
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        formattedDate
      );
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }
}
