import { is } from 'date-fns/locale';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent {
  @Input() links: any[];

  constructor(private _screenSizeService: ScreenSizeService) {}
}
