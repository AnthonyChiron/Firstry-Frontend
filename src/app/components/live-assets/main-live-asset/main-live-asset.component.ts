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
  // Déclarez d'autres propriétés pour les données auxquelles vous vous abonnez

  constructor(private _liveService: LiveService) {}

  ngOnInit(): void {
    this._liveService.connect();
    this._liveService.onEvent<any>('currentCategory', (data) => {
      console.log(data);
      this.currentCategory = data;
      // Mettez à jour l'état du composant avec les données reçues
    });
  }

  ngOnDestroy(): void {
    this._liveService.disconnect();
  }
}
