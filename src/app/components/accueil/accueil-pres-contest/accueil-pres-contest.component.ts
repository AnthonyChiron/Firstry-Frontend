import { is } from 'date-fns/locale';
import { Component } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'accueil-pres-contest',
  templateUrl: './accueil-pres-contest.component.html',
  styleUrls: ['./accueil-pres-contest.component.scss'],
})
export class AccueilPresContestComponent {
  isMobile: boolean;

  constructor(private _screenSizeService: ScreenSizeService) {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
