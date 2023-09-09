import { RiderModel } from 'src/app/models/rider.model';
import { Component, OnInit } from '@angular/core';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';

@Component({
  selector: 'riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
})
export class RidersComponent implements OnInit {
  riders: RiderModel[] = [];

  constructor(private ridersService: RidersService) {}

  ngOnInit(): void {
    this.ridersService.getAll().subscribe((riders) => (this.riders = riders));
  }
}
