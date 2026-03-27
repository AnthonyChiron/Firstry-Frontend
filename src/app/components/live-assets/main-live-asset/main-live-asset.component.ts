import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { LiveService } from 'src/app/shared/services/LiveService/live.service';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-live-asset',
  templateUrl: './main-live-asset.component.html',
  styleUrls: ['./main-live-asset.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(60px)' }),
        animate(
          '420ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '280ms cubic-bezier(0.4, 0, 1, 1)',
          style({ opacity: 0, transform: 'translateX(40px)' }),
        ),
      ]),
    ]),
    // Déclenché par la longueur de la liste uniquement : stagger à l’arrivée d’une poule,
    // pas au changement de rider (géré par le surlignage glissant + CSS).
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(8px)' }),
            stagger(45, [
              animate(
                '220ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class MainLiveAssetComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  currentCategory: any = '';
  currentStep: any = '';
  currentStepFormat: any = '';
  currentRiders: any = [];
  currentRider: any = '';
  currentPool: any = '';
  currentTimer: any = 40;
  nbPools: any = 1;
  isWaitingDisplayed: boolean = true;
  /**
   * Route : `/live-assets`. Sans événement socket `isMainAssetDisplayed`, le template
   * `*ngIf="isMainDisplayed"` masque tout le bloc (liste riders, timer). En prod, false
   * jusqu’au toggle depuis la vue Live ; en local, `environment.liveAssetsDefaultMainVisible`.
   */
  isMainDisplayed: boolean = environment.liveAssetsDefaultMainVisible ?? false;

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  config: CountdownConfig = { leftTime: this.currentTimer, format: 'mm:ss' };

  constructor(private _liveService: LiveService) {}

  trackByRider(_index: number, rider: any): string {
    return rider?._id ?? String(_index);
  }

  /** Index du rider courant dans `currentRiders` (surlignage glissant). -1 si introuvable. */
  get activeRiderIndex(): number {
    if (!this.currentRiders?.length || !this.currentRider?._id) {
      return -1;
    }
    return this.currentRiders.findIndex(
      (r: any) => r?._id === this.currentRider._id,
    );
  }

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

    this._liveService.onEvent<any>('isWaitingAssetDisplayed', (data) => {
      console.log('isWaitingAssetDisplayed');
      console.log(data);
      this.isWaitingDisplayed = data;
    });

    this._liveService.onEvent<any>('isMainAssetDisplayed', (data) => {
      console.log('isMainAssetDisplayed');
      console.log(data);
      this.isMainDisplayed = data;
    });

    this._liveService.onEvent<any>('nbPools', (data) => {
      this.nbPools = data;
    });

    this._liveService.onEvent<any>('startTimer', (data) => {
      this.countdown.restart();
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
