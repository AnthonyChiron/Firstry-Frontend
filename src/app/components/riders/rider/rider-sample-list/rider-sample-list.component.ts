import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import { RiderModel } from 'src/app/models/rider.model';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';

@Component({
  selector: 'rider-sample-list',
  templateUrl: './rider-sample-list.component.html',
  styleUrls: ['./rider-sample-list.component.scss'],
})
export class RiderSampleListComponent implements OnInit, OnChanges {
  @Input() rider: any;
  isLoading: boolean = false;
  isMobile: boolean = false;
  riders: any[] = [];
  sports = [
    { name: 'Roller' },
    { name: 'Trottinette' },
    { name: 'Skate' },
    { name: 'Quad' },
    { name: 'BMX' },
  ];

  constructor(
    private ridersService: RidersService,
    private _screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    if (!this.rider) return;
    console.log(this.rider);
    this.getRiders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.rider) return;
    console.log(this.rider);
    this.getRiders();
  }

  getRiders() {
    this.isLoading = true;
    this.ridersService
      .getFilteredByPage(1, this.isMobile ? 3 : 6, {
        name: '',
        sports: this.rider.sports,
      })
      .subscribe((riders: any) => {
        console.log(riders);
        this.riders = riders.riders;
        // remove rider from riders
        this.riders = this.riders.filter((r) => r._id !== this.rider._id);
        this.isLoading = false;
      });
  }
}
