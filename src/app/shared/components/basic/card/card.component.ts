import { ToggleButtonModule } from 'primeng/togglebutton';
import { Component, Input } from '@angular/core';

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
  toggle: boolean = false;
}
