import { CountdownConfig, CountdownComponent } from 'ngx-countdown';
import { LiveService } from 'src/app/shared/services/LiveService/live.service';
import { OwlOptions } from './../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'waiting-asset',
  templateUrl: './waiting-asset.component.html',
  styleUrls: ['./waiting-asset.component.scss'],
})
export class WaitingAssetComponent {
  currentCategory: any = '';
  currentTimer: any = 50;

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  config: CountdownConfig = { leftTime: 60, format: 'HH:mm' };

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

    this._liveService.onEvent<any>('currentWaitingTimer', (data) => {
      console.log('currentWaitingTimer', data);
      this.currentTimer = data;
      this.config = {
        leftTime: this.currentTimer,
        format: 'mm:ss',
      };
    });

    this._liveService.onEvent<any>('startWaitingTimer', (data) => {
      this.countdown.restart();
      console.log('startTimer');
    });

    this._liveService.onEvent<any>('stopWaitingTimer', (data) => {
      this.countdown.stop();
      console.log('stopTimer');
    });

    this._liveService.onEvent<any>('resetWaitingTimer', (data) => {
      this.countdown.restart();
      this.countdown.stop();
    });
  }
}
