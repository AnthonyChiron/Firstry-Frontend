import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ValidEmailComponent } from './valid-email/valid-email.component';
import { IsNotValidGuard } from 'src/app/shared/guards/IsNotValid/is-not-valid.service';
import { IsAuthGuard } from 'src/app/shared/guards/IsAuth/is-auth-guard.service';
import { UserIconComponent } from '../../shared/components/login/user-icon/user-icon.component';
import { LoginModule } from '../../shared/components/login/login.module';
import { AccountComponent } from './account.component';
import { RiderInfoFormComponent } from './rider-info-form/rider-info-form.component';
import { FormSharedModule } from 'src/app/shared/formShared.module';
import { RiderSocialsFormComponent } from './rider-socials-form/rider-socials-form.component';
import { RiderRegistrationsComponent } from './rider-registrations/rider-registrations.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { ValidNewEmailComponent } from './valid-new-email/valid-new-email.component';
import { ValidNewPasswordComponent } from './valid-new-password/valid-new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePhotoComponent } from './update-photo/update-photo.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OrganizerInfoFormComponent } from './organizer-info-form/organizer-info-form.component';
import { StripeAccountComponent } from './stripe-account/stripe-account.component';

const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [IsAuthGuard],
  },
  {
    path: 'validateEmail',
    component: ValidEmailComponent,
    canActivate: [],
  },
  {
    path: 'validateEmail/:token/:userId',
    component: ValidEmailComponent,
    canActivate: [],
  },
  {
    path: 'validateNewEmail/:token',
    component: ValidNewEmailComponent,
  },
  {
    path: 'validateNewPassword/:token',
    component: ValidNewPasswordComponent,
  },
  {
    path: 'resetPassword/:token',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  declarations: [
    ValidEmailComponent,
    ValidNewEmailComponent,
    AccountComponent,
    RiderInfoFormComponent,
    RiderSocialsFormComponent,
    RiderRegistrationsComponent,
    AccountSecurityComponent,
    ValidNewPasswordComponent,
    ResetPasswordComponent,
    UpdatePhotoComponent,
    OrganizerInfoFormComponent,
    StripeAccountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes),
    SharedModule,
    FormSharedModule,
    ImageCropperModule,
  ],
})
export class AccountModule {}
