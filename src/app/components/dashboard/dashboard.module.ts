import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarSecondaryComponent } from 'src/app/shared/sidebar-secondary/sidebar-secondary.component';
import { AuthGuard } from 'src/app/services/Auth/AuthGuard/auth-guard.service';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [DashboardComponent, SidebarSecondaryComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
})
export class DashboardModule {}
