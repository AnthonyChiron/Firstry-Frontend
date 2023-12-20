import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/data/UsersService/users.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;
  isPasswordResetAsked: boolean = false;
  isEmailUnknown: boolean = false;

  constructor(
    private _userService: UsersService,
    private _formBuilder: FormBuilder,
    protected _fus: FormUtilityService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this._fus.setForm(this.form);
  }

  resetPassword() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this._userService.resetPassword(this.form.value.email).subscribe({
      next: (token) => {
        this.isPasswordResetAsked = true;
      },
      error: (err) => {
        this.isEmailUnknown = true;
      },
    });
  }
}
