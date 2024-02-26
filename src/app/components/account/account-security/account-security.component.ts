import { is } from 'date-fns/locale';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/shared/data/UsersService/users.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { FormSecurityService } from 'src/app/shared/services/FormUtility/form-security.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';

@Component({
  selector: 'account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss'],
})
export class AccountSecurityComponent implements OnInit {
  @Input() user: UserModel;

  isMobile: boolean = false;

  isEmailChanging: boolean = false;
  isPasswordChanging: boolean = false;
  isPasswordsMatching: boolean = true;

  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;

  changeEmailEdit: boolean = false;
  changePasswordEdit: boolean = false;

  constructor(
    private _authService: AuthService,
    private _userService: UsersService,
    private _fus: FormUtilityService,
    private _formBuilder: FormBuilder,
    private _screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.changeEmailForm = this._formBuilder.group({
      newEmail: ['', [Validators.required, Validators.email]],
    });

    this.changePasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword2: ['', [Validators.required, Validators.minLength(8)]],
    });

    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    this._fus.setForm(this.changeEmailForm);
  }

  cancelEmailForm() {
    this.changeEmailEdit = false;
    this.changeEmailForm.reset();
  }

  cancelPasswordForm() {
    this.changePasswordEdit = false;
    this.changePasswordForm.reset();
  }

  submitEmailForm() {
    this.changeEmailForm.markAllAsTouched();
    if (this.changeEmailForm.valid) {
      this.changeEmailEdit = false;
      this._userService
        .updateEmail(this.user._id, this.changeEmailForm.value.newEmail)
        .subscribe((res) => {});
    }
  }

  submitPasswordForm() {
    this.changePasswordForm.markAllAsTouched();
    if (
      this.changePasswordForm.value.newPassword !==
      this.changePasswordForm.value.newPassword2
    ) {
      this.isPasswordsMatching = false;
      return;
    }

    if (this.changePasswordForm.valid) {
      this.changePasswordEdit = false;
      this._userService
        .updatePassword(
          this.user._id,
          this.changePasswordForm.value.newPassword
        )
        .subscribe((res) => {
          this.isPasswordChanging = true;
        });
    }
  }
}
