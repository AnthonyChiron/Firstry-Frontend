import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { RiderModel } from 'src/app/models/rider.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
      transition('* <=> void', animate('500ms ease-in-out')),
    ]),
  ],
})
export class RidersComponent implements OnInit {
  isLoading: boolean = false;
  isMobile: boolean = false;
  riders: RiderModel[] = [];
  sports = [
    { name: 'Roller' },
    { name: 'Trottinette' },
    { name: 'Skate' },
    { name: 'Quad' },
    { name: 'BMX' },
  ];

  constructor(
    private _ridersService: RidersService,
    private _screenSize: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this._ridersService.getAll().subscribe((riders) => {
      this.riders = riders;
      this.isLoading = false;
    });
  }
}
