import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LiveService } from 'src/app/shared/services/LiveService/live.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-main-live-asset',
  templateUrl: './main-live-asset.component.html',
  styleUrls: ['./main-live-asset.component.scss'],
})
export class MainLiveAssetComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  currentCategory: any;
  currentStep: any;
  currentRiders: any;
  currentRider: any;
  currentPool: any;
  nbPools: any;

  constructor(private _liveService: LiveService) {}

  ngOnInit(): void {
    this._liveService.connect();
    this._liveService.onEvent<any>('currentCategory', (data) => {
      this.currentCategory = data;
    });

    this._liveService.onEvent<any>('currentStep', (data) => {
      this.currentStep = data;
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

    this._liveService.onEvent<any>('nbPools', (data) => {
      this.nbPools = data;
    });
  }

  ngOnDestroy(): void {
    this._liveService.disconnect();
  }
}
