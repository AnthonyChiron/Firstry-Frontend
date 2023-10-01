import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { RiderModel } from 'src/app/models/rider.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
})
export class RidersComponent implements OnInit, OnDestroy {
  private sizeChangedSubscription: Subscription;
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
    private ridersService: RidersService,
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.isMobile = this.screenSizeService.isMobile;
    this.sizeChangedSubscription = this.screenSizeService.sizeChanged.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      }
    );
    this.ridersService.getAll().subscribe((riders) => {
      this.riders = riders;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.sizeChangedSubscription.unsubscribe();
  }
}
