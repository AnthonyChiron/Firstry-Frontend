import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LiveService } from 'src/app/shared/services/LiveService/live.service';
import { io } from 'socket.io-client';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-main-live-asset',
  templateUrl: './main-live-asset.component.html',
  styleUrls: ['./main-live-asset.component.scss'],
})
export class MainLiveAssetComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  currentCategory: any = '';
  currentStep: any = '';
  currentStepFormat: any = '';
  currentRiders: any = [];
  currentRider: any = '';
  currentPool: any = '';
  currentTimer: any = 40;
  nbPools: any = 1;

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  config: CountdownConfig = { leftTime: this.currentTimer, format: 'mm:ss' };

  constructor(private _liveService: LiveService) {}

  ngOnInit(): void {
    this._liveService.connect();

    this._liveService.onEvent<any>('currentCategory', (data) => {
      this.currentCategory = data;
    });

    this._liveService.onEvent<any>('currentStep', (data) => {
      this.currentStep = data;
    });

    this._liveService.onEvent<any>('currentStepFormat', (data) => {
      this.currentStepFormat = data;
    });

    this._liveService.onEvent<any>('currentRiders', (data) => {
      this.currentRiders = data;
    });

    this._liveService.onEvent<any>('currentRider', (data) => {
      this.currentRider = data;
    });

    this._liveService.onEvent<any>('currentPool', (data) => {
      this.currentPool = data;
    });

    this._liveService.onEvent<any>('currentTimer', (data) => {
      this.currentTimer = data;
      this.config = {
        leftTime: this.currentTimer,
        format: 'mm:ss',
      };
    });

    this._liveService.onEvent<any>('nbPools', (data) => {
      this.nbPools = data;
    });

    this._liveService.onEvent<any>('startTimer', (data) => {
      this.countdown.begin();
      console.log('startTimer');
    });

    this._liveService.onEvent<any>('stopTimer', (data) => {
      this.countdown.stop();
      console.log('stopTimer');
    });

    this._liveService.onEvent<any>('resetTimer', (data) => {
      this.countdown.restart();
      this.countdown.stop();
    });
  }

  ngOnDestroy(): void {
    this._liveService.disconnect();
  }
}
