import { AppComponent } from './../../../app.component';
import { is } from 'date-fns/locale';
import { Component, OnInit } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { RiderModel } from 'src/app/models/rider.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-riders-handler',
  templateUrl: './admin-riders-handler.component.html',
  styleUrls: ['./admin-riders-handler.component.scss'],
})
export class AdminRidersHandlerComponent implements OnInit {
  riders: any[] = [];
  page: number = 1;
  pageSize: number = 50;
  isLoading: boolean = true;
  filters: any = {};
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
    private _router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      name: [this.currentNameFilter, Validators.required],
      sports: [this.currentSportsFilter, [Validators.required]],
    });

    this._ridersService
      .getFilteredByPage(this.page, this.pageSize, this.filters)
      .subscribe((result: any) => {
        this.riders = <RiderModel[]>result.riders;
        this.totalPages = result.totalPages;
        this.isLoading = false;
      });
  }

  toggleVerification(id: string) {
    this._ridersService.toggleVerification(id).subscribe((res) => {
      this.ngOnInit();
    });
  }

  searchRiders() {
    const filters = this.filtersForm.value;
    console.log(filters);
    this.currentPage = 1;
    this._ridersService
      .getFilteredByPage(this.currentPage, this.limit, filters)
      .subscribe((result: any) => {
        console.log(result);
        this.riders = <RiderModel[]>result.riders;
      });
  }
}
