import { MatChipsModule } from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';

const loginRoutes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent, ConnexionComponent, RegisterComponent],
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
