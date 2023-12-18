import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ValidEmailComponent } from './valid-email/valid-email.component';
import { IsNotValidGuard } from 'src/app/shared/guards/IsNotValid/is-not-valid.service';
import { IsAuthGuard } from 'src/app/shared/guards/IsAuth/is-auth-guard.service';
import { UserIconComponent } from '../login/user-icon/user-icon.component';
import { LoginModule } from '../login/login.module';
import { AccountComponent } from './account.component';

const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [IsAuthGuard],
  },
  {
    path: 'validateEmail',
    component: ValidEmailComponent,
    canActivate: [IsNotValidGuard, IsAuthGuard],
  },
  {
    path: 'validateEmail/:token',
    component: ValidEmailComponent,
    canActivate: [IsNotValidGuard, IsAuthGuard],
  },
];

@NgModule({
  declarations: [ValidEmailComponent, AccountComponent],
  imports: [CommonModule, RouterModule.forChild(accountRoutes), SharedModule],
})
export class AccountModule {}
