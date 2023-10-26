import { ToggleButtonModule } from 'primeng/togglebutton';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() close: boolean = false;
  @Input() redirect: boolean = false;
  @Input() redirectLink: string = '';
  @Input() btn: boolean = false;
  @Input() btnIcon: string = '';
  @Output() btnClicked: EventEmitter<any> = new EventEmitter();
  toggle: boolean = false;

  emitBtnClicked() {
    this.btnClicked.emit();
  }
}
