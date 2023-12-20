import { format } from 'date-fns';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizersService } from 'src/app/shared/data/OrganizersService/organizers.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'organizer-info-form',
  templateUrl: './organizer-info-form.component.html',
  styleUrls: ['./organizer-info-form.component.scss'],
})
export class OrganizerInfoFormComponent implements OnInit {
  @Input() organizerId: any;
  @Input() organizer: any;

  form: FormGroup;
  edit: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _organizerService: OrganizersService,
    private _authService: AuthService,
    protected _fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      bio: [''],
    });
    this._fus.setForm(this.form);

    this.form.patchValue({
      name: this.organizer.name,
      bio: this.organizer.bio,
    });
  }

  cancel() {
    this.edit = false;
    this.form.patchValue({
      name: this.organizer.name,
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.edit = false;
    this._organizerService
      .update(this.organizerId, this.form.value)
      .subscribe((res) => {
        console.log(res);
        this._authService.updateOrganizer(res);
      });
  }
}
