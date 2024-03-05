import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { UsersService } from 'src/app/shared/data/UsersService/users.service';

@Component({
  selector: 'app-admin-rider',
  templateUrl: './admin-rider.component.html',
  styleUrls: ['./admin-rider.component.scss'],
})
export class AdminRiderComponent implements OnInit {
  rider: any;
  user: any;
  registrations: any[] = [];

  constructor(
    private _ridersService: RidersService,
    private _activatedRouter: ActivatedRoute,
    private _registrationsService: RegistrationsService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params) => {
      this._ridersService.getById(params['id']).subscribe((rider) => {
        console.log(rider);
        this.rider = rider;
      });
      this._usersService.getUserByRiderId(params['id']).subscribe((user) => {
        console.log(user);
        this.user = user;
      });
      this._registrationsService
        .getRiderRegistrations(params['id'])
        .subscribe((registrations: any[]) => {
          console.log(registrations);
          this.registrations = registrations;
        });
    });
  }
}
