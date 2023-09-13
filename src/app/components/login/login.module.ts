import { MatChipsModule } from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { IsNotAuthGuard } from 'src/app/shared/guards/IsNotAuth/is-not-auth.service';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [IsNotAuthGuard] },
];

@NgModule({
  declarations: [LoginComponent, ConnexionComponent, SignUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
    FormsModule,
    MatChipsModule,
    SharedModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
