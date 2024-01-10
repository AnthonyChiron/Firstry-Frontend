import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { IsNotAuthGuard } from 'src/app/shared/guards/IsNotAuth/is-not-auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupCredentialsFormComponent } from './signUp/signup-credentials-form/signup-credentials-form.component';
import { SignupRiderFormComponent } from './signUp/signup-rider-form/signup-rider-form.component';
import { SignupOrganizerFormComponent } from './signUp/signup-organizer-form/signup-organizer-form.component';
import { SignupPhotoFormComponent } from './signUp/signup-photo-form/signup-photo-form.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormSharedModule } from 'src/app/shared/formShared.module';
import { UserIconComponent } from './user-icon/user-icon.component';
import { ForgetPasswordComponent } from './connexion/forget-password/forget-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ConnexionComponent,
    SignUpComponent,
    SignupCredentialsFormComponent,
    SignupRiderFormComponent,
    SignupOrganizerFormComponent,
    SignupPhotoFormComponent,
    UserIconComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormSharedModule,
    SharedModule,
    ImageCropperModule,
    RouterModule,
  ],
  exports: [UserIconComponent, LoginComponent],
})
export class LoginModule {}
