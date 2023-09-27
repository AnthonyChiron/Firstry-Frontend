import { IsAuthGuard } from './../../shared/guards/IsAuth/is-auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarSecondaryComponent } from 'src/app/shared/components/basic/sidebar-secondary/sidebar-secondary.component';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [IsAuthGuard] },
];

@NgModule({
  declarations: [DashboardComponent, SidebarSecondaryComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
})
export class DashboardModule {}
