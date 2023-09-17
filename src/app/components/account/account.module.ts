import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ValidEmailComponent } from './valid-email/valid-email.component';
import { IsNotValidGuard } from 'src/app/shared/guards/IsNotValid/is-not-valid.service';

const dashboardRoutes: Routes = [
  {
    path: 'validateEmail',
    component: ValidEmailComponent,
    // canActivate: [IsNotValidGuard],
  },
  {
    path: 'validateEmail/:token',
    component: ValidEmailComponent,
    canActivate: [IsNotValidGuard],
  },
];

@NgModule({
  declarations: [ValidEmailComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes), SharedModule],
})
export class AccountModule {}
