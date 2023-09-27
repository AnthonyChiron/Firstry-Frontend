import { RiderModel } from 'src/app/models/rider.model';
import { Component, OnInit } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';

@Component({
  selector: 'rider-sample-list',
  templateUrl: './rider-sample-list.component.html',
  styleUrls: ['./rider-sample-list.component.scss'],
})
export class RiderSampleListComponent {
  riders: RiderModel[] = [];
  sports = [
    { name: 'Roller' },
    { name: 'Trottinette' },
    { name: 'Skate' },
    { name: 'Quad' },
    { name: 'BMX' },
  ];

  constructor(private ridersService: RidersService) {}

  ngOnInit(): void {
    this.ridersService.getAll().subscribe((riders) => (this.riders = riders));
  }
}
