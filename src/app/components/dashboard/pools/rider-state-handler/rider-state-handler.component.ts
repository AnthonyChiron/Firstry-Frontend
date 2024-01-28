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
      console.log(this.screenWidth);
    });

    console.log(this.registrations);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.registrations.currentValue.length != 0) {
      this.registrations.push(this.registrations[0]);
      this.registrations.push(this.registrations[0]);
      this.registrations.push(this.registrations[0]);
      this.registrations.push(this.registrations[0]);
      this.registrations.push(this.registrations[0]);
      this.registrations.push(this.registrations[0]);
      this.registrations.push(this.registrations[0]);
      this.registrations.push(this.registrations[0]);
      console.log(this.registrations);
    }
  }

  test() {
    this.registrations.push(this.registrations[0]);
    this.registrations.push(this.registrations[0]);
    this.registrations.push(this.registrations[0]);
  }

  validRider(registrationId) {
    this.registrations = this.registrations.filter(
      (registration) => registration._id != registrationId
    );
    // this._registrationService
    //   .validRiderRegistration(registrationId)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.registrations = this.registrations.filter(
    //       (registration) => registration._id != registrationId
    //     );
    //   });
  }

  refuseRider(registrationId) {
    this.registrations = this.registrations.filter(
      (registration) => registration._id != registrationId
    );
    // this._registrationService
    //       .refuseRiderRegistration(registrationId)
    //       .subscribe((res) => {
    //         console.log(res);
    //         // Remove registration from registrations
    //         this.registrations = this.registrations.filter(
    //           (registration) => registration._id != registrationId
    //         );
    //       });
  }
}
