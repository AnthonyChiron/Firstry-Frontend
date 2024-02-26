import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RegistrationsService } from 'src/app/shared/data/RegistrationsService/registrations.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'rider-state-handler',
  templateUrl: './rider-state-handler.component.html',
  styleUrls: ['./rider-state-handler.component.scss'],
})
export class RiderStateHandlerComponent implements OnInit, OnChanges {
  @Input() registrations: any[] = [];
  @Input() contest: any;
  screenWidth: number = 0;

  constructor(
    private _registrationService: RegistrationsService,
    private _screenSize: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this._screenSize.screenWidth$.subscribe((screenWidth) => {
      this.screenWidth = screenWidth;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  validRider(registrationId) {
    // this.registrations = this.registrations.filter(
    //   (registration) => registration._id != registrationId
    // );
    this._registrationService
      .validRiderRegistration(registrationId)
      .subscribe((res) => {
        this.registrations = this.registrations.filter(
          (registration) => registration._id != registrationId
        );
      });
  }

  refuseRider(registrationId) {
    // this.registrations = this.registrations.filter(
    //   (registration) => registration._id != registrationId
    // );
    this._registrationService
      .refuseRiderRegistration(registrationId)
      .subscribe((res) => {
        // Remove registration from registrations
        this.registrations = this.registrations.filter(
          (registration) => registration._id != registrationId
        );
      });
  }

  openRider(riderId) {
    // Open registration in new tab
    window.open(`/riders/${riderId}`);
  }
}
