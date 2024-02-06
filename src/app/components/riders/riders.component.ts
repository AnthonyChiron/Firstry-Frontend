import { is } from 'date-fns/locale';
import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { RiderModel } from 'src/app/models/rider.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';

@Component({
  selector: 'riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
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

  currentPage: number = 1;
  limit: number = 16;
  totalPages: number = 0;

  constructor(
    private _ridersService: RidersService,
    private _screenSize: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    if (this.isMobile) {
      this.limit = 8;
    }

    this._ridersService
      .getByPage(this.currentPage, this.limit)
      .subscribe((result: any) => {
        this.riders = <RiderModel[]>result.data;
        this.isLoading = false;
        this.totalPages = result.totalPages;
        console.log(result);
      });
  }

  pageChanged(page: number): void {
    console.log(page);
    this.isLoading = true;
    this.currentPage = page;
    this._ridersService
      .getByPage(this.currentPage, this.limit)
      .subscribe((result: any) => {
        this.riders = <RiderModel[]>result.data;
        this.isLoading = false;
        this.totalPages = result.totalPages;
        this.isLoading = false;
        console.log(result);
      });
  }
}
