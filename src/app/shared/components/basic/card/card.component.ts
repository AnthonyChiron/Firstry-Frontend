import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }), // Style initial pour ':enter'
        group([
          animate('0.3s ease-out', style({ height: '*' })), // Animer la hauteur
          animate('0.2s 0.1s', style({ opacity: 1 })), // Animer l'opacité avec un délai
        ]),
      ]),
      transition(':leave', [
        group([
          animate('0.3s ease-out', style({ height: '0' })), // Animer la hauteur
          animate('0.1s', style({ opacity: 0 })), // Animer l'opacité sans délai
        ]),
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  // CARD
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() isLoading: boolean = false;
  @Input() size: string = 'l';
  @Input() color: string = '1';
  @Input() fitContent: boolean = false;

  // BUTTONS
  @Input() close: boolean = false;
  @Input() redirect: boolean = false;
  @Input() redirectLink: string = '';
  @Input() btn: boolean = false;
  @Input() btnIcon: string = '';
  @Output() btnClicked: EventEmitter<any> = new EventEmitter();
  @Input() toggleBtn: boolean = false;
  @Input() toggle: boolean = false;

  // WIDTH & HEIGHT IMG
  @Input() img: string = '';
  @Input() imgHeight: string = '';
  @Input() cardWidth: string = '100';

  isMobile: boolean;

  constructor(private _screenSize: ScreenSizeService) {}

  ngOnInit(): void {
    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    console.log(this.size);
  }

  emitBtnClicked() {
    this.btnClicked.emit();
  }
}
