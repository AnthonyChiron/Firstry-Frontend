import { filter } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CountryService } from 'src/app/shared/services/CountryService/country.service';
import { Form, FormGroup } from '@angular/forms';
import { FormRiderService } from 'src/app/shared/services/FormUtility/form-rider.service';
import { RiderModel } from 'src/app/models/rider.model';
import { SportsService } from 'src/app/shared/services/SportsService/sports.service';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'rider-info-form',
  templateUrl: './rider-info-form.component.html',
  styleUrls: ['./rider-info-form.component.scss'],
})
export class RiderInfoFormComponent implements OnInit {
  @Input() rider: RiderModel;
  @Input() riderId: string;

  form: FormGroup;
  edit: boolean = false;

  sports: any[] = [];
  countries: any[] = [];
  filteredCountries: any[] = [];

  constructor(
    private _countryService: CountryService,
    private _formRiderService: FormRiderService,
    private _sportService: SportsService,
    private _riderService: RidersService,
    private _authService: AuthService,
    protected _fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    console.log(this.rider);
    this.sports = this._sportService.getSportsAsOption();

    this.form = this._formRiderService.createForm();
    this._fus.setForm(this.form);
    this._formRiderService.fillForm(this.form, { ...this.rider });

    this._countryService.getAllCountry().subscribe((data: any[]) => {
      this.countries = data.map((country) => {
        return { label: country.name.common, value: country };
      });
    });
  }

  cancel() {
    this.edit = false;
    this._formRiderService.fillForm(this.form, { ...this.rider });
  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    if (this.form.valid) {
      this.edit = false;
      this.rider = this.form.value;
      console.log(this.form.value);
      this._riderService
        .update(this.riderId, this.form.value)
        .subscribe((res) => {
          console.log(res);
          this._authService.updateRider(res);
        });
    }
  }
}
