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
  @Input() title: string = '';
  @Input() titleGap: string = '';
  @Input() isLoading: boolean = false;

  @Input() close: boolean = false;
  @Input() redirect: boolean = false;
  @Input() redirectLink: string = '';
  @Input() btn: boolean = false;
  @Input() btnIcon: string = '';
  @Output() btnClicked: EventEmitter<any> = new EventEmitter();

  @Input() img: string = '';
  @Input() imgHeight: string = '50';
  @Input() cardWidth: string = '100';
  @Input() fitContent: boolean = false;

  @Input() type: string = 'primary';

  @Input() toggleBtn: boolean = false;
  @Input() toggle: boolean = false;
  isMobile: boolean;

  constructor(private ssc: ScreenSizeService) {}

  ngOnInit(): void {
    this.isMobile = this.ssc.isMobile;
    this.ssc.sizeChanged.subscribe((isMobile) => {
      console.log(this.isMobile);
      this.isMobile = isMobile;
    });
  }

  emitBtnClicked() {
    this.btnClicked.emit();
  }
}
