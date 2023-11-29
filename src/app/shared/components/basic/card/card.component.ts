import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
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
  @Input() color: string = 'primary';

  @Input() subCard: boolean = false;

  toggle: boolean = false;
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
