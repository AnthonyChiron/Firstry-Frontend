import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(200)),
    ]),
  ],
})
export class ModalComponent {
  @Input() show = false;
  @Output() onClose = new EventEmitter();

  constructor(private _elementRef: ElementRef) {}

  // @HostListener('document:click', ['$event'])
  // clickOutside(event: Event) {
  //   if (!this._elementRef.nativeElement.contains(event.target)) {
  //     this.show = false;
  //   }
  // }

  close() {
    this.show = false;
    this.onClose.emit();
  }
}
