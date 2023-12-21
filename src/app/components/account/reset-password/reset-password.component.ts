import { is } from 'date-fns/locale';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/data/UsersService/users.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

  isPasswordsMatching: boolean = true;
  isPasswordReset: boolean = false;

  isTokenValid: boolean = false;
  token: string;

  constructor(
    private _formBuild: FormBuilder,
    private _userService: UsersService,
    private _activatedRoute: ActivatedRoute,
    protected _fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this._userService.checkResetPasswordToken(params['token']).subscribe({
        next: (res) => {
          this.isTokenValid = true;
          console.log(res);
        },
        error: (res) => {
          console.log(res);
        },
      });
      this.token = params['token'];
    });

    this.form = this._formBuild.group({
      newPassword: ['', Validators.required],
      newPassword2: ['', Validators.required],
    });
    this._fus.setForm(this.form);
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    console.log(this.form.value.newPassword);
    console.log(this.form.value.newPassword2);

    if (this.form.value.newPassword !== this.form.value.newPassword2) {
      this.isPasswordsMatching = false;
      return;
    }

    this._userService
      .updateResetPassword(this.token, this.form.value.newPassword)
      .subscribe((res) => {
        this.isPasswordReset = true;
        console.log(res);
      });
  }
}
