import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormsModule } from '@angular/forms';

const loginRoutes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent, ConnexionComponent],
  imports: [CommonModule, RouterModule.forChild(loginRoutes), FormsModule],
})
export class LoginModule {}
