import { LiveService } from 'src/app/shared/services/LiveService/live.service';
import { OwlOptions } from './../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'waiting-asset',
  templateUrl: './waiting-asset.component.html',
  styleUrls: ['./waiting-asset.component.scss'],
})
export class WaitingAssetComponent implements OnDestroy {
  currentCategory: any = '';

  customOptions: OwlOptions = {
    loop: true,
    items: 1, // Afficher un élément à la fois
    dots: false, // Masquer les points de navigation si souhaité
    autoplay: true, // Activer la lecture automatique
    autoplayTimeout: 8000, // Changer d'élément toutes les 8 secondes
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  constructor(private _liveService: LiveService) {}

  ngOnInit(): void {
    this._liveService.connect();

    this._liveService.onEvent<any>('currentCategory', (data) => {
      this.currentCategory = data;
    });
  }

  ngOnDestroy(): void {
    this._liveService.disconnect();
  }
}
