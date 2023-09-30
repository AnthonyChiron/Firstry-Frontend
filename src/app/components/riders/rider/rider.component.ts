import { ActivatedRoute, Route, Router } from '@angular/router';
import { RidersService } from './../../../shared/data/RidersService/riders.service';
import { Component, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss'],
})
export class RiderComponent implements OnInit {
  rider: RiderModel;
  isLoading: boolean = false;
  test: [
    { id: 1; name: 'Rider 1'; discipline: 'Skateboard' },
    { id: 2; name: 'Rider 2'; discipline: 'BMX' },
    { id: 3; name: 'Rider 3'; discipline: 'Roller Freestyle' }
  ];

  constructor(
    private ridersService: RidersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get rider by id from route
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.ridersService.getById(params['id']).subscribe((rider) => {
        this.rider = rider;
        this.isLoading = false;
      });
    });
  }
}
