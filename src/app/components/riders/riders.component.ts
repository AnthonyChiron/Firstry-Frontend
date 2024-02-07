import { is } from 'date-fns/locale';
import { ScreenSizeService } from './../../shared/services/screenSize/screen-size.service';
import { RiderModel } from 'src/app/models/rider.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
})
export class RidersComponent implements OnInit {
  isLoading: boolean = false;
  isMobile: boolean = false;
  riders: RiderModel[] = [];
  sportsOptions: any[] = [
    { name: 'Roller', value: 'roller' },
    { name: 'Trottinette', value: 'trottinette' },
    { name: 'Skate', value: 'skate' },
    { name: 'Quad', value: 'quad' },
    { name: 'BMX', value: 'bmx' },
  ];
  sports = [
    { name: 'Roller' },
    { name: 'Trottinette' },
    { name: 'Skate' },
    { name: 'Quad' },
    { name: 'BMX' },
  ];

  filtersForm: any;
  currentNameFilter: string = '';
  currentSportsFilter: string[] = [];
  currentPage: number = 1;
  limit: number = 16;
  totalPages: number = 0;

  constructor(
    private _ridersService: RidersService,
    private _screenSize: ScreenSizeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    let query = this._activatedRoute.queryParams.subscribe((params) => {
      this.currentNameFilter = params['name'];
      this.currentSportsFilter = params['sports'];
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.filtersForm = this.fb.group({
      name: [this.currentNameFilter, Validators.required],
      sports: [this.currentSportsFilter, [Validators.required]],
    });

    this._screenSize.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    if (this.isMobile) {
      this.limit = 8;
    }

    this._ridersService
      .getFilteredByPage(this.currentPage, this.limit, {
        name: this.currentNameFilter,
        sports: this.currentSportsFilter,
      })
      .subscribe((result: any) => {
        this.riders = <RiderModel[]>result.riders;
        this.isLoading = false;
        this.totalPages = result.totalPages;
        console.log(result);
      });
  }

  pageChanged(page: number): void {
    const filters = {
      name: this.currentNameFilter,
      sports: this.currentSportsFilter,
    };
    this.isLoading = true;
    this.currentPage = page;
    this._ridersService
      .getFilteredByPage(this.currentPage, this.limit, filters)
      .subscribe((result: any) => {
        this.riders = <RiderModel[]>result.riders;
        this.isLoading = false;
        this.totalPages = result.totalPages;
        this.isLoading = false;
        console.log(result);
      });
  }

  searchRiders() {
    const filters = this.filtersForm.value;
    this._ridersService
      .getFilteredByPage(this.currentPage, this.limit, filters)
      .subscribe((result: any) => {
        console.log(result);
        this.riders = <RiderModel[]>result.riders;
        this._router.navigate(['/riders'], {
          queryParams: {
            name: filters.name,
            sports: filters.sports,
            page: this.currentPage,
          },
        });
      });
  }

  resetFilters() {
    this.filtersForm.reset();
    this.currentNameFilter = '';
    this.currentSportsFilter = [];
    this.currentPage = 1;
    this._ridersService
      .getFilteredByPage(this.currentPage, this.limit, {
        name: '',
        sports: [],
      })
      .subscribe((result: any) => {
        this.riders = <RiderModel[]>result.riders;
        this.isLoading = false;
        this.totalPages = result.totalPages;
        console.log(result);
      });
  }
}
