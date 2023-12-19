import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { is } from 'date-fns/locale';
import { RiderModel, parseRiderToDTO } from 'src/app/models/rider.model';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { FormSocialsService } from 'src/app/shared/services/FormUtility/form-socials.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'rider-socials-form',
  templateUrl: './rider-socials-form.component.html',
  styleUrls: ['./rider-socials-form.component.scss'],
})
export class RiderSocialsFormComponent implements OnInit {
  @Input() rider: RiderModel;
  @Input() riderId: string;

  form: FormGroup;
  edit: boolean = false;

  constructor(
    private _formSocialsService: FormSocialsService,
    private _riderService: RidersService,
    private _authService: AuthService,
    protected _fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.form = this._formSocialsService.createForm();
    this._fus.setForm(this.form);

    if (this.rider.socials)
      this._formSocialsService.fillForm(this.form, { ...this.rider.socials });
  }

  goToWebsite(url) {
    window.open(url, '_blank');
  }

  cancel() {
    this.edit = false;
    this._formSocialsService.fillForm(this.form, { ...this.rider.socials });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.edit = false;
      this.rider.socials = this.form.value;
      this._riderService
        .update(this.riderId, <RiderModel>parseRiderToDTO(this.rider))
        .subscribe((res) => {
          console.log(res);
          this._authService.updateRider(res);
        });
    }
  }
}
