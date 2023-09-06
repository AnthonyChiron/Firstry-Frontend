import { RiderModel } from 'src/app/models/rider.model';
import { RidersService } from './../../services/RidersService/riders.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
