import { Component } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'accueil-pres-rider',
  templateUrl: './accueil-pres-rider.component.html',
  styleUrls: ['./accueil-pres-rider.component.scss'],
})
export class AccueilPresRiderComponent {
  isMobile: boolean;

  constructor(private _screenSizeService: ScreenSizeService) {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  youtube() {
    window.open('https://www.youtube.com/@firstryfr', '_blank');
  }

  tiktok() {
    window.open('https://www.tiktok.com/@firstry.fr', '_blank');
  }

  instagram() {
    window.open('https://www.instagram.com/firstry.fr', '_blank');
  }
}
